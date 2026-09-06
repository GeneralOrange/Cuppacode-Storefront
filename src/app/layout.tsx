import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/toast/toast-provider";
import { CartProvider } from "@/components/cart/cart-provider";
import { themeConfig } from "@/config/theme";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: themeConfig.key === "germat" ? "Germat | Professioneel gereedschap" : "NOVA | Objects for everyday rituals",
    template: `%s | ${themeConfig.brand.name}`,
  },
  description: themeConfig.key === "germat"
    ? "Een interactieve demo-storefront voor Germat."
    : "A fast, flexible headless commerce storefront.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang={themeConfig.key === "germat" ? "nl" : "en"} data-storefront={themeConfig.key} className={`${themeConfig.key === "germat" ? manrope.variable : ""} h-full antialiased`}><body className="min-h-full"><ToastProvider><CartProvider>{children}</CartProvider></ToastProvider></body></html>;
}
