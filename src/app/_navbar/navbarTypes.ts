
import { useSession } from "next-auth/react";

export interface LoginProps {
    // email: string;
    // setEmail: React.Dispatch<React.SetStateAction<string>>;
    // password: string;
    // setPassword: React.Dispatch<React.SetStateAction<string>>;
    // status: string;
    // setStatus: React.Dispatch<React.SetStateAction<string>>;
    handleSignIn: (credProps: { method: string, email: string, password: string }) => Promise<boolean>;
    handleSignUp: (credProps: { method: string, email: string, password: string }) => Promise<boolean>;
    handlePasswordResetRequest: (email: string) => Promise<boolean>;
    // isLoginDialogOpen: boolean;
    // setIsLoginDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    // isSignUpDialogOpen: boolean;
    // setIsSignUpDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    // isPasswordResetDialogOpen: boolean;
    // setIsPasswordResetDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    // isVerificationDialogOpen: boolean;
    // setIsVerificationDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    // verificationCode: string;
    // setVerificationCode: React.Dispatch<React.SetStateAction<string>>;
    handleVerifyCode: ({email, verificationCode}: {email: string, verificationCode: string}) => Promise<boolean>;
    handleResendCode: ({email, password}: {email: string, password: string}) => Promise<boolean>;
    // timer: number;
    // canResend: boolean;
    // confirmPassword: string;
    // setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  }
  
  export interface SearchBarProps {
    search: string;
    showResults: boolean;
    filteredResults: { id: string; name: string }[];
    handleKeyDown: (e: React.KeyboardEvent) => void;
    handleSelect: (companyName: string) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export interface NavbarPresenterProps {
    sessionData: ReturnType<typeof useSession>;
    loginProps: LoginProps;
    searchBarProps: SearchBarProps;
  }
  