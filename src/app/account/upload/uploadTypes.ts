export interface UploadFormViewProps {
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    status: string | null;
  }
  