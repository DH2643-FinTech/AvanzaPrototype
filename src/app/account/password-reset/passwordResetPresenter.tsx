"use client";

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import PasswordResetView from './passwordResetView';

const PasswordResetPresenter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      emailjs.init('YOUR_EMAILJS_USER_ID'); // replace with your EmailJS user ID
      const response = await fetch('/api/account/user/password/password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate password reset');
      }

      const { resetLink } = await response.json();

      const templateParams = {
        to_email: email,
        reset_link: resetLink,
      };

      const serviceID = 'service_us3vp1r'; 
      const templateID = 'template_q029h7e'; 

      await emailjs.send(serviceID, templateID, templateParams);
      setStatus('Password reset email sent!');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setStatus('Failed to send password reset email');
    }
  };

  return (
    <PasswordResetView
      email={email}
      setEmail={setEmail}
      status={status}
      handleSubmit={handleSubmit}
    />
  );
};

export default PasswordResetPresenter;
