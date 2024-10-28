"use client";
import { useSession, signIn } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/lib/model/store";
import { useEffect, useState } from "react";
import { fetchAllCompanyIds } from "@/lib/model/slices/company/companyThunks";
import {
  setCompanies,
  setSearchParamName,
} from "@/lib/model/slices/company/companySlice";
import { useRouter } from "next/navigation";
import NavbarView from "./navbarView";
import {
  fetchEmailRecoveryToken,
  registerNewUser,
  verificationController,
  verifyUser,
} from "@/lib/api/accountAPI";
import { sendPasswordResetEmail } from "@/lib/services/email_service";
import { LoginProps, SearchBarProps } from "./navbarTypes";
import { CompanyID } from "../api/companies/dataTypes";

const NavbarPresenter = () => {

  //#region LOGIN
  const router = useRouter();
  const session = useSession();
  const dispatch = useAppDispatch();
  const companyIds = useAppSelector((state) => state.company.companiesIds);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = useState(false);
  const [isPasswordResetDialogOpen, setIsPasswordResetDialogOpen] =
    useState(false);
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] =
    useState(false);
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);


  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  useEffect(() => {
    const storedCompanyIds = localStorage.getItem("allCompanyIds");
    if (!storedCompanyIds) {
      dispatch(fetchAllCompanyIds());
    } else {
      dispatch(setCompanies(JSON.parse(storedCompanyIds)));
    }
  }, []);

  const handleSignIn = async (credProps: { method: string }) => {
    try {
      if (credProps.method === "google") {
        await signIn("google");
        return;
      } else {
        const { status } = await verificationController(email);
        if (status === 200) {
          const signInResponse = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
          });

          if (signInResponse && !signInResponse.error) {
            setEmail("");
            setPassword("");
          } else {
            setStatus("Invalid email or password.");
          }
        } else if (status === 201) {
          setStatus("You are not a verified user, please signup again!");
        } else {
          setStatus("An error occurred while verifying your account.");
        }
      }
    } catch (error) {
      console.error("An error occurred while signing in: ", error);
      setStatus(
        "An error occurred during the sign-in process. Please try again."
      );
    }
  };

  const handlePasswordResetRequest = async (e: React.FormEvent) => {
    setStatus("");
    e.preventDefault();
    try {
      const { ok, resetLink } = await fetchEmailRecoveryToken(email);
      console.log(ok, resetLink);
      if (!ok) {
        setStatus(
          "Failed to send reset email. Please check the email address."
        );
        return;
      }
      const emailRes = await sendPasswordResetEmail({ email, resetLink });
      if (typeof emailRes === "object" && emailRes?.status === 200) {
        setStatus("Password reset email sent!");
      } else {
        setStatus(
          "Failed to send reset email. Please check the email address."
        );
        console.error("EmailJS response not successful:", emailRes);
      }
    } catch (error) {
      console.log("Error sending password reset email:", error);
      setStatus("Failed to send reset email. Please check the email address.");
    }
  };

  const handleSignUp = async (credProps: { method: string }): Promise<void> => {
    try {
      if (credProps.method === "google") {
        await signIn("google");
        return;
      } else {
        const { ok, verificationLink } = await registerNewUser(email, password);
        if (!ok) {
          setStatus("Sign up failed. Please check your details and try again.");
          return;
        }
        const emailRes = await sendPasswordResetEmail({
          email,
          resetLink: verificationLink,
        });

        setStatus(
          "Password reset email sent! If you do not receive the email, please check your email address for any errors."
        );
        setIsSignUpDialogOpen(false);
        setIsVerificationDialogOpen(true);
      }
    } catch (error) {
      console.error("An error occurred while signing up: ", error);
      setStatus(
        "An error occurred during the sign-up process. Please try again."
      );
    }
  };

  const handleVerifyCode = async () => {
    try {
      const { ok } = await verifyUser(email, verificationCode);

      if (ok) {
        setStatus("Verification successful! You can now log in.");
        setIsVerificationDialogOpen(false);
      } else {
        setStatus("Invalid verification code. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setStatus("An error occurred during verification. Please try again.");
    }
  };


  const handleResendCode = async () => {
    try {
      try {
        const { ok, verificationLink } = await registerNewUser(email, password);
        if (!ok) {
          setStatus("Sign up failed. Please check your details and try again.");
          return;
        }
        const emailRes = await sendPasswordResetEmail({
          email,
          resetLink: verificationLink,
        });

        setStatus(
          "Password reset email sent! If you do not receive the email, please check your email address for any errors."
        );
        setIsSignUpDialogOpen(false);
        setIsVerificationDialogOpen(true);
      } catch (error) {
        console.error("Error during sign up:", error);
        setStatus("An error occurred during sign up. Please try again.");
      }
      setTimer(120);
      setCanResend(false);
    } catch (error) {
      console.error("Error resending verification code:", error);
      setStatus("Failed to resend the code. Please try again.");
    }
  };

  const loginProps: LoginProps = {
    email,
    setEmail,
    password,
    setPassword,
    status,
    setStatus,
    handleSignIn,
    handleSignUp,
    handlePasswordResetRequest,
    isLoginDialogOpen,
    setIsLoginDialogOpen,
    isSignUpDialogOpen,
    setIsSignUpDialogOpen,
    isPasswordResetDialogOpen,
    setIsPasswordResetDialogOpen,
    isVerificationDialogOpen,
    setIsVerificationDialogOpen,
    verificationCode,
    setVerificationCode,
    handleVerifyCode,
    handleResendCode,
    timer,
    canResend,
    confirmPassword,
    setConfirmPassword,
  };

  //#endregion

  //#region SEARCHBAR 

  const result = useAppSelector((state) => state.company.companiesIds);
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [filteredResults, setFilteredResults] = useState<
    { id: string; name: string }[]
  >([]);

  const companies =
    result?.map((company: CompanyID) => ({
      id: company._id,
      name: company.name,
    })) || [];

  useEffect(() => {
    if (search?.trim()) {
      const results = companies.filter((company: {
        id: string;
        name: string;
    }) =>
        company.name.toLowerCase().includes(search?.toLowerCase())
      );

      setFilteredResults(results);
      setShowResults(true);
    } else {
      setFilteredResults([]);
      setShowResults(false);
    }
  }, [search]);

  const handleSearch = (searchParam: string) => {
    dispatch(setSearchParamName(searchParam));
    const id = companyIds.find(
      (company: { name: string; _id: string }) => company.name === searchParam
    )?._id;
    router.push(`/company/stock/${id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {

    if (e.key === "Enter") {
      setShowResults(false);
      handleSearch(search);
    }
  };

  const handleSelect = (companyName: string) => {
    setSearch(companyName);
    handleSearch(companyName);
    setShowResults(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
  };


  const searchBarProps: SearchBarProps = {
    search,
    showResults,
    filteredResults,
    handleKeyDown,
    handleSelect,
    handleInputChange,
  }

  //#endregion

  return (
    <NavbarView
      sessionData={session}
      // setSearchParam={handleSearchParam}
      loginProps={loginProps}
      searchBarProps={searchBarProps}
    />
  );
};

export default NavbarPresenter;
