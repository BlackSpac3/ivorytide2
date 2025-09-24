import z from "zod";

const LoginFormSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string(),
});

type LoginFormType = z.infer<typeof LoginFormSchema>;

const LoginFormDefault = {
  email: "",
  password: "",
};

export { LoginFormSchema, type LoginFormType, LoginFormDefault };
