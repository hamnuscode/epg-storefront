"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const schema = z.object({
  email: z.string().min(1, "Enter your email").email("That email does not look right"),
  country: z.string().min(1, "Choose a country"),
  firstName: z.string().min(1, "Enter your first name"),
  lastName: z.string().min(1, "Enter your last name"),
  address: z.string().min(1, "Enter your address"),
  apartment: z.string().optional(),
  city: z.string().min(1, "Enter your city"),
  state: z.string().min(1, "Enter your state"),
  postcode: z.string().min(1, "Enter your postcode"),
  phone: z.string().min(1, "Enter your phone number"),
  cardNumber: z.string().min(12, "Enter a valid card number"),
  expiry: z.string().min(4, "MM / YY"),
  cvc: z.string().min(3, "Security code"),
  cardName: z.string().min(1, "Enter the name on the card"),
});
type Values = z.infer<typeof schema>;

const WALLETS = [
  { label: "shop", cls: "bg-[#5a31f4] text-white" },
  { label: "PayPal", cls: "bg-[#ffc439] text-[#003087]" },
  { label: "Apple Pay", cls: "bg-black text-white ring-1 ring-white/20" },
  { label: "G Pay", cls: "bg-white text-surface" },
];

const UPSELL = [{ id: "u1" }, { id: "u2" }, { id: "u3" }];

/**
 * Figma: "Checkout" (1440x2486) — the form column on #0c0c0c beside the cart
 * summary on #1a1a1a. Express wallets sit above an "OR" rule; the summary
 * carries the line item, coupon field, totals and an upsell list.
 */
