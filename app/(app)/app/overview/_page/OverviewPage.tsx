"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GuestFormDefault } from "@/schemas/guest.schema";
import { useFetchGuests } from "@/lib/hooks/guest.query";
import Main from "../../_components/main";
import PageHeader from "../../_components/page-header";
import ConetntWrapper from "../../_components/content-wrapper";
import StatsWidget from "../_components/widgets/stats-widget";
import RecentConfirmedWidget from "../_components/widgets/recent-confirmed-widget";
import InviteColumn from "../_components/invite-column";
import GuestDialog from "../../_components/guest-dialog";

export type Stats = {
  guests: number;
  invited: number;
  confirmed: number;
  declined: number;
};

const EmptyState = () => {
  return (
    <div className="w-full h-[200px] py-10 flex items-center justify-center">
      <div className="flex flex-col items-center text-center max-w-xs gap-3 text-muted-foreground">
        <span>No invites yet, start by adding one using the button below </span>
        <GuestDialog mode="post" guest={GuestFormDefault}>
          <Button size="lg">
            <UserPlus /> Invite Guest
          </Button>
        </GuestDialog>
      </div>
    </div>
  );
};

const OverviewPage = () => {
  const { data: session } = useSession();

  const { data, isPending } = useFetchGuests({
    page: 1,
    pageSize: 10,
    statuses: [],
  });

  const invitedGuests =
    data?.guests.filter((guest) => guest.status === "invited") ?? [];

  const confirmedGuests =
    data?.guests.filter((guest) => guest.status === "confirmed") ?? [];

  const stats: Stats = {
    guests: data?.pagination.total_count ?? 0,
    invited: invitedGuests?.length,
    confirmed: confirmedGuests.length,
    declined:
      data?.guests.filter((guest) => guest.status === "declined").length ?? 0,
  };

  return (
    <Main>
      <PageHeader
        className="border-b-0"
        title={`Welcome, ${session?.user?.name.split(" ")[0] ?? "Guest"}`}
        desc="Your personalized hub to effortlessly manage your wedding invitations."
      />
      <ConetntWrapper className="py-5 space-y-3">
        {isPending ? (
          <div>Loading...</div>
        ) : data?.guests.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex md:flex-row flex-col items-start gap-5">
            <div className="grid grid-cols-1 w-full md:max-w-sm gap-5">
              <StatsWidget stats={stats} />

              <RecentConfirmedWidget confirmedGuests={confirmedGuests} />
            </div>

            <InviteColumn invitedGuests={invitedGuests} />
          </div>
        )}
      </ConetntWrapper>
    </Main>
  );
};

export default OverviewPage;
