"use client";

import { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signUpUser } from "./actions";
import { AlertCircle, CheckCircle } from "lucide-react";

const ROLES = [
  { value: "", label: "Student (no role)" },
  { value: "admin", label: "Admin" },
  { value: "faculty", label: "Faculty" },
  { value: "org_officer", label: "Org Officer" },
];

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signUpUser, null);

  if (state && "success" in state) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-bg-base">
        <div className="w-full max-w-sm">
          <div className="glass-card glow-border rounded-2xl p-8 space-y-6 text-center">
            <CheckCircle size={40} className="text-grad-cyan mx-auto" />
            <div>
              <h2 className="text-lg font-black text-text-primary">Account created</h2>
              <p className="text-text-muted text-sm mt-2">
                <span className="text-accent-glow font-mono">{state.email}</span> is ready to sign in.
              </p>
            </div>
            <Link
              href="/login"
              className="block w-full bg-linear-to-r from-grad-blue to-grad-cyan text-white font-bold text-sm h-11 rounded-xl glow-btn hover:opacity-90 transition-all leading-[2.75rem] text-center"
            >
              Go to Sign In →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-bg-base">
      <div className="w-full max-w-sm">
        <div className="glass-card glow-border rounded-2xl p-8 space-y-7">

          {/* Branding */}
          <div className="flex flex-col items-center gap-4 text-center">
            <Image
              src="/cit_cpe_logo.png"
              alt="CIT-U CPE Department"
              width={56}
              height={56}
              className="rounded-xl"
            />
            <div>
              <h1 className="text-xl font-black text-text-primary tracking-tight">
                Create Account
              </h1>
              <p className="font-mono text-grad-violet text-[10px] uppercase tracking-widest mt-1">
                // dev utility
              </p>
            </div>
          </div>

          {/* Error */}
          {state && "error" in state && (
            <div className="flex items-start gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              {state.error}
            </div>
          )}

          {/* Form */}
          <form action={formAction} className="space-y-3">
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary font-mono placeholder:text-text-dim focus:outline-none focus:border-border-glow transition-colors"
            />
            <input
              type="password"
              name="password"
              required
              minLength={6}
              placeholder="Password (min 6 characters)"
              className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-border-glow transition-colors"
            />

            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1.5 px-0.5">
                Account Type
              </label>
              <select
                name="role"
                defaultValue=""
                className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-border-glow transition-colors"
              >
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-linear-to-r from-grad-blue via-grad-violet to-grad-cyan text-white font-bold text-sm h-12 rounded-xl glow-btn hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Creating…" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-text-dim font-mono text-[10px]">
            Already have an account?{" "}
            <Link href="/login" className="text-accent-glow hover:opacity-75 transition-opacity">
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
