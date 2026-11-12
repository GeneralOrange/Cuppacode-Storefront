import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/commerce/core/types";

const categoryVisuals: Record<string, { image?: string; tone: string }> = {
  installatiegereedschap: {
    image: "/products/germat-pex-detail.svg",
    tone: "bg-[var(--accent-soft)]",
  },
  gereedschapsets: {
    image: "/products/germat-toolbox.svg",
    tone: "bg-[var(--accent-soft)]",
  },
  "zonnepanelen-gereedschap": {
    image: "/products/germat-solar.svg",
    tone: "bg-[var(--accent-soft)]",
  },
  "waterleiding-pex": {
    image: "/products/germat-pex-set.svg",
    tone: "bg-[var(--accent-soft)]",
  },
  handgereedschap: {
    image: "/products/germat-handtools.svg",
    tone: "bg-[var(--accent-soft)]",
  },
  "elektra-gereedschap": {
    tone: "bg-[var(--accent-soft)]",
  },
  coffee: { image: "/products/Photo_3.jpg", tone: "bg-[#c9ad8c]" },
  tea: { image: "/products/Photo_6.jpg", tone: "bg-[#d9c8b4]" },
  "brewing-equipment": { image: "/products/Photo_8.jpg", tone: "bg-[#cbb49b]" },
};

export function CategoryShowcase({ categories }: { categories: Category[] }) {
  const visible = categories.filter((category) => categoryVisuals[category.slug]);
  const isGermat = visible.some((category) => category.slug === "installatiegereedschap");

  return (
    <section className="mx-auto max-w-[var(--content-width)] px-[var(--page-gutter)] py-[var(--section-space)]">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
            {isGermat ? "Vind snel wat je zoekt" : "Find your rhythm"}
          </p>
          <h2 className="germat-section-title mt-3 font-semibold">
            {isGermat ? "Shop per vakgebied" : "Shop by ritual"}
          </h2>
        </div>
        <Link
          href="/shop"
          className="hidden border-b border-[var(--foreground)] pb-1 text-xs font-bold uppercase tracking-[0.12em] sm:block"
        >
          Bekijk assortiment
        </Link>
      </div>
      <div
        className={`grid gap-4 ${
          isGermat
            ? "grid-cols-1 sm:grid-cols-2 lg:auto-rows-[240px] lg:grid-cols-12"
            : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {visible.map((category, index) => {
          const visual = categoryVisuals[category.slug];
          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`group relative min-h-64 overflow-hidden border border-[var(--line)] ${visual.tone} ${
                isGermat && index === 0
                  ? "lg:col-span-8 lg:row-span-2 lg:min-h-0"
                  : isGermat
                    ? "lg:col-span-4 lg:min-h-0"
                    : ""
              }`}
            >
              {visual.image ? (
                <Image
                  src={visual.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
                  className={`transition-transform duration-500 group-hover:scale-[1.015] ${
                    isGermat ? "object-contain" : "object-cover"
                  }`}
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 grid place-items-center text-[var(--accent)]"
                >
                  <svg viewBox="0 0 64 88" className="h-24 w-auto sm:h-28" fill="none">
                    <path
                      d="M37 4 8 47h20l-3 37 31-49H36l1-31Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-5 pt-20 text-white">
                <div className="min-w-0 flex-1">
                  <h3 className="break-words text-2xl font-semibold">{category.name}</h3>
                  {category.description ? (
                    <p className="mt-1 max-w-full text-sm text-white/75">
                      {category.description}
                    </p>
                  ) : null}
                </div>
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/60 text-lg transition-colors group-hover:bg-white group-hover:text-[var(--foreground)]"
                >
                  →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
