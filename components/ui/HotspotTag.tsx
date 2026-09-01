import { cn } from "@/lib/cn";

/**
 * Figma: the pill labels pinned onto category hero photography
 * ("Karate Gi", "Karate Belt"). Small mark, then the label, on a
 * translucent slate ground.
 */
export function HotspotTag({
  label,
  className,
  style,
}: {
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={style}
      className={cn(
        "pointer-events-none absolute z-10 inline-flex items-center gap-1.5",
        "rounded-md bg-white/12 px-2 py-1 backdrop-blur-md",
        "font-sans text-[10px] text-white/90 ring-1 ring-white/15",
        className
      )}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 opacity-70">
        <path d="M4 8h16M4 13h16M4 18h10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      {label}
    </span>
  );
}
