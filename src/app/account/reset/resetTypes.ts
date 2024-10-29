export interface PasswordResetViewProps {
    newPassword: string;
    setNewPassword: React.Dispatch<React.SetStateAction<string>>;
    confirmPassword: string;
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
    status: string;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
  }
  