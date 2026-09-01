const STEPS = [
  { title: "Choose Product", body: "Pick your gear" },
  { title: "Customize", body: "Personalize every detail" },
  { title: "Preview in 3D", body: "See it come to life" },
  { title: "Add to Cart", body: "Purchase your design" },
  { title: "Manufacturing", body: "Crafted to perfection" },
  { title: "Delivered", body: "Right to your doorstep" },
] as const;

/**
 * Figma: "Wireframe - 25" on Custom (1440x412) — YOUR CUSTOM JOURNEY.
 * Six steps in a single row. Numbered because the content genuinely is an
 * ordered process, not because numbering looks tidy.
 */
export function CustomJourney() {
  return (
    <section aria-labelledby="journey" className="bg-surface py-25">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <h2 id="journey" className="font-condensed text-[28px] font-semibold uppercase leading-none tracking-[0.1em] text-white">
          Your Custom Journey
        </h2>

        <ol className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-6 lg:gap-[36px]">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-2.5">
              <span className="font-condensed text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-condensed text-[18px] font-semibold uppercase leading-tight tracking-[0.1em] text-white">
                {step.title}
              </h3>
              <p className="font-sans text-[14px] text-white/50">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
