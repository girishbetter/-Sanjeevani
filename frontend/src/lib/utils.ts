export const cx = (...classes: Array<string | undefined | false>) => classes.filter(Boolean).join(" ");

export function adherencePct(taken: number, total: number): number {
  if (!total) {
    return 0;
  }
  return Math.round((taken / total) * 100);
}
