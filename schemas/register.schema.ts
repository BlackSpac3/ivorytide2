import z from "zod";
import passwordSchema from "./password.schema";

const RegisterFormSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.email(),
  password: passwordSchema,
});

export default RegisterFormSchema;
