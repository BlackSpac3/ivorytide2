import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/database/connect";
import Guest from "@/lib/models/guest.model";
import { formDataToObject } from "@/lib/utils/helpers";
import {
  extractFileFromFormData,
  uploadFileToUT,
} from "@/lib/utils/uploadthing-server";
import { GuestFormSchema } from "@/schemas/guest.schema";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized", success: false, status: 401 },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // console.log('buil');

    const formData = await request.formData();

    const data = formDataToObject(formData);

    const { error, data: validateData } = GuestFormSchema.safeParse(data);

    if (error) {
      console.log(error);
      return NextResponse.json(
        { error: error.message, success: false, status: 400 },
        { status: 400 }
      );
    }

    const { title, first_name, last_name } = validateData;

    const existingGuest = await Guest.findOne({ first_name, last_name, title });

    if (existingGuest) {
      return NextResponse.json(
        {
          error: "Guest with this details already exists",
          success: false,
          status: 400,
        },
        { status: 400 }
      );
    }

    // Extract and upload image file if present
    const inviteFile = extractFileFromFormData(formData, "invite");
    let inviteUrl = "";
    let inviteKey = "";
    let inviteName = "";

    try {
      const utRes = await uploadFileToUT(inviteFile!, inviteFile?.name);

      inviteUrl = utRes.url;
      inviteKey = utRes.key;
      inviteName = utRes.name;
    } catch (error) {
      console.error("Error uploading image:", error);
      return NextResponse.json(
        { error: "Failed to upload image", success: false, status: 500 },
        { status: 500 }
      );
    }

    const guestData = {
      title: validateData.title,
      first_name: validateData.first_name,
      last_name: validateData.last_name,
      invite: {
        url: inviteUrl,
        key: inviteKey,
        name: inviteName,
      },
      invitedBy: session?.user.id,
    };
    const guest = new Guest(guestData);
    await guest.save();

    return NextResponse.json(
      {
        data: { guest_id: guest._id },
        message: `${guest.first_name} invited successfully`,
        success: true,
        status: 201,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating cause:", error);

    return NextResponse.json(
      { error: "Internal server error", success: false, status: 500 },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized", success: false, status: 401 },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const qParam = searchParams.get("q");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const statuses = searchParams.getAll("status");
    const skip = (page - 1) * pageSize;

    const filter: {
      status?: { $in: string[] };
      $or?: { [key: string]: { $regex: string; $options: string } }[];
    } = {};

    if (statuses.length > 0) {
      filter.status = { $in: statuses };
    }

    if (qParam) {
      filter.$or = [
        { first_name: { $regex: qParam, $options: "i" } },
        { last_name: { $regex: qParam, $options: "i" } },
        { title: { $regex: qParam, $options: "i" } },
      ];
    }

    const guests = await Guest.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .populate("invitedBy", "first_name last_name email")
      .lean();

    const total = await Guest.countDocuments(filter);

    const totalPages = Math.ceil(total / pageSize);

    return NextResponse.json(
      {
        data: {
          guests,
          pagination: {
            current_page: page,
            has_next: page < totalPages,
            has_prev: page > 1,
            page_size: pageSize,
            total_count: total,
            total_pages: totalPages,
          },
        },
        success: true,
        status: 200,
        message: "Guests fetched successfully",
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
