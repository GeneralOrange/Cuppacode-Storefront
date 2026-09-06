import type { Money } from "@/commerce/core/types";

interface ProductPriceProps {
  price: Money;
  compareAtPrice?: Money;
}

export function ProductPrice({ price, compareAtPrice }: ProductPriceProps) {
  const formatter = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: price.currency,
  });

  return (
    <span className="flex items-center gap-2" aria-label={`Prijs ${formatter.format(price.amount)}`}>
      <span className="font-semibold">{formatter.format(price.amount)}</span>
      {compareAtPrice ? (
        <span className="text-sm text-[var(--muted)] line-through">
          {formatter.format(compareAtPrice.amount)}
        </span>
      ) : null}
    </span>
  );
}
