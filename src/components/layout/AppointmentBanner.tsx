import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ActionButton } from "@/components/common/ActionButton";
import styles from "./AppointmentBanner.module.css";

export function AppointmentBanner() {
  const { heading, description, ctaLabel, ctaHref, image } = siteConfig.appointmentBanner;

  return (
    <section className={styles.ctaSection} aria-labelledby="appointment-banner-heading">
      <Image
        src={image}
        alt="Financial advisors meeting with a client in a warm contemporary office"
        fill
        sizes="100vw"
        className={styles.ctaBgImage}
      />
      <div className={styles.ctaLeftOverlay} aria-hidden="true" />
      <div className={styles.ctaBottomOverlay} aria-hidden="true" />
      <div className="container">
        <div className={styles.ctaContent}>
          <h2 id="appointment-banner-heading" className={styles.ctaTitle}>
            {heading}
          </h2>
          <p className={styles.ctaParagraph}>{description}</p>
          <ActionButton label={ctaLabel} href={ctaHref} />
        </div>
      </div>
    </section>
  );
}
