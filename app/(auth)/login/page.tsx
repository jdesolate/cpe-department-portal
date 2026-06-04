"use client";

import { createBrowserClient } from "@supabase/ssr";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, type FormEvent } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const next = searchParams.get("next") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Redirect already-logged-in users
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        window.location.href = next === "/" ? "/admin/dashboard" : next;
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setInputError("");

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    setLoading(false);

    if (error) {
      if (error.message?.toLowerCase().includes("invalid login")) {
        setInputError("Incorrect email or password.");
      } else if (error.message?.toLowerCase().includes("email not confirmed")) {
        setInputError("Email not confirmed — create the account via the signup page first.");
      } else if (error.status === 429) {
        setInputError("Too many attempts — please wait a few minutes.");
      } else {
        setInputError(error.message ?? "Sign-in failed. Please try again.");
      }
      return;
    }

    window.location.href = next === "/" ? "/admin/dashboard" : next;
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-bg-base">
      <div className="w-full max-w-sm">
        <div className="glass-card glow-border rounded-2xl p-8 space-y-8">

          {/* Branding */}
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
                CPE Department Portal
              </h1>
              <p className="font-mono text-accent-glow text-[10px] uppercase tracking-widest mt-1">
                // cit.edu · institutional access
              </p>
            </div>
          </div>

          {/* URL error */}
          {urlError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-center">
              <p className="text-red-400 font-mono text-xs">
                {urlError === "domain"
                  ? "Only @cit.edu accounts are allowed."
                  : "Authentication failed. Please try again."}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setInputError(""); }}
                placeholder="your@email.com"
                required
                className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary font-mono placeholder:text-text-dim focus:outline-none focus:border-border-glow transition-colors"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setInputError(""); }}
                placeholder="Password"
                required
                className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-border-glow transition-colors"
              />
              {inputError && (
                <p className="text-red-400 font-mono text-xs px-1">{inputError}</p>
              )}
              <div className="text-right">
                <Link href="/forgot-password" className="text-text-dim hover:text-accent-glow font-mono text-[10px] transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-grad-blue to-grad-cyan text-white font-bold text-sm h-12 rounded-xl glow-btn hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-text-dim font-mono text-[10px]">
              No account?{" "}
              <Link href="/signup" className="text-accent-glow hover:opacity-75 transition-opacity">
                Create one →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
