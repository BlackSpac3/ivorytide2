import { titleOptions } from "@/lib/data";
import z from "zod";

const RsvpFormSchema = z.object({
  title: z.enum(titleOptions, { message: "Title is required" }),
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  is_attending: z.enum(["yes", "no"], { message: "Please select an option" }),
  reason: z.string().optional(),
});

type RsvpFormType = z.infer<typeof RsvpFormSchema>;

const RsvpFormDefault: RsvpFormType = {
  title: "mr",
  first_name: "",
  last_name: "",
  is_attending: "yes",
  reason: "",
};
export { RsvpFormSchema, type RsvpFormType, RsvpFormDefault };
