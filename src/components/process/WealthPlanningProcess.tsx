"use client";

import React, { useState } from "react";
import { processStepsData } from "@/content/process";
import { SectionLabel } from "@/components/common/SectionLabel";
import styles from "./WealthPlanningProcess.module.css";

export function WealthPlanningProcess() {
  const [activeStep, setActiveStep] = useState(processStepsData[0].id);

  return (
    <section
      className="how-it-work-section padding-bottom"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.leftCol}>
            <div className={styles.headBlock}>
              <SectionLabel text="HOW IT WORKS" />
              <h2 id="how-it-works-heading" className="section-title">
                Simpler way to build your wealth
              </h2>
            </div>

            <nav className={styles.navList} aria-label="Wealth planning steps">
              {processStepsData.map((step) => {
                const active = activeStep === step.id;
                return (
                  <a
                    key={step.id}
                    href={`#${step.id}`}
                    className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
                    onClick={() => setActiveStep(step.id)}
                  >
                    <span className={styles.navNum}>{step.number}</span>
                    <span>{step.navLabel}</span>
                  </a>
                );
              })}
            </nav>
          </div>

          <div className={styles.rightCol}>
            {processStepsData.map((step) => (
              <div key={step.id} id={step.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.numTile}>{step.number}</span>
                  <span className={styles.cardBadge}>{step.badgeLabel}</span>
                </div>
                <div>
                  <h3 className={styles.cardTitle}>{step.title}</h3>
                  <p className={styles.cardDesc}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
