import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { assets } from "@/lib/assets";
import { onOffPitch } from "@/lib/data";
import { textStyles } from "@/lib/typography";
import { cn } from "@/lib/cn";

/**
 * Figma: the "off on" instance (1440x733) — two stacked photo panels with the
 * split display headline reading "on pitch / OFF pitch" across them.
 */
export function OnOffPitch() {
  return (
    <section aria-labelledby="on-off" className="relative overflow-hidden bg-surface py-25">
      <div className="absolute inset-0">
        <Image
          src={assets.heroSlides[1]}
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-linear-to-b from-surface via-transparent to-surface" />
      </div>

      <Container className="relative flex flex-col items-center gap-8 text-center">
        <p className={cn(textStyles.ticker, "text-accent")}>{onOffPitch.eyebrow}</p>
        <h2 id="on-off" className={cn(textStyles.displayLg, "text-white")}>
          <span className="block">{onOffPitch.on}</span>
          <span className="block text-white/40">{onOffPitch.off}</span>
        </h2>
        <p className={cn(textStyles.bodyBase, "max-w-2xl text-white/76")}>
          {onOffPitch.body}
        </p>
      </Container>
    </section>
  );
}
