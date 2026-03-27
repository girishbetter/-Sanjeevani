import type { HTMLAttributes } from "react";
import { cx } from "../../lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("rounded-3xl border-0 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.08)]", className)} {...props} />;
}
