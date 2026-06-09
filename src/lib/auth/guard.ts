import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  verifySession,
  type SessionPayload,
} from "@/lib/auth/session";

/**
 * Reads and verifies the admin session from the request cookies. Fails closed:
 * any unexpected error (e.g. misconfigured AUTH_SECRET) yields `null` so callers
 * respond with 401 rather than leaking a 500.
 */
export async function getSession(): Promise<SessionPayload | null> {
  try {
    const store = await cookies();
    return await verifySession(store.get(SESSION_COOKIE)?.value);
  } catch {
    return null;
  }
}

/**
 * Returns true when the caller has a valid admin session. Used in route
 * handlers as defense-in-depth alongside the proxy auth gate.
 */
export async function isAdmin(): Promise<boolean> {
  return (await getSession()) !== null;
}
