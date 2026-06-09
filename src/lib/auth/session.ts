import { SignJWT, jwtVerify } from "jose";
import { getAuthEnv } from "@/lib/env";

export const SESSION_COOKIE = "r2r_session";

export type SessionPayload = {
  sub: string;
  role: "admin";
};

function secretKey(): Uint8Array {
  return new TextEncoder().encode(getAuthEnv().AUTH_SECRET);
}

export async function createSession(
  username: string
): Promise<{ token: string; maxAge: number }> {
  const { SESSION_COOKIE_MAX_AGE } = getAuthEnv();
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(username)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_COOKIE_MAX_AGE}s`)
    .sign(secretKey());
  return { token, maxAge: SESSION_COOKIE_MAX_AGE };
}

/** Verifies a session token. Returns null for missing/invalid/expired tokens. */
export async function verifySession(
  token?: string
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      algorithms: ["HS256"],
    });
    if (payload.role !== "admin" || typeof payload.sub !== "string") {
      return null;
    }
    return { sub: payload.sub, role: "admin" };
  } catch {
    return null;
  }
}
