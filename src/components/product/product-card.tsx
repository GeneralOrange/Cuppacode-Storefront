import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/commerce/core/types";
import { getProductPriceRange } from "@/commerce/core/variants";
import { ProductPrice } from "./product-price";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { themeConfig } from "@/config/theme";

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency }).format(amount);
}

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];
  const priceRange = getProductPriceRange(product);
  const isGermat = themeConfig.key === "germat";

  return (
    <article className="group flex h-full min-w-0 flex-col border border-[var(--line)] bg-white transition-shadow duration-200 hover:shadow-[var(--shadow-card)]">
      <Link href={`/product/${product.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--accent-soft)]">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt || product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`${isGermat ? "object-contain p-3" : "object-cover"} transition-transform duration-300 group-hover:scale-[1.025]`}
            />
          ) : (
            <div className="grid h-full place-items-center p-6 text-center text-sm font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
              GERMAT · DEMO-ILLUSTRATIE
            </div>
          )}
          {product.variants.length ? (
            <span className="absolute left-3 top-3 rounded-[var(--radius-control)] bg-white px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--primary-navy)] shadow-sm">
              {product.variants.length} varianten
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
          <p className="break-words text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
            {product.categories[0]?.name ?? "Gereedschap"}
          </p>
          <h2
            className={`${isGermat ? "break-words" : "line-clamp-3 min-h-[3.6rem]"} text-base font-bold leading-snug sm:text-lg`}
          >
            {product.name}
          </h2>
          <p className="line-clamp-2 min-h-10 text-sm leading-5 text-[var(--muted)]">
            {product.shortDescription}
          </p>
          <div className="mt-auto pt-2">
            {product.variants.length && priceRange.maximum > priceRange.minimum ? (
              <p className="font-bold">
                Vanaf {formatPrice(priceRange.minimum, product.price.currency)}
              </p>
            ) : product.variants.length ? (
              <ProductPrice
                price={{ amount: priceRange.minimum, currency: product.price.currency }}
              />
            ) : (
              <ProductPrice
                price={product.price}
                compareAtPrice={product.compareAtPrice}
              />
            )}
            {product.dataQuality?.prices === "demo" ? (
              <p className="mt-1 text-xs text-[var(--muted)]">
                Indicatieve demo-prijs
              </p>
            ) : null}
          </div>
        </div>
      </Link>
      <div className="flex flex-col gap-3 border-t border-[var(--line)] bg-[var(--surface)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${
          product.dataQuality?.availability === "demo"
            ? "bg-[var(--surface-muted)] text-[var(--muted)]"
            : product.inStock
              ? "bg-[var(--status-success-soft)] text-[var(--status-success)]"
              : "bg-[var(--status-error-soft)] text-[var(--status-error)]"
        }`}>
          {product.dataQuality?.availability === "demo"
            ? "Voorraad demo"
            : product.inStock
              ? "Op voorraad"
              : "Uitverkocht"}
        </p>
        {product.variants.length ? (
          <Link
            href={`/product/${product.slug}`}
            className="min-h-11 self-start py-3 text-sm font-bold text-[var(--accent)] underline underline-offset-4 transition-colors hover:text-[var(--accent-hover)] sm:min-h-0 sm:self-auto sm:py-0"
          >
            Bekijk opties
          </Link>
        ) : (
          <div className="w-full sm:w-auto sm:min-w-28">
            <AddToCartButton productId={product.id} disabled={!product.inStock} label="Toevoegen" />
          </div>
        )}
      </div>
    </article>
  );
}
