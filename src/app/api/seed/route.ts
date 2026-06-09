import { connectDB } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/product";
import Order from "@/lib/db/models/order";
import { products as mockProducts, orders as mockOrders } from "@/lib/mock-data";
import { isAdmin } from "@/lib/auth/guard";
import { ok, serverError, unauthorized } from "@/lib/api/http";

export async function POST() {
  if (!(await isAdmin())) return unauthorized();

  try {
    await connectDB();

    const [existingProducts, existingOrders] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
    ]);

    let seededProducts = 0;
    let seededOrders = 0;

    if (existingProducts === 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const docs = mockProducts.map(({ id, ...rest }) => rest);
      await Product.insertMany(docs);
      seededProducts = docs.length;
    }

    if (existingOrders === 0) {
      const docs = mockOrders.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ id, createdAt, ...rest }) => ({
          ...rest,
          createdAt: new Date(createdAt),
        })
      );
      await Order.insertMany(docs);
      seededOrders = docs.length;
    }

    return ok({
      message: "Seed complete",
      seededProducts,
      seededOrders,
      skipped: {
        products: existingProducts > 0,
        orders: existingOrders > 0,
      },
    });
  } catch (err) {
    console.error("[POST /api/seed]", err);
    return serverError("Seed failed");
  }
}
