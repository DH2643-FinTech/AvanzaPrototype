"use client";

import { PasswordResetViewProps } from "./resetTypes";
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
import { useState } from "react";
import { useRouter } from "next/navigation";

const PasswordResetView = ({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  status,
  handleSubmit,
}: PasswordResetViewProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const router = useRouter();

  const changeDialogStatus = () => {
    setIsDialogOpen(false);
    router.push("/");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={changeDialogStatus}>
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
            <p
              className={`text-center mt-2 ${
                status === "Password reset successful!" ? "text-green-600" : "text-red-600"
              }`}
            >
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

export default PasswordResetView;
