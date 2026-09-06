"use client";

import { useState } from "react";

export function RentalRequest() {
  const [requestSummary, setRequestSummary] = useState("");

  function previewRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const tool = String(form.get("tool"));
    const startDate = String(form.get("startDate"));
    const period = String(form.get("period"));
    setRequestSummary(`${tool} · ${startDate} · ${period}`);
  }

  return (
    <form
      onSubmit={previewRequest}
      className="min-w-0 rounded-[var(--radius-panel)] border border-[var(--line)] bg-white p-5 sm:p-7"
    >
      <h2 className="text-2xl font-bold">Stel een testperiode samen</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        Deze preview verstuurt geen aanvraag. Beschikbaarheid en huurvoorwaarden
        zijn niet gekoppeld.
      </p>
      <div className="mt-6 grid min-w-0 gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold sm:col-span-2">
          Demonstratiegereedschap
          <select
            required
            name="tool"
            defaultValue=""
            className="min-h-12 w-full min-w-0 border border-[var(--line)] bg-white px-3 font-normal"
          >
            <option value="" disabled>
              Kies een voorbeeld
            </option>
            <option value="Leidingpers (demo)">Leidingpers (demo)</option>
            <option value="PEX-gereedschapset (demo)">PEX-gereedschapset (demo)</option>
            <option value="Solar-gereedschap (demo)">Solar-gereedschap (demo)</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Gewenste startdatum
          <input
            required
            name="startDate"
            type="date"
            className="min-h-12 w-full min-w-0 border border-[var(--line)] px-3 font-normal"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Huurperiode
          <select
            required
            name="period"
            defaultValue=""
            className="min-h-12 w-full min-w-0 border border-[var(--line)] bg-white px-3 font-normal"
          >
            <option value="" disabled>
              Kies een periode
            </option>
            <option value="day">1 dag (demo)</option>
            <option value="week">1 week (demo)</option>
            <option value="custom">Anders (demo)</option>
          </select>
        </label>
      </div>
      <button
        type="submit"
        className="mt-6 min-h-12 bg-[var(--accent)] px-5 text-xs font-bold uppercase tracking-[0.08em] text-white"
      >
        Bekijk aanvraagvoorbeeld
      </button>
      {requestSummary ? (
        <p
          role="status"
          className="mt-5 border-l-4 border-[var(--clay)] bg-[var(--paper)] p-4 text-sm font-semibold"
        >
          Voorbeeld samengesteld ({requestSummary}). Beschikbaarheid is niet
          gecontroleerd en er is niets gereserveerd of verzonden.
        </p>
      ) : null}
    </form>
  );
}
