'use client'
import { useState } from "react";

const UploadForm = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append("image", image);

      const res = await fetch("/api/profileImage", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Image uploaded successfully!");
      } else {
        alert("Error uploading image.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="image" onChange={handleImageChange} />
      <button type="submit">Upload Image</button>
    </form>
  );
};

export default UploadForm;
