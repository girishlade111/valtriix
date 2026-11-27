"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { BrandLogo } from "@/components/common/BrandLogo";
import { ActionButton } from "@/components/common/ActionButton";
import styles from "./SiteHeader.module.css";

interface SiteHeaderProps {
  variant?: "overlay" | "light";
}

export function SiteHeader({ variant = "light" }: SiteHeaderProps) {
  const pathname = usePathname() || "/";
  const [dropdownPath, setDropdownPath] = useState<string | null>(null);
  const [mobilePath, setMobilePath] = useState<string | null>(null);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverOpenedAtRef = useRef<number>(0);

  const dropdownOpen = dropdownPath === pathname;
  const mobileOpen = mobilePath === pathname;

  const setDropdownOpen = useCallback(
    (open: boolean | ((prev: boolean) => boolean)) => {
      setDropdownPath((prev) => {
        const next = typeof open === "function" ? open(prev === pathname) : open;
        return next ? pathname : null;
      });
    },
    [pathname]
  );

  const setMobileOpen = useCallback(
    (open: boolean | ((prev: boolean) => boolean)) => {
      setMobilePath((prev) => {
        const next = typeof open === "function" ? open(prev === pathname) : open;
        return next ? pathname : null;
      });
    },
    [pathname]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [setDropdownOpen, setMobileOpen]);

  const openMenu = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    if (!dropdownOpen) {
      hoverOpenedAtRef.current = Date.now();
    }
    setDropdownOpen(true);
  };

  const handleToggleClick = () => {
    if (Date.now() - hoverOpenedAtRef.current < 400) {
      return;
    }
    setDropdownOpen((prev) => !prev);
  };

  const scheduleCloseMenu = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => setDropdownOpen(false), 180);
  };

  const isOverlay = variant === "overlay";
  const headerClass = [
    styles.header,
    isOverlay ? styles["header--overlay"] : "",
    isOverlay && scrolled ? styles["header--overlayScrolled"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header ref={headerRef} className={headerClass}>
      <div className={styles.headerInner}>
        <BrandLogo variant={isOverlay ? "light" : "dark"} height={26} />

        <nav className={styles.navGroup} aria-label="Primary navigation">
          <div
            onMouseEnter={openMenu}
            onMouseLeave={scheduleCloseMenu}
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <button
              type="button"
              className={styles.dropdownToggle}
              aria-expanded={dropdownOpen}
              aria-haspopup="menu"
              aria-controls="all-pages-mega-menu"
              onClick={handleToggleClick}
            >
              <span>All Pages</span>
              <svg
                className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ""}`}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {siteConfig.header.navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.ctaWrap}>
          <ActionButton label={siteConfig.header.ctaLabel} href={siteConfig.header.ctaHref} />
        </div>

        <button
          type="button"
          className={styles.mobileToggle}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation-menu"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 7H20M4 12H20M4 17H20"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>

        {dropdownOpen && (
          <div
            id="all-pages-mega-menu"
            className={styles.megaMenuBackdrop}
            onMouseEnter={openMenu}
            onMouseLeave={scheduleCloseMenu}
          >
            <div className={styles.megaMenu} role="menu" aria-label="All Pages">
              <div className={styles.megaMenuLists}>
                {siteConfig.allPagesMenu.groups.map((grp) => (
                  <div key={grp.title} className={styles.menuColumn}>
                    <div className={styles.menuSubtitle}>{grp.title}</div>
                    {grp.links.map((lk) => {
                      const active = pathname === lk.href;
                      return (
                        <Link
                          key={lk.href}
                          href={lk.href}
                          role="menuitem"
                          className={`${styles.megaLink} ${active ? styles.megaLinkActive : ""}`}
                          onClick={() => setDropdownOpen(false)}
                        >
                          {lk.label}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className={styles.megaCards}>
                {siteConfig.allPagesMenu.featuredCases.map((fc) => (
                  <Link
                    key={fc.href}
                    href={fc.href}
                    className={styles.megaCard}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <div className={styles.megaCardImgWrap}>
                      <Image
                        src={fc.image}
                        alt={fc.title}
                        fill
                        sizes="280px"
                        className={styles.megaCardImg}
                      />
                    </div>
                    <div className={styles.megaCardFoot}>
                      <span className={styles.megaCardTitle}>{fc.title}</span>
                      <span className={styles.megaCardArrow} aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {mobileOpen && (
        <div id="mobile-navigation-menu" className={styles.mobileMenuPanel}>
          <button
            type="button"
            className={styles.mobileDropdownBtn}
            aria-expanded={mobileSubOpen}
            onClick={() => setMobileSubOpen((p) => !p)}
          >
            <span>All Pages</span>
            <svg
              className={`${styles.chevron} ${mobileSubOpen ? styles.chevronOpen : ""}`}
              width="12"
              height="8"
              viewBox="0 0 10 6"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {mobileSubOpen && (
            <div className={styles.mobileSubMenu}>
              {siteConfig.allPagesMenu.groups.map((grp) => (
                <div key={grp.title} className={styles.menuColumn}>
                  <div className={styles.menuSubtitle}>{grp.title}</div>
                  {grp.links.map((lk) => {
                    const active = pathname === lk.href;
                    return (
                      <Link
                        key={lk.href}
                        href={lk.href}
                        className={`${styles.megaLink} ${active ? styles.megaLinkActive : ""}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {lk.label}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {siteConfig.header.navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.mobileNavLink} ${active ? styles.mobileNavLinkActive : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}

          <div className={styles.mobileCtaWrap}>
            <ActionButton
              label={siteConfig.header.ctaLabel}
              href={siteConfig.header.ctaHref}
            />
          </div>
        </div>
      )}
    </header>
  );
}
