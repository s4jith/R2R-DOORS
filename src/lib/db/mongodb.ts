import mongoose from "mongoose";
import { getDbEnv } from "@/lib/env";

declare global {
  var _mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const cached = globalThis._mongooseCache ?? { conn: null, promise: null };
globalThis._mongooseCache = cached;

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const { MONGO_URI } = getDbEnv();
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
      dbName: "r2r_doors",
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    // Reset so the next request can retry instead of reusing a rejected promise.
    cached.promise = null;
    throw err;
  }
  return cached.conn;
}
