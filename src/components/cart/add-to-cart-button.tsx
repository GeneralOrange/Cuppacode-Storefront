"use client";

import { useState } from "react";
import { useCart } from "./cart-provider";

export function AddToCartButton({
  productId,
  variationId,
  quantity = 1,
  disabled = false,
  onBeforeAdd,
  label = "In winkelwagen",
}: {
  productId: string;
  variationId?: string;
  quantity?: number;
  disabled?: boolean;
  onBeforeAdd?: () => boolean;
  label?: string;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  async function addToCart() {
    if (onBeforeAdd && !onBeforeAdd()) return;
    setIsAdding(true);
    try {
      await addItem(productId, quantity, variationId);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void addToCart()}
      disabled={disabled || isAdding}
      className="min-h-11 w-full bg-[var(--accent)] px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isAdding ? "Toevoegen…" : `${quantity > 1 ? `${quantity} ` : ""}${label}`}
    </button>
  );
}
