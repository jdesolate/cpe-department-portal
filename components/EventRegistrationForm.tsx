"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Props {
  eventId: string;
  eventTitle: string;
}

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

export default function EventRegistrationForm({ eventId, eventTitle }: Props) {
  const [form, setForm] = useState({
    full_name: "",
    student_id: "",
    year_level: "",
    section: "",
    email: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.student_id.trim()) return;

    setStatus("loading");

    const { error } = await supabaseClient.from("event_registrations").insert({
      event_id: eventId,
      full_name: form.full_name.trim(),
      student_id: form.student_id.trim(),
      year_level: form.year_level || null,
      section: form.section.trim() || null,
      email: form.email.trim() || null,
    });

    if (!error) {
      setStatus("success");
    } else if (error.code === "23505") {
      // unique violation — already registered
      setStatus("duplicate");
    } else {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="glass-card glow-border rounded-2xl p-8 text-center space-y-4">
        <div className="text-5xl animate-float">🎉</div>
        <h3 className="text-xl font-black gradient-text">You&apos;re Registered!</h3>
        <p className="text-text-muted text-sm font-light max-w-xs mx-auto">
          Your slot for <span className="text-text-primary font-semibold">{eventTitle}</span> has been confirmed.
        </p>
        <p className="text-xs font-mono text-text-dim">See you there ⚡</p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-dim font-mono focus:outline-none focus:border-border-glow transition-colors";

  const labelClass = "block text-[11px] font-mono text-text-dim uppercase tracking-widest mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="glass-card glow-border rounded-2xl p-6 space-y-5">
      <div>
        <h3 className="text-lg font-black text-text-primary flex items-center gap-2">
          <span className="text-grad-cyan font-mono text-sm">//</span>
          Register for this Event
        </h3>
        <p className="text-xs text-text-dim font-mono mt-1">
          Fields marked * are required.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className={labelClass}>Full Name *</label>
          <input
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            placeholder="e.g. Juan Dela Cruz"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Student ID *</label>
          <input
            name="student_id"
            value={form.student_id}
            onChange={handleChange}
            placeholder="e.g. 2021-XXXXX"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Year Level</label>
          <select
            name="year_level"
            value={form.year_level}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
            <option value="5th Year">5th Year</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Section</label>
          <input
            name="section"
            value={form.section}
            onChange={handleChange}
            placeholder="e.g. CPE-3A"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Email (optional)</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={inputClass}
          />
        </div>
      </div>

      {status === "duplicate" && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 text-sm text-amber-400 font-mono">
          ⚠ You&apos;re already registered for this event using that Student ID.
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400 font-mono">
          ✕ Something went wrong. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-linear-to-r from-grad-blue via-grad-violet to-grad-cyan text-white font-bold text-sm h-12 rounded-xl glow-btn hover:opacity-90 transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {status === "loading" ? (
          <span className="font-mono text-xs tracking-widest">Submitting...</span>
        ) : (
          "Confirm Registration →"
        )}
      </button>
    </form>
  );
}
