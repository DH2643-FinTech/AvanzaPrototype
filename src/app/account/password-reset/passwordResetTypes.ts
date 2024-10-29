export interface PasswordResetViewProps {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    status: string;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  }
  