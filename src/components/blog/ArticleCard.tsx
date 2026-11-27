import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { ArticleRecord } from "@/types/content";
import styles from "./ArticleCard.module.css";

interface ArticleCardProps {
  article: ArticleRecord;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/blog/${article.slug}`} className={styles.card}>
      <div className={styles.imgWrap}>
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 392px"
          className={styles.img}
        />
      </div>
      <h3 className={styles.title}>{article.title}</h3>
      <div className={styles.metaRow}>
        <span className={styles.tagBadge}>
          <span className={styles.dot} aria-hidden="true" />
          <span>{article.category}</span>
        </span>
        <span className={styles.tagBadge}>{article.publishedAt}</span>
      </div>
    </Link>
  );
}
