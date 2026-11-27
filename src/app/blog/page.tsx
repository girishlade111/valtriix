import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionLabel } from "@/components/common/SectionLabel";
import { ActionButton } from "@/components/common/ActionButton";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { getFeaturedArticle, getPopularArticles } from "@/content/articles";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "News, updates, and investment insights on market trends, portfolio diversification, and long-term wealth planning.",
};

export default function BlogListingPage() {
  const featured = getFeaturedArticle();
  const popular = getPopularArticles();

  return (
    <SiteLayout headerVariant="light">
      <section className={styles.section} aria-labelledby="blog-listing-heading">
        <div className="container">
          <div className={styles.headBlock}>
            <SectionLabel text="BLOG" />
            <h1 id="blog-listing-heading">News and updates</h1>
          </div>

          <div className={styles.featuredWrap}>
            <div className={styles.featuredContent}>
              <div>
                <div className={styles.metaRow}>
                  <span className={styles.tagBadge}>
                    <span className={styles.dot} aria-hidden="true" />
                    <span>{featured.category}</span>
                  </span>
                  <span className={styles.tagBadge}>{featured.publishedAt}</span>
                </div>
                <h2 className={styles.featuredTitle}>{featured.title}</h2>
              </div>

              <div className={styles.featuredBottom}>
                <p>{featured.summary}</p>
                <ActionButton
                  label="Read More"
                  href={`/blog/${featured.slug}`}
                  variant="dark"
                  showIcon={false}
                />
              </div>
            </div>

            <div className={styles.featuredImgWrap}>
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                priority
                sizes="(max-width: 991px) 100vw, 720px"
                className={styles.featuredImg}
              />
            </div>
          </div>

          <h2 className={`section-title ${styles.popularHeading}`}>Popular news</h2>

          <div className={styles.grid}>
            {popular.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
