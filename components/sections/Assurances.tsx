import { Container } from "@/components/ui/Container";
import { assurances } from "@/lib/data";

const ICONS: Record<string, React.ReactNode> = {
  truck: (
    <>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" strokeWidth="1.5" />
      <circle cx="7" cy="18" r="1.8" strokeWidth="1.5" />
      <circle cx="17.5" cy="18" r="1.8" strokeWidth="1.5" />
    </>
  ),
  card: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" strokeWidth="1.5" />
      <path d="M2.5 10h19" strokeWidth="1.5" />
    </>
  ),
  support: (
    <>
      <path d="M4 13a8 8 0 1116 0" strokeWidth="1.5" />
      <rect x="2.5" y="13" width="4" height="6" rx="1.5" strokeWidth="1.5" />
      <rect x="17.5" y="13" width="4" height="6" rx="1.5" strokeWidth="1.5" />
    </>
  ),
};

/** Figma: "Frame 427321613" (1440x599) — three-up reassurance band. */
export function Assurances() {
  return (
    <section aria-label="Why shop with us" className="bg-surface py-16 md:py-20">
      <Container>
        <ul className="grid gap-10 text-center md:grid-cols-3">
          {assurances.map((item) => (
            <li key={item.title} className="flex flex-col items-center gap-4">
              <svg
                width="40" height="40" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden className="text-white"
              >
                {ICONS[item.icon]}
              </svg>
              <h3 className="font-sans text-base font-semibold tracking-[-0.02em] text-white">
                {item.title}
              </h3>
              <p className="max-w-[280px] font-sans text-xs leading-[1.6] text-white/50">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
