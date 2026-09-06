import { notFound } from "next/navigation";
import { getCommerceProvider } from "@/commerce/provider";
import { SiteShell } from "@/components/layout/site-shell";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductGrid } from "@/components/product/product-grid";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const provider = getCommerceProvider();
  const product = await provider.getProduct(slug);
  if (!product) notFound();
  const relatedProducts = product.categories[0]
    ? (await provider.getProducts({ category: product.categories[0].slug, limit: 5 }))
        .filter((related) => related.id !== product.id)
        .slice(0, 4)
    : [];

  return <SiteShell><ProductDetail product={product} />{relatedProducts.length ? <section className="mx-auto max-w-7xl px-5 pb-14 lg:px-8"><h2 className="text-3xl font-semibold">Past bij deze categorie</h2><div className="mt-6"><ProductGrid products={relatedProducts} /></div></section> : null}</SiteShell>;
}
