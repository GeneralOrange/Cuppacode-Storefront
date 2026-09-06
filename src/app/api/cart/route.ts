import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { CommerceError } from "@/commerce/core/errors/commerce-error";
import { getCommerceProvider } from "@/commerce/provider";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("commerce_cart_token")?.value ?? crypto.randomUUID();
    const cart = await getCommerceProvider(token).getCart();
    const response = NextResponse.json(cart);
    if (!cookieStore.get("commerce_cart_token")) response.cookies.set("commerce_cart_token", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" });
    return response;
  } catch (error) {
    if (error instanceof CommerceError) {
      return NextResponse.json({ error: error.message }, { status: error.status ?? 502 });
    }
    return NextResponse.json({ error: "Unable to load cart" }, { status: 500 });
  }
}
