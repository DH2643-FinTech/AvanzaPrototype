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
import { LoginProps } from "@/app/_navbar/navbarTypes";
import { useEffect, useState } from "react";
import {SignUpError, SendVerificationCodeError, SignInError} from "@/app/_navbar/navbarPresenter";
import { set } from "date-fns";

const ToggleSingInSignUpForm = (props: LoginProps) => {
  
  const {
    handleSignIn,
    handleSignUp,
    handlePasswordResetRequest,
    handleVerifyCode,
    handleResendCode,
  } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = useState(false);
  const [isPasswordResetDialogOpen, setIsPasswordResetDialogOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
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

    const handlePasswordResetRequestACB = async (email: string) => {
      try{

        setStatus("");
        const ok = await handlePasswordResetRequest(email);
        if(!ok){
          setStatus("Failed to send password reset email. Please check the email address and try again.");
          return;
        }
        setStatus("Password reset email sent! If you do not receive the email, please check your email address for any errors.");  
      } catch (error) {
        setStatus("An unexpected error occurred while sending the password reset email. Please try again.");
      }

    }

    const handleSignInACB = async(method: string) =>{
      try{

        const ok = await handleSignIn({method: method, email, password});
        if(ok){
          setEmail("");
          setPassword("");
        }
      } catch (error) {
        if(error instanceof SignInError){
          setStatus(error.message);
        }
        else{
          setStatus("An unexpected error occurred during sign in. Please try again.");
        }

      }
    }


    const handleVerifyCodeACB = async (e: React.FormEvent) =>{
      const ok = await handleVerifyCode ({email, verificationCode});
      if (ok) {
        setStatus("Verification successful! You can now log in.");
        setIsVerificationDialogOpen(false);
      }
      else{
        setStatus("Invalid verification code. Please try again.");
      }
    }

    const handleResendCodeACB = async (e: React.FormEvent) => {
      try {
        const ok = await handleResendCode({email, password});
        if (ok) {
        setStatus(
          "Password reset email sent! If you do not receive the email, please check your email address for any errors."
        );
        setIsSignUpDialogOpen(false);
        setIsVerificationDialogOpen(true);
        }
        else{
          setStatus("Sign up failed. Please check your details and try again.");
        }
      } catch (error) {
        if (error instanceof SignUpError) {
          setStatus(error.message);
          setTimer(120);
          setCanResend(false);
        } else if (error instanceof SendVerificationCodeError) {
          setStatus(error.message);
        } else {
          setStatus("An unexpected error occurred. Please try again.");
        }
      }
    }

    const handleSignUpACB = async (method: string) => {
      try {
        const ok = await handleSignUp({method: method, email, password});
        if (!ok) {
          setStatus("Sign up failed. Please check your details and try again.");
          return;
        }
        setStatus(
          "Password reset email sent! If you do not receive the email, please check your email address for any errors."
        );
        setIsSignUpDialogOpen(false);
        setIsVerificationDialogOpen(true);
      } catch (error) {
        if (error instanceof SignUpError) {
          setStatus(error.message);
        } else {
          setStatus("An error occurred during the sign-up process. Please try again.");
        }
      }
    }

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
                    onClick={()=>handleSignInACB("credentials")}
                    type="submit"
                    className="w-full"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={()=>handleSignInACB("google")}
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
                onClick={()=>handleSignUpACB("credentials")}
                type="submit"
                className="w-full"
              >
                Sign Up
              </Button>
              <Button
                onClick={()=>handleSignUpACB("google")}
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
              <Button onClick={() => handlePasswordResetRequestACB(email)} className="w-full">
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
                  onClick={handleResendCodeACB}
                  className="mt-2"
                >
                  Resend Verification Code
                </Button>
              )}
            </div>
            <DialogFooter>
              <div className="w-full flex justify-between">
                <Button onClick={handleVerifyCodeACB} className="w-full mr-2">
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
