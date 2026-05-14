import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Order from "@/lib/db/models/order";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await req.json();
    await connectDB();
    const doc = await Order.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const { _id, __v, ...rest } = doc;
    return NextResponse.json({
      id: (_id as { toString(): string }).toString(),
      ...rest,
      createdAt: rest.createdAt
        ? new Date(rest.createdAt as Date).toISOString().split("T")[0]
        : "",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
