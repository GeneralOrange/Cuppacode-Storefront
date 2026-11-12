"use client";

import Image from "next/image";
import { useState } from "react";
import type { CmsImage } from "@/content/core/content-provider";

export function CmsFeaturedImage({ image }: { image: CmsImage }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={image.alt || "Afbeelding niet beschikbaar"}
        className="grid min-h-48 place-items-center bg-[var(--surface-muted)] px-6 text-sm text-[var(--muted)]"
      >
        Afbeelding niet beschikbaar
      </div>
    );
  }

  return (
    <Image
      src={image.url}
      alt={image.alt}
      width={image.width ?? 1200}
      height={image.height ?? 800}
      sizes="(max-width: 768px) 100vw, 768px"
      onError={() => setFailed(true)}
      className="h-auto max-h-[34rem] w-full object-contain"
    />
  );
}
