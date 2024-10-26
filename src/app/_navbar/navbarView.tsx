"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
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
import {AvanzaSearchBar, ToggleSingInSignUpForm, ProfileAvatar} from "@/components/custom";
import { NavbarPresenterProps } from "./navbarTypes";

const Navbar = (props: NavbarPresenterProps) => {

  const {sessionData: {data: session, status}} = props;

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
          <AvanzaSearchBar {...props.searchBarProps} />
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
              {...props.loginProps}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
