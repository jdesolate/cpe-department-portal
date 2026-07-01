import { cn } from "@/lib/utils";

const TONE_CLASSES = {
  maroon: "border-maroon-bright text-maroon-bright",
  gold: "border-gold text-gold",
  muted: "border-line text-gray",
} as const;

export default function Tag({
  children,
  tone = "maroon",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof TONE_CLASSES;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono text-[10px] uppercase tracking-[0.16em] px-2 py-0.5 rounded-[2px] border",
        TONE_CLASSES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
