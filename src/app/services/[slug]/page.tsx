import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ActionButton } from "@/components/common/ActionButton";
import { WhyChooseUsSection } from "@/components/shared/WhyChooseUsSection";
import { FAQSection } from "@/components/shared/FAQSection";
import { getServiceBySlug, serviceOffersData, servicesData } from "@/content/services";
import styles from "./serviceDetail.module.css";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((svc) => ({ slug: svc.slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <SiteLayout headerVariant="light">
      <section className={styles.heroSection} aria-labelledby="service-detail-heading">
        <div className="container">
          <div className={styles.heroBlock}>
            <h1 id="service-detail-heading">{service.title}</h1>
            <p className={styles.heroSub}>{service.summary}</p>
            <ActionButton label="Make An Appointment" href="/contact" />
          </div>

          <div className={styles.heroImgWrap}>
            <Image
              src={service.heroImage}
              alt={service.title}
              fill
              priority
              sizes="(max-width: 1040px) 100vw, 1040px"
              className={styles.heroImg}
            />
          </div>

          <div className={styles.contentWrap}>
            <div className={styles.overviewBlock}>
              <h3>Overview</h3>
              <p>{service.overview}</p>
            </div>

            <div className={styles.offerBlock}>
              <h2>What we offer</h2>
              <div className={styles.offerGrid}>
                {serviceOffersData.map((offer) => (
                  <div key={offer.id} className={styles.offerCard}>
                    <h3 className={styles.offerTitle}>{offer.title}</h3>
                    <p>{offer.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUsSection variant="dark-statistics" />
      <FAQSection topPadding />
    </SiteLayout>
  );
}
