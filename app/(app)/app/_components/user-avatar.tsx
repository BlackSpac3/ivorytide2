import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  firstName: string;
  lastName: string;
  className?: string;
}
const UserAvatar: React.FC<Props> = ({ firstName, lastName, className }) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  return (
    <Avatar className={cn("h-16 w-16", className)}>
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
