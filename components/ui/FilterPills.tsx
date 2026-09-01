"use client";

import { cn } from "@/lib/cn";

export interface FilterPillsProps {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  /** Accessible name for the group, e.g. "Filter categories". */
  label: string;
  size?: "sm" | "md";
  className?: string;
}

/**
 * The rounded filter row from the Category section (Figma: Frame 20).
 * 40px tall, 18px inline padding, r24; selected pill fills #292929.
 * Implemented as a tablist so arrow keys move between options.
 */
export function FilterPills({ options, value, onChange, label, size = "md", className }: FilterPillsProps) {
  const move = (dir: 1 | -1, current: number) => {
    const next = (current + dir + options.length) % options.length;
    onChange(options[next]);
    document.getElementById(`pill-${options[next]}`)?.focus();
  };

  return (
    <div role="tablist" aria-label={label} className={cn("flex items-center gap-1", className)}>
      {options.map((option, i) => {
        const selected = option === value;
        return (
          <button
            key={option}
            id={`pill-${option}`}
            role="tab"
            type="button"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") { e.preventDefault(); move(1, i); }
              if (e.key === "ArrowLeft") { e.preventDefault(); move(-1, i); }
            }}
            className={cn(
              "rounded-xl font-sans font-medium tracking-[-0.02em]",
              size === "sm" ? "h-8 px-3.5 text-sm" : "h-10 px-4.5 text-xl font-semibold",
              "transition-colors duration-200 [transition-timing-function:var(--ease-out-soft)]",
              selected ? "bg-line text-white" : "text-white/50 hover:text-white/80"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
