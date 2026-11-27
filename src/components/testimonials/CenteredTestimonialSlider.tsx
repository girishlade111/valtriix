"use client";

import React, { useState } from "react";
import Image from "next/image";
import { homeTestimonialsData } from "@/content/testimonials";
import styles from "./CenteredTestimonialSlider.module.css";

export function CenteredTestimonialSlider() {
  const [index, setIndex] = useState(0);
  const current = homeTestimonialsData[index];

  const prev = () =>
    setIndex((i) => (i <= 0 ? homeTestimonialsData.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i >= homeTestimonialsData.length - 1 ? 0 : i + 1));

  return (
    <section className={styles.section} aria-label="Client testimonials">
      <div className="container">
        <div className={styles.inner} aria-live="polite">
          <div className={styles.meta}>
            {current.author}, {current.role}
          </div>

          <blockquote className={styles.quote}>
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          <div className={styles.brandWrap}>
            <Image
              src={current.brandLogo}
              alt={current.brandName}
              width={130}
              height={26}
              className={styles.brandLogo}
            />
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className="v-square-btn"
              aria-label="Previous testimonial"
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
              aria-label="Next testimonial"
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
          </div>
        </div>
      </div>
    </section>
  );
}
