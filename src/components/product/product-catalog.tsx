"use client";

import { useEffect, useMemo, useState } from "react";
import type { Category, Product } from "@/commerce/core/types";
import { getProductPriceRange } from "@/commerce/core/variants";
import { ProductGrid } from "./product-grid";

export function ProductCatalog({
  products,
  categories,
  initialQuery = "",
  initialCategory = "",
}: {
  products: Product[];
  categories: Category[];
  initialQuery?: string;
  initialCategory?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("nl-NL");
    const matching = products.filter((product) => {
      const matchesSearch =
        !term ||
        [product.name, product.slug, product.description, product.shortDescription ?? ""]
          .join(" ")
          .toLocaleLowerCase("nl-NL")
          .includes(term);
      const matchesCategory =
        !category || product.categories.some((item) => item.slug === category);
      const matchesStock =
        !inStockOnly ||
        (product.variants.length
          ? product.variants.some((variant) => variant.inStock)
          : product.inStock);
      return matchesSearch && matchesCategory && matchesStock;
    });

    if (sort === "price-asc") {
      matching.sort(
        (left, right) =>
          getProductPriceRange(left).minimum - getProductPriceRange(right).minimum,
      );
    } else if (sort === "price-desc") {
      matching.sort(
        (left, right) =>
          getProductPriceRange(right).minimum - getProductPriceRange(left).minimum,
      );
    } else if (sort === "name") {
      matching.sort((left, right) => left.name.localeCompare(right.name, "nl"));
    }

    return matching;
  }, [products, query, category, inStockOnly, sort]);

  useEffect(() => {
    if (!filtersOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFiltersOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [filtersOpen]);

  function resetFilters() {
    setQuery("");
    setCategory(initialCategory);
    setInStockOnly(false);
    setSort("featured");
  }

  const filterControls = (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(220px,1fr)_minmax(180px,0.7fr)_auto_minmax(180px,0.7fr)]">
      <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.08em]">
        Zoeken
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Productnaam of type"
          className="min-h-11 border border-[var(--line)] bg-white px-3 text-sm font-normal normal-case tracking-normal"
        />
      </label>
      <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.08em]">
        Categorie
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="min-h-11 border border-[var(--line)] bg-white px-3 text-sm font-normal normal-case tracking-normal"
        >
          <option value="">Alle categorieën</option>
          {categories.map((item) => (
            <option key={item.id} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex min-h-11 items-center gap-2 self-end border border-[var(--line)] bg-white px-3 text-sm">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(event) => setInStockOnly(event.target.checked)}
          className="h-4 w-4 accent-[var(--accent)]"
        />
        Beschikbaar
      </label>
      <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.08em]">
        Sorteren
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="min-h-11 border border-[var(--line)] bg-white px-3 text-sm font-normal normal-case tracking-normal"
        >
          <option value="featured">Aanbevolen</option>
          <option value="price-asc">Prijs: laag naar hoog</option>
          <option value="price-desc">Prijs: hoog naar laag</option>
          <option value="name">Naam</option>
        </select>
      </label>
    </div>
  );

  return (
    <>
      <div className="rounded-[var(--radius-panel)] border border-[var(--line)] bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[var(--muted)]" aria-live="polite">
            {filteredProducts.length} producten
          </p>
          <button
            type="button"
            className="min-h-11 border border-[var(--line)] bg-[var(--paper)] px-4 text-xs font-bold uppercase tracking-[0.08em] text-[var(--accent)] transition-colors hover:border-[var(--accent)] lg:hidden"
            aria-expanded={filtersOpen}
            aria-controls="mobile-filter-drawer"
            onClick={() => setFiltersOpen((open) => !open)}
          >
            Filters
          </button>
        </div>
        <div className="mt-4 hidden lg:block">
          {filterControls}
        </div>
        {(query || category !== initialCategory || inStockOnly || sort !== "featured") ? (
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-[var(--accent)] underline underline-offset-4"
          >
            Wis filters
          </button>
        ) : null}
      </div>

      {filtersOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Sluit filters"
            className="absolute inset-0 h-full w-full bg-black/45"
            onClick={() => setFiltersOpen(false)}
          />
          <aside
            id="mobile-filter-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-filter-title"
            className="absolute inset-y-0 right-0 w-full max-w-md overflow-y-auto rounded-l-[var(--radius-panel)] bg-[var(--paper)] p-5 shadow-[var(--shadow-soft)]"
          >
            <div className="mb-6 flex items-center justify-between border-b border-[var(--line)] pb-4">
              <h2 id="mobile-filter-title" className="text-2xl font-bold">
                Filters
              </h2>
              <button
                type="button"
                aria-label="Sluit filters"
                onClick={() => setFiltersOpen(false)}
                className="grid h-11 w-11 place-items-center text-2xl"
              >
                ×
              </button>
            </div>
            {filterControls}
            {(query || category !== initialCategory || inStockOnly || sort !== "featured") ? (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-[var(--accent)] underline underline-offset-4"
              >
                Wis filters
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="mt-6 min-h-12 w-full bg-[var(--accent)] px-5 text-xs font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--accent-hover)]"
            >
              Toon {filteredProducts.length} producten
            </button>
          </aside>
        </div>
      ) : null}

      <div className="mt-7">
        {filteredProducts.length ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="border border-dashed border-[var(--line)] bg-white px-6 py-14 text-center">
            <p className="text-lg font-bold">Geen producten gevonden.</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Pas je zoekterm of filters aan.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 border border-[var(--line)] px-4 py-3 text-xs font-bold uppercase tracking-[0.08em]"
            >
              Wis filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
