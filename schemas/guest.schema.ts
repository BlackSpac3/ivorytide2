import { titleOptions } from "@/lib/data";
import z from "zod";

const InviteSchema = z.union([
  z
    .custom<File>((val) => val instanceof File, {
      message: "Invitation must be a file",
    })
    .refine((file) => !!file, { message: "A file is required" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size must not exceed 5MB",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "File must be a PDF",
    }),
  z.object({
    url: z.url("Invitation PDF URL must be a valid URL"),
    key: z.string().min(1, { message: "Key is required" }),
    name: z.string().min(1, { message: "Name is required" }),
  }),
]);

const GuestFormSchema = z.object({
  title: z.enum(titleOptions, { message: "Title is required" }),
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  invite: InviteSchema,
});

type GuestFormType = z.infer<typeof GuestFormSchema>;

const GuestFormDefault: GuestFormType = {
  title: "mr",
  first_name: "",
  last_name: "",
  invite: null as unknown as File,
};

export { GuestFormSchema, GuestFormDefault, type GuestFormType };
