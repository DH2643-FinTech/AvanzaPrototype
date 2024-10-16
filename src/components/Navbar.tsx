"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Bell, ChevronDown } from "lucide-react";
import { Button } from "@/src/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/shadcn/dropdown-menu";
import AvanzaSearchBar from "@/src/components/ui/avanzaSearchBar";



import ToggleSingInSignUpForm from "./ui/toggleSingInSignUpForm";

const Navbar = () => {
  const { data: session, status } = useSession();

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
          {/* <Searchbar /> */}

        <AvanzaSearchBar/>
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
            </>
          ) : (
            // <Link href="/sign-in" passHref>
            //   <Button variant="ghost">Sign In</Button>
            // </Link>

            <ToggleSingInSignUpForm/>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
