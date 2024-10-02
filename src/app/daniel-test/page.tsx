"use client";
import React from "react";
import { useState } from "react";
import { useAppSelector } from "@/src/lib/hooks/useAppSelector";
import { useAppDispatch } from "@/src/lib/hooks/useAppDispatch";

import {
  fetchCompanyDetails,
  fetchCompanyIdFromServer,
} from "../../lib/features/company/companyAPI";

const ApiTest = () => {
  const dispatch = useAppDispatch();

  const fetchCompanyDetailsHandler = (symbol: string) => {
    dispatch(
      fetchCompanyDetails({
        name: "AAK",
        randomCount: 5,
        timePeriod: "one_month",
      })
    );
    // dispatch(fetchCompanyIdFromServer({name: undefined, randomCount: undefined}))
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const res = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    console.log(res);

    if (res.ok) {
      setSuccess("User created successfully!");
      setUsername("");
      setPassword("");
    } else {
      // const errorData = await res.json();
      // setError(errorData.message || 'An error occurred.');
      console.log("error");
    }
  };

  return (
    <div>
      <button
        className="borde w-10 h-10 bg-slate-800"
        onClick={() => fetchCompanyDetailsHandler("AAPL")}
      >
        Call API Test
      </button>
    </div>
  );

  //   return (
  //     <div>
  //     <h2>Create Account</h2>
  //     <form onSubmit={handleSubmit}>
  //         <div>
  //             <label htmlFor="username">Username:</label>
  //             <input
  //                 type="text"
  //                 id="username"
  //                 value={username}
  //                 onChange={(e) => setUsername(e.target.value)}
  //                 required
  //             />
  //         </div>
  //         <div>
  //             <label htmlFor="password">Password:</label>
  //             <input
  //                 type="password"
  //                 id="password"
  //                 value={password}
  //                 onChange={(e) => setPassword(e.target.value)}
  //                 required
  //             />
  //         </div>
  //         <button type="submit">Register</button>
  //     </form>
  //     {error && <p style={{ color: 'red' }}>{error}</p>}
  //     {success && <p style={{ color: 'green' }}>{success}</p>}
  // </div>
  //   )
};

export default ApiTest;
