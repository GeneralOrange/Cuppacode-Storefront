"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { QuantitySelector } from "@/components/cart/quantity-selector";
import { useCart } from "@/components/cart/cart-provider";

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency }).format(amount);
}

export default function CartPage() {
  const { cart, isLoading, isMutating, updateItem, removeItem } = useCart();

  return (
    <SiteShell>
      <section className="mx-auto max-w-5xl px-5 py-10 lg:px-8 lg:py-14">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--clay)]">
          Je selectie
        </p>
        <h1 className="germat-page-title mt-3 font-semibold">Winkelwagen</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Demo-omgeving · prijzen en voorraad zijn indicatief.
        </p>

        {isLoading ? (
          <p className="mt-8 text-sm text-[var(--muted)]" role="status">
            Winkelwagen laden…
          </p>
        ) : !cart?.items.length ? (
          <div className="mt-8 border-y border-[var(--line)] py-12">
            <p className="font-semibold">Je winkelwagen is nog leeg.</p>
            <Link
              href="/shop"
              className="mt-5 inline-block text-sm font-bold text-[var(--accent)] underline underline-offset-4"
            >
              Bekijk assortiment
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {cart.items.map((item) => {
                const image = item.variant?.image ?? item.product.images[0];
                const optionText = item.variant
                  ? Object.entries(item.variant.attributes)
                      .filter(([, value]) => value)
                      .map(([name, value]) => `${name}: ${value}`)
                      .join(" · ") || item.variant.name
                  : "";
                return (
                  <article key={item.id} className="flex flex-wrap items-center gap-4 py-5 sm:gap-6">
                    <div className="relative h-24 w-24 shrink-0 border border-[var(--line)] bg-[var(--accent-soft)]">
                      {image ? (
                        <Image
                          src={image.url}
                          alt={image.alt || item.product.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-[180px] flex-1">
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="font-bold underline-offset-4 hover:underline"
                      >
                        {item.product.name}
                      </Link>
                      {optionText ? (
                        <p className="mt-1 text-sm text-[var(--muted)]">{optionText}</p>
                      ) : null}
                      <p className="mt-1 text-xs text-[var(--muted)]">
                        {formatMoney(item.unitPrice.amount, item.unitPrice.currency)} per stuk
                      </p>
                    </div>
                    <QuantitySelector
                      value={item.quantity}
                      max={item.variant?.stockQuantity ?? item.product.stockQuantity}
                      disabled={isMutating}
                      onChange={(quantity) => void updateItem(item.id, quantity)}
                    />
                    <p className="min-w-24 text-right font-bold">
                      {formatMoney(item.subtotal.amount, item.subtotal.currency)}
                    </p>
                    <button
                      type="button"
                      disabled={isMutating}
                      onClick={() => void removeItem(item.id)}
                      className="min-h-11 px-2 text-sm font-semibold text-[var(--muted)] underline underline-offset-4 disabled:opacity-50"
                    >
                      Verwijderen
                    </button>
                  </article>
                );
              })}
            </div>
            <div className="ml-auto mt-7 max-w-sm">
              <div className="flex justify-between border-b border-[var(--line)] pb-4 text-lg font-bold">
                <span>Subtotaal</span>
                <span>
                  {formatMoney(cart.totals.subtotal.amount, cart.totals.subtotal.currency)}
                </span>
              </div>
              <p className="mt-3 text-xs leading-5 text-[var(--muted)]">
                Verzendkosten en echte voorwaarden zijn niet opgenomen in deze demo.
              </p>
              <Link
                href="/checkout"
                className="mt-5 block min-h-12 bg-[var(--accent)] px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.1em] text-white"
              >
                Bekijk demo-checkout
              </Link>
            </div>
          </>
        )}
      </section>
    </SiteShell>
  );
}
