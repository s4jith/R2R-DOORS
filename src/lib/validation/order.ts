import { z } from "zod";

export const orderInput = z.object({
  customerName: z.string().trim().min(1, "Customer name is required").max(200),
  phone: z.string().trim().min(3, "Phone is required").max(20),
  email: z.union([z.email(), z.literal("")]).optional().default(""),
  product: z.string().trim().min(1, "Product is required"),
  productId: z.string().trim().min(1, "Product id is required"),
  width: z.coerce.number().positive("Width must be positive"),
  height: z.coerce.number().positive("Height must be positive"),
  totalAmount: z.coerce.number().min(0),
  status: z.enum(["pending", "confirmed", "delivered"]).optional().default("pending"),
});

export const orderStatusUpdate = z.object({
  status: z.enum(["pending", "confirmed", "delivered"]),
});

export type OrderInput = z.infer<typeof orderInput>;
