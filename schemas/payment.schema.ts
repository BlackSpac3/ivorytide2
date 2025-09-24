import z from "zod";

const PaymentFormSchema = z.object({
  amount: z
    .number()
    .min(1, { message: "Amount is required" })
    .nonnegative("Amount can't be negative"),
  full_name: z.string().min(1, { message: "Full name is required" }),
  email: z.email({ message: "Please enter a valid email address" }),
});

type PaymentFormType = z.infer<typeof PaymentFormSchema>;

const PaymentFormDefault = {
  amount: 0,
  full_name: "",
  email: "",
};

export { PaymentFormSchema, type PaymentFormType, PaymentFormDefault };
