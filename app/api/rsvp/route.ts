import { connectToDatabase } from "@/lib/database/connect";
import Guest from "@/lib/models/guest.model";
import { RsvpFormSchema } from "@/schemas/rsvp.schema";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();

    const { error, data: validatedData } = RsvpFormSchema.safeParse(body);

    if (error) {
      return NextResponse.json(
        { error: error.message, success: false, status: 400 },
        { status: 400 }
      );
    }

    const { title, first_name, last_name, is_attending } = validatedData;

    const status = is_attending === "yes" ? "confirmed" : "declined";

    const guest = await Guest.findOneAndUpdate(
      {
        title,
        first_name,
        last_name,
      },
      { status }
    );

    if (!guest) {
      return NextResponse.json(
        { error: "You've not been invited yet", success: false, status: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: {
          invitation_url: status === "confirmed" ? guest.invite.url : null,
        },
        message: `RSVP ${status} successfully`,
        success: true,
        status: 200,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("/api/rsvp/[guest_id] PUT: ", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}
