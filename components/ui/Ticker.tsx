import { cn } from "@/lib/cn";
import { textStyles } from "@/lib/typography";

/**
 * The 50px marquee strip above the footer (Figma: "Ticker 1").
 * Items are rendered three times so the CSS translate of -33.333%
 * loops seamlessly. Paused for prefers-reduced-motion via globals.css.
 */
export function Ticker({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  const run = [...items, ...items, ...items];
  return (
    <div
      className={cn(
        "relative flex h-[48px] items-center overflow-hidden",
        "bg-linear-to-r from-[#0e2745] via-[#1b4f8a] to-[#0e2745]",
        className
      )}
      aria-hidden
    >
      <div className="animate-ticker flex w-max shrink-0 items-center gap-10 whitespace-nowrap">
        {run.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10">
            <span className={cn(textStyles.ticker, "text-[15px] tracking-[0.2em] text-white")}>{item}</span>
            <span className="size-1.5 shrink-0 bg-white/80" />
          </span>
        ))}
      </div>
    </div>
  );
}
