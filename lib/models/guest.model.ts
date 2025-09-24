import mongoose, { Schema, Document, Model } from "mongoose";
import { titleOptions } from "../data";

export interface IGuest extends Document {
  title: "mr" | "mrs" | "ms" | "dr" | "prof" | "chief" | "engr" | "pastor";
  first_name: string;
  last_name: string;
  status: "invited" | "confirmed" | "declined";
  invite: {
    url: string;
    key: string;
    name: string;
  };
  invitedBy:
    | Schema.Types.ObjectId
    | { first_name: string; last_name: string; email: string };
  createdAt: Date;
  updatedAt: Date;
}

const GuestSchema = new Schema<IGuest>(
  {
    title: {
      type: String,
      enum: titleOptions,
      required: true,
    },
    first_name: { type: String, required: true, lowercase: true },
    last_name: { type: String, required: true, lowercase: true },
    status: {
      type: String,
      enum: ["invited", "confirmed", "declined"],
      required: true,
      default: "invited",
    },
    invite: {
      url: { type: String, required: true },
      key: { type: String, required: true },
      name: { type: String, required: true },
    },
    invitedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// This avoids the `models.User` type error
const Guest: Model<IGuest> =
  (mongoose.models.Guest as Model<IGuest>) ||
  mongoose.model<IGuest>("Guest", GuestSchema);

export default Guest;
