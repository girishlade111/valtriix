import React from "react";
import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionLabel } from "@/components/common/SectionLabel";
import { ServiceImageCard } from "@/components/services/ServiceImageCard";
import { servicesData } from "@/content/services";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Valtriix's asset management, wealth preservation, financial advisory, portfolio management, and risk management services.",
};

export default function ServicesPage() {
  return (
    <SiteLayout headerVariant="light">
      <section className={styles.section} aria-labelledby="services-listing-heading">
        <div className="container">
          <div className={styles.headBlock}>
            <SectionLabel text="OUR SERVICES" alignment="center" />
            <h1 id="services-listing-heading">
              Solutions built around your financial goals
            </h1>
          </div>

          <div className={styles.grid}>
            {servicesData.map((svc) => (
              <ServiceImageCard key={svc.id} service={svc} />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
