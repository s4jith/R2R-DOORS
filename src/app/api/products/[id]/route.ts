import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/product";
import { getProductById, serializeProduct } from "@/lib/services/products";
import { productUpdate } from "@/lib/validation/product";
import { deleteProductImageByUrl } from "@/lib/storage/r2";
import { isAdmin } from "@/lib/auth/guard";
import {
  badRequest,
  fromZodError,
  notFound,
  ok,
  readJson,
  serverError,
  unauthorized,
} from "@/lib/api/http";

type Context = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Context) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return notFound();
  return ok(product);
}

export async function PUT(req: NextRequest, { params }: Context) {
  if (!(await isAdmin())) return unauthorized();

  const { id } = await params;

  const body = await readJson(req);
  if (body === null) return badRequest("Invalid JSON body");

  const parsed = productUpdate.safeParse(body);
  if (!parsed.success) return fromZodError(parsed.error);

  try {
    await connectDB();
    const previous = await Product.findById(id).select("image").lean();
    const doc = await Product.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      { new: true, runValidators: true }
    ).lean();
    if (!doc) return notFound();

    // Clean up the replaced image from R2 (best-effort).
    if (previous?.image && previous.image !== doc.image) {
      await deleteProductImageByUrl(previous.image);
    }
    return ok(serializeProduct(doc));
  } catch (err) {
    console.error("[PUT /api/products/[id]]", err);
    return serverError("Failed to update product");
  }
}

export async function DELETE(_req: NextRequest, { params }: Context) {
  if (!(await isAdmin())) return unauthorized();

  const { id } = await params;
  try {
    await connectDB();
    const doc = await Product.findByIdAndDelete(id).lean();
    if (!doc) return notFound();

    // Remove the associated image from R2 (best-effort).
    await deleteProductImageByUrl(doc.image ?? "");
    return ok({ success: true });
  } catch (err) {
    console.error("[DELETE /api/products/[id]]", err);
    return serverError("Failed to delete product");
  }
}
