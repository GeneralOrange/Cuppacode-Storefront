import Image from "next/image";
import Link from "next/link";
import { getCommerceProvider } from "@/commerce/provider";
import { ProductGrid } from "@/components/product/product-grid";
import { SiteShell } from "@/components/layout/site-shell";
import { TrustStrip } from "@/components/home/trust-strip";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { Reveal } from "@/components/ui/reveal";
import { themeConfig } from "@/config/theme";

export const dynamic = "force-dynamic";

export const metadata = {
  title: themeConfig.key === "germat"
    ? "Professioneel gereedschap voor installatie & solar"
    : "Objects for everyday rituals",
  description: themeConfig.key === "germat"
    ? "Een interactieve demo-storefront voor Germat."
    : "A considered collection of coffee, tea and everyday objects.",
};

export default async function Home() {
  const provider = getCommerceProvider();
  const [products, categories] = await Promise.all([
    provider.getProducts({ limit: 8 }),
    provider.getCategories(),
  ]);
  const isGermat = themeConfig.key === "germat";
  const secondHeroHref = isGermat ? "/category/gereedschapsets" : "/category/brewing-equipment";
  const contactHref = isGermat ? "https://germat.nl/contact/" : "/shop";

  return (
    <SiteShell>
      <section className="relative px-4 py-4 text-white sm:px-5 lg:px-8">
        <div className="mx-auto grid min-h-0 max-w-[var(--content-width)] items-center gap-4 overflow-hidden rounded-[var(--radius-hero)] bg-[var(--hero)] px-4 py-4 sm:gap-5 sm:px-5 sm:py-7 md:min-h-[430px] md:grid-cols-[1.05fr_0.95fr] md:gap-8 md:px-8 md:py-9 lg:px-12">
          <div className="relative z-10 py-0 sm:py-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--hero-highlight)] sm:text-xs">
              {isGermat ? "Gereedschap · installatie · solar" : "NOVA · curated essentials"}
            </p>
            <h1 className="germat-hero-title mt-4 max-w-[14ch] font-bold">
              {isGermat
                ? "Professioneel gereedschap. Direct aan de slag."
                : "Objects for the everyday."}
            </h1>
            <p className="mt-3 max-w-[42ch] text-[13px] leading-5 text-white/75 sm:mt-4 sm:text-base sm:leading-7">
              {isGermat
                ? "Installatiegereedschap, PEX-sets en solarbenodigdheden. Vind snel wat je nodig hebt voor je klus."
                : "Thoughtfully chosen coffee, tea and objects for a slower, warmer ritual."}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
              <Link
                href="/shop"
                className="inline-flex min-h-12 min-w-0 items-center justify-center bg-[var(--accent)] px-6 text-center text-xs font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-[var(--ink)]"
              >
                Bekijk assortiment
              </Link>
              <Link
                href={secondHeroHref}
                className="inline-flex min-h-12 min-w-0 items-center justify-center rounded-[var(--radius-button)] border border-white/55 px-4 text-center text-xs font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-[var(--ink)] sm:px-6"
              >
                {isGermat ? "Populaire gereedschapsets" : "Explore objects"}
              </Link>
            </div>
            <p className="mt-5 text-xs text-white/55">
              Showcase-demo · geen echte bestelling of betaling
            </p>
          </div>
          <div className="relative min-h-[180px] sm:min-h-[240px] md:min-h-[340px] lg:min-h-[380px]">
            <Image
              src={isGermat ? "/products/germat-pex-set.svg" : "/products/Photo_1.jpg"}
              alt={
                isGermat
                  ? "Technische illustratie van een PEX-gereedschapset"
                  : "Warm, licht interieur"
              }
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className={isGermat ? "object-contain" : "rounded-[var(--radius-panel)] object-cover"}
            />
            {isGermat ? (
              <div className="absolute bottom-3 right-3 rounded-[var(--radius-control)] border border-white/25 bg-[var(--ink)]/90 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.06em] sm:bottom-4 sm:right-0 sm:px-4 sm:py-3 sm:text-xs sm:tracking-[0.1em]">
                Praktisch · professioneel · overzichtelijk
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <TrustStrip />

      <Reveal>
        <CategoryShowcase categories={categories} />
      </Reveal>

      <Reveal delay={100}>
        <section className="mx-auto max-w-[var(--content-width)] px-[var(--page-gutter)] py-[var(--section-space)]">
          <div className="flex items-end justify-between gap-6 border-b border-[var(--line)] pb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
                {isGermat ? "Veelgekozen voor installatie en montage" : "The daily edit"}
              </p>
              <h2 className="germat-section-title mt-3 font-semibold">
                {isGermat ? "Populaire producten" : "Thoughtful essentials"}
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden border-b border-[var(--foreground)] pb-1 text-xs font-bold uppercase tracking-[0.1em] sm:block"
            >
              Alles bekijken
            </Link>
          </div>
          <div className="mt-7">
            <ProductGrid products={products} />
          </div>
        </section>
      </Reveal>

      <section className="px-5 py-5 lg:px-8">
        <div className={`mx-auto grid max-w-[var(--content-width)] items-center gap-8 rounded-[var(--radius-panel)] ${isGermat ? "bg-[var(--primary-navy)]" : "bg-[var(--accent)]"} px-6 py-10 text-white sm:px-9 md:grid-cols-[1fr_auto] lg:px-12`}>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">
              {isGermat ? "Niet gevonden wat je zoekt?" : "Need a recommendation?"}
            </p>
            <h2 className="germat-section-title mt-3 font-semibold">
              {isGermat ? "Vraag naar de mogelijkheden." : "We can help you choose."}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
              {isGermat
                ? "Op de Germat-homepage wordt korting op aanvraag genoemd. Neem contact op met Germat voor actuele productinformatie en voorwaarden."
                : "Explore a considered edit of everyday essentials."}
            </p>
          </div>
          <a
            href={contactHref}
            target={isGermat ? "_blank" : undefined}
            rel={isGermat ? "noreferrer" : undefined}
            className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] px-6 text-xs font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-[var(--primary-navy)]"
          >
            {isGermat ? "Neem contact op ↗" : "Bekijk collectie"}
          </a>
        </div>
      </section>

      {isGermat ? (
        <section className="mx-auto grid min-w-0 max-w-[var(--content-width)] gap-5 px-[var(--page-gutter)] py-12 md:grid-cols-2 lg:py-16">
          <div className="min-w-0 rounded-[var(--radius-panel)] border border-[var(--line)] bg-white p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
              Flexibel testen
            </p>
            <h2 className="germat-section-title mt-3 font-semibold">Gereedschap huren</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Bekijk de prototypeflow voor een huurperiode en beschikbaarheidsaanvraag.
              Er wordt niets gereserveerd.
            </p>
            <Link
              href="/verhuur"
              className="mt-6 inline-flex min-h-11 items-center bg-[var(--accent)] px-5 text-xs font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--accent-hover)]"
            >
              Bekijk verhuur-demo
            </Link>
          </div>
          <div className="min-w-0 rounded-[var(--radius-panel)] border border-[var(--line)] bg-white p-7 sm:p-9" id="advies">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
              Zeker weten wat past
            </p>
            <h2 className="germat-section-title mt-3 font-semibold">Technisch advies</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Controleer persprofiel, maat en compatibiliteit bij de fabrikant van je
              systeem. De varianten en demo-voorraad hier zijn uitsluitend bedoeld om
              de interface te testen.
            </p>
            <Link
              href="/shop?q=PEX"
              className="mt-6 inline-flex min-h-11 items-center border border-[var(--line)] px-5 text-xs font-bold uppercase tracking-[0.1em]"
            >
              Bekijk PEX-producten
            </Link>
          </div>
        </section>
      ) : null}
    </SiteShell>
  );
}
