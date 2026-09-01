import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { Button, ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us — EPG",
  description:
    "Eastern Pro Gear is one of the world's largest sports manufacturing facilities, bringing craftsmanship, technology, and precision together.",
};

const IMG = {
  floor: "/images/d20ffc831b13.webp",
  sewing: "/images/c065de626cba.webp",
  bench: "/images/1d71098b6689.webp",
  building: "/images/01337295e4b9.webp",
  founder: "/images/83db4c68b360.webp",
  mark: "/images/e866f7853e8d.webp",
};

/** Figma: "About Us" (1440x5105). */
export default function AboutPage() {
  return (
    <>
      <main id="main">
        {/* Hero — ABOUT set huge along the lower edge, heading left, lead right */}
        <section className="relative isolate flex min-h-[640px] flex-col justify-end overflow-hidden bg-surface md:min-h-[770px]">
          <Image src={IMG.floor} alt="" fill priority sizes="100vw" className="-z-30 object-cover" />
          <div aria-hidden className="absolute inset-0 -z-20 bg-linear-to-t from-surface via-surface/45 to-black/45" />

          <Image
            src={IMG.mark}
            alt=""
            width={91}
            height={56}
            aria-hidden
            className="absolute right-10 top-24 -z-10 hidden w-[120px] opacity-90 md:block"
          />

          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-[2%] -z-10 select-none text-center font-display text-[26vw] uppercase leading-[0.74] tracking-[0.02em] text-white/12"
          >
            About
          </span>

          <Navbar />

          <div className="relative mx-auto flex w-full max-w-[1360px] flex-col gap-8 px-6 pb-16 md:flex-row md:items-end md:justify-between md:gap-16 md:px-10 md:pb-20">
            <div className="flex flex-col items-start gap-6">
              <h1 className="max-w-[470px] font-sans text-[clamp(1.9rem,3.8vw,3.4rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-white">
                Where the world&rsquo;s game gets built.
              </h1>
              <ButtonLink href="#contact" variant="solid" size="md">Send Us a Message</ButtonLink>
            </div>
            <p className="max-w-[470px] font-sans text-[17px] leading-[1.7] text-white">
              Eastern Pro Gear is one of the world&rsquo;s largest sports manufacturing
              facilities, bringing craftsmanship, technology, and precision together to
              create equipment built for athletes who demand more.
            </p>
          </div>
        </section>

        {/* Statement */}
        <section aria-labelledby="statement" className="bg-surface pt-20 md:pt-24">
          <div className="mx-auto max-w-[1360px] px-6 md:px-10">
            <p className="font-sans text-[15px] text-white/55">Built at scale. Built with purpose.</p>
            <h2 id="statement" className="mt-5 max-w-[1010px] font-sans text-[clamp(1.5rem,3.1vw,2.35rem)] font-medium leading-[1.32] tracking-[-0.025em] text-white">
              Eastern Pro Gear is a world-class sports manufacturing facility dedicated to
              turning ideas into high-performance equipment. From raw materials to the final
              product, every stage of production is driven by precision, craftsmanship, and
              an uncompromising attention to detail.
            </h2>
          </div>
        </section>

        {/* Facility imagery */}
        <section aria-label="Our facility" className="bg-surface py-10 md:py-14">
          <div className="mx-auto flex max-w-[1360px] flex-col gap-5 px-6 md:px-10">
            <div className="grid gap-5 lg:grid-cols-[900px_1fr]">
              <div className="relative aspect-[900/600] overflow-hidden rounded-lg bg-surface-raised">
                <Image src={IMG.sewing} alt="Cut and sew line" fill loading="lazy" sizes="(max-width:1024px) 100vw, 900px" className="object-cover" />
                <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-md bg-black/45 px-2.5 py-1.5 font-sans text-[11px] text-white backdrop-blur-md ring-1 ring-white/15">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.4" />
                  </svg>
                  Islamabad, Pakistan
                </span>
              </div>
              <div className="relative aspect-[438/600] overflow-hidden rounded-lg bg-surface-raised">
                <Image src={IMG.floor} alt="Assembly floor" fill loading="lazy" sizes="(max-width:1024px) 100vw, 438px" className="object-cover" />
              </div>
            </div>

            <div className="relative aspect-[1360/600] overflow-hidden rounded-lg bg-surface-raised">
              <Image src={IMG.bench} alt="Finished equipment on the line" fill loading="lazy" sizes="1360px" className="object-cover" />
            </div>
          </div>
        </section>

        {/* Founder */}
        <section aria-label="From the founder" className="bg-surface py-16 md:py-24">
          <div className="mx-auto max-w-[1090px] px-6 md:px-10">
            <div className="flex gap-6">
              <span className="relative size-[76px] shrink-0 overflow-hidden rounded-full bg-surface-muted">
                <Image src={IMG.founder} alt="" fill sizes="68px" className="object-cover" />
              </span>
              <blockquote className="font-sans text-[clamp(1.1rem,2.1vw,1.7rem)] leading-[1.55] text-white">
                Our facility brings skilled people, modern manufacturing capabilities, and
                rigorous quality standards under one roof. Whether it&rsquo;s equipment,
                apparel, or specialized sports products, we manufacture with the
                understanding that what leaves our facility doesn&rsquo;t simply become a
                product, it becomes part of an athlete&rsquo;s performance.
              </blockquote>
            </div>
            <p className="mt-9 text-right font-sans text-[clamp(1.05rem,1.8vw,1.5rem)] text-white/85">
              &ndash;&nbsp; Founder, EPG
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-h" className="bg-surface pb-16 md:pb-24">
          <div className="mx-auto grid max-w-[1360px] gap-6 px-6 md:px-10 lg:grid-cols-[560px_1fr]">
            <div className="relative min-h-[420px] overflow-hidden rounded-xl bg-surface-raised">
              <Image src={IMG.floor} alt="" fill loading="lazy" sizes="540px" className="object-cover" />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 p-7">
                <div className="flex flex-col gap-1.5">
                  <span className="font-sans text-[13px] text-white/60">Location</span>
                  <p className="font-condensed text-[15px] font-semibold uppercase leading-snug tracking-[0.08em] text-white">
                    28 Jackson Blvd Ste 1020<br />Chicago, IL
                  </p>
                </div>
                <div className="flex flex-col gap-2.5">
                  <span className="font-sans text-[13px] text-white/60">Follow Us</span>
                  <div className="flex gap-3.5">
                    {["Instagram", "Facebook", "YouTube"].map((s) => (
                      <a key={s} href="#" aria-label={s} className="text-white/75 transition-colors hover:text-white">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                          <rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.4" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#141414] p-8 md:p-12">
              <h2 id="contact-h" className="font-sans text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-[-0.03em] text-white">
                Contact Us
              </h2>
              <form className="mt-10 flex flex-col gap-9">
                <UnderlineField id="name" label="Full Name" />
                <UnderlineField id="email" label="E-mail" type="email" />
                <UnderlineField id="message" label="Message" />
                <Button type="submit" size="md" className="mt-2 w-fit">Submit</Button>
              </form>
            </div>
          </div>
        </section>

        {/* Building */}
        <section aria-label="EPG headquarters" className="bg-surface pb-16">
          <div className="mx-auto max-w-[1360px] px-6 md:px-10">
            <div className="relative aspect-[1360/531] overflow-hidden rounded-lg bg-surface-raised">
              <Image src={IMG.building} alt="EPG facility exterior" fill loading="lazy" sizes="1360px" className="object-cover" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/** The contact form uses underline fields, as the frame draws them. */
function UnderlineField({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-sans text-[15px] text-white/55">{label}</label>
      <input
        id={id}
        type={type}
        className="border-b border-white/25 bg-transparent pb-2 font-sans text-[15px] text-white outline-none transition-colors focus-visible:border-white"
      />
    </div>
  );
}
