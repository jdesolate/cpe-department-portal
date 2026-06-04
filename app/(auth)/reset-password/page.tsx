"use client";

import { createBrowserClient } from "@supabase/ssr";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, type FormEvent } from "react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    // Redirect to forgot-password if there's no active recovery session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.replace("/forgot-password");
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(error.message ?? "Failed to update password.");
      return;
    }

    setDone(true);
    setTimeout(() => router.replace("/login"), 2500);
  };

  if (done) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-bg-base">
        <div className="w-full max-w-sm">
          <div className="glass-card glow-border rounded-2xl p-8 space-y-6 text-center">
            <p className="text-4xl select-none">✅</p>
            <div>
              <h1 className="text-xl font-black text-text-primary">Password updated!</h1>
              <p className="text-text-dim font-mono text-xs mt-2">
                Redirecting you to login…
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-bg-base">
      <div className="w-full max-w-sm">
        <div className="glass-card glow-border rounded-2xl p-8 space-y-8">

          <div className="flex flex-col items-center gap-4 text-center">
            <Image
              src="/cit_cpe_logo.png"
              alt="CIT-U CPE Department"
              width={64}
              height={64}
              className="rounded-xl"
            />
            <div>
              <h1 className="text-xl font-black text-text-primary tracking-tight">
                Reset Password
              </h1>
              <p className="font-mono text-text-dim text-[10px] uppercase tracking-widest mt-1">
                // set a new password
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-2">
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="New password"
                required
                className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-border-glow transition-colors"
              />
              <input
                type="password"
                value={confirm}
                onChange={(e) => { setConfirm(e.target.value); setError(""); }}
                placeholder="Confirm new password"
                required
                className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-border-glow transition-colors"
              />
              {error && (
                <p className="text-red-400 font-mono text-xs px-1">{error}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-grad-blue to-grad-cyan text-white font-bold text-sm h-12 rounded-xl glow-btn hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating…" : "Update password"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
