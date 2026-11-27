import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

interface BrandLogoProps {
  variant?: "dark" | "light";
  href?: string;
  width?: number;
  height?: number;
}

export function BrandLogo({
  variant = "dark",
  href = "/",
  width = 114,
  height = 30,
}: BrandLogoProps) {
  const src = variant === "light" ? siteConfig.logos.light : siteConfig.logos.dark;

  const img = (
    <Image
      src={src}
      alt={siteConfig.brandName}
      width={width}
      height={height}
      priority
      style={{ width: "auto", height: `${height}px` }}
    />
  );

  if (!href) {
    return img;
  }

  return (
    <Link href={href} aria-label={`${siteConfig.brandName} home`} style={{ display: "inline-flex", alignItems: "center" }}>
      {img}
    </Link>
  );
}
