import React from "react";
import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionLabel } from "@/components/common/SectionLabel";
import { TeamPortraitCard } from "@/components/company/TeamPortraitCard";
import { advisorsData } from "@/content/team";
import styles from "./advisors.module.css";

export const metadata: Metadata = {
  title: "Our Advisors",
  description:
    "Meet Valtriix's Board of Directors, Leadership, and Private Wealth advisory team.",
};

export default function OurAdvisorsPage() {
  const board = advisorsData.filter((a) => a.group === "board");
  const leadership = advisorsData.filter((a) => a.group === "leadership");
  const privateWealth = advisorsData.filter((a) => a.group === "private-wealth");

  return (
    <SiteLayout headerVariant="light">
      <section className={styles.section} aria-labelledby="our-advisors-heading">
        <div className="container">
          <div className={styles.headBlock}>
            <SectionLabel text="ADVISORS" />
            <h1 id="our-advisors-heading">Helping your wealth grow over time</h1>
          </div>

          <div className={styles.groupWrap}>
            <h2 className={styles.groupHeading}>Board of Directors</h2>
            <div className={styles.teamGrid}>
              {board.map((adv) => (
                <TeamPortraitCard key={adv.id} advisor={adv} />
              ))}
            </div>
          </div>

          <div className={styles.groupWrap}>
            <h2 className={styles.groupHeading}>Leadership</h2>
            <div className={styles.teamGrid}>
              {leadership.map((adv) => (
                <TeamPortraitCard key={adv.id} advisor={adv} />
              ))}
            </div>
          </div>

          <div className={styles.groupWrap}>
            <h2 className={styles.groupHeading}>Private Wealth</h2>
            <div className={styles.teamGrid}>
              {privateWealth.map((adv) => (
                <TeamPortraitCard key={adv.id} advisor={adv} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
