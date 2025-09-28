"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GuestFormDefault } from "@/schemas/guest.schema";
import Main from "../../_components/main";
import PageHeader from "../../_components/page-header";
import ConetntWrapper from "../../_components/content-wrapper";
import StatsWidget from "../_components/widgets/stats-widget";
import RecentConfirmedWidget from "../_components/widgets/recent-confirmed-widget";
import InviteColumn from "../_components/invite-column";
import GuestDialog from "../../_components/guest-dialog";
import { useFetchOverviewdata } from "@/lib/hooks/overview.query";
import { IOverview } from "@/lib/types/api.types";

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

  const { data, isPending } = useFetchOverviewdata({
    enabled: !!session?.user?.id,
  });

  const stats: IOverview = {
    guests: data?.guests ?? 0,
    invited: data?.invited ?? 0,
    confirmed: data?.confirmed ?? 0,
    declined: data?.declined ?? 0,
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
        ) : stats.guests === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex md:flex-row flex-col items-start gap-5">
            <div className="grid grid-cols-1 w-full md:max-w-sm gap-5">
              <StatsWidget stats={stats} />

              <RecentConfirmedWidget />
            </div>

            <InviteColumn />
          </div>
        )}
      </ConetntWrapper>
    </Main>
  );
};

export default OverviewPage;
