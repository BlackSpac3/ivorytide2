import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/database/connect";
import Guest from "@/lib/models/guest.model";
import { capitalizeStr, formDataToObject } from "@/lib/utils/helpers";
import {
  deleteFileFromUT,
  extractFileFromFormData,
  uploadFileToUT,
} from "@/lib/utils/uploadthing-server";
import { GuestFormSchema } from "@/schemas/guest.schema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ guest_id: string }> }
) {
  try {
    const { guest_id } = await context.params;

    //authenticate request
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized", status: 401, success: false },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const formData = await request.formData();

    const data = formDataToObject(formData);

    const { error, data: validatedData } = GuestFormSchema.safeParse(data);

    if (error) {
      return NextResponse.json(
        { error: error.message, success: false, status: 400 },
        { status: 400 }
      );
    }

    let invite;

    const guest = await Guest.findById(guest_id);

    if (!guest) {
      return NextResponse.json(
        { success: false, message: "Guest not found", status: 404 },
        { status: 404 }
      );
    }

    if (validatedData.invite instanceof File) {
      const inviteFile = extractFileFromFormData(formData, "invite");
      let inviteUrl = "";
      let inviteKey = "";
      let inviteName = "";

      try {
        const utRes = await uploadFileToUT(inviteFile!, inviteFile?.name);

        // const uploadResult = await uploadFileToUT(imageFile);
        inviteUrl = utRes.url;
        inviteKey = utRes.key;
        inviteName = utRes.name;

        invite = {
          url: inviteUrl,
          key: inviteKey,
          name: inviteName,
        };

        await deleteFileFromUT(guest.invite.key);

        console.log("Old Invitation Deleted successfully");

        console.log("Invitation uploaded successfully:", utRes);
      } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json(
          { error: "Failed to upload image", success: false, status: 500 },
          { status: 500 }
        );
      }
    } else {
      invite = validatedData.invite;
    }

    await Guest.findByIdAndUpdate(
      guest_id,
      { ...validatedData, invite },
      { new: true }
    );

    return NextResponse.json(
      {
        data: { guest_id: guest._id },
        success: true,
        status: 200,
        message: `${validatedData.first_name} updated successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("/api/guests/[guest_id] PUT: ", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ guest_id: string }> }
) {
  const { guest_id } = await context.params;

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", status: 401 },
      { status: 401 }
    );
  }
  try {
    await connectToDatabase();

    const guest = await Guest.findByIdAndDelete(guest_id);

    if (!guest) {
      return NextResponse.json(
        { success: false, error: "Guest not found", status: 404 },
        { status: 404 }
      );
    }

    await deleteFileFromUT(guest.invite.key);

    return NextResponse.json(
      {
        message: `Invite for ${capitalizeStr(
          guest.first_name
        )} deleted successfully`,
        success: true,
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, error: "Something went wrong", status: 500 },
      { status: 500 }
    );
  }
}
