import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth/session";

const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);

  // ── Admin pages ────────────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    const isLogin = pathname === "/admin/login";

    if (!session && !isLogin) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.search = "";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }

    if (session && isLogin) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin";
      url.search = "";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // ── API: protect all mutations + privileged endpoints ──────────────────
  if (pathname.startsWith("/api/")) {
    const isAuthRoute = pathname.startsWith("/api/auth/");
    const isPrivileged =
      pathname === "/api/upload" || pathname === "/api/seed";
    const needsAuth =
      isPrivileged || (MUTATING_METHODS.has(req.method) && !isAuthRoute);

    if (needsAuth && !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
