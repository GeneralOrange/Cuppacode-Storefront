import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    demo: true,
    reference: `PREVIEW-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    message: "Geen bestelling geplaatst en geen betaling verwerkt.",
  });
}
