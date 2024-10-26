"use client";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import AvanzaSearchBar from "@/components/ui/avanzaSearchBar";
import ToggleSingInSignUpForm from "../../components/ui/toggleSingInSignUpForm";

// import { useAppDispatch, useAppSelector } from "../../lib/model/store";
// import { useEffect } from "react";
// import { fetchAllCompanyIds } from "../../lib/model/slices/company/companyAPI";
// import {
//   setCompanies,
//   setSearchParamName,
// } from "../../lib/model/slices/company/companySlice";
// import { useRouter } from "next/navigation";

import ProfileAvatar from "../../components/ProfileAvatar";

const Navbar = (props: any) => {

  //#region DEAD CODE

  // const { data: session, status } = useSession();
  // const companyIds = useAppSelector((state) => state.company.companiesIds);
  // const router = useRouter();

  // const dispatch = useAppDispatch();
  // const handleSearchParam = (searchParam: any) => {
  //   dispatch(setSearchParamName(searchParam));
  //   const id = companyIds.find((company: { name: string; _id: string }) => company.name === searchParam)?._id;
  //   router.push(`/company/stock/${id}`);
  // };

  // const handleSignIn = async (credProps: any) => {
  //   if (credProps.method === "google") {
  //     const response = await signIn("google");
  //     return response;
  //   } else {
  //     const signInResponse = await signIn("credentials", {
  //       email: credProps.email,
  //       password: credProps.password,
  //       redirect: false,
  //     });
  //     return signInResponse;
  //   }
  // };

  // const handleSignUp = async (credProps: any) => {
  //   if (credProps.method === "google") {
  //     const response = await signIn("google");
  //     return response;
  //   } else {
  //     const res = await fetch("/api/account/register", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         email: credProps.email,
  //         password: credProps.password,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     return res;
  //   }
  // };

  // useEffect(() => {
  //   const storedCompanyIds = localStorage.getItem("allCompanyIds");
  //   if (!storedCompanyIds) {
  //     dispatch(fetchAllCompanyIds());
  //   } else {
  //     dispatch(setCompanies(JSON.parse(storedCompanyIds)));
  //   }
  // }, []);
  //#endregion

  const {sessionData: {data: session, status}, setSearchParam} = props;

  return (
    <header className="border-b flex items-center">
      <div className="w-64 p-4 flex-shrink-0">
        <Link
          href="/"
          className="text-2xl font-bold text-primary whitespace-nowrap"
        >
          FinanceTracker
        </Link>
      </div>
      <div className="flex-grow flex items-center justify-between p-4">
        <div className="flex-grow max-w-3xl">
          <AvanzaSearchBar setSearchParam={setSearchParam} />
        </div>
        <div className="flex items-center">
          {status === "authenticated" ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>No new notifications</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="ml-2">
                    {session.user?.name || session.user?.email}{" "}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ProfileAvatar />
            </>
          ) : (
            <ToggleSingInSignUpForm
              // signIn={signIn}
              // signUp={signUp}
              {...props.loginProps}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
