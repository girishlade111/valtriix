import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { ServiceRecord } from "@/types/content";
import styles from "./ServiceImageCard.module.css";

interface ServiceImageCardProps {
  service: ServiceRecord;
}

export function ServiceImageCard({ service }: ServiceImageCardProps) {
  return (
    <Link href={`/services/${service.slug}`} className={styles.card}>
      <Image
        src={service.coverImage}
        alt={service.title}
        fill
        sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 392px"
        className={styles.cardImg}
      />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.bottomRow}>
        <h3 className={styles.title}>{service.title}</h3>
        <span className={styles.arrowBox} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3.33333 8H12.6667M12.6667 8L8.66667 4M12.6667 8L8.66667 12"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
