import type { ButtonHTMLAttributes } from "react";
import { cx } from "../../lib/utils";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...rest } = props;
  return (
    <button
      className={cx(
        "h-12 min-w-24 rounded-2xl px-4 text-base font-semibold transition active:scale-95 disabled:opacity-50",
        "bg-primary text-white",
        className,
      )}
      {...rest}
    />
  );
}
