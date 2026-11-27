import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionLabel } from "@/components/common/SectionLabel";
import { FinancialStatistics } from "@/components/statistics/FinancialStatistics";
import { WhyChooseUsSection } from "@/components/shared/WhyChooseUsSection";
import { TeamPortraitCard } from "@/components/company/TeamPortraitCard";
import { FAQSection } from "@/components/shared/FAQSection";
import { siteConfig } from "@/config/site";
import { coreValuesData, primaryStatisticsData } from "@/content/statistics";
import { careersData } from "@/content/careers";
import { advisorsData } from "@/content/team";
import { companyReviewsData } from "@/content/testimonials";
import styles from "./company.module.css";

export const metadata: Metadata = {
  title: "Company",
  description:
    "At Valtriix, we believe wealth management should be about more than numbers. It's about understanding your ambitions and supporting your decisions.",
};

export default function CompanyPage() {
  const boardPreview = advisorsData.filter((a) => a.group === "board" && a.showOnCompany);
  const leadershipPreview = advisorsData.filter(
    (a) => a.group === "leadership" && a.showOnCompany
  );

  return (
    <SiteLayout headerVariant="light">
      <section className={styles.heroSection} aria-labelledby="company-hero-heading">
        <div className="container">
          <div className={styles.heroIntro}>
            <h1 id="company-hero-heading">About our company</h1>
            <p className={styles.heroSub}>
              At Valtriix, we believe wealth management should be about more than numbers.
              It&apos;s about understanding your ambitions, supporting your decisions
            </p>
          </div>

          <div className={styles.heroMediaGrid}>
            <div className={styles.heroLeftImgWrap}>
              <Image
                src="/assets/images/general/img-4.webp"
                alt="Valtriix advisors collaborating at an office conference table"
                fill
                priority
                sizes="(max-width: 991px) 100vw, 800px"
                className={styles.coverImg}
              />
            </div>

            <div className={styles.heroRightCard}>
              <Image
                src="/assets/images/general/img-6.webp"
                alt=""
                fill
                priority
                sizes="(max-width: 991px) 100vw, 400px"
                className={styles.coverImg}
              />
              <div className={styles.quoteOverlayBox}>
                <p className={styles.quoteText}>
                  &ldquo;We believe in making wealth management personal, building
                  lasting trust, and helping every client move toward a more
                  confident.&rdquo;
                </p>
                <div className={styles.quoteAuthor}>Esther Howard, Founder &amp; CEO</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.trustSection} aria-label="Trusted clients">
        <div className="container">
          <p className={styles.trustLabel}>Trusted by 25000+ Clients</p>
          <div className={styles.logosRow}>
            {siteConfig.partnerLogos.map((logo) => (
              <Image
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                width={130}
                height={30}
                className={styles.logoDark}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="padding-bottom" aria-labelledby="company-story-heading">
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyImgWrap}>
              <Image
                src="/assets/images/general/img-5.webp"
                alt="Advisor discussing financial strategy with client"
                fill
                sizes="(max-width: 991px) 100vw, 580px"
                className={styles.coverImg}
              />
            </div>

            <div className={styles.storyRight}>
              <div className={styles.storyHead}>
                <SectionLabel text="OUR STORY" />
                <h2 id="company-story-heading" className="section-title">
                  Helping you to build wealth since 2002
                </h2>
              </div>

              <div className={styles.storyParas}>
                <p>
                  Since 2002, we&apos;ve believed that wealth management should start with
                  people, not numbers. What began with a simple vision, to make financial
                  guidance more personal and meaningful, has grown into a commitment to
                  helping individuals, families, and businesses plan for a brighter
                  financial future
                </p>
                <p>
                  Over the years, our approach has remained the same: listen carefully,
                  understand what matters most, and create strategies around each
                  client&apos;s unique goals. We believe lasting relationships are built
                  on trust, honest guidance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="padding-bottom" aria-label="Key metrics">
        <div className="container">
          <FinancialStatistics items={primaryStatisticsData} variant="light-minimal" />
        </div>
      </section>

      <section className="padding-bottom" aria-labelledby="core-values-heading">
        <div className="container">
          <div className="section-heading-block left">
            <SectionLabel text="CORE VALUE" />
            <h2 id="core-values-heading" className="section-title">
              The values behind everything we do
            </h2>
          </div>

          <div className={styles.valuesGrid}>
            {coreValuesData.map((val) => (
              <div key={val.id} className={styles.valueCard}>
                <div>
                  <Image src={val.icon} alt="" width={28} height={28} aria-hidden="true" />
                </div>
                <div>
                  <h3 className={styles.valueTitle}>{val.title}</h3>
                  <p>{val.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUsSection variant="dark-statistics" />

      <section className="padding" aria-labelledby="careers-heading">
        <div className="container">
          <div className="section-heading-block left">
            <SectionLabel text="CAREER" />
            <h2 id="careers-heading" className="section-title">
              Open positions
            </h2>
          </div>

          <div className={styles.careerList}>
            {careersData.map((job) => (
              <Link key={job.id} href={job.href} className={styles.careerRow}>
                <span className={styles.careerTitle}>{job.title}</span>
                <span className={styles.careerMeta}>{job.location}</span>
                <span className={styles.careerMeta}>{job.compensationLabel}</span>
                <Image
                  src="/assets/icons/arrow-right.svg"
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="padding-bottom" aria-labelledby="company-advisors-heading">
        <div className="container">
          <div className="section-heading-block left">
            <SectionLabel text="ADVISORS" />
            <h2 id="company-advisors-heading" className="section-title">
              Helping your wealth grow over time
            </h2>
          </div>

          <div className={styles.groupWrap}>
            <h3 className={styles.groupHeading}>Board of Directors</h3>
            <div className={styles.teamGrid}>
              {boardPreview.map((adv) => (
                <TeamPortraitCard key={adv.id} advisor={adv} />
              ))}
            </div>
          </div>

          <div className={styles.groupWrap}>
            <h3 className={styles.groupHeading}>Leadership</h3>
            <div className={styles.teamGrid}>
              {leadershipPreview.map((adv) => (
                <TeamPortraitCard key={adv.id} advisor={adv} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="padding-bottom" aria-labelledby="company-reviews-heading">
        <div className="container">
          <div className="section-heading-block left">
            <SectionLabel text="REVIEW" />
            <h2 id="company-reviews-heading" className="section-title">
              Trusted by thousands clients
            </h2>
          </div>

          <div className={styles.reviewsGrid}>
            {companyReviewsData.map((rev) => (
              <article key={rev.id} className={styles.reviewCard}>
                <div>
                  <div
                    className={styles.starsRow}
                    role="img"
                    aria-label={`${rev.stars} out of 5 stars`}
                  >
                    {Array.from({ length: rev.stars }).map((_, idx) => (
                      <Image
                        key={idx}
                        src="/assets/icons/star.svg"
                        alt=""
                        width={16}
                        height={16}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p>{rev.quote}</p>
                </div>

                <div className={styles.reviewAuthorRow}>
                  <Image
                    src={rev.avatarImage}
                    alt={rev.author}
                    width={40}
                    height={40}
                    className={styles.avatar}
                  />
                  <div>
                    <div className={styles.reviewAuthor}>{rev.author}</div>
                    <div className={styles.reviewRole}>{rev.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
    </SiteLayout>
  );
}
