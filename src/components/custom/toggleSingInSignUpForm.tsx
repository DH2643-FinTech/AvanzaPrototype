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
import { LoginProps } from "@/app/_navbar/navbarTypes";


const ToggleSingInSignUpForm = (props: LoginProps) => {
  
  const {
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
    setConfirmPassword
  } = props;

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
                    onClick={()=>handleSignIn({method: "credentials"})}
                    type="submit"
                    className="w-full"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={()=>handleSignIn({method: "google"})}
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
                onClick={()=>handleSignUp({method: "credentials"})}
                type="submit"
                className="w-full"
              >
                Sign Up
              </Button>
              <Button
                onClick={()=>handleSignUp({
                  method: "google",
                })}
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
