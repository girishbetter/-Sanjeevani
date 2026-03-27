import { cx } from "../../lib/utils";

type Size = "sm" | "md" | "lg";

const sizeClasses: Record<Size, string> = {
  sm: "h-12 w-12 rounded-2xl",
  md: "h-16 w-16 rounded-[1.5rem]",
  lg: "h-24 w-24 rounded-[1.75rem]",
};

export function BrandLogo({ size = "md", className }: { size?: Size; className?: string }) {
  return (
    <img
      alt="Sanjeevani logo"
      src="/logo.png"
      className={cx(
        "object-contain bg-white p-1 shadow-[0_16px_36px_rgba(47,159,156,0.16)] ring-1 ring-white/70",
        sizeClasses[size],
        className,
      )}
    />
  );
}
