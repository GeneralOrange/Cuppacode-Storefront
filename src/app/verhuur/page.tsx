import { SiteShell } from "@/components/layout/site-shell";
import { RentalRequest } from "@/components/rental/rental-request";

export const metadata = { title: "Verhuur-demo" };

export default function RentalPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-[var(--content-width)] px-[var(--page-gutter)] py-10 lg:py-14">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--clay)]">
            Germat · prototype
          </p>
          <h1 className="germat-page-title mt-3 font-semibold">
            Professioneel gereedschap huren
          </h1>
          <p className="mt-5 text-base leading-7 text-[var(--muted)]">
            Huren is een ander proces dan kopen. Deze demonstratie verkent een
            startdatum en huurperiode zonder een product aan de verkoopwinkelwagen
            toe te voegen. Het actuele huuraanbod, de beschikbaarheid, tarieven en
            voorwaarden moeten nog met Germat worden afgestemd.
          </p>
        </div>
        <div className="mt-9 grid min-w-0 gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="min-w-0 rounded-[var(--radius-panel)] border border-[var(--line)] bg-[var(--ink)] p-6 text-white sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--hero-highlight)]">
              Demonstratie — geen reservering
            </p>
            <h2 className="mt-4 text-2xl font-bold">Zo kan de flow werken</h2>
            <ol className="mt-5 grid gap-4 text-sm leading-6 text-white/75">
              <li><span className="mr-2 font-bold text-white">01</span> Kies een huurproduct.</li>
              <li><span className="mr-2 font-bold text-white">02</span> Stel periode en gewenste datum in.</li>
              <li><span className="mr-2 font-bold text-white">03</span> Vraag beschikbaarheid aan.</li>
              <li><span className="mr-2 font-bold text-white">04</span> Bevestiging volgt pas na controle door Germat.</li>
            </ol>
          </div>
          <div className="min-w-0"><RentalRequest /></div>
        </div>
      </section>
    </SiteShell>
  );
}
