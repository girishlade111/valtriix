"use client";

import React, { useState } from "react";
import Image from "next/image";
import { approachItemsData } from "@/content/approach";
import { SectionLabel } from "@/components/common/SectionLabel";
import styles from "./InvestmentApproachSelector.module.css";

export function InvestmentApproachSelector() {
  const [activeId, setActiveId] = useState(approachItemsData[0].id);
  const activeItem =
    approachItemsData.find((item) => item.id === activeId) || approachItemsData[0];

  return (
    <section
      className="our-approach-section padding-bottom"
      aria-labelledby="our-approach-heading"
    >
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.leftCol}>
            <div className={styles.headBlock}>
              <SectionLabel text="OUR APPROACH" />
              <h2 id="our-approach-heading" className="section-title">
                Smarter way to build lasting wealth
              </h2>
              <p className={styles.subtitle}>
                Build lasting wealth with tailored investment strategies and expert
                guidance designed around your financial goals
              </p>
            </div>

            <div className={styles.tabsList} role="tablist" aria-label="Our investment approach">
              {approachItemsData.map((item, idx) => {
                const isActive = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    id={`approach-tab-${item.id}`}
                    aria-selected={isActive}
                    aria-controls={`approach-panel-${item.id}`}
                    className={`${styles.tabBtn} ${idx === 0 ? styles.tabBtnFirst : ""} ${
                      isActive ? styles.tabBtnActive : ""
                    }`}
                    onClick={() => setActiveId(item.id)}
                  >
                    <span className={styles.tabTitle}>{item.title}</span>
                    {isActive && <span className={styles.tabDesc}>{item.description}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className={styles.rightCol}
            role="tabpanel"
            id={`approach-panel-${activeItem.id}`}
            aria-labelledby={`approach-tab-${activeItem.id}`}
          >
            <Image
              src={activeItem.image}
              alt={activeItem.title}
              fill
              sizes="(max-width: 991px) 100vw, 600px"
              className={styles.img}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
