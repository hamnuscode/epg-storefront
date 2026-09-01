import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { textStyles } from "@/lib/typography";

/**
 * The heading + optional trailing control row used by "Shop by Category",
 * "Our Sports" and "Find Your Gear" (Figma: Frame 22 / Frame 17).
 */
export function SectionHeading({
  title,
  description,
  action,
  className,
  id,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-8 md:flex-row md:items-center md:justify-between",
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <h2 id={id} className={textStyles.sectionTitle}>
          {title}
        </h2>
        {description && (
          <p className={cn(textStyles.bodySmall, "max-w-xl text-white/60")}>
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
