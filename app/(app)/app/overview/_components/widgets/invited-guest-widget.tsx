import { IGuest } from "@/lib/models/guest.model";
import React from "react";
import UserAvatar from "../../../_components/user-avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils/helpers";
import StatusIndicator from "../../../guests/_components/status-indicator";
import GuestDropdownMenu from "../../../_components/guest-dropdown-menu";
interface Props {
  guest: IGuest;
}
const InvitedGuestsWidget: React.FC<Props> = ({ guest }) => {
  return (
    <div className="bg-card rounded-lg border w-full p-4 space-y-6">
      <div className=" flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <UserAvatar
            firstName={guest.first_name}
            lastName={guest.last_name}
            className="size-10"
          />
          <div className="text-sm">
            <div className="capitalize font-medium">
              {guest.title} {guest.first_name} {guest.last_name}
            </div>
          </div>
        </div>

        <GuestDropdownMenu guest={guest} actions={["view", "edit", "delete"]} />
      </div>
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          {typeof guest.invitedBy !== "string" &&
            "last_name" in guest.invitedBy &&
            "first_name" in guest.invitedBy && (
              <Badge variant="secondary" className="rounded-full pl-1">
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-pink-500 to-blue-500"></div>

                <span className="font-normal">
                  {guest.invitedBy.first_name} {guest.invitedBy.last_name}
                </span>
              </Badge>
            )}

          <div className="text-muted-foreground text-sm">
            {formatDate(guest.createdAt)}
          </div>
        </div>

        <div>
          <div className="font-medium text-sm flex items-baseline gap-2 capitalize">
            <StatusIndicator status={guest.status} />
            <span>{guest.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitedGuestsWidget;
