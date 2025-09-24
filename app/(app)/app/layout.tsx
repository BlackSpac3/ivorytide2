import React from "react";
import Navbar from "./_components/navbar";
import AppFooter from "./_components/app-footer";

interface Props {
  children: React.ReactNode;
}
const layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full bg-muted dark:bg-background ">{children}</div>
      <AppFooter />
    </div>
  );
};

export default layout;
