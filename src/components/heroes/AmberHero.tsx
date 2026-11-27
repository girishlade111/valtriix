import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { SectionLabel } from "@/components/common/SectionLabel";
import { ActionButton } from "@/components/common/ActionButton";
import styles from "./AmberHero.module.css";

export function AmberHero() {
  const repeatedLogos = [...siteConfig.partnerLogos, ...siteConfig.partnerLogos];

  return (
    <section className={styles.heroSection} aria-labelledby="home-hero-heading">
      <Image
        src="/assets/images/hero/5b1335b6ad127cba312ea7087cb90d6d_hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.heroBg}
      />

      <div className={styles.heroMain}>
        <div className={styles.topBlock}>
          <SectionLabel text="YOUR PARTNER IN WEALTH" variant="dark-translucent" />
          <h1 id="home-hero-heading" className={styles.heroTitle}>
            Discover a better way to invest
          </h1>
        </div>

        <div className={styles.bottomBlock}>
          <p className={styles.heroDesc}>
            Invest smarter with tailored strategies and expert guidance designed grow
            your wealth and achieve your financial goals
          </p>
          <ActionButton label="Start Your Journey" href="/contact" />
        </div>
      </div>

      <div className={styles.logosStrip} aria-label="Partner organizations">
        <div className={styles.logosTrack}>
          {repeatedLogos.map((logo, idx) => (
            <div key={`${logo.name}-${idx}`} className={styles.logoItem}>
              <Image
                src={logo.src}
                alt={idx < siteConfig.partnerLogos.length ? logo.name : ""}
                aria-hidden={idx >= siteConfig.partnerLogos.length}
                width={130}
                height={28}
                className={styles.logoImg}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
