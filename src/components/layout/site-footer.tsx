import Link from "next/link";
import { themeConfig } from "@/config/theme";

export function SiteFooter() {
  const isGermat = themeConfig.key === "germat";

  return (
    <footer className="bg-[var(--ink)] text-white">
      <div className="mx-auto grid max-w-[var(--content-width)] gap-10 px-[var(--page-gutter)] py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-black tracking-[0.12em]">
            {themeConfig.brand.name}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">
            {isGermat
              ? "Professioneel gereedschap en installatiematerialen voor vakmensen en makers."
              : "Thoughtful objects for everyday rituals."}
          </p>
          {isGermat ? (
            <p className="mt-5 max-w-sm border-l-2 border-[var(--clay)] pl-3 text-xs leading-5 text-white/60">
              Demonstratie storefront. Prijzen, beschikbaarheid en checkout zijn
              gesimuleerd; er wordt geen bestelling geplaatst.
            </p>
          ) : null}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">
            Assortiment
          </p>
          <div className="mt-4 grid gap-3 text-sm text-white/80">
            {themeConfig.navigation.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link href="/shop" className="hover:text-white">
              Alle producten
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">
            {isGermat ? "Advies & service" : "A considered choice"}
          </p>
          <p className="mt-4 text-sm leading-6 text-white/75">
            {isGermat
              ? "Praktische informatie en contact met Germat."
              : "Thoughtfully selected goods, clear design, and a slower approach to daily essentials."}
          </p>
          {themeConfig.cmsNavigation.length ? (
            <nav aria-label="Informatie" className="mt-4 grid gap-3 text-sm text-white/80">
              {themeConfig.cmsNavigation.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </div>
      <div className="border-t border-white/15 px-5 py-4 text-xs text-white/50 lg:px-8">
        <div className="mx-auto flex max-w-[var(--content-width)] flex-wrap justify-between gap-3 px-[var(--page-gutter)]">
          <span>© {new Date().getFullYear()} {themeConfig.brand.name}</span>
          <span>Demo storefront · geen echte verkoop of betalingen</span>
        </div>
      </div>
    </footer>
  );
}
