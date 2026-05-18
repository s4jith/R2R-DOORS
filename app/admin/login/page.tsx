"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import R2RLogo from "@/components/r2r-logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    setLoading(true);
    // Mock auth — any credentials accepted for demo
    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("r2r_admin", "true");
      }
      router.push("/admin");
    }, 800);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <R2RLogo animated className="h-14 w-32 mb-4" />
          <h1 className="text-2xl font-extrabold text-foreground whitespace-nowrap">
            R2R Doors & Windows
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Admin Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 ring-1 ring-border shadow-lg">
          <h2 className="text-xl font-bold text-foreground mb-1">Sign In</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Enter your credentials to access the dashboard.
          </p>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3 bg-primary text-white font-semibold rounded-xl shadow-md hover:bg-primary/90 hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-xs text-center text-muted-foreground">
            Demo: any username &amp; password will work.
          </p>
        </div>
      </div>
    </div>
  );
}
