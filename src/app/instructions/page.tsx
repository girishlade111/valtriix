import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionLabel } from "@/components/common/SectionLabel";
import { instructionsData } from "@/content/legal";
import styles from "@/app/utility.module.css";

export const metadata: Metadata = {
  title: "Instructions",
  description: "Template customization documentation for Valtriix.",
};

export default function InstructionsPage() {
  return (
    <SiteLayout headerVariant="light">
      <section className={styles.section} aria-labelledby="instructions-heading">
        <div className="container">
          <div className={styles.centerHead}>
            <SectionLabel text={instructionsData.badge} alignment="center" />
            <h1 id="instructions-heading">{instructionsData.title}</h1>
            <p className={styles.subDesc}>{instructionsData.description}</p>
          </div>

          <div className={styles.docLayout}>
            <aside className={styles.tocCard} aria-label="On this page">
              <div className={styles.tocTitle}>On this page</div>
              {instructionsData.toc.map((item) => (
                <div key={item} className={styles.featureItem}>
                  <Image
                    src="/assets/icons/check-5.svg"
                    alt=""
                    width={14}
                    height={14}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </aside>

            <div className={styles.docCards}>
              {instructionsData.sections.map((sec) => (
                <section key={sec.id} className={styles.docCard}>
                  <h2 className={styles.docHead}>
                    <Image
                      src="/assets/icons/check-5.svg"
                      alt=""
                      width={16}
                      height={16}
                      aria-hidden="true"
                    />
                    <span>{sec.title}</span>
                  </h2>
                  {sec.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                  {"bullets" in sec && sec.bullets && (
                    <ul className={styles.docBullets}>
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <div className={styles.docCard}>
                <div className={styles.tocTitle}>On this page</div>
                <p>{instructionsData.note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
