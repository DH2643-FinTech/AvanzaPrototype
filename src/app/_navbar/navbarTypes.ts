
import { useSession } from "next-auth/react";

export interface LoginProps {
    handleSignIn: (credProps: { method: string, email: string, password: string }) => Promise<boolean>;
    handleSignUp: (credProps: { method: string, email: string, password: string }) => Promise<boolean>;
    handlePasswordResetRequest: (email: string) => Promise<boolean>;
    handleVerifyCode: ({email, verificationCode}: {email: string, verificationCode: string}) => Promise<boolean>;
    handleResendCode: ({email, password}: {email: string, password: string}) => Promise<boolean>;
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
  