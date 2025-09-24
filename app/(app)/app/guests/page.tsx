import { Suspense } from "react";
import GuestsPage from "./_page/guests-page";

export const metadata = {
  title: "Guests",
  description:
    "Invite, track, and manage all your wedding guests in one place.",
};
const page = () => {
  return (
    <Suspense>
      <GuestsPage />;
    </Suspense>
  );
};

export default page;
