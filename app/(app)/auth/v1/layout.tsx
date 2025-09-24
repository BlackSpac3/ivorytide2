import Logo from "@/app/(client)/_components/Logo";
import { Separator } from "@/components/ui/separator";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="grid grid-cols-1 h-dvh justify-center p-2 lg:grid-cols-2 text-zinc-100">
        <div className="bg-[url('/images/aebanner.jpg')] overflow-hidden bg-cover bg-no-repeat bg-center grayscale relative order-1 hidden h-full rounded-3xl lg:flex">
          <div className="h-full flex flex-col justify-between items-start p-10">
            <div className="space-y-1">
              <div className="flex items-center flex-col gap-y-1">
                <Logo className="w-10 h-auto filter brightness-0 invert" />
                <h1 className="text-sm font-medium uppercase tracking-wide">
                  Studio
                </h1>
              </div>
            </div>

            <div className="flex w-full justify-between">
              <div className="flex-1 space-y-1">
                <h2 className="font-medium ">Keep track with ease</h2>
                <p className="text-sm">
                  Monitor invitations and RSVPs at a glance. See who’s
                  confirmed, declined, or still deciding.
                </p>
              </div>
              <Separator
                orientation="vertical"
                className="mx-3 !h-auto bg-zinc-100 "
              />
              <div className=" flex-1 space-y-1">
                <h2 className="font-medium">Stay in control</h2>
                <p className="text-sm">
                  Manage guest lists effortlessly and never lose track of your
                  special day’s details.
                </p>
              </div>
            </div>
          </div>
          <div className=" absolute inset-0 bg-zinc-900/55 -z-1 rounded-3xl"></div>
        </div>
        <div className="min-w-full order-2 flex h-full">{children}</div>
      </div>
    </div>
  );
};

export default layout;
