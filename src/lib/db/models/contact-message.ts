import mongoose, { Schema, Model } from "mongoose";

export interface IContactMessage {
  _id: mongoose.Types.ObjectId;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  productInterest: string;
  status: "new" | "read" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, default: "", trim: true },
    subject: { type: String, default: "", trim: true },
    message: { type: String, required: true, trim: true },
    productInterest: { type: String, default: "", trim: true },
    status: {
      type: String,
      enum: ["new", "read", "archived"],
      default: "new",
    },
  },
  { timestamps: true }
);

const ContactMessage: Model<IContactMessage> =
  mongoose.models.ContactMessage ??
  mongoose.model<IContactMessage>("ContactMessage", schema);

export default ContactMessage;
