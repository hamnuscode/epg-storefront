import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Footer } from "@/components/layouts/Footer";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "About Us — EPG",
  description:
    "Eastern Pro Gear is one of the world's largest sports manufacturing facilities, bringing craftsmanship, technology, and precision together.",
};

const IMG = {
  hero: "/images/d20ffc831b13.webp",
  wide: "/images/1d71098b6689.webp",
  floor: "/images/c065de626cba.webp",
  band: "/images/01337295e4b9.webp",
  founder: "/images/83db4c68b360.webp",
};

/** Figma: "About Us" (1440x5105). */
export default function AboutPage() {
  return (
    <>
      <main id="main">
        <PageHero
          display="About"
          title="Where the world&rsquo;s game gets built."
          tagline="Eastern Pro Gear is one of the world&rsquo;s largest sports manufacturing facilities."
          backdrop={IMG.hero}
          primaryCta={{ label: "Send Us a Message", href: "#contact" }}
          aside="Eastern Pro Gear is one of the world's largest sports manufacturing facilities, bringing craftsmanship, technology, and precision together to create equipment built for athletes who demand more."
        />

        {/* Lead statement */}
        <section aria-labelledby="lead" className="bg-surface py-25">
          <div className="mx-auto max-w-[1360px] px-6 md:px-10">
            <p className="font-condensed text-[15px] font-semibold uppercase tracking-[0.2em] text-brand-400">
              Built at scale. Built with purpose.
            </p>
            <h2 id="lead" className="mt-3 max-w-[900px] font-sans text-[clamp(1.2rem,2.4vw,1.75rem)] font-medium leading-[1.45] tracking-[-0.02em] text-white">
              Every stage of production is driven by precision, craftsmanship, and an
              uncompromising attention to detail.
            </h2>

            <div className="mt-12 grid gap-5 lg:grid-cols-[900px_1fr]">
              <div className="relative aspect-[900/600] overflow-hidden rounded-lg bg-surface-raised">
                <Image src={IMG.floor} alt="EPG manufacturing floor" fill loading="lazy" sizes="(max-width:1024px) 100vw, 900px" className="object-cover" />
              </div>
              <div className="relative aspect-[438/600] overflow-hidden rounded-lg bg-surface-raised">
                <Image src={IMG.hero} alt="Production line detail" fill loading="lazy" sizes="(max-width:1024px) 100vw, 438px" className="object-cover" />
              </div>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              <p className="font-sans text-[15px] leading-[1.85] text-white/60">
                Eastern Pro Gear is a world-class sports manufacturing facility dedicated
                to turning ideas into high-performance equipment. From raw materials to the
                final product, every stage of production is driven by precision,
                craftsmanship, and an uncompromising attention to detail.
              </p>
              <p className="font-sans text-[15px] leading-[1.85] text-white/60">
                Our facility brings skilled people, modern manufacturing capabilities, and
                rigorous quality standards under one roof. Whether it&rsquo;s equipment,
                apparel, or specialized sports products, we manufacture with the
                understanding that what leaves our facility doesn&rsquo;t simply become a
                product, it becomes part of an athlete&rsquo;s performance.
              </p>
            </div>
          </div>
        </section>

        {/* Wide facility band */}
        <section aria-label="Our facility" className="bg-surface">
          <div className="mx-auto max-w-[1360px] px-6 md:px-10">
            <div className="relative aspect-[1360/600] overflow-hidden rounded-lg bg-surface-raised">
              <Image src={IMG.wide} alt="Inside the EPG facility" fill loading="lazy" sizes="1360px" className="object-cover" />
            </div>
            <p className="mt-4 font-sans text-[15px] text-white/45">Islamabad, Pakistan</p>
          </div>
        </section>

        {/* Founder + location */}
        <section aria-label="Founder" className="bg-surface py-25">
          <div className="mx-auto grid max-w-[1360px] gap-6 px-6 md:px-10 lg:grid-cols-[597px_1fr]">
            <div className="relative aspect-[597/746] overflow-hidden rounded-2xl bg-surface-raised">
              <Image src={IMG.band} alt="" fill loading="lazy" sizes="597px" className="object-cover" />
            </div>
            <div className="flex flex-col justify-between gap-10 rounded-2xl bg-[#1c1c1c]/45 p-8 md:p-12">
              <blockquote className="font-sans text-[clamp(1.1rem,2vw,2rem)] font-medium leading-[1.4] tracking-[-0.02em] text-white">
                &ldquo;What leaves our facility doesn&rsquo;t simply become a product, it
                becomes part of an athlete&rsquo;s performance.&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <span className="relative size-[58px] overflow-hidden rounded-full bg-surface-muted">
                  <Image src={IMG.founder} alt="" fill sizes="58px" className="object-cover" />
                </span>
                <span className="flex flex-col">
                  <span className="font-sans text-[15px] text-white/50">&mdash;</span>
                  <span className="font-sans text-[clamp(1rem,1.6vw,1.4rem)] font-medium text-white">Founder, EPG</span>
                </span>
              </div>

              <dl className="grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <dt className="font-condensed text-[13px] uppercase tracking-[0.2em] text-white/45">Location</dt>
                  <dd className="font-condensed text-[clamp(0.95rem,1.4vw,1.25rem)] font-semibold uppercase leading-snug tracking-[0.1em] text-white">
                    28 Jackson Blvd Ste 1020 Chicago, IL
                  </dd>
                </div>
                <div className="flex flex-col gap-2">
                  <dt className="font-condensed text-[13px] uppercase tracking-[0.2em] text-white/45">Follow Us</dt>
                  <dd className="flex gap-4">
                    {["Instagram", "Facebook", "YouTube"].map((s) => (
                      <a key={s} href="#" aria-label={s} className="text-white/60 hover:text-white">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                          <rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3.4" />
                        </svg>
                      </a>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-h" className="bg-surface pb-25">
          <div className="mx-auto max-w-[1360px] px-6 md:px-10">
            <h2 id="contact-h" className="font-sans text-[clamp(1.75rem,3.4vw,3rem)] font-semibold tracking-[-0.035em] text-white">
              Contact Us
            </h2>
            <form className="mt-10 grid max-w-[900px] gap-6 sm:grid-cols-2">
              <Field id="name" label="Full Name" />
              <Field id="email" label="E-mail" type="email" />
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 block font-sans text-[clamp(0.95rem,1.4vw,1.25rem)] text-white/70">Message</label>
                <textarea id="message" rows={5}
                  className="w-full rounded-md border border-line bg-surface-raised px-4 py-3 font-sans text-[15px] text-white outline-none transition-colors focus-visible:border-brand-400" />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" size="md">Submit</Button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Field({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className={cn("mb-2 font-sans text-[clamp(0.95rem,1.4vw,1.25rem)] text-white/70")}>{label}</label>
      <input id={id} type={type}
        className="h-12 rounded-md border border-line bg-surface-raised px-4 font-sans text-[15px] text-white outline-none transition-colors focus-visible:border-brand-400" />
    </div>
  );
}
