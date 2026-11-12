import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";

export default function CmsPageNotFound() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[var(--content-width)] px-[var(--page-gutter)] py-16">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--clay)]">
          Pagina niet gevonden
        </p>
        <h1 className="germat-page-title mt-3 font-semibold">
          Deze informatiepagina bestaat niet.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--muted)]">
          De pagina is mogelijk verplaatst of nog niet gepubliceerd.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-11 items-center bg-[var(--accent)] px-5 text-sm font-bold text-white"
        >
          Naar de homepage
        </Link>
      </section>
    </SiteShell>
  );
}
