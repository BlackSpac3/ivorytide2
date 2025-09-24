import React, { Suspense } from "react";
import SignInPage from "./_page/sign-in-page";

export const metadata = {
  title: "Signin",
  description: "Signin to your account and start planning your wedding",
};
const page = () => {
  return (
    <Suspense>
      <SignInPage />
    </Suspense>
  );
};

export default page;
