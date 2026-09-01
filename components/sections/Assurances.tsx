import { Container } from "@/components/ui/Container";
import { assurances } from "@/lib/data";
import { cn } from "@/lib/cn";
import { textStyles } from "@/lib/typography";

/**
 * Figma: "Frame 427321613" (1440x599) — the three-up reassurance band
 * (delivery / secure payment / support) sitting above the footer.
 */
export function Assurances() {
  return (
    <section aria-label="Why shop with us" className="bg-surface py-25">
      <Container>
        <ul className="grid gap-11 md:grid-cols-3">
          {assurances.map((item) => (
            <li key={item.title} className="flex flex-col gap-4 border-t border-line pt-8">
              <h3 className="font-condensed text-2xl font-semibold uppercase tracking-[0.12em] text-white">
                {item.title}
              </h3>
              <p className={cn(textStyles.bodySmall, "text-white/60")}>{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
