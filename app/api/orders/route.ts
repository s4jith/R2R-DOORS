import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Order from "@/lib/db/models/order";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function serialize(doc: Record<string, any>) {
  const { _id, __v, ...rest } = doc;
  return {
    id: _id.toString(),
    ...rest,
    createdAt: rest.createdAt
      ? new Date(rest.createdAt).toISOString().split("T")[0]
      : "",
  };
}

export async function GET() {
  try {
    await connectDB();
    const docs = await Order.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(docs.map(serialize));
  } catch (err) {
    console.error("[GET /api/orders]", err);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectDB();
    const doc = await Order.create(body);
    return NextResponse.json(serialize(doc.toObject()), { status: 201 });
  } catch (err) {
    console.error("[POST /api/orders]", err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
