import { cn } from "@/lib/utils";

export default function StatBlock({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("border-l-2 border-maroon-bright pl-4", className)}>
      <p className="font-mono text-2xl font-semibold text-gold-text">{value}</p>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray mt-0.5">{label}</p>
    </div>
  );
}
