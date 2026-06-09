import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/guard";
import DashboardShell from "./dashboard-shell";

/**
 * Server-side auth gate for the admin dashboard. This is the authoritative
 * check (the Edge proxy provides an additional optimistic redirect). Any
 * request without a valid admin session is sent to the login page before the
 * dashboard ever renders.
 */
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return <DashboardShell>{children}</DashboardShell>;
}
