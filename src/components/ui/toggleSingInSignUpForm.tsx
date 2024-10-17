import { signIn } from "next-auth/react";
import { useState } from "react";
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

const ToggleSingInSignUpForm = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = useState(false);

  const handleSignInWithGoogle = () => {
    const response = props.signIn({ method: "google" });
  };

  const handleSignInWithCredentials = async () => {
    const signInResponse = await props.signIn({
      mthod: "credentials",
      email: email,
      password: password,
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      setEmail("");
      setPassword("");
    } else {
      // console.log("error");
    }
  };
  const [isPasswordResetDialogOpen, setIsPasswordResetDialogOpen] = useState(false);


  const handlePasswordResetRequest = async () => {
  try {
    const res = await fetch("/api/password-reset", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    
    if (res.ok) {
     
      console.log("Password reset link sent");
    } else {
      
      console.log("Error sending password reset link");
    }
  } catch (error) {
    console.error("Request failed", error);
  }
};


  const handleSignUpWithCredentials = async () => {
    const response = await props.signUp({
      method: "credentials",
      email: email,
      password: password,
    });
    if (response.ok) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      const data = await response.json();
      // console.log(data);
    } else {
      alert("error");
    }
  };

  const handleSignUpWithGoogle = async () => {
    const response = await props.signUp({ method: "google" });
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
                      setIsLoginDialogOpen(false); // Close the login dialog
                      setIsSignUpDialogOpen(true); // Open the signup dialog
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
      </div>
      <Dialog open={isPasswordResetDialogOpen} onOpenChange={setIsPasswordResetDialogOpen}>
        <DialogContent className="sm:max-w-[425px]"> 
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Enter your email address, and we will send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col py-2">
            <div className="flex flex-row p-1 justify-center items-center">
              <Label htmlFor="reset-email" className="text-left w-24">Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="reset-email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handlePasswordResetRequest} className="w-full">
              Send Reset Link
            </Button>
          </DialogFooter>
        </DialogContent>
     </Dialog>
    </div>
  );
};

export default ToggleSingInSignUpForm;
