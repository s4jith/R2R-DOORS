import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthEnv } from "@/lib/env";
import { verifyPassword } from "@/lib/auth/password";
import { createSession, SESSION_COOKIE } from "@/lib/auth/session";
import { badRequest, fromZodError, serverError, unauthorized } from "@/lib/api/http";

export const runtime = "nodejs";

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest("Invalid request body");
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return fromZodError(parsed.error);

  try {
    const env = getAuthEnv();
    const { username, password } = parsed.data;

    // Always run the password comparison to avoid leaking which field was wrong.
    const passwordOk = await verifyPassword(password, env.ADMIN_PASSWORD);
    const usernameOk = username === env.ADMIN_USERNAME;

    if (!usernameOk || !passwordOk) {
      return unauthorized("Invalid username or password");
    }

    const { token, maxAge } = await createSession(username);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    });
    return res;
  } catch (err) {
    console.error("[POST /api/auth/login]", err);
    return serverError("Login is not configured correctly");
  }
}
