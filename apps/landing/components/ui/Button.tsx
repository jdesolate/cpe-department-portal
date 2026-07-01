import { cn } from "@/lib/utils";

const VARIANT_CLASSES = {
  outline: "border border-gold text-gold-text bg-transparent hover:bg-gold hover:text-foreground",
  solid: "border border-gold bg-gold text-foreground hover:bg-gold-dim hover:border-gold-dim",
} as const;

export default function Button({
  variant = "outline",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof VARIANT_CLASSES;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-mono text-xs uppercase tracking-[0.03em] rounded-[4px] px-6 h-11 transition-colors duration-200 ease-out cursor-pointer",
        VARIANT_CLASSES[variant],
        className
      )}
      {...props}
    />
  );
}
