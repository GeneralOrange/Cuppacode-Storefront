"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/commerce/core/types";
import { themeConfig } from "@/config/theme";

export function ProductGallery({
  images,
  name,
  selectedImage,
}: {
  images: ProductImage[];
  name: string;
  selectedImage?: ProductImage;
}) {
  const [selected, setSelected] = useState(0);
  const image = selectedImage ?? images[selected];
  const imageFit = themeConfig.key === "germat" ? "object-contain p-4" : "object-cover";
  const thumbnailFit = themeConfig.key === "germat" ? "object-contain p-1" : "object-cover";
  return <div className="lg:sticky lg:top-6 lg:self-start">{image ? <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)] border border-[var(--line)] bg-[var(--accent-soft)]"><Image src={image.url} alt={image.alt || name} fill sizes="(max-width: 1024px) 100vw, 50vw" className={imageFit} priority /></div> : <div className="flex aspect-[4/3] items-end rounded-[var(--radius-panel)] border border-[var(--line)] bg-[var(--accent-soft)] p-6 text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Productillustratie volgt</div>}{images.length > 1 ? <div className="mt-3 grid grid-cols-5 gap-3">{images.map((item, index) => <button type="button" key={item.id} aria-label={`Bekijk afbeelding ${index + 1}`} aria-pressed={selected === index} onClick={() => setSelected(index)} className={`relative aspect-square overflow-hidden rounded-[var(--radius-control)] border border-[var(--line)] bg-[var(--accent-soft)] ${selected === index ? "ring-2 ring-[var(--accent)]" : "opacity-75 hover:opacity-100"}`}><Image src={item.url} alt="" fill sizes="96px" className={thumbnailFit} /></button>)}</div> : null}</div>;
}
