import { z } from "zod";

/** Public contact / quote-request form validation. */
export const contactInput = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(20),
  email: z.union([z.email(), z.literal("")]).optional().default(""),
  subject: z.string().trim().max(160).optional().default(""),
  productInterest: z.string().trim().max(120).optional().default(""),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (10+ characters)")
    .max(2000),
  /**
   * Honeypot — humans never see it, so it stays empty. We accept any value here
   * (rather than rejecting) so the route can silently fake success for bots that
   * fill it, instead of returning a 400 that signals the trap.
   */
  company: z.string().max(200).optional().default(""),
});

export type ContactInput = z.infer<typeof contactInput>;
