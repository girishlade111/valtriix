import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "@/styles/globals.css";
import { siteConfig } from "@/config/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Valtriix - Investment & Wealth Management",
    template: "%s | Valtriix",
  },
  description:
    "Invest smarter with tailored strategies and expert guidance designed to grow your wealth and achieve your financial goals.",
  robots:
    siteConfig.mode === "reference"
      ? { index: false, follow: false }
      : { index: true, follow: true },
  icons: {
    icon: "/assets/images/general/favicon.png",
  },
  openGraph: {
    title: "Valtriix - Investment & Wealth Management",
    description:
      "Invest smarter with tailored strategies and expert guidance designed to grow your wealth and achieve your financial goals.",
    images: ["/assets/images/general/27e6d6c16b892fb01585dabb729e02cb_og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
