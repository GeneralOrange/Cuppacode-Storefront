import type { Product } from "@/commerce/core/types";
import { ProductCard } from "./product-card";
import { Reveal } from "@/components/ui/reveal";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p className="border-y border-[var(--line)] py-12 text-[var(--muted)]">Geen producten gevonden.</p>;
  }

  return (
    <div className="grid min-w-0 grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5 2xl:grid-cols-4">
      {products.map((product, index) => <Reveal key={product.id} delay={Math.min(index, 5) * 75}><ProductCard product={product} /></Reveal>)}
    </div>
  );
}
