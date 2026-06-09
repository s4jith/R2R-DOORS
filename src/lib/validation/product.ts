import { z } from "zod";

const imageUrl = z.union([z.url(), z.literal("")]);

export const productInput = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  category: z.enum(["door", "window"]),
  pricePerSqft: z.coerce.number().min(0, "Price must be positive"),
  description: z.string().max(2000).optional().default(""),
  image: imageUrl.optional().default(""),
  material: z.string().max(200).optional().default(""),
  features: z.array(z.string().max(200)).optional().default([]),
  inStock: z.boolean().optional().default(true),
});

export const productUpdate = productInput.partial();

export type ProductInput = z.infer<typeof productInput>;
export type ProductUpdate = z.infer<typeof productUpdate>;
