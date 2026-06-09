import type { NextRequest } from "next/server";
import { uploadProductImage, UploadError } from "@/lib/storage/r2";
import { isAdmin } from "@/lib/auth/guard";
import { badRequest, ok, serverError, unauthorized } from "@/lib/api/http";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return unauthorized();

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return badRequest("Expected multipart/form-data");
  }

  const file = formData.get("file");
  if (!file || typeof file === "string") {
    return badRequest("No file provided");
  }

  try {
    const { url, key } = await uploadProductImage(file);
    return ok({ url, key });
  } catch (err) {
    if (err instanceof UploadError) {
      return badRequest(err.message);
    }
    console.error("[POST /api/upload]", err);
    return serverError("Upload failed");
  }
}
