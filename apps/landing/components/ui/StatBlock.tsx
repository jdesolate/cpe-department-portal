import { cn } from "@/lib/utils";

export default function StatBlock({
  value,
  label,
  light,
  className,
}: {
  value: string;
  label: string;
  /** Use lighter text for legibility over a dark background (e.g. a photo scrim). */
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("border-l-2 border-maroon-bright pl-4", className)}>
      <p className={cn("font-mono text-2xl font-semibold", light ? "text-gold" : "text-gold-text")}>{value}</p>
      <p className={cn("font-mono text-[10px] uppercase tracking-[0.16em] mt-0.5", light ? "text-white/70" : "text-gray")}>{label}</p>
    </div>
  );
}
