"use client";

import { UploadFormViewProps } from "./uploadTypes";

const UploadFormView = ({
  handleImageChange,
  handleSubmit,
  status,
}: UploadFormViewProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="image" onChange={handleImageChange} />
      <button type="submit">Upload Image</button>
      {status && <p>{status}</p>}
    </form>
  );
};

export default UploadFormView;
