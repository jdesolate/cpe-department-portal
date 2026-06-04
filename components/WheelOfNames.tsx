"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import confetti from "canvas-confetti";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Segment colors — cycling through the brand gradient palette
const SEGMENT_COLORS = [
  ["#1e3a8a", "#3b82f6"],
  ["#4c1d95", "#8b5cf6"],
  ["#164e63", "#06b6d4"],
  ["#1e3a8a", "#60a5fa"],
  ["#5b21b6", "#a78bfa"],
  ["#155e75", "#22d3ee"],
];

interface WheelProps {
  isFacilitator: boolean;
}

export default function WheelOfNames({ isFacilitator }: WheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spinRef = useRef({ angle: 0, velocity: 0, spinning: false, rafId: 0 });

  const [names, setNames] = useState<string[]>([]);
  const [namesInput, setNamesInput] = useState("");
  const [winner, setWinner] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [showWinner, setShowWinner] = useState(false);
  const [importing, setImporting] = useState(false);
  const [events, setEvents] = useState<{ id: string; title: string }[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  // Fetch events for import
  useEffect(() => {
    if (!isFacilitator) return;
    setLoadingEvents(true);
    supabaseClient
      .from("events")
      .select("id, title")
      .eq("is_active", true)
      .then(({ data }) => {
        setEvents(data ?? []);
        setLoadingEvents(false);
      });
  }, [isFacilitator]);

  const drawWheel = useCallback((angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = Math.min(cx, cy) - 8;
    const count = names.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (count === 0) {
      // Empty state
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.fill();
      ctx.strokeStyle = "rgba(59,130,246,0.25)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "rgba(148,163,184,0.5)";
      ctx.font = "bold 14px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Add names to spin", cx, cy);
      return;
    }

    const sliceAngle = (2 * Math.PI) / count;

    for (let i = 0; i < count; i++) {
      const startAngle = angle + i * sliceAngle;
      const endAngle = startAngle + sliceAngle;
      const colors = SEGMENT_COLORS[i % SEGMENT_COLORS.length];

      // Segment fill
      const grad = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius);
      grad.addColorStop(0, colors[1] + "cc");
      grad.addColorStop(1, colors[0] + "cc");

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Segment border
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Label
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#f1f5f9";
      ctx.shadowColor = "rgba(0,0,0,0.8)";
      ctx.shadowBlur = 4;

      const maxLen = count > 10 ? 10 : 16;
      const label = names[i].length > maxLen ? names[i].slice(0, maxLen - 1) + "…" : names[i];
      const fontSize = count > 12 ? 10 : count > 8 ? 12 : 13;
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.fillText(label, radius - 10, 0);
      ctx.restore();
    }

    // Center hub
    const hubGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 24);
    hubGrad.addColorStop(0, "#22d3ee");
    hubGrad.addColorStop(1, "#3b82f6");
    ctx.beginPath();
    ctx.arc(cx, cy, 24, 0, 2 * Math.PI);
    ctx.fillStyle = hubGrad;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Pointer (top)
    const pSize = 18;
    ctx.beginPath();
    ctx.moveTo(cx, cy - radius - 4);
    ctx.lineTo(cx - pSize / 2, cy - radius - 4 - pSize);
    ctx.lineTo(cx + pSize / 2, cy - radius - 4 - pSize);
    ctx.closePath();
    ctx.fillStyle = "#00d4ff";
    ctx.shadowColor = "#00d4ff";
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;
  }, [names]);

  useEffect(() => {
    drawWheel(spinRef.current.angle);
  }, [names, drawWheel]);

  const getWinnerFromAngle = useCallback((angle: number): string => {
    if (names.length === 0) return "";
    const sliceAngle = (2 * Math.PI) / names.length;
    // Normalize angle to [0, 2π), pointer is at top (−π/2 from standard)
    const normalized = (((-angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI));
    const idx = Math.floor(normalized / sliceAngle) % names.length;
    return names[idx];
  }, [names]);

  const spin = useCallback(() => {
    if (spinRef.current.spinning || names.length === 0) return;

    const state = spinRef.current;
    state.spinning = true;
    state.velocity = 0.25 + Math.random() * 0.2; // initial velocity in rad/frame

    const tick = () => {
      state.velocity *= 0.991;
      state.angle += state.velocity;

      drawWheel(state.angle);

      if (state.velocity > 0.003) {
        state.rafId = requestAnimationFrame(tick);
      } else {
        state.spinning = false;
        const w = getWinnerFromAngle(state.angle);
        setWinner(w);
        setHistory((prev) => [w, ...prev.slice(0, 4)]);
        setShowWinner(true);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#3b82f6", "#8b5cf6", "#06b6d4", "#f1f5f9"],
        });
      }
    };
    state.rafId = requestAnimationFrame(tick);
  }, [names, drawWheel, getWinnerFromAngle]);

  useEffect(() => {
    return () => cancelAnimationFrame(spinRef.current.rafId);
  }, []);

  const applyNames = () => {
    const parsed = namesInput
      .split("\n")
      .map((n) => n.trim())
      .filter(Boolean);
    setNames(parsed);
    setWinner(null);
    setShowWinner(false);
    spinRef.current.angle = 0;
  };

  const removeWinner = () => {
    if (!winner) return;
    setNames((prev) => prev.filter((n) => n !== winner));
    setShowWinner(false);
    setWinner(null);
    spinRef.current.angle = 0;
  };

  const importFromEvent = async (eventId: string) => {
    setImporting(true);
    const { data } = await supabaseClient
      .from("event_registrations")
      .select("full_name")
      .eq("event_id", eventId);
    if (data) {
      const imported = data.map((r) => r.full_name);
      setNamesInput(imported.join("\n"));
      setNames(imported);
      setWinner(null);
      setShowWinner(false);
      spinRef.current.angle = 0;
    }
    setImporting(false);
  };

  const canvasSize = 380;

  return (
    <div className="space-y-8">
      <div className="flex flex-col xl:flex-row gap-8 items-start">

        {/* Wheel canvas */}
        <div className="flex flex-col items-center gap-6 flex-shrink-0 mx-auto xl:mx-0">
          <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            className="rounded-full"
            style={{ filter: "drop-shadow(0 0 32px rgba(59,130,246,0.3))" }}
          />

          {isFacilitator && (
            <button
              onClick={spin}
              disabled={spinRef.current.spinning || names.length === 0}
              className="w-48 bg-linear-to-r from-grad-blue via-grad-violet to-grad-cyan text-white font-black text-base h-13 rounded-2xl glow-btn hover:opacity-90 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {spinRef.current.spinning ? "Spinning…" : "SPIN ⚡"}
            </button>
          )}

          {!isFacilitator && (
            <p className="text-text-dim font-mono text-xs text-center">
              Spectator mode · Facilitator controls the spin
            </p>
          )}
        </div>

        {/* Controls (facilitator only) */}
        {isFacilitator && (
          <div className="flex-1 space-y-5 w-full">

            {/* Event import */}
            {events.length > 0 && (
              <div className="glass-card glow-border rounded-2xl p-5 space-y-3">
                <p className="text-xs font-mono text-text-dim uppercase tracking-widest">Import from Event</p>
                <div className="flex gap-3">
                  <select
                    id="event-import"
                    disabled={loadingEvents || importing}
                    onChange={(e) => e.target.value && importFromEvent(e.target.value)}
                    className="flex-1 bg-bg-elevated border border-border-subtle rounded-xl px-3 py-2.5 text-sm text-text-primary font-mono focus:outline-none focus:border-border-glow transition-colors disabled:opacity-50"
                    defaultValue=""
                  >
                    <option value="" disabled>Select an event…</option>
                    {events.map((ev) => (
                      <option key={ev.id} value={ev.id}>{ev.title}</option>
                    ))}
                  </select>
                </div>
                {importing && (
                  <p className="text-xs font-mono text-accent-glow animate-pulse">Fetching registrations…</p>
                )}
              </div>
            )}

            {/* Manual names */}
            <div className="glass-card glow-border rounded-2xl p-5 space-y-3">
              <p className="text-xs font-mono text-text-dim uppercase tracking-widest">Names (one per line)</p>
              <textarea
                value={namesInput}
                onChange={(e) => setNamesInput(e.target.value)}
                rows={8}
                placeholder={"Juan Dela Cruz\nMaria Santos\nAntonio Luna…"}
                className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary font-mono placeholder:text-text-dim focus:outline-none focus:border-border-glow transition-colors scrollbar-thin resize-none"
              />
              <button
                onClick={applyNames}
                className="w-full bg-bg-elevated border border-border-glow text-text-primary font-semibold text-sm h-10 rounded-xl hover:bg-bg-surface transition-colors cursor-pointer"
              >
                Apply Names ({namesInput.split("\n").filter((l) => l.trim()).length})
              </button>
            </div>

            {/* Active names count */}
            <p className="text-xs font-mono text-text-dim text-right">
              {names.length} name{names.length !== 1 ? "s" : ""} on wheel
            </p>
          </div>
        )}
      </div>

      {/* Winner overlay */}
      {showWinner && winner && (
        <div className="glass-card glow-border rounded-2xl p-8 text-center space-y-4 border-border-glow">
          <p className="text-xs font-mono text-accent-glow uppercase tracking-widest">🎉 Winner</p>
          <p className="text-4xl md:text-5xl font-black gradient-text">{winner}</p>
          {isFacilitator && (
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={removeWinner}
                className="bg-red-500/15 border border-red-500/30 text-red-400 font-mono text-xs px-4 py-2 rounded-xl hover:bg-red-500/25 transition-colors cursor-pointer"
              >
                Remove from wheel
              </button>
              <button
                onClick={() => setShowWinner(false)}
                className="bg-bg-elevated border border-border-subtle text-text-muted font-mono text-xs px-4 py-2 rounded-xl hover:border-border-glow transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      )}

      {/* Spin history */}
      {history.length > 0 && (
        <div className="glass-card glow-border rounded-2xl p-5 space-y-3">
          <p className="text-xs font-mono text-text-dim uppercase tracking-widest">Recent Winners</p>
          <ol className="space-y-1.5">
            {history.map((name, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-mono">
                <span className="text-text-dim w-4 shrink-0">{i + 1}.</span>
                <span className={i === 0 ? "gradient-text font-bold" : "text-text-muted"}>{name}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
