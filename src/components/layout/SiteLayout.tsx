import React from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

interface SiteLayoutProps {
  headerVariant?: "overlay" | "light";
  showAppointmentBanner?: boolean;
  children: React.ReactNode;
}

export function SiteLayout({
  headerVariant = "light",
  showAppointmentBanner = true,
  children,
}: SiteLayoutProps) {
  return (
    <>
      <SiteHeader variant={headerVariant} />
      <main id="main-content">{children}</main>
      <SiteFooter showBanner={showAppointmentBanner} />
    </>
  );
}
