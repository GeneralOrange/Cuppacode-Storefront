"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { themeConfig } from "@/config/theme";

export function SiteHeader() {
  const { cart, openDrawer } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigation = themeConfig.navigation;
  const isGermat = themeConfig.key === "germat";

  return (
    <header className="relative z-30 border-b border-[var(--line)] bg-white">
      <div className="mx-auto flex min-h-[72px] max-w-[var(--content-width)] items-center justify-between gap-2 px-3 sm:gap-4 sm:px-5 lg:px-8">
        <Link href="/" aria-label={`${themeConfig.brand.name} home`} className="shrink-0">
          <span className="block text-xl font-extrabold leading-none tracking-[0.08em] text-[var(--primary-navy)] sm:text-[1.45rem] sm:tracking-[0.11em]">
            {themeConfig.brand.name}
          </span>
          <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)] sm:block">
            {isGermat ? "Gereedschap & materialen" : "Objects for everyday rituals"}
          </span>
        </Link>

        <nav
          aria-label="Hoofdnavigatie"
          className="hidden items-center gap-3 text-xs font-semibold tracking-[0.01em] xl:flex"
        >
          {navigation.slice(0, 3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-3 transition-colors hover:text-[var(--accent)]"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="desktop-category-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center gap-2 py-3 transition-colors hover:text-[var(--accent)]"
          >
            Assortiment <span aria-hidden="true">{menuOpen ? "−" : "+"}</span>
          </button>
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <form action="/shop" className="flex w-[min(22vw,260px)] items-center rounded-[var(--radius-input)] border border-[var(--line)] bg-[var(--paper)] px-3 transition-colors focus-within:border-[var(--accent)]">
            <label htmlFor="header-search" className="sr-only">
              Zoek producten
            </label>
            <input
              id="header-search"
              name="q"
              placeholder="Zoek producten"
              className="min-w-0 flex-1 bg-transparent px-1 py-2.5 text-sm outline-none placeholder:text-[var(--muted)]"
            />
            <button type="submit" className="px-2 text-sm font-bold text-[var(--accent)]">
              <span className="sr-only">Zoek</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" />
                <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </form>
          <button
            type="button"
            onClick={openDrawer}
            className="relative flex min-h-11 items-center gap-2 whitespace-nowrap text-sm font-bold text-[var(--primary-navy)] transition-colors hover:text-[var(--accent)]"
            aria-label={`Winkelwagen${cart?.itemCount ? `, ${cart.itemCount} artikelen` : ""}`}
          >
            Winkelwagen
            <span className="grid h-6 min-w-6 place-items-center rounded-full bg-[var(--accent)] px-1 text-[10px] text-white">
              {cart?.itemCount ?? 0}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 xl:hidden">
          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Open winkelwagen${cart?.itemCount ? `, ${cart.itemCount} artikelen` : ""}`}
            className="relative grid h-10 min-w-10 place-items-center text-xl"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 1.9-1.4L21 8H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="20" r="1" fill="currentColor" />
              <circle cx="18" cy="20" r="1" fill="currentColor" />
            </svg>
            <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-white">
              {cart?.itemCount ?? 0}
            </span>
          </button>
          <button
            type="button"
            className="min-h-10 border border-[var(--line)] px-2.5 text-[11px] font-bold uppercase tracking-[0.06em] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Sluiten" : "Menu"}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="desktop-category-menu"
          className="absolute inset-x-0 top-full hidden border-t border-[var(--line)] bg-white shadow-[var(--shadow-soft)] xl:block"
        >
          <nav
            aria-label="Assortiment"
            className="mx-auto grid max-w-[var(--content-width)] grid-cols-4 gap-3 px-8 py-7"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border border-[var(--line)] p-4 text-sm font-bold transition-colors hover:border-[var(--accent)] hover:bg-[var(--paper)]"
              >
                {item.label}
                <span className="mt-2 block text-xs font-normal text-[var(--muted)]">
                  Bekijk producten en uitvoeringen
                </span>
              </Link>
            ))}
            <Link
              href="/shop"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between bg-[var(--accent)] p-4 text-sm font-bold text-white"
            >
              Bekijk alles <span aria-hidden="true">→</span>
            </Link>
          </nav>
        </div>
      ) : null}

      {menuOpen ? (
        <nav
          id="mobile-menu"
          aria-label="Mobiele navigatie"
          className="grid gap-1 border-t border-[var(--line)] bg-white px-5 py-4 xl:hidden"
        >
          <form action="/shop" className="mb-3 flex border-b border-[var(--line)]">
            <label htmlFor="mobile-search" className="sr-only">
              Zoek producten
            </label>
            <input
              id="mobile-search"
              name="q"
              placeholder="Zoek producten"
              className="min-h-11 flex-1 bg-transparent px-1 text-sm outline-none"
            />
            <button type="submit" className="px-3 text-xs font-bold uppercase">
              Zoek
            </button>
          </form>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="min-h-11 border-b border-[var(--line)] py-3 text-sm font-bold"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/shop"
            onClick={() => setMenuOpen(false)}
            className="min-h-11 py-3 text-sm font-bold"
          >
            Bekijk alle producten
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
