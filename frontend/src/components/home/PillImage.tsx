export function PillImage({ src, alt }: { src?: string; alt: string }) {
  return <img className="h-12 w-12 rounded-xl border object-cover" src={src || "https://placehold.co/80x80"} alt={alt} />;
}