export function CheckoutForm() {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<Values>({ resolver: zodResolver(schema), defaultValues: { country: "United States" } });

  const subtotal = 89.99, shipping = 2.55, taxes = 5.4;
  const total = subtotal + shipping + taxes;

  return (
    <div className="grid lg:grid-cols-2">
      {/* Form */}
      <section aria-labelledby="checkout-h" className="bg-surface px-6 py-12 lg:px-16">
        <div className="mx-auto flex max-w-[480px] flex-col gap-8">
          <h1 id="checkout-h" className="sr-only">Checkout</h1>

          <div className="flex flex-col gap-4">
            <p className="text-center font-condensed text-[10px] uppercase tracking-[0.22em] text-white/50">
              Express Checkout
            </p>
            <div className="grid grid-cols-4 gap-2.5">
              {WALLETS.map((w) => (
                <button key={w.label} type="button" className={cn("h-10 rounded-md font-sans text-xs font-semibold", w.cls)}>
                  {w.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="h-px flex-1 bg-line" />
              <span className="font-sans text-[11px] text-white/45">OR</span>
              <span className="h-px flex-1 bg-line" />
            </div>
          </div>

          {done ? (
            <p role="status" className="rounded-md border border-success/40 bg-success/10 p-5 font-sans text-sm text-white">
              Order placed. A confirmation is on its way to your inbox.
            </p>
          ) : (
            <form
              noValidate
              onSubmit={handleSubmit(async () => { await new Promise((r) => setTimeout(r, 600)); setDone(true); })}
              className="flex flex-col gap-7"
            >
              <fieldset className="flex flex-col gap-3 border-0 p-0">
                <legend className="mb-1 font-sans text-lg font-semibold text-white">Contact Information</legend>
                <Field id="email" placeholder="Email Address" type="email" register={register} error={errors.email?.message} />
                <label className="flex items-center gap-2 font-sans text-xs text-white/65">
                  <input type="checkbox" defaultChecked className="size-3.5 accent-white" />
                  Email me with news and offers
                </label>
              </fieldset>

              <fieldset className="flex flex-col gap-3 border-0 p-0">
                <legend className="mb-1 font-sans text-lg font-semibold text-white">Delivery</legend>
                <label className="flex flex-col gap-1 rounded-md border border-line bg-transparent px-3 py-2">
                  <span className="font-sans text-[10px] text-white/45">Country/Region</span>
                  <select {...register("country")} className="bg-transparent font-sans text-xs text-white outline-none">
                    <option>United States</option><option>Canada</option><option>United Kingdom</option><option>Pakistan</option>
                  </select>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <Field id="firstName" placeholder="First Name" register={register} error={errors.firstName?.message} />
                  <Field id="lastName" placeholder="Last Name" register={register} error={errors.lastName?.message} />
                </div>
                <Field id="address" placeholder="Address" register={register} error={errors.address?.message} />
                <Field id="apartment" placeholder="Appartement, suite" register={register} />
                <div className="grid grid-cols-3 gap-3">
                  <Field id="city" placeholder="City" register={register} error={errors.city?.message} />
                  <Field id="state" placeholder="State" register={register} error={errors.state?.message} />
                  <Field id="postcode" placeholder="Postcode" register={register} error={errors.postcode?.message} />
                </div>
                <Field id="phone" placeholder="Phone" register={register} error={errors.phone?.message} />
              </fieldset>

              <fieldset className="flex flex-col gap-3 border-0 p-0">
                <legend className="mb-0.5 font-sans text-lg font-semibold text-white">Payment Method</legend>
                <p className="mb-1 font-sans text-[11px] text-white/45">All transactions are secure and encrypted.</p>
                <div className="rounded-md border border-line">
                  <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2.5">
                    <span className="flex items-center gap-2">
                      <input type="radio" defaultChecked name="pm" className="size-3.5 accent-white" />
                      <span className="font-sans text-xs text-white/70">Credit card</span>
                    </span>
                    <span className="flex gap-1.5">
                      {["VISA", "MC", "AMEX"].map((b) => (
                        <span key={b} className="rounded-sm bg-white px-1.5 py-0.5 font-sans text-[8px] font-bold text-surface">{b}</span>
                      ))}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3 p-3">
                    <Field id="cardNumber" placeholder="Card number" register={register} error={errors.cardNumber?.message} />
                    <div className="grid grid-cols-2 gap-3">
                      <Field id="expiry" placeholder="Expiration date (MM / YY)" register={register} error={errors.expiry?.message} />
                      <Field id="cvc" placeholder="Security code" register={register} error={errors.cvc?.message} />
                    </div>
                    <Field id="cardName" placeholder="Name on card" register={register} error={errors.cardName?.message} />
                  </div>
                </div>
              </fieldset>

              <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
                Pay ${total.toFixed(2)}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Cart */}
      <section aria-labelledby="cart-h" className="bg-[#1a1a1a] px-6 py-12 lg:px-16">
        <div className="mx-auto flex max-w-[460px] flex-col gap-7">
          <div className="flex items-center justify-between">
            <h2 id="cart-h" className="font-sans text-lg font-semibold text-white">Your cart (1)</h2>
            <Button variant="outline" size="sm">Edit Order</Button>
          </div>

          <div className="flex items-start gap-4">
            <span className="size-[76px] shrink-0 bg-surface-muted" aria-hidden />
            <div className="flex flex-1 flex-col gap-1">
              <h3 className="font-condensed text-sm font-semibold uppercase tracking-[0.1em] text-white">
                Stelth Boxing Gloves
              </h3>
              <p className="font-condensed text-[10px] uppercase italic tracking-[0.18em] text-white/45">
                Black / White
              </p>
              <button type="button" className="mt-2 w-fit font-condensed text-[10px] uppercase tracking-[0.18em] text-white/60 underline underline-offset-4 hover:text-white">
                Remove
              </button>
            </div>
            <span className="font-sans text-sm tabular-nums text-white">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex gap-2.5">
            <label className="flex-1">
              <span className="sr-only">Coupon code</span>
              <input
                placeholder="COUPON CODE"
                className="h-10 w-full rounded-md border border-line bg-transparent px-3 font-condensed text-[10px] uppercase tracking-[0.18em] text-white outline-none placeholder:text-white/40 focus-visible:border-brand-400"
              />
            </label>
            <button type="button" className="h-10 shrink-0 rounded-md bg-surface-muted px-4 font-sans text-xs text-white/80 hover:bg-line-strong">
              Apply discount
            </button>
          </div>

          <dl className="flex flex-col gap-2.5 font-sans text-xs">
            <Line label="Subtotal · 1 item" value={`$${subtotal.toFixed(2)}`} />
            <Line label="Shipping" value={`$${shipping.toFixed(2)}`} />
            <Line label="Estimated taxes" value={`$${taxes.toFixed(2)}`} />
            <div className="mt-1 flex items-center justify-between">
              <dt className="font-semibold text-white">Subtotal</dt>
              <dd className="text-base font-semibold tabular-nums text-white">${total.toFixed(2)}</dd>
            </div>
          </dl>

          <div className="flex flex-col gap-4">
            <h3 className="font-sans text-xs text-white/70">You might also like</h3>
            {UPSELL.map((u) => (
              <div key={u.id} className="flex items-center gap-4">
                <span className="size-[52px] shrink-0 bg-surface-muted" aria-hidden />
                <span className="flex-1 font-sans text-xs font-medium text-white">Hyderation Bottle</span>
                <span className="font-sans text-xs tabular-nums text-white">$9.99</span>
                <button type="button" aria-label="Add Hyderation Bottle" className="grid size-7 shrink-0 place-items-center bg-surface-muted text-white transition-colors hover:bg-white hover:text-surface">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-white/55">{label}</dt>
      <dd className="tabular-nums text-white/85">{value}</dd>
    </div>
  );
}

function Field({
  id, placeholder, type = "text", register, error,
}: {
  id: keyof Values;
  placeholder: string;
  type?: string;
  register: ReturnType<typeof useForm<Values>>["register"];
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="sr-only">{placeholder}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...register(id)}
        className={cn(
          "h-10 w-full rounded-md border bg-transparent px-3 font-sans text-xs text-white outline-none transition-colors placeholder:text-white/40",
          error ? "border-danger" : "border-line focus-visible:border-brand-400"
        )}
      />
      {error && <p id={`${id}-error`} role="alert" className="font-sans text-[10px] text-danger">{error}</p>}
    </div>
  );
}
