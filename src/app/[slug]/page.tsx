import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { CmsPageRenderer } from "@/components/content/cms-page-renderer";
import { getContentProvider } from "@/content/provider";
import { isReservedCmsSlug } from "@/content/route-reserved";

export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (isReservedCmsSlug(slug)) notFound();
  const page = await getContentProvider().getPageBySlug(slug);
  if (!page) return {};

  return {
    title: page.seo?.title ?? page.title,
    description: page.seo?.description ?? page.excerpt,
    alternates: page.seo?.canonicalUrl
      ? { canonical: page.seo.canonicalUrl }
      : undefined,
    openGraph: page.seo?.openGraphTitle
      ? { title: page.seo.openGraphTitle }
      : undefined,
  };
}

export default async function CmsPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  if (isReservedCmsSlug(slug)) notFound();
  const page = await getContentProvider().getPageBySlug(slug);
  if (!page) notFound();

  return (
    <SiteShell>
      <CmsPageRenderer page={page} />
    </SiteShell>
  );
}
