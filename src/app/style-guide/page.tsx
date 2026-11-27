import React from "react";
import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionLabel } from "@/components/common/SectionLabel";
import { ActionButton } from "@/components/common/ActionButton";
import styles from "@/app/utility.module.css";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "Valtriix design tokens, color swatches, typography scale, and buttons.",
};

const swatches = [
  { label: "BG Neutral 01", bg: "#fcfbf8", color: "#211e1c", border: "1px solid #ede8de" },
  { label: "BG Neutral 02", bg: "#ede8de", color: "#211e1c" },
  { label: "BG Neutral 03", bg: "#3a3634", color: "#fcfbf8" },
  { label: "BG Neutral 04", bg: "#211e1c", color: "#fcfbf8" },
  { label: "Theme Bg 01", bg: "#2023ff", color: "#fcfbf8" },
  { label: "Theme Bg 02", bg: "#e0fb00", color: "#211e1c" },
];

export default function StyleGuidePage() {
  return (
    <SiteLayout headerVariant="light">
      <section className={styles.section} aria-labelledby="styleguide-heading">
        <div className="container">
          <div className={styles.centerHead}>
            <SectionLabel text="STYLEGUIDE" alignment="center" />
            <h1 id="styleguide-heading">Styleguide</h1>
          </div>

          <div className={styles.sgSection}>
            <div className={styles.sgRow}>
              <h2 className={styles.sgLabel}>Colors</h2>
              <div className={styles.sgPanel}>
                <div className={styles.swatchGrid}>
                  {swatches.map((s) => (
                    <div
                      key={s.label}
                      className={styles.swatch}
                      style={{
                        backgroundColor: s.bg,
                        color: s.color,
                        border: s.border,
                      }}
                    >
                      {s.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.sgRow}>
              <h2 className={styles.sgLabel}>Typography</h2>
              <div className={styles.typeStack}>
                <div style={{ fontSize: "80px", lineHeight: "105%", letterSpacing: "-6px" }}>
                  Display 01
                </div>
                <h1>Heading 1</h1>
                <h2>Heading 2</h2>
                <div style={{ fontSize: "40px", lineHeight: "115%", letterSpacing: "-1.5px" }}>
                  Display 03
                </div>
                <h3>Heading 3</h3>
                <h4>Heading 4</h4>
                <p>
                  We build free &amp; premium templates that help you speed up your website
                  building process inside Webflow.
                </p>
              </div>
            </div>

            <div className={styles.sgRow}>
              <h2 className={styles.sgLabel}>Buttons</h2>
              <div className={styles.sgPanel}>
                <div className={styles.btnRow}>
                  <ActionButton label="Get Started Now" href="/contact" />
                  <ActionButton label="Get Started Now" href="/contact" variant="dark" showIcon={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
