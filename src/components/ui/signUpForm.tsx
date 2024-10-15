// import Link from "next/link";

// import { Button } from "@/src/components/shadcn/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/src/components/shadcn/card";
// import { Input } from "@/src/components/shadcn/input";
// import { Label } from "@/src/components/shadcn/label";
// import { useState } from "react";
// import { signIn, signOut } from "next-auth/react";

// export const description =
//   "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

// //TODO: DEPRECATED - DO NOT USE

// export const SignUp = (props: any) => {
//   const [name, setName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignUpWithGoogle = () => {
//     console.log("Sign up with Google");
//     const response = signIn("google");
//     console.log("success", response);
//   };

//   const handleSignUpWithCredentials = async () => {
//     console.log("Sign up with credentials");
//     const res = await fetch("/api/register", {
//       method: "POST",
//       body: JSON.stringify({
//         email: email,
//         password: password,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (res.ok) {
//       const data = await res.json();
//       console.log(data);
//     } else {
//       console.log("error");
//     }
//   };

//   return (
//     <Card className="mx-auto max-w-sm">
//       <CardHeader>
//         <CardTitle className="text-xl">Sign Up</CardTitle>
//         <CardDescription>
//           Enter your information to create an account
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="grid gap-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="first-name">First name</Label>
//               <Input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 id="first-name"
//                 placeholder="Max"
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="last-name">Last name</Label>
//               <Input
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 id="last-name"
//                 placeholder="Robinson"
//                 required
//               />
//             </div>
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               id="email"
//               type="email"
//               placeholder="m@example.com"
//               required
//             />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               id="password"
//               type="password"
//             />
//           </div>
//           <Button
//             onClick={handleSignUpWithCredentials}
//             type="submit"
//             className="w-full"
//           >
//             Create an account
//           </Button>
//           <Button
//             onClick={handleSignUpWithGoogle}
//             variant="outline"
//             className="w-full"
//           >
//             Sign up with Google
//           </Button>
//         </div>
//         <div className="mt-4 text-center text-sm">
//           Already have an account?{" "}
//           <Link href="#" className="underline">
//             Sign in
//           </Link>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };
