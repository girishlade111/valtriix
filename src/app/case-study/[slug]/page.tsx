import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { caseStudiesData, getCaseStudyBySlug } from "@/content/caseStudies";
import styles from "./caseStudyDetail.module.css";

interface CaseStudyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudiesData.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return { title: "Case Study Not Found" };
  return {
    title: cs.title,
    description: cs.summary,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: CaseStudyDetailPageProps) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const detailFields = [
    { label: "Client:", value: cs.clientDetails.clientLabel },
    { label: "Age:", value: cs.clientDetails.ageLabel },
    { label: "Industry:", value: cs.clientDetails.industry },
    { label: "Primary Goal:", value: cs.clientDetails.primaryGoal },
    { label: "Investment Period:", value: cs.clientDetails.investmentPeriod },
    { label: "Service:", value: cs.clientDetails.service },
  ];

  return (
    <SiteLayout headerVariant="light">
      <section className={styles.section} aria-labelledby="case-study-detail-heading">
        <div className="container">
          <div className={styles.wrapper}>
            <div className={styles.heroBlock}>
              <h1 id="case-study-detail-heading">{cs.title}</h1>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroImgWrap}>
                <Image
                  src={cs.coverImage}
                  alt={cs.title}
                  fill
                  priority
                  sizes="(max-width: 1120px) 100vw, 1120px"
                  className={styles.heroImg}
                />
              </div>

              <div className={styles.metricsStrip}>
                {cs.metrics.map((m, idx) => (
                  <div key={idx} className={styles.metricItem}>
                    <div className={styles.metricVal}>{m.value}</div>
                    <div className={styles.metricLbl}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.articleLayout}>
              <div className={styles.richCol}>
                <div className={styles.block}>
                  <h2 className={styles.subHeading}>Client Overview</h2>
                  <p>{cs.sections.clientOverview}</p>
                </div>

                <div className={styles.block}>
                  <h2 className={styles.subHeading}>The Challenge</h2>
                  <p>{cs.sections.theChallenge}</p>
                </div>

                <div className={styles.block}>
                  <h2 className={styles.subHeading}>Our Approach</h2>
                  <p>{cs.sections.ourApproach}</p>
                </div>

                <div className={styles.inlineImgWrap}>
                  <Image
                    src={cs.secondaryImage}
                    alt="Luxury lounge interior consultation space"
                    fill
                    sizes="(max-width: 991px) 100vw, 660px"
                    className={styles.heroImg}
                  />
                </div>

                <div className={styles.block}>
                  <h2 className={styles.subHeading}>The Results</h2>
                  <p>{cs.sections.theResults}</p>
                </div>

                <div className={styles.block}>
                  <h2 className={styles.subHeading}>Key Results</h2>
                  <ul className={styles.resultsList}>
                    {cs.keyResults.map((res, idx) => (
                      <li key={idx} className={styles.resultItem}>
                        <span className={styles.resultLead}>{res.lead}</span> : {res.detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.quoteCard}>
                  <blockquote className={styles.quoteText}>{cs.quotation.text}</blockquote>
                  <div className={styles.quoteAuthorRow}>
                    <Image
                      src={cs.quotation.avatarImage}
                      alt={cs.quotation.author}
                      width={44}
                      height={44}
                      className={styles.avatar}
                    />
                    <div>
                      <div className={styles.quoteAuthor}>{cs.quotation.author}</div>
                      <div className={styles.quoteRole}>{cs.quotation.role}</div>
                    </div>
                  </div>
                </div>

                <div className={styles.block}>
                  <h2 className={styles.subHeading}>Conclusion</h2>
                  <p>{cs.sections.conclusion}</p>
                </div>
              </div>

              <aside className={styles.sidebar} aria-label="Client Details">
                <h2 className={styles.sidebarHead}>Client Details</h2>
                {detailFields.map((df) => (
                  <div key={df.label} className={styles.detailItem}>
                    <span className={styles.detailLabel}>{df.label}</span>
                    <span className={styles.detailValue}>{df.value}</span>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
