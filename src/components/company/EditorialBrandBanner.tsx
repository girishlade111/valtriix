import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { SectionLabel } from "@/components/common/SectionLabel";
import styles from "./EditorialBrandBanner.module.css";

export function EditorialBrandBanner() {
  return (
    <section
      className="about-us-section padding-bottom"
      aria-labelledby="editorial-about-heading"
    >
      <div className="container">
        <div className={styles.panel}>
          <div className={styles.imgWrap}>
            <Image
              src="/assets/images/general/img-7.webp"
              alt="Sunlit modern interior architecture with warm timber tones"
              fill
              sizes="(max-width: 991px) 100vw, 540px"
              className={styles.img}
            />
          </div>

          <div className={styles.contentCol}>
            <div className={styles.headBlock}>
              <SectionLabel text="ABOUT US" variant="dark-raised" />
              <h2 id="editorial-about-heading" className={styles.title}>
                Helping you make confident financial decisions
              </h2>
            </div>

            <div className={styles.quoteRow}>
              <span className={styles.accentBar} aria-hidden="true" />
              <p className={styles.paragraph}>
                At Valtrix, we believe investing should built around your goals, your
                ambitions, and your future. We help individuals, families &amp; businesses
                navigate financial opportunities with thoughtful strategies, informed
                decisions
              </p>
            </div>
          </div>

          <Image
            src={siteConfig.logos.decorativeMark}
            alt=""
            width={460}
            height={460}
            aria-hidden="true"
            className={styles.decorativeMark}
          />
        </div>
      </div>
    </section>
  );
}
