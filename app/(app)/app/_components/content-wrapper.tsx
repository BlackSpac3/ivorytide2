import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}
const ConetntWrapper: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={cn("container max-w-7xl  mx-auto px-8", className)}>
      {children}
    </div>
  );
};

export default ConetntWrapper;
