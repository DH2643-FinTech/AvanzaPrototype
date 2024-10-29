"use client";

import { useState } from "react";
import UploadFormView from './uploadView';

const UploadFormPresenter = () => {
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    if (image) {
      formData.append("image", image);

      try {
        const res = await fetch("/api/profileImage", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          setStatus("Image uploaded successfully!");
        } else {
          setStatus("Error uploading image.");
        }
      } catch (error) {
        console.error("Error during image upload:", error);
        setStatus("Error uploading image.");
      }
    }
  };

  return (
    <UploadFormView 
      handleImageChange={handleImageChange} 
      handleSubmit={handleSubmit} 
      status={status} 
    />
  );
};

export default UploadFormPresenter;
