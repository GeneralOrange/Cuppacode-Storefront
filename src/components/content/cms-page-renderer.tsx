import "server-only";

import type { CmsPage } from "@/content/core/content-provider";
import { getCmsMediaOrigins } from "@/config/cms-media";
import { sanitizeCmsContent } from "@/content/sanitize-cms-content";
import { CmsFeaturedImage } from "./cms-featured-image";

export function CmsPageRenderer({ page }: { page: CmsPage }) {
  const sanitizedContent = sanitizeCmsContent(page.content, getCmsMediaOrigins());

  return (
    <section className="mx-auto max-w-[var(--content-width)] px-[var(--page-gutter)] py-10 lg:py-14">
      <header className="max-w-3xl border-b border-[var(--line)] pb-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--clay)]">
          GERMAT · INFORMATIE
        </p>
        <h1 className="germat-page-title mt-3 break-words font-semibold">
          {page.title}
        </h1>
        {page.excerpt ? (
          <p className="mt-4 text-base leading-7 text-[var(--muted)]">
            {page.excerpt}
          </p>
        ) : null}
      </header>
      {page.featuredImage ? (
        <div className="mt-8 max-w-4xl overflow-hidden border border-[var(--line)] bg-[var(--surface)]">
          <CmsFeaturedImage image={page.featuredImage} />
        </div>
      ) : null}
      <article
        className="prose-germat mt-8 max-w-3xl text-sm leading-7 sm:text-base"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </section>
  );
}
