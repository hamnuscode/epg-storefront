import type { ReactNode, ElementType } from "react";
import { cn } from "@/lib/cn";

/**
 * The 1406px inner content width from the Figma artboard, with the
 * 24px gutters the Navbar and hero rows use on smaller screens.
 */
export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1406px] px-6", className)}>
      {children}
    </Tag>
  );
}
