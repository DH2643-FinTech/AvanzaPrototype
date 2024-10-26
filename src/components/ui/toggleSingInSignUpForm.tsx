import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/dialog";
import { Button } from "../shadcn/button";
import { Label } from "../shadcn/label";
import { Input } from "../shadcn/input";
import Link from "next/link";
import {
  fetchEmailRecoveryToken,
  registerNewUser,
  verificationController,
  verifyUser,
} from "@/lib/api/accountAPI";
import { sendPasswordResetEmail } from "@/lib/services/email_service";

interface Props {
  signIn: (credProps: any) => Promise<any>;
  signUp: (credProps: any) => Promise<any>;
}
const ToggleSingInSignUpForm = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = useState(false);
  const [isPasswordResetDialogOpen, setIsPasswordResetDialogOpen] =
    useState(false);
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] =
    useState(false);
  const handleSignInWithGoogle = () => {
    const response = signIn("google");
  };

  const handleSignInWithCredentials = async () => {
    try {
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
    } catch (error) {
      setStatus(
        "An error occurred during the sign-in process. Please try again."
      );
    }
  };

  const handlePasswordResetRequest = async (e: any) => {
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

  const handleSignUpWithCredentials = async (e: any) => {
    e.preventDefault();
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
  };

  const handleSignUpWithGoogle = () => {
    const response = signIn("google");
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

  return (
    <div>
      <div className="flex items-center">
        <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Log in</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Log in</DialogTitle>
              <DialogDescription>
                Enter your email below to login to your account
              </DialogDescription>
            </DialogHeader>
            <div className="border border-slate-100"></div>
            <div className="flex flex-col py-2">
              <div className="flex flex-row p-1 justify-center items-center">
                <Label htmlFor="email" className="text-left w-24">
                  Email
                </Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="flex flex-row p-1 justify-between items-center">
                <Label htmlFor="password" className="text-left w-24">
                  Password
                </Label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLoginDialogOpen(false);
                  setIsPasswordResetDialogOpen(true);
                  setStatus("");
                }}
                className="ml-auto p-1 inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <DialogFooter>
              <div className="w-full">
                <div className="flex flex-row justify-around">
                  <Button
                    onClick={handleSignInWithCredentials}
                    type="submit"
                    className="w-full"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={handleSignInWithGoogle}
                    variant="outline"
                    className="w-full ml-1"
                  >
                    Login with Google
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <button
                    className="underline"
                    onClick={() => {
                      setIsLoginDialogOpen(false);
                      setIsSignUpDialogOpen(true);
                    }}
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isSignUpDialogOpen} onOpenChange={setIsSignUpDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Sign Up</DialogTitle>
              <DialogDescription>
                Enter your details to create an account
              </DialogDescription>
            </DialogHeader>
            <div className="border border-slate-100"></div>
            <div className="flex flex-col py-2">
              <div className="flex flex-row p-1 justify-center items-center">
                <Label htmlFor="email" className="text-left w-24">
                  Email
                </Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="flex flex-row p-1 justify-between items-center">
                <Label htmlFor="password" className="text-left w-24">
                  Password
                </Label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="flex flex-row p-1 justify-between items-center">
                <Label htmlFor="confirm-password" className="text-left w-24">
                  Confirm Password
                </Label>
                <Input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={handleSignUpWithCredentials}
                type="submit"
                className="w-full"
              >
                Sign Up
              </Button>
              <Button
                onClick={handleSignUpWithGoogle}
                variant="outline"
                type="submit"
                className="w-full"
              >
                Sign Up with Google
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog
          open={isPasswordResetDialogOpen}
          onOpenChange={setIsPasswordResetDialogOpen}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>
                Enter your email address, and we will send you a link to reset
                your password.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col py-2">
              <div className="flex flex-row p-1 justify-center items-center">
                <Label htmlFor="reset-email" className="text-left w-24">
                  Email
                </Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="reset-email"
                  type="email"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>
            {status && (
              <p
                className={`text-center mt-2 ${status === "Password reset email sent!" ? "text-green-600" : "text-red-600"}`}
              >
                {status}
              </p>
            )}
            <DialogFooter>
              <Button onClick={handlePasswordResetRequest} className="w-full">
                Send Reset Link
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog
          open={isVerificationDialogOpen}
          onOpenChange={setIsVerificationDialogOpen}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Verify Your Email</DialogTitle>
              <DialogDescription>
                Please enter the 6-digit code sent to {email}
              </DialogDescription>
            </DialogHeader>
            <div className="border border-slate-100"></div>
            <div className="flex flex-col py-2">
              <div className="flex flex-row p-1 justify-center items-center">
                <Label htmlFor="verification-code" className="text-left w-36">
                  Verification Code
                </Label>
                <Input
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  id="verification-code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  required
                />
              </div>
            </div>
            {status && (
              <p
                className={`text-center mt-2 ${status.includes("successful") ? "text-green-600" : "text-red-600"}`}
              >
                {status}
              </p>
            )}
            <div className="text-center mt-4">
              {timer > 0 ? (
                <p>
                  Resend code in {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, "0")}
                </p>
              ) : (
                <Button
                  variant="outline"
                  onClick={handleResendCode}
                  className="mt-2"
                >
                  Resend Verification Code
                </Button>
              )}
            </div>
            <DialogFooter>
              <div className="w-full flex justify-between">
                <Button onClick={handleVerifyCode} className="w-full mr-2">
                  Verify
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsVerificationDialogOpen(false);
                    setIsSignUpDialogOpen(true);
                  }}
                  className="w-full"
                >
                  Edit Email
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
export default ToggleSingInSignUpForm;
