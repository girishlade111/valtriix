import React from "react";
import type { LegalDocumentRecord } from "@/types/content";
import { SectionLabel } from "@/components/common/SectionLabel";
import styles from "./LegalDocumentLayout.module.css";

interface LegalDocumentLayoutProps {
  document: LegalDocumentRecord;
}

export function LegalDocumentLayout({ document }: LegalDocumentLayoutProps) {
  return (
    <section className={styles.section} aria-labelledby="legal-page-heading">
      <div className="container">
        <div className={styles.headerBlock}>
          <SectionLabel text={document.lastUpdated} alignment="center" />
          <h1 id="legal-page-heading">{document.title}</h1>
        </div>

        <div className={styles.contentCol}>
          {document.sections.map((sec) => (
            <section key={sec.id} className={styles.docSection}>
              <h2 className={styles.docHeading}>{sec.heading}</h2>
              {sec.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
