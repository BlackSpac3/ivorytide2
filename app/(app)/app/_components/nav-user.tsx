"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import UserAvatar from "./user-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

const NavUser = () => {
  const { data: session, status } = useSession();
  const [signingOut, setSigningOut] = useState(false);

  if (status === "loading") {
    return <Skeleton className="size-10 rounded-full" />;
  }

  if (!session) return null;

  const firstName = session.user.name.split(" ")[0] ?? "Guest";
  const lastName = session.user.name.split(" ")[1] ?? "";

  const logout = async () => {
    setSigningOut(true);
    await signOut();
    setSigningOut(false);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        {/* <Button> */}
        <UserAvatar
          firstName={firstName}
          lastName={lastName}
          className="size-10"
        />
        {/* </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserAvatar
              firstName={firstName}
              lastName={lastName}
              className="w-8 h-8 min-w-8"
            />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {firstName} {lastName}
              </span>
              <span className="truncate text-xs text-muted-foreground ">
                {session.user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          disabled={signingOut}
          className="justify-between text-muted-foreground">
          {signingOut ? "Signing out..." : "Sign out"} <LogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavUser;
