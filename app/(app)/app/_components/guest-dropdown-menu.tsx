import { IGuest } from "@/lib/models/guest.model";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import GuestDialog from "./guest-dialog";
import DeleteGuestdialog from "./delete-guest-dialog";

const GuestDropdownMenu = ({
  guest,
  actions,
}: {
  guest: IGuest;
  actions: ("view" | "edit" | "delete")[];
}) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {actions.includes("view") && (
          <GuestDialog mode="get" guest={guest}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Eye /> View
            </DropdownMenuItem>
          </GuestDialog>
        )}

        {actions.includes("edit") && (
          <GuestDialog mode="put" guest={guest} guestId={guest._id as string}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Edit /> Edit
            </DropdownMenuItem>
          </GuestDialog>
        )}

        {actions.includes("delete") && (
          <DeleteGuestdialog guest={guest}>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="hover:!bg-red-50 dark:hover:!bg-red-950 dark:text-red-400 dark:hover:!text-red-400 text-red-500 hover:!text-red-500 group">
              <Trash className="group-hover:!text-red-500 text-red-500 dark:group-hover:!text-red-400 dark:text-red-400" />{" "}
              Delete
            </DropdownMenuItem>
          </DeleteGuestdialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GuestDropdownMenu;
