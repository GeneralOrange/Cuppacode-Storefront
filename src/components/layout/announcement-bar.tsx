import { themeConfig } from "@/config/theme";

export function AnnouncementBar() {
  return <div className="bg-[var(--primary-navy)] px-4 py-1.5 text-center text-[10px] font-semibold tracking-[0.06em] text-white/90">{themeConfig.brand.announcement}</div>;
}
