import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { GuestFormSchema, GuestFormType } from "@/schemas/guest.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FIleDropZone from "./file-dropzone";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader, Save } from "lucide-react";
import { titleOptions } from "@/lib/data";
import { IGuest } from "@/lib/models/guest.model";
import { GuestMutation, useGuestMutation } from "@/lib/hooks/guest.query";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

type AddGuestDialog = {
  mode: "post" | "get";
  guestId?: never;
  guest: GuestFormType;
  children: React.ReactNode;
};

type UpdateGuestDialog = {
  mode: "put";
  guestId: string;
  guest: IGuest;
  children: React.ReactNode;
};

type GuestDialog = AddGuestDialog | UpdateGuestDialog;
const GuestDialog = ({ mode, guest, guestId, children }: GuestDialog) => {
  const [open, setopen] = useState(false);
  const queryClient = useQueryClient();

  const isViewMode = mode === "get";

  const form = useForm<GuestFormType>({
    resolver: zodResolver(GuestFormSchema),
    defaultValues: guest,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;

  const mutateOptions: GuestMutation =
    mode === "get" || mode === "post"
      ? {
          mode,
          queryClient,
          onSave: () => setopen(false),
        }
      : {
          mode,
          guestId: guestId as string,
          queryClient,
          onSave: () => setopen(false),
        };

  const { mutate, isPending } = useGuestMutation(mutateOptions);

  useEffect(() => {
    reset();
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <Form {...form}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form
            onSubmit={handleSubmit((data) => mutate(data))}
            className="flex flex-col gap-y-6">
            <DialogHeader>
              <DialogTitle>
                {mode === "get" ? "View" : mode === "put" ? "Update" : "Invite"}{" "}
                Guest
              </DialogTitle>
              {/* <DialogDescription>Invite Guest</DialogDescription> */}
            </DialogHeader>
            <ScrollArea className="h-full  max-h-[calc(100vh-240px)]">
              <div className="space-y-4 p-1">
                <FormField
                  name="invite"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invitation</FormLabel>
                      <FormControl>
                        {isViewMode ? (
                          <div className="relative">
                            <Button
                              variant="ghost"
                              size="sm"
                              type="button"
                              asChild
                              className="absolute right-[1.5px]  top-1/2  -translate-y-1/2">
                              <Link
                                href={
                                  field.value instanceof File
                                    ? URL.createObjectURL(field.value)
                                    : field.value.url
                                }
                                target="_blank"
                                rel="noopener noreferrer">
                                <ExternalLink className="stroke-muted-foreground" />
                              </Link>
                            </Button>
                            <Input
                              readOnly
                              value={field.value.name}
                              className="pr-10 truncate"
                            />
                          </div>
                        ) : (
                          <FIleDropZone form={form} fieldName={"invite"} />
                        )}
                      </FormControl>
                      <FormMessage />
                      {!isViewMode && (
                        <FormDescription>Only support .pdf</FormDescription>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Select
                          disabled={isViewMode}
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a title" />
                          </SelectTrigger>
                          <SelectContent>
                            {titleOptions.map((title) => (
                              <SelectItem
                                key={title}
                                value={title}
                                className="capitalize">
                                {title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
                          readOnly={isViewMode}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          readOnly={isViewMode}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>
              {!isViewMode && (
                <Button type="submit" disabled={isSubmitting || isPending}>
                  {isSubmitting || isPending ? (
                    <Loader className="animate-spin" />
                  ) : (
                    mode === "put" && <Save />
                  )}
                  {isSubmitting || isPending
                    ? mode === "post"
                      ? "Inviting..."
                      : "Saving..."
                    : mode === "put"
                    ? "Save"
                    : "Invite"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
};

export default GuestDialog;
