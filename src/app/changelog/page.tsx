import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { changelogData } from "@/content/changelog";
import styles from "@/app/utility.module.css";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Template changelog records preserved in Valtriix reference mode.",
};

export default function ChangelogPage() {
  return (
    <SiteLayout headerVariant="light">
      <section className={styles.section} aria-labelledby="changelog-heading">
        <div className="container">
          <div className={styles.centerHead}>
            <h1 id="changelog-heading">Changelog</h1>
          </div>

          <div className={styles.changelogList}>
            {changelogData.map((entry) => (
              <article key={entry.id} className={styles.changelogCard}>
                <div>
                  <div className={styles.version}>{entry.version}</div>
                  <div className={styles.date}>{entry.date}</div>
                </div>

                <div className={styles.clBody}>
                  <h2 className={styles.clTitle}>{entry.title}</h2>
                  <p>{entry.description}</p>
                  <h3 className={styles.whatsNew}>What&apos;s new</h3>
                  <ul className={styles.featureList}>
                    {entry.features.map((feat, idx) => (
                      <li key={idx} className={styles.featureItem}>
                        <Image
                          src="/assets/icons/check-5.svg"
                          alt=""
                          width={16}
                          height={16}
                          aria-hidden="true"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
