
import { useSession } from "next-auth/react";

export interface LoginProps {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    status: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    handleSignIn: (credProps: { method: string }) => Promise<void>;
    handleSignUp: (credProps: { method: string }) => Promise<void>;
    handlePasswordResetRequest: (e: React.FormEvent) => Promise<void>;
    isLoginDialogOpen: boolean;
    setIsLoginDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSignUpDialogOpen: boolean;
    setIsSignUpDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isPasswordResetDialogOpen: boolean;
    setIsPasswordResetDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isVerificationDialogOpen: boolean;
    setIsVerificationDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    verificationCode: string;
    setVerificationCode: React.Dispatch<React.SetStateAction<string>>;
    handleVerifyCode: () => Promise<void>;
    handleResendCode: () => Promise<void>;
    timer: number;
    canResend: boolean;
    confirmPassword: string;
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  }
  
  // Interface for Search Bar Props
  export interface SearchBarProps {
    search: string;
    showResults: boolean;
    filteredResults: { id: string; name: string }[];
    handleKeyDown: (e: React.KeyboardEvent) => void;
    handleSelect: (companyName: string) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  // Interface for NavbarPresenter Props
  export interface NavbarPresenterProps {
    sessionData: ReturnType<typeof useSession>;
    loginProps: LoginProps;
    searchBarProps: SearchBarProps;
  }
  