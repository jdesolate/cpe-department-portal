"use client";

import { createBrowserClient } from "@supabase/ssr";
import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      { redirectTo: `${window.location.origin}/auth/callback?next=/reset-password` }
    );

    setLoading(false);

    if (error) {
      setError(error.message ?? "Failed to send reset email.");
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-bg-base">
        <div className="w-full max-w-sm">
          <div className="glass-card glow-border rounded-2xl p-8 space-y-6 text-center">
            <p className="text-4xl select-none">📬</p>
            <div>
              <h1 className="text-xl font-black text-text-primary">Check your email</h1>
              <p className="text-text-dim font-mono text-xs mt-2 leading-relaxed">
                A reset link was sent to{" "}
                <span className="text-accent-glow">{email}</span>.
                Click the link in the email to set a new password.
              </p>
            </div>
            <Link
              href="/login"
              className="block text-accent-glow hover:opacity-75 font-mono text-xs transition-opacity"
            >
              ← Back to login
            </Link>
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
                Forgot Password
              </h1>
              <p className="font-mono text-text-dim text-[10px] uppercase tracking-widest mt-1">
                // enter your email to reset
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="your@email.com"
              required
              className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary font-mono placeholder:text-text-dim focus:outline-none focus:border-border-glow transition-colors"
            />
            {error && (
              <p className="text-red-400 font-mono text-xs px-1">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-grad-blue to-grad-cyan text-white font-bold text-sm h-12 rounded-xl glow-btn hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending…" : "Send reset link"}
            </button>
          </form>

          <div className="text-center">
            <Link
              href="/login"
              className="text-text-dim hover:text-accent-glow font-mono text-[10px] transition-colors"
            >
              ← Back to login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
