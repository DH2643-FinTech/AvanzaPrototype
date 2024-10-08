// components/LoginButton.js
"use client";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

export default function BasicTextFields() {
  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" />
    </Box>
  );
}

export const GoogleLogInButton = () => {
  const handleSignIn = () => {
    const response = signIn("google");
    console.log("success", response);
  };

  return (
    <div className="flex min-w-[500px] justify-center items-center">
      <button
        onClick={handleSignIn}
        className="flex items-center w-[500px] justify-center px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm shadow-md transition duration-300 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          width="24"
          height="24"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 256 262"
          className="mr-3"
        >
          <path
            d="M255.68 133.17c0-10.73-.87-21.09-2.47-31.09H130.38v58.8h70.04c-3.04 15.68-11.9 28.9-24.99 37.82v31.36h40.2c23.53-21.7 37.15-53.68 37.15-96.9Z"
            fill="#4285F4"
          />
          <path
            d="M130.38 261.36c33.73 0 62.01-11.23 82.69-30.46l-40.2-31.36c-11.08 7.39-25.2 11.74-42.48 11.74c-32.66 0-60.3-22.03-70.19-51.62H17.1v32.46c20.62 40.37 63.32 69.24 113.28 69.24Z"
            fill="#34A853"
          />
          <path
            d="M60.19 159.66c-2.53-7.39-3.97-15.22-3.97-23.66s1.44-16.27 3.97-23.66V80.88H17.1c-7.93 15.83-12.5 33.64-12.5 55.12s4.57 39.29 12.5 55.12l43.09-31.46Z"
            fill="#FBBC05"
          />
          <path
            d="M130.38 51.84c18.41 0 34.9 6.35 47.93 18.7l35.94-35.94C192.38 12.62 164.1 0 130.38 0C80.42 0 37.72 28.88 17.1 69.24l43.09 31.46c9.89-29.59 37.53-51.62 70.19-51.62Z"
            fill="#EA4335"
          />
        </svg>
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};


export const CredentialAuthButton = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  //TODO do this properly, this is just a test
  const handleRegister = async (e: Event) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
    } else {
      console.log("error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const data = new FormData(e.currentTarget as HTMLFormElement);

    const signInResponse = await signIn("credentials", {
      email: email as string,
      password: password as string,
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      setSuccess("User logged in successfully!");
      setEmail("");
      setPassword("");
      console.log("success", signInResponse);
    } else {
      // const errorData = await res.json();
      // setError(errorData.message || 'An error occurred.');
      console.log("error");
    }
  };

  return (
    <div>
      <form
        className="min-w-[500px] flex-col flex py-4 justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="mb-2">
          <TextField
            sx={{ width: 500 }}
            onChange={(e) => setEmail(e.target.value)}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
        </div>
        <div>
          <FormControl sx={{ width: 500 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              onChange={(e) => setPassword(e.target.value)}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
        <button
          className="border border-slate-300 w-[500px] py-2 mt-12 bg-green-400 text-white font-bold"
          type="submit"
        >
          Sign in
        </button>
        <button
          className="border border-slate-300 w-[500px] py-2 mt-2 bg-blue-400 text-white font-bold"
          onClick={(e) => handleRegister(e as any)}
        >
          Register
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg"
    >
      Sign out
    </button>
  );
};
