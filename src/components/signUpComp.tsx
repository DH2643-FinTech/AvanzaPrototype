// components/LoginButton.js
"use client";
import { useState } from "react";

import * as React from "react";
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

export const SignUpComp = () => {
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
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setSuccess("");
  
      const data = new FormData(e.currentTarget as HTMLFormElement);
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
        // console.log(data);
      } else {
        console.log("error");
      }
    };
  
    return (
      <div>
        <form
          className="min-w-[500px] flex-col flex py-4 border border-blue-400 justify-center items-center"
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
            className="border border-slate-300 w-[500px] py-2 mt-2 bg-blue-400 text-white font-bold"
            type="submit"
          >
            Register
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
    );
  };