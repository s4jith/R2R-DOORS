import { z } from "zod";

/**
 * Centralised, lazily-validated environment access.
 *
 * Each `process.env.X` is referenced literally so Next.js can inline the value
 * into the Edge middleware bundle. Validation is grouped by feature and runs on
 * first use, so a missing R2 credential never blocks unrelated functionality
 * (e.g. the database), and the build never crashes for lack of runtime secrets.
 */
const raw = {
  MONGO_URI: process.env.MONGO_URI,
  R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
  R2_BUCKET: process.env.R2_BUCKET,
  R2_PUBLIC_URL: process.env.R2_PUBLIC_URL,
  AUTH_SECRET: process.env.AUTH_SECRET,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  SESSION_COOKIE_MAX_AGE: process.env.SESSION_COOKIE_MAX_AGE,
} as const;

function parse<S extends z.ZodType>(schema: S, label: string): z.infer<S> {
  const result = schema.safeParse(raw);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`[env] Invalid ${label} configuration — ${issues}`);
  }
  return result.data;
}

const dbSchema = z.object({
  MONGO_URI: z.string().min(1, "MONGO_URI is required"),
});

const r2Schema = z.object({
  R2_ACCOUNT_ID: z.string().min(1, "R2_ACCOUNT_ID is required"),
  R2_ACCESS_KEY_ID: z.string().min(1, "R2_ACCESS_KEY_ID is required"),
  R2_SECRET_ACCESS_KEY: z.string().min(1, "R2_SECRET_ACCESS_KEY is required"),
  R2_BUCKET: z.string().min(1, "R2_BUCKET is required"),
  R2_PUBLIC_URL: z.url("R2_PUBLIC_URL must be a valid URL"),
});

const authSchema = z.object({
  AUTH_SECRET: z
    .string()
    .min(32, "AUTH_SECRET must be at least 32 characters"),
  ADMIN_USERNAME: z.string().min(1, "ADMIN_USERNAME is required"),
  ADMIN_PASSWORD: z.string().min(1, "ADMIN_PASSWORD is required"),
  SESSION_COOKIE_MAX_AGE: z.coerce
    .number()
    .int()
    .positive()
    .default(60 * 60 * 8), // 8 hours
});

let dbEnv: z.infer<typeof dbSchema> | undefined;
let r2Env: z.infer<typeof r2Schema> | undefined;
let authEnv: z.infer<typeof authSchema> | undefined;

export function getDbEnv() {
  return (dbEnv ??= parse(dbSchema, "database"));
}

export function getR2Env() {
  return (r2Env ??= parse(r2Schema, "Cloudflare R2"));
}

export function getAuthEnv() {
  return (authEnv ??= parse(authSchema, "authentication"));
}
