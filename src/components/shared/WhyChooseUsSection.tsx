import React from "react";
import Image from "next/image";
import { SectionLabel } from "@/components/common/SectionLabel";
import {
  darkWhyChooseMetricsData,
  homeWhyChooseFeaturesData,
} from "@/content/statistics";
import styles from "./WhyChooseUsSection.module.css";

interface WhyChooseUsSectionProps {
  variant?: "home-features" | "dark-statistics";
}

export function WhyChooseUsSection({
  variant = "home-features",
}: WhyChooseUsSectionProps) {
  const isDark = variant === "dark-statistics";

  return (
    <section
      className={isDark ? styles.sectionDark : "why-choose-us-section padding-bottom"}
      aria-labelledby={`why-choose-us-${variant}`}
    >
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.imgCol}>
            <Image
              src="/assets/images/general/img-2.webp"
              alt="Financial advisor meeting with client over documents"
              fill
              sizes="(max-width: 991px) 100vw, 580px"
              className={styles.img}
            />
          </div>

          <div className={styles.contentCol}>
            <div className={styles.headBlock}>
              <SectionLabel
                text="WHY CHOOSE US"
                variant={isDark ? "dark-raised" : "light"}
              />
              <h2
                id={`why-choose-us-${variant}`}
                className={`section-title ${isDark ? "text-light" : ""}`}
              >
                The right partner for your wealth
              </h2>
              <p
                className={`${styles.description} ${
                  isDark ? styles.descriptionDark : ""
                }`}
              >
                We combine personalized guidance, trusted expertise, and thoughtful
                strategies help you grow your wealth &amp; achieve your financial goals
                with confidence
              </p>
            </div>

            {isDark ? (
              <div className={styles.cardsGrid}>
                {darkWhyChooseMetricsData.map((m) => (
                  <div key={m.id} className={styles.metricCardDark}>
                    <div className={styles.metricValue}>{m.value}</div>
                    <div className={styles.metricLabel}>{m.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.cardsGrid}>
                {homeWhyChooseFeaturesData.map((f) => (
                  <div key={f.id} className={styles.featureCard}>
                    <div className={styles.iconTile}>
                      <Image src={f.icon} alt="" width={18} height={18} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className={styles.cardTitle}>{f.title}</h3>
                      <p className={styles.cardDesc}>{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
