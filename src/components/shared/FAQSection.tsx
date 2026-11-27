"use client";

import React, { useState } from "react";
import { faqData } from "@/content/faq";
import { SectionLabel } from "@/components/common/SectionLabel";
import styles from "./FAQSection.module.css";

interface FAQSectionProps {
  topPadding?: boolean;
}

export function FAQSection({ topPadding = false }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqData[0]?.id ?? null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className={`${styles.faqSection} ${topPadding ? styles.faqSectionTop : ""}`}
      aria-labelledby="faq-section-heading"
    >
      <div className="container">
        <div className={styles.faqGrid}>
          <div className={styles.faqHeadingCol}>
            <SectionLabel text="FAQ" />
            <h2 id="faq-section-heading" className="section-title">
              Got Questions?
            </h2>
          </div>

          <div className={styles.faqList}>
            {faqData.map((item) => {
              const isOpen = openId === item.id;
              const panelId = `faq-panel-${item.id}`;
              const btnId = `faq-btn-${item.id}`;
              return (
                <div key={item.id} className={styles.faqItem}>
                  <button
                    id={btnId}
                    type="button"
                    className={styles.faqTrigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item.id)}
                  >
                    <span className={styles.faqQuestion}>{item.question}</span>
                    <span className={styles.faqIcon} aria-hidden="true">
                      {isOpen ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M3 8H13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M8 3V13M3 8H13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div id={panelId} role="region" aria-labelledby={btnId} className={styles.faqAnswer}>
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
