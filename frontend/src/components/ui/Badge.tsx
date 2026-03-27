import type { HTMLAttributes } from "react";
import { cx } from "../../lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx("inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-primary", className)} {...props} />;
}
