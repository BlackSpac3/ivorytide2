import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  status: string;
  className?: string;
}
const StatusIndicator: React.FC<Props> = ({ status, className }) => {
  return (
    <div
      className={cn(
        "size-2 min-w-2 rounded-full bg-muted",
        status.toLocaleLowerCase() === "invited" && "bg-blue-500",
        status.toLocaleLowerCase() === "confirmed" && "bg-green-500",
        status.toLocaleLowerCase() === "declined" && "bg-red-400",
        className
      )}
    />
  );
};

export default StatusIndicator;
