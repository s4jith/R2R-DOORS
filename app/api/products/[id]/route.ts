import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/product";
import { deleteCached } from "@/lib/db/redis";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function serialize(doc: Record<string, any>) {
  const { _id, __v, ...rest } = doc;
  const normalizedPrice = Number(rest.pricePerSqft ?? rest.price ?? 0);
  return {
    id: _id.toString(),
    ...rest,
    pricePerSqft: Number.isFinite(normalizedPrice) ? normalizedPrice : 0,
  };
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();
    const doc = await Product.findById(id).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(serialize(doc));
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await req.json();
    await connectDB();
    const doc = await Product.findByIdAndUpdate(id, { $set: body }, {
      new: true,
      runValidators: true,
    }).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await deleteCached(
      "products:all",
      `products:${doc.category}`,
      `product:${id}`
    );
    return NextResponse.json(serialize(doc));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update product";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectDB();
    const doc = await Product.findByIdAndDelete(id).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await deleteCached(
      "products:all",
      `products:${doc.category}`,
      `product:${id}`
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
