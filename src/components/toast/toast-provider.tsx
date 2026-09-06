"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

export type ToastKind = "success" | "error" | "info";
interface Toast { id: number; message: string; kind: ToastKind }
interface ToastContextValue { showToast: (message: string, kind?: ToastKind) => void }

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = useCallback((message: string, kind: ToastKind = "info") => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message, kind }]);
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 4000);
  }, []);

  return <ToastContext.Provider value={{ showToast }}>
    {children}
    <div className="pointer-events-none fixed inset-x-4 top-5 z-[60] flex flex-col items-end gap-2 sm:left-auto sm:w-96" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => <div key={toast.id} className={`nova-rise pointer-events-auto w-full border bg-[var(--surface)] px-4 py-3 text-sm shadow-[var(--shadow-soft)] ${toast.kind === "success" ? "border-[var(--status-success)]" : toast.kind === "error" ? "border-[var(--status-error)]" : "border-[var(--line)]"}`} role={toast.kind === "error" ? "alert" : "status"}>
        <div className="flex items-start justify-between gap-3"><span>{toast.message}</span><button type="button" className="text-lg leading-none text-[var(--muted)]" aria-label="Melding sluiten" onClick={() => setToasts((current) => current.filter((item) => item.id !== toast.id))}>×</button></div>
      </div>)}
    </div>
  </ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
