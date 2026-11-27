"use client";

import React, { useState } from "react";
import Image from "next/image";
import { audiencesData } from "@/content/audiences";
import { SectionLabel } from "@/components/common/SectionLabel";
import styles from "./AudienceTabs.module.css";

export function AudienceTabs() {
  const [activeId, setActiveId] = useState(audiencesData[0].id);
  const current = audiencesData.find((a) => a.id === activeId) || audiencesData[0];

  return (
    <section
      className="who-we-serve-section padding-bottom"
      aria-labelledby="who-we-serve-heading"
    >
      <div className="container">
        <div className={styles.headBlock}>
          <SectionLabel text="WHO WE SERVE" />
          <h2 id="who-we-serve-heading" className="section-title">
            Financial guidance for every stage of life
          </h2>
        </div>

        <div className={styles.wrap}>
          <div className={styles.leftPanel}>
            <div className={styles.tabList} role="tablist" aria-label="Client audiences">
              {audiencesData.map((aud) => {
                const isActive = aud.id === activeId;
                return (
                  <button
                    key={aud.id}
                    type="button"
                    role="tab"
                    id={`audience-tab-${aud.id}`}
                    aria-selected={isActive}
                    aria-controls={`audience-panel-${aud.id}`}
                    className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ""}`}
                    onClick={() => setActiveId(aud.id)}
                  >
                    {isActive && <span className={styles.tabDot} aria-hidden="true" />}
                    <span>{aud.tabLabel}</span>
                  </button>
                );
              })}
            </div>

            <div
              className={styles.tabContent}
              role="tabpanel"
              id={`audience-panel-${current.id}`}
              aria-labelledby={`audience-tab-${current.id}`}
            >
              <h3 className={styles.tabTitle}>{current.title}</h3>
              <p className={styles.tabDesc}>{current.description}</p>
            </div>
          </div>

          <div className={styles.imgWrap}>
            <Image
              src={current.image}
              alt={`${current.title} financial consultation`}
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
