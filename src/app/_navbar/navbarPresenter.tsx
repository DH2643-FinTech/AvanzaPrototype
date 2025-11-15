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
import { isSessionStorageAvailable } from "@/lib/utils/utils";

export class SignUpError extends Error {}
export class SignInError extends Error {}
export class SendVerificationCodeError extends Error {}

const NavbarPresenter = () => {
  //#region LOGIN
  const router = useRouter();
  const session = useSession();
  const dispatch = useAppDispatch();
  const companyIds = useAppSelector((state) => state.company.companiesIds);

  useEffect(() => {
    if (isSessionStorageAvailable()) {
      const storedCompanyIds = sessionStorage.getItem("allCompanyIds");
      if (!storedCompanyIds) {
        dispatch(fetchAllCompanyIds());
      } else {
        dispatch(setCompanies(JSON.parse(storedCompanyIds)));
      }
    }
  }, []);

  const handleSignIn = async (credProps: {
    method: string;
    email: string;
    password: string;
  }) => {
    try {
      if (credProps.method === "google") {
        await signIn("google");
        return true;
      } else {
        const { status } = await verificationController(credProps.email);
        if (status === 200) {
          const signInResponse = await signIn("credentials", {
            email: credProps.email,
            password: credProps.password,
            redirect: false,
          });

          if (signInResponse && !signInResponse.error) return true;
          else {
            throw new SignInError("Invalid email or password.");
          }
        } else if (status === 201) {
          throw new SignInError(
            "You are not a verified user, please signup again!"
          );
        } else {
          throw new SignInError(
            "An error occurred while verifying your account."
          );
        }
      }
    } catch (error) {
      if (error instanceof SignInError) throw error;
      console.error("An error occurred while signing in: ", error);
      return false;
    }
  };

  const handlePasswordResetRequest = async (email: string) => {
    try {
      const { ok, resetLink } = await fetchEmailRecoveryToken(email);
      if (!ok) return ok;
      const emailRes = await sendPasswordResetEmail({ email, resetLink });
      if (typeof emailRes === "object" && emailRes?.status === 200) return true;
      else return false;
    } catch (error) {
      console.log("Error sending password reset email:", error);
      throw error;
    }
  };

  const handleSignUp = async (credProps: {
    method: string;
    email: string;
    password: string;
  }) => {
    try {
      if (credProps.method === "google") {
        await signIn("google");
        return true;
      } else {
        const { ok, verificationLink } = await registerNewUser(
          credProps.email,
          credProps.password
        );
        if (!ok) return false;
        const emailRes = await sendPasswordResetEmail({
          email: credProps.email,
          resetLink: verificationLink,
        });
        return true;
      }
    } catch (error) {
      console.error("An error occurred while signing up: ", error);
      throw new SignUpError(
        "An error occurred during the sign-up process. Please try again."
      );
    }
  };

  const handleVerifyCode = async ({
    email,
    verificationCode,
  }: {
    email: string;
    verificationCode: string;
  }) => {
    const { ok } = await verifyUser(email, verificationCode);
    return ok;
  };

  const handleResendCode = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      try {
        const { ok, verificationLink } = await registerNewUser(email, password);
        if (!ok) return ok;
        const emailRes = await sendPasswordResetEmail({
          email,
          resetLink: verificationLink,
        });
        return ok;
      } catch (error) {
        console.error("Error during sign up:", error);
        throw new SignUpError(
          "An error occurred during sign up. Please try again."
        );
      }
    } catch (error) {
      console.error("Error resending verification code:", error);
      throw new SendVerificationCodeError(
        "Failed to resend the code. Please try again."
      );
    }
  };

  const loginProps: LoginProps = {
    handleSignIn,
    handleSignUp,
    handlePasswordResetRequest,
    handleVerifyCode,
    handleResendCode,
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
      const results = companies.filter(
        (company: { id: string; name: string }) =>
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
  };

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
