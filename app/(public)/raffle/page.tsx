"use client";

import { useState, useRef } from "react";
import WheelOfNames from "@/components/WheelOfNames";
import FadeInView from "@/components/animations/FadeInView";

export default function RafflePage() {
  const [isFacilitator, setIsFacilitator] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const correctPin = process.env.NEXT_PUBLIC_RAFFLE_PIN ?? "1234";

  const openPinModal = () => {
    setPin("");
    setPinError(false);
    setShowPinModal(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const submitPin = () => {
    if (pin === correctPin) {
      setIsFacilitator(true);
      setShowPinModal(false);
      setPinError(false);
    } else {
      setPinError(true);
      setPin("");
      inputRef.current?.focus();
    }
  };

  return (
    <main className="min-h-screen px-4 md:px-8 py-16">
      <div className="max-w-5xl mx-auto">

        <FadeInView>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="font-mono text-accent-glow text-xs uppercase tracking-widest mb-3">
                // department.raffle
              </p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary">
                Wheel of{" "}
                <span className="gradient-text">Names</span>
              </h1>
              <p className="text-text-muted mt-2 text-base font-light">
                Live raffle tool for department events and org activities.
              </p>
            </div>

            {!isFacilitator ? (
              <button
                onClick={openPinModal}
                className="glass-card border border-border-subtle hover:border-border-glow text-text-muted hover:text-text-primary font-mono text-xs px-5 h-10 rounded-xl transition-all cursor-pointer shrink-0"
              >
                🔑 Facilitator Mode
              </button>
            ) : (
              <div className="flex items-center gap-2 glass-card border border-emerald-500/30 px-4 py-2 rounded-xl shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-mono text-xs font-bold tracking-wider">
                  Facilitator Active
                </span>
                <button
                  onClick={() => setIsFacilitator(false)}
                  className="text-text-dim hover:text-red-400 font-mono text-xs ml-2 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </FadeInView>

        <FadeInView delay={0.1}>
          <WheelOfNames isFacilitator={isFacilitator} />
        </FadeInView>
      </div>

      {/* PIN Modal */}
      {showPinModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg-base/80 backdrop-blur-md"
          onClick={(e) => { if (e.target === e.currentTarget) setShowPinModal(false); }}
        >
          <div className="glass-card glow-border rounded-2xl p-8 w-full max-w-sm mx-4 space-y-6">
            <div className="text-center space-y-1">
              <p className="text-2xl">🔑</p>
              <h2 className="text-xl font-black text-text-primary">Facilitator Mode</h2>
              <p className="text-text-dim font-mono text-xs">Enter the facilitator PIN to unlock spin controls.</p>
            </div>

            <div className="space-y-3">
              <input
                ref={inputRef}
                type="password"
                inputMode="numeric"
                maxLength={8}
                value={pin}
                onChange={(e) => { setPin(e.target.value); setPinError(false); }}
                onKeyDown={(e) => e.key === "Enter" && submitPin()}
                placeholder="Enter PIN"
                className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-center text-xl font-mono tracking-[0.5em] text-text-primary focus:outline-none focus:border-border-glow transition-colors placeholder:tracking-normal placeholder:text-sm"
              />
              {pinError && (
                <p className="text-red-400 font-mono text-xs text-center">Incorrect PIN. Try again.</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPinModal(false)}
                className="flex-1 bg-bg-elevated border border-border-subtle text-text-muted font-mono text-sm h-11 rounded-xl hover:border-border-glow transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={submitPin}
                className="flex-1 bg-linear-to-r from-grad-blue to-grad-cyan text-white font-bold text-sm h-11 rounded-xl glow-btn hover:opacity-90 transition-all cursor-pointer"
              >
                Unlock
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
