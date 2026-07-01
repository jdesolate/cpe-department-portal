import { cn } from "@/lib/utils";

export function DiamondBullet({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block w-2 h-2 shrink-0 bg-background border border-gold rotate-45",
        className
      )}
    />
  );
}

export default function TraceDivider({
  label,
  as: Tag = "span",
  className,
}: {
  label?: string;
  /** Render the label as a real heading when it marks a section, instead of a plain span. */
  as?: "span" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <DiamondBullet />
      {label && (
        <Tag className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray whitespace-nowrap">
          {label}
        </Tag>
      )}
      <span className="trace-line flex-1" />
    </div>
  );
}
