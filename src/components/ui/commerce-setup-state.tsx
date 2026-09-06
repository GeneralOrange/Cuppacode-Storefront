export function CommerceSetupState() {
  return (
    <div className="border border-[var(--line)] bg-[var(--surface)] p-6">
      <p className="text-sm font-semibold">Storefront setup required</p>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Add the WooCommerce settings from <code>.env.example</code> to connect the catalog.
      </p>
    </div>
  );
}
