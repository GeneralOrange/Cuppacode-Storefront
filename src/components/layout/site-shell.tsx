import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { AnnouncementBar } from "./announcement-bar";
import { SiteFooter } from "./site-footer";

export function SiteShell({ children }: { children: ReactNode }) {
  return <><AnnouncementBar /><SiteHeader /><main>{children}</main><SiteFooter /><CartDrawer /></>;
}
