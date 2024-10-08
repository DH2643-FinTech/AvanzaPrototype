import React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import AccountView from "@/src/views/AccountView/AccountView";

const SignIn = async () => {
  return <AccountView />;
};

export default SignIn;
