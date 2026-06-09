import "server-only";
import { randomUUID } from "node:crypto";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import sharp from "sharp";
import { getR2Env } from "@/lib/env";

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

const TARGET_WIDTH = 800;
const TARGET_HEIGHT = 600;

let client: S3Client | null = null;

function getClient(): S3Client {
  if (client) return client;
  const env = getR2Env();
  client = new S3Client({
    region: "auto",
    endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    },
  });
  return client;
}

export class UploadError extends Error {}

function publicUrl(key: string): string {
  const base = getR2Env().R2_PUBLIC_URL.replace(/\/+$/, "");
  return `${base}/${key}`;
}

/**
 * Resizes/compresses an uploaded image with sharp and stores it in Cloudflare
 * R2. Returns the public URL (served via the R2 public bucket / custom domain)
 * and the object key for later deletion.
 */
export async function uploadProductImage(
  file: File
): Promise<{ url: string; key: string }> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new UploadError("Unsupported image type. Use JPEG, PNG, WebP or AVIF.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new UploadError("Image exceeds the 8 MB size limit.");
  }

  const env = getR2Env();
  const input = Buffer.from(await file.arrayBuffer());

  let output: Buffer;
  try {
    output = await sharp(input)
      .rotate() // honour EXIF orientation
      .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: "cover", position: "centre" })
      .webp({ quality: 82 })
      .toBuffer();
  } catch {
    throw new UploadError("Could not process the image. Is it a valid file?");
  }

  const key = `products/${randomUUID()}.webp`;

  await getClient().send(
    new PutObjectCommand({
      Bucket: env.R2_BUCKET,
      Key: key,
      Body: output,
      ContentType: "image/webp",
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  return { url: publicUrl(key), key };
}

export async function deleteProductImage(key: string): Promise<void> {
  const env = getR2Env();
  await getClient().send(
    new DeleteObjectCommand({ Bucket: env.R2_BUCKET, Key: key })
  );
}

/**
 * Derives the R2 object key from a public image URL. Returns null when the URL
 * is not hosted on our R2 bucket (e.g. an external/placeholder URL or when R2
 * is not configured), so callers can safely skip deletion.
 */
export function keyFromPublicUrl(url: string): string | null {
  if (!url) return null;
  try {
    const base = getR2Env().R2_PUBLIC_URL.replace(/\/+$/, "");
    return url.startsWith(`${base}/`) ? url.slice(base.length + 1) : null;
  } catch {
    return null;
  }
}

/**
 * Best-effort deletion of an R2-hosted image by its public URL. Never throws —
 * a failed cleanup must not fail the surrounding request.
 */
export async function deleteProductImageByUrl(url: string): Promise<void> {
  const key = keyFromPublicUrl(url);
  if (!key) return;
  try {
    await deleteProductImage(key);
  } catch (err) {
    console.error("[r2] Failed to delete orphaned image:", key, err);
  }
}
