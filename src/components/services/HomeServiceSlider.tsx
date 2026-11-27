"use client";

import React, { useState } from "react";
import { servicesData } from "@/content/services";
import { SectionLabel } from "@/components/common/SectionLabel";
import { ServiceImageCard } from "@/components/services/ServiceImageCard";
import styles from "./HomeServiceSlider.module.css";

export function HomeServiceSlider() {
  const sliderServices = servicesData.filter((s) => s.showInHomeSlider);
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, sliderServices.length - 1);

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));

  const controls = (
    <>
      <button
        type="button"
        className="v-square-btn"
        aria-label="Previous service"
        onClick={prev}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M12.6667 8H3.33333M3.33333 8L7.33333 4M3.33333 8L7.33333 12"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        className="v-square-btn"
        aria-label="Next service"
        onClick={next}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3.33333 8H12.6667M12.6667 8L8.66667 4M12.6667 8L8.66667 12"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );

  return (
    <section className={styles.section} aria-labelledby="home-services-heading">
      <div className="container">
        <div className={styles.headerRow}>
          <div className={styles.headCol}>
            <SectionLabel text="OUR SERVICES" />
            <h2 id="home-services-heading" className="section-title">
              Solutions built around your financial goals
            </h2>
          </div>
          <div className={styles.controls}>{controls}</div>
        </div>

        <div className={styles.viewport} role="region" aria-label="Services slider">
          <div
            className={styles.track}
            style={{ transform: `translateX(calc(-${index} * (31.7% + 8px)))` }}
          >
            {sliderServices.map((service) => (
              <ServiceImageCard key={service.id} service={service} />
            ))}
          </div>
        </div>

        <div className={styles.mobileControls}>{controls}</div>
      </div>
    </section>
  );
}
