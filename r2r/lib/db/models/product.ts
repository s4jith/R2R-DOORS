import mongoose, { Schema, Model } from "mongoose";

export interface IProduct {
  _id: mongoose.Types.ObjectId;
  name: string;
  category: "door" | "window";
  pricePerSqft: number;
  description: string;
  image: string;
  material: string;
  features: string[];
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, enum: ["door", "window"], required: true },
    pricePerSqft: { type: Number, required: true, min: 0 },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    material: { type: String, default: "" },
    features: { type: [String], default: [] },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product ?? mongoose.model<IProduct>("Product", schema);

export default Product;
