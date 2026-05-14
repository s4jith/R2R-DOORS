import mongoose, { Schema, Model } from "mongoose";

export interface IOrder {
  _id: mongoose.Types.ObjectId;
  customerName: string;
  phone: string;
  email: string;
  product: string;
  productId: string;
  width: number;
  height: number;
  totalAmount: number;
  status: "pending" | "confirmed" | "delivered";
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IOrder>(
  {
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    email: { type: String, default: "" },
    product: { type: String, required: true },
    productId: { type: String, required: true },
    width: { type: Number, required: true, min: 0 },
    height: { type: Number, required: true, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order: Model<IOrder> =
  mongoose.models.Order ?? mongoose.model<IOrder>("Order", schema);

export default Order;
