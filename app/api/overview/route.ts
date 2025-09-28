import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/database/connect";
import Guest from "@/lib/models/guest.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized", success: false, status: 401 },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const invitedGuestsCount = await Guest.countDocuments({
      status: "invited",
    });
    const confirmedGuestsCount = await Guest.countDocuments({
      status: "confirmed",
    });
    const declinedGuestsCount = await Guest.countDocuments({
      status: "declined",
    });
    const total = await Guest.countDocuments();

    return NextResponse.json(
      {
        data: {
          invited: invitedGuestsCount,
          confirmed: confirmedGuestsCount,
          declined: declinedGuestsCount,
          guests: total,
        },
        success: true,
        status: 200,
        message: "Overview data fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching guests:", error);
    return NextResponse.json(
      { error: "Internal server error", success: false, status: 500 },
      { status: 500 }
    );
  }
}
