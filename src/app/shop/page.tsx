import { getCommerceProvider } from "@/commerce/provider";
import { ProductCatalog } from "@/components/product/product-catalog";
import { SiteShell } from "@/components/layout/site-shell";
import { themeConfig } from "@/config/theme";

export const dynamic = "force-dynamic";
export const metadata = { title: "Assortiment" };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const provider = getCommerceProvider();
  const [products, categories] = await Promise.all([
    provider.getProducts({ limit: 100 }),
    provider.getCategories(),
  ]);

  return (
    <SiteShell>
      <section className="mx-auto max-w-[var(--content-width)] px-[var(--page-gutter)] py-10 lg:py-14">
        <div className="border-b border-[var(--line)] pb-7">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--clay)]">
            {themeConfig.key === "germat" ? "Germat assortiment" : "NOVA collection"}
          </p>
          <h1 className="germat-page-title mt-3 font-semibold">
            {q
              ? `Zoekresultaten voor “${q}”`
              : themeConfig.key === "germat"
                ? "Gereedschap voor je volgende klus"
                : "Everything, considered."}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            {themeConfig.key === "germat"
              ? "Filter op categorie, zoek producten en bekijk de uitvoeringen. Prijzen en voorraad zijn demo-data."
              : "Coffee, tea and useful objects chosen to bring a little more intention to the everyday."}
          </p>
        </div>
        <div className="mt-5">
          <ProductCatalog
            products={products}
            categories={categories}
            initialQuery={q ?? ""}
          />
        </div>
      </section>
    </SiteShell>
  );
}
