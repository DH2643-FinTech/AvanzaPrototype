"use client";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/dialog";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [status, setStatus] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setStatus("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/account/user/password/password-change", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password");
      }

      setStatus("Password reset successful!");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error("Error resetting password:", error);
      setStatus("Failed to reset password. Please try again.");
    }
  };

  useEffect(() => {
    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      event.preventDefault();
      
      try {
        const response = await fetch("/api/check-session");
        if (response.ok) {
          router.push("/");
        } else {
          event.returnValue = ""; // Prompt the user to confirm the tab closure
        }
      } catch (error) {
        console.error("Error checking session:", error);
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [router]);

  function changeDialogStatus (){
    setIsDialogOpen(false);
    router.push("/");
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={changeDialogStatus} >
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Reset Your Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </div>
          {status && (
            <p className={`text-center mt-2 ${status === "Password reset successful!" ? "text-green-600" : "text-red-600"}`}>
              {status}
            </p>
          )}
          <DialogFooter>
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};


export default function PasswordResetPage() {

  return( 
  <Suspense>

  <PasswordReset />
  </Suspense>);
}
