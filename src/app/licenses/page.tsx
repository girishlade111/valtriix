import React from "react";
import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionLabel } from "@/components/common/SectionLabel";
import { licensesData } from "@/content/legal";
import styles from "@/app/utility.module.css";

export const metadata: Metadata = {
  title: "Licenses",
  description: "Graphical asset, font, and icon license attributions for Valtriix.",
};

export default function LicensesPage() {
  return (
    <SiteLayout headerVariant="light">
      <section className={styles.section} aria-labelledby="licenses-heading">
        <div className="container">
          <div className={styles.centerHead}>
            <SectionLabel text={licensesData.badge} alignment="center" />
            <h1 id="licenses-heading">{licensesData.title}</h1>
            <p className={styles.subDesc}>{licensesData.description}</p>
          </div>

          <div className={styles.licenseGrid}>
            {licensesData.cards.map((card) => (
              <div key={card.id} className={styles.licenseCard}>
                <h4>{card.title}</h4>
                <div className={styles.licenseLinks}>
                  {card.links.map((lk) => (
                    <a
                      key={lk.label}
                      href={lk.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.licenseLink}
                    >
                      {lk.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
