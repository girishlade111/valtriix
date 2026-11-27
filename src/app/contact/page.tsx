import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionLabel } from "@/components/common/SectionLabel";
import { ContactForm } from "@/components/contact/ContactForm";
import { FAQSection } from "@/components/shared/FAQSection";
import {
  collaboratorAvatars,
  contactMapAsset,
  officeLocationsData,
} from "@/content/locations";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with Valtriix's financial advisors across our United States, United Kingdom, and Australia demonstration offices.",
};

export default function ContactPage() {
  return (
    <SiteLayout headerVariant="light">
      <section className={styles.heroSection} aria-labelledby="contact-heading">
        <div className="container">
          <div className={styles.headBlock}>
            <SectionLabel text="CONTACT" />
            <h1 id="contact-heading">Contact with us</h1>
          </div>

          <div className={styles.officesGrid}>
            {officeLocationsData.map((office) => (
              <div key={office.id} className={styles.officeCard}>
                <div className={styles.officeTop}>
                  <h2 className={styles.countryTitle}>{office.country}</h2>
                  <a
                    href={office.addressHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.officeLine} ${styles.officeLink}`}
                  >
                    {office.address}
                  </a>
                </div>

                <div className={styles.divider} aria-hidden="true" />

                <div className={styles.officeLinks}>
                  <div className={styles.officeLine}>
                    T:{" "}
                    <a href={office.phoneHref} className={styles.officeLink}>
                      {office.phone}
                    </a>
                  </div>
                  <div className={styles.officeLine}>
                    E:{" "}
                    <a href={office.emailHref} className={styles.officeLink}>
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="padding-bottom" aria-labelledby="meet-advisor-heading">
        <div className="container">
          <div className={styles.advisorSplit}>
            <div className={styles.advisorLeft}>
              <div className={styles.advisorIntro}>
                <h2 id="meet-advisor-heading" className="section-title">
                  Meet with an advisor
                </h2>
                <p>
                  Connect with our experienced advisors to discuss your financial goals,
                  explore tailored investment strategies
                </p>
              </div>

              <div className={styles.collabBlock}>
                <div className={styles.avatarStack}>
                  {collaboratorAvatars.map((av) => (
                    <Image
                      key={av.name}
                      src={av.src}
                      alt={av.name}
                      width={38}
                      height={38}
                      className={styles.avatar}
                    />
                  ))}
                </div>
                <span className={styles.collabText}>Over 100 independent collaborators</span>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <section className="padding-bottom" aria-label="Office area map">
        <div className="container">
          <div className={styles.mapWrap}>
            <Image
              src={contactMapAsset.src}
              alt={contactMapAsset.alt}
              fill
              sizes="(max-width: 1224px) 100vw, 1224px"
              className={styles.mapImg}
            />
          </div>
        </div>
      </section>

      <FAQSection />
    </SiteLayout>
  );
}
