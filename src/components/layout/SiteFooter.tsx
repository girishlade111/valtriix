"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { BrandLogo } from "@/components/common/BrandLogo";
import { AppointmentBanner } from "@/components/layout/AppointmentBanner";
import styles from "./SiteFooter.module.css";

interface SiteFooterProps {
  showBanner?: boolean;
}

export function SiteFooter({ showBanner = true }: SiteFooterProps) {
  const pathname = usePathname() || "/";

  return (
    <footer className="footer-and-cta">
      {showBanner && <AppointmentBanner />}
      <div className={styles.footerSection}>
        <div className="container">
          <div className={styles.footerTop}>
            <div className={styles.logoCol}>
              <BrandLogo variant="light" height={26} />
            </div>

            <div className={styles.widgetList}>
              {siteConfig.footer.groups.map((grp) => (
                <div key={grp.title} className={styles.widgetItem}>
                  <div className={styles.widgetTitle}>{grp.title}</div>
                  <div className={styles.widgetLinks}>
                    {grp.links.map((lk) => {
                      const active = pathname === lk.href;
                      return (
                        <Link
                          key={`${grp.title}-${lk.href}`}
                          href={lk.href}
                          className={`${styles.widgetLink} ${
                            active ? styles.widgetLinkActive : ""
                          }`}
                          aria-current={active ? "page" : undefined}
                        >
                          {lk.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.footerBottom}>
            <div className={styles.socialRow}>
              <span className={styles.socialLabel}>{siteConfig.footer.socialLabel}</span>
              <div className={styles.socialIcons}>
                {siteConfig.footer.socials.map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.name}
                    className={styles.socialLink}
                  >
                    <Image src={soc.icon} alt="" width={14} height={14} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.copyright}>
              <span>{siteConfig.footer.copyrightPrefix}</span>
              <a
                href={siteConfig.footer.attributionHref}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.attributionLink}
              >
                {siteConfig.footer.attributionText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
