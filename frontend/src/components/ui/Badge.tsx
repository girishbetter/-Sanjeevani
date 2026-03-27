import type { HTMLAttributes } from "react";
import { cx } from "../../lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx("inline-flex rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800", className)} {...props} />;
}
