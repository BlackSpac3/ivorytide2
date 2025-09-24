import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useGuestMutation } from "@/lib/hooks/guest.query";
import { IGuest } from "@/lib/models/guest.model";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
  guest: IGuest;
}

const DeleteGuestdialog: React.FC<Props> = ({ children, guest }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteGuest, isPending: isDeleting } = useGuestMutation({
    mode: "delete",
    guestId: guest._id as string,
    queryClient,
    onSave: () => setOpen(false),
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-medium capitalize text-primary">
              {guest.title} {guest.first_name} {guest.last_name}
            </span>{" "}
            from your guest list
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={() => deleteGuest(guest)}>
            {isDeleting && <Loader className="animate-spin" />}
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteGuestdialog;
