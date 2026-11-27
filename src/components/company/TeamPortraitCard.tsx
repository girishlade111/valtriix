import React from "react";
import Image from "next/image";
import type { AdvisorRecord } from "@/types/content";
import styles from "./TeamPortraitCard.module.css";

interface TeamPortraitCardProps {
  advisor: AdvisorRecord;
}

export function TeamPortraitCard({ advisor }: TeamPortraitCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imgWrap}>
        <Image
          src={advisor.image}
          alt={advisor.name}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 991px) 50vw, 288px"
          className={styles.img}
        />
      </div>
      <div className={styles.infoRow}>
        <div>
          <h4 className={styles.name}>{advisor.name}</h4>
          <p className={styles.role}>{advisor.role}</p>
        </div>
        <a
          href={advisor.socialHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${advisor.name} on X`}
          className={styles.socialLink}
        >
          <Image src="/assets/icons/x-dark.svg" alt="" width={12} height={12} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
