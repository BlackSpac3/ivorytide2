import { IGuest } from "@/lib/models/guest.model";
import React from "react";
import UserAvatar from "../../../_components/user-avatar";
import { formatDate } from "@/lib/utils/helpers";
import { EyeOff } from "lucide-react";
import Widget from "../widget";
import GuestDialog from "../../../_components/guest-dialog";

const EmptyState = () => {
  return (
    <div className="w-full aspect-[3/1] flex items-center justify-center">
      <div className="text-sm space-y-2 text-center text-muted-foreground flex flex-col max-w-[200px] items-center">
        <EyeOff />
        <p>Guests who recently confirm your invite will appear here</p>
      </div>
    </div>
  );
};

interface Props {
  confirmedGuests: IGuest[];
}
const RecentConfirmedWidget: React.FC<Props> = ({ confirmedGuests }) => {
  return (
    <Widget title="Recently Confirmed">
      <div className="space-y-3">
        {confirmedGuests.length > 0 ? (
          confirmedGuests.map((guest, index) => (
            <div key={guest.first_name + index}>
              <GuestDialog mode="get" guest={guest}>
                <div className="flex group cursor-default items-center gap-2 border-b pb-3 last:border-b-0 last:pb-0 text-sm">
                  <UserAvatar
                    firstName={guest?.first_name}
                    lastName={guest?.last_name}
                    className="size-10"
                  />
                  <div className="text-sm">
                    <h3 className="capitalize font-medium group-hover:underline">
                      {guest.title} {guest?.first_name} {guest?.last_name}
                    </h3>
                    <p className="text-muted-foreground">
                      Confirmed on {formatDate(guest?.updatedAt)}
                    </p>
                  </div>
                </div>
              </GuestDialog>
            </div>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </Widget>
  );
};

export default RecentConfirmedWidget;
