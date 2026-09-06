"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";

export function CheckoutForm() {
  const { cart, isLoading } = useCart();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!cart?.items.length || isSubmitting) return;

    setIsSubmitting(true);
    setMessage("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ demo: true }),
      });
      const result = await response.json() as { reference?: string; message?: string; error?: string };
      if (!response.ok) throw new Error(result.error ?? "Demo-checkout is niet beschikbaar.");
      setMessage(`${result.reference}: ${result.message}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Demo-checkout is niet beschikbaar.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 border border-[var(--line)] bg-white p-5 sm:p-7">
      <p className="text-sm leading-6 text-[var(--muted)]">
        Dit is alleen een klikbare preview van de checkout. Er worden geen
        persoonsgegevens gevraagd, geen bestelling aangemaakt en geen betaling
        verwerkt.
      </p>
      <button
        className="mt-6 min-h-12 w-full bg-[var(--accent)] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
        type="submit"
        disabled={isLoading || !cart?.items.length || isSubmitting}
      >
        {isSubmitting ? "Preview laden…" : "Test demo-checkout"}
      </button>
      {!isLoading && !cart?.items.length ? (
        <p className="mt-3 text-sm text-[var(--muted)]">
          Voeg eerst een product toe om de checkout-preview te testen.
        </p>
      ) : null}
      {isLoading ? (
        <p className="mt-3 text-sm text-[var(--muted)]" role="status">
          Winkelwagen laden…
        </p>
      ) : null}
      {message ? (
        <p
          className="mt-5 border-l-4 border-[var(--clay)] bg-[var(--paper)] p-4 text-sm font-semibold"
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
