import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionLabel } from "@/components/common/SectionLabel";
import { ActionButton } from "@/components/common/ActionButton";
import { caseStudiesData } from "@/content/caseStudies";
import styles from "./caseStudy.module.css";

export const metadata: Metadata = {
  title: "Case Study",
  description:
    "Explore Valtriix case studies demonstrating strategic wealth planning, portfolio diversification, and long-term guidance.",
};

export default function CaseStudyListingPage() {
  return (
    <SiteLayout headerVariant="light">
      <section className={styles.section} aria-labelledby="case-study-listing-heading">
        <div className="container">
          <div className={styles.headBlock}>
            <SectionLabel text="CASE STUDY" />
            <h1 id="case-study-listing-heading">
              Explore our approach to investment success
            </h1>
          </div>

          <div className={styles.list}>
            {caseStudiesData.map((cs) => (
              <article key={cs.id} className={styles.card}>
                <div className={styles.imgWrap}>
                  <Image
                    src={cs.coverImage}
                    alt={cs.title}
                    fill
                    sizes="(max-width: 991px) 100vw, 560px"
                    className={styles.img}
                  />
                </div>

                <div className={styles.contentCol}>
                  <div className={styles.topBlock}>
                    <h2 className={styles.cardTitle}>{cs.title}</h2>
                    <p>{cs.summary}</p>
                    <div className={styles.divider} aria-hidden="true" />
                    <div>
                      <div className={styles.metricValue}>{cs.primaryMetric.value}</div>
                      <div className={styles.metricLabel}>{cs.primaryMetric.label}</div>
                    </div>
                  </div>

                  <div>
                    <ActionButton
                      label="Read Full Case Study"
                      href={`/case-study/${cs.slug}`}
                      variant="dark"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
