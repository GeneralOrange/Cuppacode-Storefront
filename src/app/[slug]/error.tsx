"use client";

export default function CmsPageError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-[var(--content-width)] px-[var(--page-gutter)] py-16">
      <h1 className="germat-page-title font-semibold">Pagina tijdelijk niet beschikbaar</h1>
      <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--muted)]">
        De pagina kon niet worden geladen. Probeer het later opnieuw.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 min-h-11 bg-[var(--accent)] px-5 text-sm font-bold text-white"
      >
        Opnieuw proberen
      </button>
    </main>
  );
}
