import { notFound } from "next/navigation";
import { getCommerceProvider } from "@/commerce/provider";
import { ProductCatalog } from "@/components/product/product-catalog";
import { SiteShell } from "@/components/layout/site-shell";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const provider = getCommerceProvider();
  const [category, products, categories] = await Promise.all([
    provider.getCategory(slug),
    provider.getProducts({ limit: 100 }),
    provider.getCategories(),
  ]);
  if (!category) notFound();

  return (
    <SiteShell>
      <section className="mx-auto max-w-[var(--content-width)] px-[var(--page-gutter)] py-10 lg:py-14">
        <div className="border-b border-[var(--line)] pb-7">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--clay)]">
            Categorie
          </p>
          <h1 className="germat-page-title mt-3 break-words font-semibold">
            {category.name}
          </h1>
          {category.description ? (
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              {category.description}
            </p>
          ) : null}
        </div>
        <div className="mt-5">
          <ProductCatalog
            products={products}
            categories={categories}
            initialCategory={slug}
          />
        </div>
      </section>
    </SiteShell>
  );
}
