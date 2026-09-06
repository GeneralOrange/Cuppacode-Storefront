import { themeConfig } from "@/config/theme";

export function TrustStrip() {
  const items = themeConfig.key === "germat"
    ? [
        ["01", "Verzending binnen 24 uur", "Actuele voorwaarden op germat.nl"],
        ["02", "Persoonlijke service", "Vakkundig advies voor je klus"],
        ["03", "Beoordeeld met 4,9 / 5", "Zoals vermeld op de Germat-homepage"],
      ]
    : [
        ["01", "Small-batch goods", "Chosen for daily use"],
        ["02", "Free delivery", "On orders over €50"],
        ["03", "Easy returns", "30 days to reconsider"],
      ];

  return (
    <section
      aria-label="Service en voordelen"
      className="border-y border-[var(--line)] bg-white"
    >
      <div className="mx-auto grid max-w-7xl md:grid-cols-3">
        {items.map(([number, title, copy]) => (
          <div
            key={number}
            className="flex gap-4 border-b border-[var(--line)] px-5 py-5 last:border-0 md:border-b-0 md:border-r md:px-8 md:last:border-r-0"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent)]">
              {number}
            </span>
            <div>
              <p className="text-sm font-bold">{title}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
