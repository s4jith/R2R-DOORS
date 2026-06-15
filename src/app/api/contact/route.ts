import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import ContactMessage from "@/lib/db/models/contact-message";
import { contactInput } from "@/lib/validation/contact";
import {
  badRequest,
  created,
  fromZodError,
  ok,
  readJson,
  serverError,
} from "@/lib/api/http";

/**
 * Public lead capture for the contact / quote form. No auth (allowlisted in
 * src/proxy.ts). Validates with zod, drops obvious bots via the honeypot, and
 * persists to MongoDB — failing gracefully so the form never leaks internals.
 */
export async function POST(req: NextRequest) {
  const body = await readJson(req);
  if (body === null) return badRequest("Invalid JSON body");

  const parsed = contactInput.safeParse(body);
  if (!parsed.success) return fromZodError(parsed.error);

  // Honeypot tripped → pretend success, store nothing.
  if (parsed.data.company) return ok({ success: true });

  try {
    await connectDB();
    // `company` is not in the schema; Mongoose strict-mode drops it on create.
    await ContactMessage.create(parsed.data);
    return created({ success: true });
  } catch (err) {
    console.error("[POST /api/contact]", err);
    return serverError("Failed to send message. Please call us instead.");
  }
}
