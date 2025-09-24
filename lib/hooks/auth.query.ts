import { LoginFormType } from "@/schemas/auth.schema";
import { connectToDatabase } from "../database/connect";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

export const authUser = async ({ email, password }: LoginFormType) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.first_name + " " + user.last_name,
    };
  } catch (error) {
    console.log("Signin error: ", error);
    return null;
  }
};
