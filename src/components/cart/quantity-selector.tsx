"use client";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  disabled?: boolean;
}

export function QuantitySelector({
  value,
  onChange,
  max,
  disabled = false,
}: QuantitySelectorProps) {
  return (
    <div
      className="inline-flex min-h-11 items-center border border-[var(--line)] bg-white"
      aria-label="Aantal"
    >
      <button
        type="button"
        className="h-10 w-10 text-lg disabled:opacity-40"
        aria-label="Aantal verlagen"
        disabled={disabled || value <= 1}
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        −
      </button>
      <span className="min-w-9 text-center text-sm font-bold" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="h-10 w-10 text-lg disabled:opacity-40"
        aria-label="Aantal verhogen"
        disabled={disabled || (max !== undefined && value >= max)}
        onClick={() => onChange(max === undefined ? value + 1 : Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  );
}
