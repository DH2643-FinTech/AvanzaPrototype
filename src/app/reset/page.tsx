"use client";

import { useState, useEffect } from 'react';

import { useSearchParams, useRouter } from 'next/navigation'; // Import useSearchParams and useRouter

const PasswordResetPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const searchParams = useSearchParams(); 
  const router = useRouter(); 
  const token = searchParams.get('token');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setStatus("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('/api/password-change', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      setStatus('Password reset successful!');
      router.push('/login'); 
    } catch (error) {
      console.error('Error resetting password:', error);
      setStatus('Failed to reset password');
    }
  };

  return (
    <div>
      <h1>Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default PasswordResetPage;