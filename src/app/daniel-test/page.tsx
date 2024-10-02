'use client';
import React from 'react'
import { useState } from 'react';
import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import { useAppDispatch } from '@/src/lib/hooks/useAppDispatch'

import { fetchCompanyDetails, fetchCompanyIdFromServer } from '../../lib/features/company/companyAPI'
import Email from 'next-auth/providers/email';

const ApiTest = () => {

  const dispatch = useAppDispatch();

  const fetchCompanyDetailsHandler = (symbol: string) => {
    // dispatch(fetchCompanyDetails("symbol"))
    dispatch(fetchCompanyIdFromServer({name: undefined, randomCount: undefined}))
  }


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setSuccess('');

      const res = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });

      console.log(res)

      if (res.ok) {
          setSuccess('User created successfully!');
          setEmail('');
          setPassword('');
      } else {
          // const errorData = await res.json();
          // setError(errorData.message || 'An error occurred.');
          console.log("error")
      }
  };



  // return (
  //   <div>
  //       <button className='borde w-10 h-10 bg-slate-800' onClick={()=> fetchCompanyDetailsHandler("AAPL")
  //       }>Call API Test</button>
  //   </div>
  // )

  return (
    <div>
    <h2>Create Account</h2>
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <button type="submit">Register</button>
    </form>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {success && <p style={{ color: 'green' }}>{success}</p>}
</div>
  )
}

export default ApiTest