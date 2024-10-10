import Link from "next/link"

import { Button } from "@/src/components/shadcn/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/shadcn/card"
import { signIn, signOut } from "next-auth/react";
import { Input } from "@/src/components/shadcn/input"
import { Label } from "@/src/components/shadcn/label"
import { useState } from "react"
export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."

export const SignInForm = ()=> {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSignInWithGoogle = () => {
        console.log("Sign up with Google");
        const response = signIn("google");
        console.log("success", response);
    }

    const handleSignInWithCredentials = async () => {
        const signInResponse = await signIn("credentials", {
            email: email as string,
            password: password as string,
            redirect: false,
          });
      
          if (signInResponse && !signInResponse.error) {
            setEmail("");
            setPassword("");
            console.log("success", signInResponse);
          } else {
            // const errorData = await res.json();
            // setError(errorData.message || 'An error occurred.');
            console.log("error");
          }
    }


  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input value={password} onChange={(e)=>setPassword(e.target.value)} id="password" type="password" required />
          </div>
          <Button onClick={handleSignInWithCredentials} type="submit" className="w-full">
            Login
          </Button>
          <Button onClick={handleSignInWithGoogle} variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
