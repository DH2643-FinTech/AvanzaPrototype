// "use client"; // This ensures the component is client-side

// import { useState } from 'react';
// import emailjs from '@emailjs/browser';

// const PasswordResetForm = () => {
//   const [email, setEmail] = useState('');
//   const [status, setStatus] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Call the server-side route to get the reset link
//       const response = await fetch('/api/password-reset', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to initiate password reset');
//       }

//       const { resetLink } = await response.json();

//       const templateParams = {
//         to_email: email,
//         reset_link: resetLink,
//       };

//       const serviceID = '9Q600vKX9f68s1yZd';  
//       const templateID = 'template_q029h7e'; 

//       await emailjs.send(serviceID, templateID, templateParams);
//       setStatus('Password reset email sent!');
//     } catch (error) {
//       console.error('Error sending password reset email:', error);
//       setStatus('Failed to send password reset email');
//     }
//   };

//   return (
//     <div>
//       <h1>Reset Your Password</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//           required
//         />
//         <button type="submit">Send Reset Link</button>
//       </form>
//       {status && <p>{status}</p>}
//     </div>
//   );
// };

// export default PasswordResetForm;
"use client"; // Ensures this is a client component

import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';

const PasswordResetForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  // Initialize EmailJS with the actual public key

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      emailjs.init('9Q600vKX9f68s1yZd');
      const response = await fetch('/api/password-reset', {
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

      // Send the email using EmailJS
      await emailjs.send(serviceID, templateID, templateParams);
      setStatus('Password reset email sent!');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setStatus('Failed to send password reset email');
    }
  };

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

export default PasswordResetForm;
