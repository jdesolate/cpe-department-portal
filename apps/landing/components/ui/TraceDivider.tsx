import { cn } from "@/lib/utils";

export function DiamondBullet({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block w-2 h-2 shrink-0 bg-ink border border-gold rotate-45",
        className
      )}
    />
  );
}

export default function TraceDivider({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <DiamondBullet />
      {label && (
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray whitespace-nowrap">
          {label}
        </span>
      )}
      <span className="trace-line flex-1" />
    </div>
  );
}
