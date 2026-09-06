"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "./cart-provider";
import { QuantitySelector } from "./quantity-selector";

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency }).format(amount);
}

export function CartDrawer() {
  const { cart, isDrawerOpen, isMutating, closeDrawer, updateItem, removeItem } = useCart();
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isDrawerOpen) return;
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Sluit winkelwagen"
        className="absolute inset-0 h-full w-full bg-black/45"
        onClick={closeDrawer}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="nova-drawer absolute right-0 flex h-full w-full max-w-md flex-col border-l border-[var(--line)] bg-white shadow-[var(--shadow-soft)]"
      >
        <div className="flex items-center justify-between border-b border-[var(--line)] px-6 py-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--clay)]">
              Je selectie
            </p>
            <h2 id="cart-drawer-title" className="mt-1 text-2xl font-bold">
              Winkelwagen
            </h2>
          </div>
          <button
            ref={closeButton}
            type="button"
            aria-label="Sluit winkelwagen"
            onClick={closeDrawer}
            className="grid h-11 w-11 place-items-center text-2xl text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {!cart?.items.length ? (
            <div className="py-20 text-center">
              <p className="text-xl font-bold">Je winkelwagen is nog leeg.</p>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Bekijk het assortiment en test de productkeuzes.
              </p>
              <Link
                href="/shop"
                onClick={closeDrawer}
                className="mt-6 inline-block border-b border-[var(--accent)] pb-1 text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent)]"
              >
                Verder winkelen
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[var(--line)]">
              {cart.items.map((item) => {
                const image = item.variant?.image ?? item.product.images[0];
                const variantDescription = item.variant
                  ? Object.entries(item.variant.attributes)
                      .filter(([, value]) => value)
                      .map(([name, value]) => `${name}: ${value}`)
                      .join(" · ") || item.variant.name
                  : "";

                return (
                  <div key={item.id} className="flex gap-4 py-6">
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
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-2">
                        <p className="text-sm font-bold leading-5">{item.product.name}</p>
                        <button
                          type="button"
                          aria-label={`Verwijder ${item.product.name}`}
                          disabled={isMutating}
                          onClick={() => void removeItem(item.id)}
                          className="grid h-8 w-8 shrink-0 place-items-center text-xl leading-none text-[var(--muted)] disabled:opacity-50"
                        >
                          ×
                        </button>
                      </div>
                      {variantDescription ? (
                        <p className="mt-1 text-xs text-[var(--muted)]">
                          {variantDescription}
                        </p>
                      ) : null}
                      <div className="mt-4 flex items-center justify-between gap-2">
                        <QuantitySelector
                          value={item.quantity}
                          max={item.variant?.stockQuantity ?? item.product.stockQuantity}
                          disabled={isMutating}
                          onChange={(quantity) => void updateItem(item.id, quantity)}
                        />
                        <span className="text-sm font-bold">
                          {formatMoney(item.subtotal.amount, item.subtotal.currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cart?.items.length ? (
          <div className="border-t border-[var(--line)] bg-white p-6">
            <div className="flex justify-between text-sm font-bold">
              <span>Subtotaal</span>
              <span>{formatMoney(cart.totals.subtotal.amount, cart.totals.subtotal.currency)}</span>
            </div>
            <p className="mt-3 text-xs leading-5 text-[var(--muted)]">
              Demo-checkout: er wordt geen echte bestelling of betaling verwerkt.
            </p>
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="mt-4 block min-h-12 bg-[var(--accent)] px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[var(--ink)]"
            >
              Bekijk demo-checkout
            </Link>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
