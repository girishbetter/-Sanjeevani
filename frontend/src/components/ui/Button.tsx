import type { ButtonHTMLAttributes } from "react";
import { cx } from "../../lib/utils";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, type = "button", ...rest } = props;
  return (
    <button
      type={type}
      className={cx(
        "inline-flex min-h-12 min-w-24 items-center justify-center gap-2 rounded-full px-5 text-base font-semibold shadow-sm transition",
        "bg-primary text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
        className,
      )}
      {...rest}
    />
  );
}
