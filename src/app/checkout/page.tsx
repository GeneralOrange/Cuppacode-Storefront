import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return <SiteShell><section className="mx-auto max-w-3xl px-5 py-12 lg:px-8"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--clay)]">Veilige demo-flow</p><h1 className="germat-page-title mt-3 font-semibold">Checkout-preview</h1><p className="mt-4 max-w-xl leading-6 text-[var(--muted)]">Doorloop een voorbeeldstap zonder echte betaalprovider of bestelling. Deze showcase is standaard gekoppeld aan lokale mockdata.</p><CheckoutForm /><Link href="/cart" className="mt-6 inline-block text-sm font-bold text-[var(--accent)] underline underline-offset-4">Terug naar winkelwagen</Link></section></SiteShell>;
}
