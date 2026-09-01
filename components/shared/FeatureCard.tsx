import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * The three cards pinned to the bottom of the hero (Figma: Frame 7 ->
 * Frame 8/11/12 at 448x125, fill #363636 @ 42%, 14px padding, arrow at right).
 */
export function FeatureCard({
  title,
  description,
  image,
  href = "#",
  className,
}: {
  title: string;
  description: string;
  image: string;
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex w-full items-center justify-between gap-2.5 rounded-lg p-3.5",
        "bg-[#363636]/42 backdrop-blur-md transition-colors duration-300 hover:bg-[#363636]/60",
        "md:w-[448px]",
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        <Image
          src={image}
          alt=""
          width={145}
          height={97}
          sizes="145px"
          className="h-[97px] w-[145px] shrink-0 rounded-sm object-cover"
        />
        <div className="flex flex-col gap-2">
          <h3 className="font-sans text-base font-semibold tracking-[-0.03em] text-white">
            {title}
          </h3>
          <p className="font-sans text-sm leading-[1.35] text-white/60">
            {description}
          </p>
        </div>
      </div>
      <span
        aria-hidden
        className="shrink-0 text-white/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M5 15L15 5M15 5H7M15 5v8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
