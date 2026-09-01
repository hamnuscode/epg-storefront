"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { gearProducts } from "@/lib/data";
import { cn } from "@/lib/cn";

const schema = z.object({
  email: z.string().min(1, "Enter your email").email("That email does not look right"),
  firstName: z.string().min(1, "Enter your first name"),
  lastName: z.string().min(1, "Enter your last name"),
  address: z.string().min(1, "Enter your address"),
  city: z.string().min(1, "Enter your city"),
  postcode: z.string().min(1, "Enter your postcode"),
  country: z.string().min(1, "Enter your country"),
});

type Values = z.infer<typeof schema>;

const LINE_ITEMS = gearProducts.slice(0, 3).map((p, i) => ({ ...p, qty: i === 0 ? 2 : 1 }));

/**
 * Figma: "Frame 427321786" — the checkout split. Left column is the address
 * form on #0c0c0c, right column the order summary on #1a1a1a.
 */
export function CheckoutForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const subtotal = LINE_ITEMS.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal > 150 ? 0 : 12;
  const total = subtotal + shipping;

  return (
    <div className="grid lg:grid-cols-2">
      {/* Form */}
      <section aria-labelledby="details" className="bg-surface px-6 py-25 lg:px-16">
        <div className="mx-auto flex max-w-[560px] flex-col gap-8">
          <h1 id="details" className="font-sans text-4xl font-semibold tracking-[-0.03em] text-white">
            Checkout
          </h1>

          {submitted ? (
            <p role="status" className="rounded-lg border border-success/40 bg-success/10 p-5 font-sans text-base text-white">
              Order placed. A confirmation is on its way to your inbox.
            </p>
          ) : (
            <form
              noValidate
              onSubmit={handleSubmit(async () => {
                await new Promise((r) => setTimeout(r, 600));
                setSubmitted(true);
              })}
              className="flex flex-col gap-6"
            >
              <Field id="email" label="Email address" type="email" register={register} error={errors.email?.message} />
              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="firstName" label="First name" register={register} error={errors.firstName?.message} />
                <Field id="lastName" label="Last name" register={register} error={errors.lastName?.message} />
              </div>
              <Field id="address" label="Address" register={register} error={errors.address?.message} />
              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="city" label="City" register={register} error={errors.city?.message} />
                <Field id="postcode" label="Postcode" register={register} error={errors.postcode?.message} />
              </div>
              <Field id="country" label="Country" register={register} error={errors.country?.message} />

              <Button type="submit" size="lg" loading={isSubmitting} className="mt-2">
                PAY ${total.toFixed(2)}
              </Button>
              <p className="font-sans text-sm text-white/40">
                All payments are made through a secure server.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Summary */}
      <section aria-labelledby="summary" className="bg-[#1a1a1a] px-6 py-25 lg:px-16">
        <div className="mx-auto flex max-w-[560px] flex-col gap-8">
          <h2 id="summary" className="font-condensed text-2xl font-semibold uppercase tracking-[0.12em] text-white">
            Order summary
          </h2>

          <ul className="flex flex-col gap-5">
            {LINE_ITEMS.map((item) => (
              <li key={item.id} className="flex items-center gap-4">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-sm bg-surface">
                  <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
                  <span className="absolute right-0 top-0 grid size-5 place-items-center rounded-bl-sm bg-white font-sans text-xs font-semibold text-surface">
                    {item.qty}
                  </span>
                </div>
                <span className="flex-1 font-condensed text-lg font-semibold uppercase tracking-[0.08em] text-white">
                  {item.name}
                </span>
                <span className="font-sans text-base tabular-nums text-white">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="flex flex-col gap-3 border-t border-line pt-6 font-sans text-base">
            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
            <div className="mt-2 border-t border-line pt-4">
              <Row label="Total" value={`$${total.toFixed(2)}`} strong />
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={cn(strong ? "text-white" : "text-white/60")}>{label}</dt>
      <dd className={cn("tabular-nums", strong ? "text-xl font-semibold text-white" : "text-white/80")}>
        {value}
      </dd>
    </div>
  );
}

function Field({
  id, label, type = "text", register, error,
}: {
  id: keyof Values;
  label: string;
  type?: string;
  register: ReturnType<typeof useForm<Values>>["register"];
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-condensed text-base uppercase tracking-[0.14em] text-white/50">
        {label}
      </label>
      <input
        id={id}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...register(id)}
        className={cn(
          "h-12 rounded-xl border bg-surface-raised px-4 font-sans text-base text-white",
          "outline-none transition-colors placeholder:text-white/30",
          error ? "border-danger" : "border-line focus-visible:border-brand-400"
        )}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="font-sans text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
