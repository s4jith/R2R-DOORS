"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, User, ShieldCheck, ArrowRight } from "lucide-react";
import R2RLogo from "@/components/brand/r2r-logo";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Login failed. Please try again.");
        return;
      }

      const from = searchParams.get("from");
      const target = from && from.startsWith("/admin") ? from : "/admin";
      router.replace(target);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-ring/40";

  return (
    <div className="w-full max-w-sm">
      {/* Mobile logo */}
      <div className="mb-8 flex flex-col items-center lg:hidden">
        <R2RLogo animated className="mb-4 h-14 w-32" />
        <h1 className="text-2xl font-extrabold text-foreground">
          R2R Doors &amp; Windows
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Admin Portal</p>
      </div>

      <div className="rounded-2xl bg-card p-8 shadow-xl ring-1 ring-foreground/[0.07]">
        <h2 className="text-xl font-bold text-foreground">Sign in</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your credentials to access the dashboard.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-lg border border-destructive/25 bg-destructive-subtle px-4 py-3 text-sm font-medium text-destructive"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label
              htmlFor="username"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`${inputCls} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary py-3 font-semibold text-primary-foreground shadow-primary transition-[transform,box-shadow] hover:shadow-primary-lg active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              "Signing in…"
            ) : (
              <>
                Sign in
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Protected area · authorised personnel only
      </p>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-brand-deep lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          aria-hidden
          className="bg-grid pointer-events-none absolute inset-0 opacity-30"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-1/3 size-80 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--brand-400) 70%, transparent), transparent 70%)",
          }}
        />
        <div className="relative flex items-center gap-3">
          <R2RLogo animated className="h-12 w-28" />
          <span className="text-lg font-bold tracking-tight text-white">
            R2R Doors &amp; Windows
          </span>
        </div>
        <div className="relative">
          <h2 className="max-w-md text-3xl font-bold leading-tight text-white">
            Manage your catalogue and operations in one place.
          </h2>
          <p className="mt-4 max-w-sm text-white/65">
            The R2R control center — built for precision, just like our products.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/85">
            <ShieldCheck className="size-3.5" />
            Secure admin access
          </div>
        </div>
        <p className="relative text-xs text-white/45">
          &copy; {new Date().getFullYear()} R2R Doors &amp; Windows
        </p>
      </div>

      {/* Form panel */}
      <div className="flex w-full items-center justify-center bg-background px-6 py-12 lg:w-1/2">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
