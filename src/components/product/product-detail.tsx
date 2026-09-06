"use client";

import { useState } from "react";
import type { Product, ProductVariant } from "@/commerce/core/types";
import {
  getProductPriceRange,
  getVariantForSelections,
  hasVariantForOption,
} from "@/commerce/core/variants";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { QuantitySelector } from "@/components/cart/quantity-selector";
import { useToast } from "@/components/toast/toast-provider";
import { ProductGallery } from "./product-gallery";
import { ProductPrice } from "./product-price";

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency }).format(amount);
}

export function ProductDetail({ product }: { product: Product }) {
  const [selections, setSelections] = useState<Record<string, string>>(
    product.defaultAttributes ?? {},
  );
  const [legacyVariantId, setLegacyVariantId] = useState<string>();
  const [quantity, setQuantity] = useState(1);
  const { showToast } = useToast();
  const variationAttributes = product.attributes.filter(
    (attribute) => attribute.variation !== false,
  );
  const selectedVariant: ProductVariant | undefined = variationAttributes.length
    ? getVariantForSelections(product, selections)
    : product.variants.find((variant) => variant.id === legacyVariantId);
  const priceRange = getProductPriceRange(product);

  function chooseOption(attributeName: string, option: string) {
    const nextSelections: Record<string, string> = { [attributeName]: option };
    for (const attribute of variationAttributes) {
      if (attribute.name === attributeName || !selections[attribute.name]) continue;
      if (
        hasVariantForOption(
          product,
          attribute.name,
          selections[attribute.name],
          nextSelections,
        )
      ) {
        nextSelections[attribute.name] = selections[attribute.name];
      }
    }
    setSelections(nextSelections);
  }

  function validateSelection() {
    if (product.variants.length && !selectedVariant) {
      showToast("Kies eerst een geldige productuitvoering.", "error");
      return false;
    }
    return true;
  }

  const canAddToCart =
    product.inStock && (!product.variants.length || Boolean(selectedVariant?.inStock));

  return (
    <article className="mx-auto grid max-w-[var(--content-width)] gap-8 px-[var(--page-gutter)] py-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-14">
      <ProductGallery
        images={product.images}
        name={product.name}
        selectedImage={selectedVariant?.image}
      />
      <div className="flex flex-col justify-center lg:pl-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--clay)]">
          {product.categories[0]?.name ?? "Germat gereedschap"}
        </p>
        <h1 className="germat-product-title mt-3 font-semibold">
          {product.name}
        </h1>
        {product.shortDescription ? (
          <p className="mt-4 text-base leading-7 text-[var(--muted)]">
            {product.shortDescription}
          </p>
        ) : null}
        <div className="mt-6">
          {selectedVariant ? (
            <ProductPrice
              price={selectedVariant.price}
              compareAtPrice={selectedVariant.compareAtPrice}
            />
          ) : product.variants.length ? (
            <p className="text-xl font-bold">
              Vanaf {formatPrice(priceRange.minimum, product.price.currency)}
              {priceRange.maximum > priceRange.minimum
                ? ` – ${formatPrice(priceRange.maximum, product.price.currency)}`
                : ""}
            </p>
          ) : (
            <ProductPrice
              price={product.price}
              compareAtPrice={product.compareAtPrice}
            />
          )}
          {product.dataQuality?.prices === "demo" ? (
            <p className="mt-1 text-xs font-medium text-[var(--muted)]">
              Indicatieve demo-prijs · geen actuele offerte
            </p>
          ) : null}
        </div>

        {variationAttributes.map((attribute) => (
          <fieldset key={attribute.id} className="mt-7 border-t border-[var(--line)] pt-5">
            <legend className="text-sm font-bold">
              {attribute.name}
              {selections[attribute.name] ? (
                <span className="ml-2 font-normal text-[var(--muted)]">
                  {selections[attribute.name]}
                </span>
              ) : null}
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {attribute.options.map((option) => {
                const possible = hasVariantForOption(
                  product,
                  attribute.name,
                  option,
                  selections,
                );
                const active = selections[attribute.name] === option;
                return (
                  <button
                    key={option}
                    type="button"
                    disabled={!possible}
                    aria-pressed={active}
                    onClick={() => chooseOption(attribute.name, option)}
                    className={`min-h-11 border px-4 py-2 text-sm font-semibold transition-colors ${
                      active
                        ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                        : "border-[var(--line)] bg-white hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    } disabled:cursor-not-allowed disabled:opacity-35`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}

        {!variationAttributes.length && product.variants.length ? (
          <fieldset className="mt-7 border-t border-[var(--line)] pt-5">
            <legend className="text-sm font-bold">Kies een uitvoering</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  aria-pressed={variant.id === legacyVariantId}
                  onClick={() => setLegacyVariantId(variant.id)}
                  className={`min-h-11 border px-4 py-2 text-sm font-semibold ${
                    variant.id === legacyVariantId
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                      : "border-[var(--line)] bg-white"
                  }`}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        <div className="mt-7 flex flex-wrap items-end gap-5 border-t border-[var(--line)] pt-5">
          <div>
            <p className="mb-2 text-sm font-bold">Aantal</p>
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              max={selectedVariant?.stockQuantity ?? product.stockQuantity}
              disabled={!canAddToCart}
            />
          </div>
          <div className="min-w-[220px] flex-1">
            <AddToCartButton
              productId={product.id}
              variationId={selectedVariant?.id}
              quantity={quantity}
              disabled={!canAddToCart}
              onBeforeAdd={validateSelection}
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-[var(--muted)]" aria-live="polite">
          {product.dataQuality?.availability === "demo"
            ? selectedVariant
              ? selectedVariant.inStock
                ? "Beschikbaarheid: op voorraad (demo)"
                : "Deze uitvoering is uitverkocht (demo)"
              : "Beschikbaarheid is gesimuleerd voor deze demo"
            : selectedVariant
              ? selectedVariant.inStock
                ? "Op voorraad"
                : "Uitverkocht"
              : product.inStock
                ? "Op voorraad"
                : "Uitverkocht"}
          {selectedVariant?.sku ? ` · SKU ${selectedVariant.sku}` : ""}
        </p>

        <section className="mt-8 rounded-[var(--radius-panel)] border border-[var(--line)] bg-white p-5 sm:p-6">
          <h2 className="text-lg font-bold sm:text-xl">Productinformatie</h2>
          <div
            className="prose-germat mt-3 text-sm leading-7 text-[var(--muted)]"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          {product.attributes.length ? (
            <dl className="mt-5 grid gap-2 border-t border-[var(--line)] pt-4 text-sm">
              {product.attributes.map((attribute) => (
                <div key={attribute.id} className="flex justify-between gap-4">
                  <dt className="font-semibold">{attribute.name}</dt>
                  <dd className="text-right text-[var(--muted)]">
                    {attribute.options.join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </section>
      </div>
    </article>
  );
}
