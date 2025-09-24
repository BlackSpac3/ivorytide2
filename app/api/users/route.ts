import { connectToDatabase } from "@/lib/database/connect";
import User from "@/lib/models/user.model";
import { RegisterFormSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(request: NextRequest) {
  //recieves json from the request
  const body = await request.json();

  //validate json with zod
  const { error } = RegisterFormSchema.safeParse(body);

  //if error return bad request status 400
  if (error)
    return NextResponse.json(
      {
        success: false,
        status: 400,
        message: error.message,
        error: z.prettifyError(error),
      },
      { status: 400 }
    );

  try {
    console.log("Connecting to database...");

    //connecting to database
    await connectToDatabase();

    console.log("Connected to database");
    //checking if user already  exists
    const exists = await User.findOne({ email: body.email });

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
          status: 400,
          error: "User already exists",
        },
        { status: 400 }
      );
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // saving user
    const user = new User({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: hashedPassword,
    });

    await user.save();

    console.log("User registered successfully");

    return NextResponse.json(
      {
        data: {
          user_id: user._id,
        },
        message: "User registered successfully",
        success: true,
        status: 201,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error,
        message: "Something went wrong",
        success: false,
        status: 500,
      },
      { status: 500 }
    );
  }
}
