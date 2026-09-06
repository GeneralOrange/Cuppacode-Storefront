import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { CommerceError } from "@/commerce/core/errors/commerce-error";
import { getCommerceProvider } from "@/commerce/provider";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { itemId?: unknown; quantity?: unknown };
    if (typeof body.itemId !== "string" || !body.itemId || typeof body.quantity !== "number" || !Number.isInteger(body.quantity) || body.quantity < 1 || body.quantity > 99) {
      return NextResponse.json({ error: "itemId and a quantity between 1 and 99 are required" }, { status: 400 });
    }
    const cookieStore = await cookies();
    const token = cookieStore.get("commerce_cart_token")?.value ?? crypto.randomUUID();
    const cart = await getCommerceProvider(token).updateCartItem(body.itemId, body.quantity);
    const response = NextResponse.json(cart);
    response.cookies.set("commerce_cart_token", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" });
    return response;
  } catch (error) {
    if (error instanceof CommerceError) {
      return NextResponse.json({ error: error.message }, { status: error.status ?? 400 });
    }
    return NextResponse.json({ error: "Unable to update cart" }, { status: 500 });
  }
}
