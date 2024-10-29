"use client";

import { PasswordResetViewProps } from "./passwordResetTypes";

const PasswordResetView = ({ email, setEmail, status, handleSubmit }: PasswordResetViewProps) => {
  return (
    <div>
      <h1>Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default PasswordResetView;
