import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}
const Main: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={cn("w-full h-full min-h-[calc(100vh-176px)]", className)}>
      {children}
    </div>
  );
};

export default Main;
