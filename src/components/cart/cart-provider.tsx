"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Cart } from "@/commerce/core/types";
import { useToast } from "@/components/toast/toast-provider";

interface CartContextValue {
  cart: Cart | null;
  isLoading: boolean;
  isMutating: boolean;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (productId: string, quantity?: number, variationId?: string) => Promise<boolean>;
  updateItem: (itemId: string, quantity: number) => Promise<boolean>;
  removeItem: (itemId: string) => Promise<boolean>;
}

const CartContext = createContext<CartContextValue | null>(null);

async function cartRequest(path: string, body?: object): Promise<Cart> {
  const response = await fetch(path, body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : { cache: "no-store" });
  const result = await response.json() as Cart | { error?: string };
  if (!response.ok) throw new Error("error" in result && result.error ? result.error : "Cart action failed");
  return result as Cart;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    let active = true;
    void cartRequest("/api/cart").then((nextCart) => {
      if (active) setCart(nextCart);
    }).catch(() => {
      if (active) showToast("Winkelwagen kon niet worden geladen.", "error");
    }).finally(() => {
      if (active) setIsLoading(false);
    });
    return () => { active = false; };
  }, [showToast]);

  const mutate = useCallback(async (path: string, body: object, successMessage: string) => {
    setIsMutating(true);
    try {
      const nextCart = await cartRequest(path, body);
      setCart(nextCart);
      showToast(successMessage, "success");
      return true;
    } catch (error) {
      showToast(error instanceof Error && error.message !== "error" ? error.message : "Er ging iets mis. Probeer het opnieuw.", "error");
      return false;
    } finally { setIsMutating(false); }
  }, [showToast]);

  const addItem = useCallback(async (productId: string, quantity = 1, variationId?: string) => {
    const success = await mutate("/api/cart/add", { productId, quantity, variationId }, "Product toegevoegd aan je winkelwagen.");
    if (success) setDrawerOpen(true);
    return success;
  }, [mutate]);

  const updateItem = useCallback((itemId: string, quantity: number) => mutate("/api/cart/update", { itemId, quantity }, "Winkelwagen bijgewerkt."), [mutate]);
  const removeItem = useCallback((itemId: string) => mutate("/api/cart/remove", { itemId }, "Product verwijderd uit je winkelwagen."), [mutate]);

  return <CartContext.Provider value={{ cart, isLoading, isMutating, isDrawerOpen, openDrawer: () => setDrawerOpen(true), closeDrawer: () => setDrawerOpen(false), addItem, updateItem, removeItem }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
