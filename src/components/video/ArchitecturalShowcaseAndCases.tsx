"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { primaryStatisticsData } from "@/content/statistics";
import { getHomeCaseStudies } from "@/content/caseStudies";
import { FinancialStatistics } from "@/components/statistics/FinancialStatistics";
import { SectionLabel } from "@/components/common/SectionLabel";
import styles from "./ArchitecturalShowcaseAndCases.module.css";

export function ArchitecturalShowcaseAndCases() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const homeCases = getHomeCaseStudies();

  const togglePlayback = async () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      try {
        await vid.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={styles.darkGradientWrapper}>
      <section className={styles.videoSection} aria-label="Architectural presentation">
        <div className="container">
          <div className={styles.videoWrap}>
            <button
              type="button"
              className={styles.controlBtn}
              aria-pressed={isPlaying}
              onClick={togglePlayback}
            >
              {isPlaying ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <rect x="3" y="2" width="3" height="10" fill="currentColor" />
                    <rect x="8" y="2" width="3" height="10" fill="currentColor" />
                  </svg>
                  <span>Pause Video</span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 2L12 7L3 12V2Z" fill="currentColor" />
                  </svg>
                  <span>Play Video</span>
                </>
              )}
            </button>

            {!isPlaying && (
              <Image
                src="/assets/images/general/video-bg-img.webp"
                alt="Modern luxury architectural residence interior and desert landscape"
                fill
                sizes="(max-width: 1224px) 100vw, 1224px"
                style={{ objectFit: "cover", zIndex: 1 }}
              />
            )}

            <video
              ref={videoRef}
              className={styles.videoEl}
              poster="/assets/images/general/video-bg-img.webp"
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Modern luxury architectural residence interior and desert landscape"
            >
              <source src="/assets/videos/1_mp4.mp4" type="video/mp4" />
              <source src="/assets/videos/1_webm.webm" type="video/webm" />
            </video>
          </div>

          <div className={styles.statsRow}>
            <FinancialStatistics items={primaryStatisticsData} variant="dark-outlined" />
          </div>
        </div>
      </section>

      <section className={styles.caseStudySection} aria-labelledby="home-case-study-heading">
        <div className="container">
          <div className="section-heading-block">
            <SectionLabel text="CASE STUDY" variant="dark-raised" alignment="center" />
            <h2 id="home-case-study-heading" className="section-title text-light">
              Stories of meaningful financial growth
            </h2>
          </div>

          <div className={styles.caseStudyGrid}>
            {homeCases.map((cs) => (
              <Link
                key={cs.id}
                href={`/case-study/${cs.slug}`}
                className={styles.csCard}
                aria-label={`${cs.brandName}: ${cs.title}`}
              >
                <div className={styles.csFront}>
                  <Image
                    src={cs.brandLogo}
                    alt={cs.brandName}
                    width={150}
                    height={30}
                    className={styles.csFrontLogo}
                  />
                </div>

                <div className={styles.csBack}>
                  <Image
                    src={cs.coverImage}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 100vw, 392px"
                    className={styles.csBackImg}
                  />
                  <div className={styles.csBackScrim} aria-hidden="true" />
                  <div className={styles.csBackTop}>
                    <Image
                      src={cs.brandLogo}
                      alt={cs.brandName}
                      width={130}
                      height={26}
                      className={styles.csFrontLogo}
                    />
                  </div>
                  <div className={styles.csBackBottom}>
                    <div className={styles.csBackTitle}>{cs.hoverLabel}</div>
                    <span className={styles.csReadPill}>Read Story</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
