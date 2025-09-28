import React from "react";
import InvitedGuestsWidget from "./widgets/invited-guest-widget";
import { PartyPopper } from "lucide-react";
import { useFetchGuests } from "@/lib/hooks/guest.query";

const EmptyState = () => {
  return (
    <div className="w-full h-[240px] flex items-center justify-center lg:col-span-2">
      <div className="max-w-xs flex flex-col items-center gap-2 text-center">
        <PartyPopper className="w-10 h-10 text-muted-foreground" />
        <h1 className="text-muted-foreground font-medium">
          No pending invites, all your invited guests have either confirmed or
          declined
        </h1>
      </div>
    </div>
  );
};

const InviteColumn = () => {
  const { data, isPending } = useFetchGuests({
    page: 1,
    pageSize: 10,
    statuses: ["invited"],
  });

  const invitedGuests = data?.guests ?? [];
  return (
    <div className="space-y-4 w-full">
      <h3 className="text-sm font-medium">Invites</h3>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
          {invitedGuests.length > 0 ? (
            invitedGuests.map((guest, index) => (
              <div key={guest.first_name + index} className="w-full">
                <InvitedGuestsWidget guest={guest} />
              </div>
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      )}
    </div>
  );
};

export default InviteColumn;
