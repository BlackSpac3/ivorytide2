"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { IGuest } from "@/lib/models/guest.model";
import React from "react";
import UserAvatar from "../../../_components/user-avatar";
import { formatDate } from "@/lib/utils/helpers";
import StatusIndicator from "../status-indicator";
import GuestDropdownMenu from "../../../_components/guest-dropdown-menu";

const GuestTable = ({ guests }: { guests: IGuest[] }) => {
  return guests.map((guest) => (
    <TableRow key={guest._id as string}>
      {/* Name */}
      <TableCell className="py-3 pl-4  max-w-[260px] truncate">
        <div className="flex items-center gap-3">
          <span>
            <UserAvatar
              firstName={guest.first_name}
              lastName={guest.last_name}
              className="size-10"
            />
          </span>
          <span className="font-medium capitalize">
            {guest.title} {guest.last_name} {guest.first_name}
          </span>
        </div>
      </TableCell>
      {/* Status */}
      <TableCell className="">
        <div className="flex items-center gap-1 capitalize text-muted-foreground">
          <StatusIndicator status={guest.status} />
          {guest.status}
        </div>
      </TableCell>
      {/* Invited By */}
      <TableCell className="text-muted-foreground">
        <div className="justify-end flex px-2 items-center ">
          {typeof guest.invitedBy !== "string" &&
            "last_name" in guest.invitedBy &&
            "first_name" in guest.invitedBy && (
              <span className="flex items-center gap-2">
                <span className="text-sm">
                  Invited by {guest.invitedBy?.first_name}{" "}
                  {guest.invitedBy?.last_name} - {formatDate(guest.createdAt)}
                </span>
                <span>
                  <UserAvatar
                    firstName={guest.invitedBy?.first_name}
                    lastName={guest.invitedBy?.last_name}
                    className="size-8"
                  />
                </span>
              </span>
            )}
        </div>
      </TableCell>
      {/* Actions */}
      <TableCell>
        <div className="justify-end flex px-2 items-center ">
          <div className="flex justify-end  items-center gap-2 flex-nowrap !w-fit !max-w-fit">
            <GuestDropdownMenu
              guest={guest}
              actions={["view", "delete", "edit"]}
            />
          </div>
        </div>
      </TableCell>
    </TableRow>
  ));
};

export default GuestTable;
