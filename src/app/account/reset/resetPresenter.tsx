"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PasswordResetView from './resetView';

const PasswordResetPresenter = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  return (
    <PasswordResetView
      newPassword={newPassword}
      setNewPassword={setNewPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      status={status}
      handleSubmit={handleSubmit}
    />
  );
};

export default PasswordResetPresenter;
