import React from "react";
import { useSession, signIn } from "next-auth/react";
import WatchlistView from "./watchlistView";

const WatchListPresenter = () => {
  const { data: session, status } = useSession();

//   const handleSignIn = async (credProps: any) => {
//     if (credProps.method === "google") {
//       const response = await signIn("google");
//       // console.log("success", response);
//       return response;
//     } else {
//       const signInResponse = await signIn("credentials", {
//         email: credProps.email,
//         password: credProps.password,
//         redirect: false,
//       });
//       return signInResponse;
//     }
//   };

//   const handleSignUp = async (credProps: any) => {
//     if (credProps.method === "google") {
//       const response = await signIn("google");
//       // console.log("success", response);
//       return response;
//     } else {
//       const res = await fetch("/api/register", {
//         method: "POST",
//         body: JSON.stringify({
//           email: credProps.email,
//           password: credProps.password,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       return res;
//     }
//   };

  return (
    <WatchlistView
    //   signUp={handleSignUp}
    //   signIn={handleSignIn}
      status={status}
    />
  );
};

export default WatchListPresenter;
