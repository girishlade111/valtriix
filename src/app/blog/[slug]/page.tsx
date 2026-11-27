import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { articlesData, getArticleBySlug } from "@/content/articles";
import { authorsData } from "@/content/authors";
import { siteConfig } from "@/config/site";
import styles from "./blogDetail.module.css";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articlesData.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.summary,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const author = authorsData.find((au) => au.id === article.authorId) || authorsData[0];

  const splitIndex = 10;
  const firstHalf = article.body.slice(0, splitIndex);
  const secondHalf = article.body.slice(splitIndex);

  return (
    <SiteLayout headerVariant="light">
      <section className={styles.section} aria-labelledby="blog-detail-heading">
        <div className="container">
          <div className={styles.headBlock}>
            <div className={styles.metaRow}>
              <span className={styles.tagBadge}>
                <span className={styles.dot} aria-hidden="true" />
                <span>{article.category}</span>
              </span>
              <span className={styles.tagBadge}>{article.publishedAt}</span>
            </div>
            <h1 id="blog-detail-heading">{article.title}</h1>
          </div>

          <div className={styles.topSplit}>
            <div className={styles.coverWrap}>
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 991px) 100vw, 760px"
                className={styles.coverImg}
              />
            </div>

            <aside className={styles.infoPanel} aria-label="Article summary and author">
              <div className={styles.excerpt}>{article.summary}</div>

              <div className={styles.metaFooter}>
                <div className={styles.authorRow}>
                  <Image
                    src={author.avatarImage}
                    alt={author.name}
                    width={40}
                    height={40}
                    className={styles.avatar}
                  />
                  <div>
                    <div className={styles.authorLabel}>Author</div>
                    <div className={styles.authorName}>{author.name}</div>
                  </div>
                </div>

                <div className={styles.shareBlock}>
                  <div className={styles.shareLabel}>Share to</div>
                  <div className={styles.shareIcons}>
                    {siteConfig.footer.socials.map((soc) => (
                      <a
                        key={soc.name}
                        href={soc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Share on ${soc.name}`}
                        className={styles.shareBtn}
                      >
                        <Image src={soc.icon} alt="" width={13} height={13} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <article className={styles.bodyContainer}>
            {firstHalf.map((blk, idx) =>
              blk.type === "heading" ? (
                <h2 key={idx} className={styles.bodyHeading}>
                  {blk.text}
                </h2>
              ) : blk.type === "paragraph" ? (
                <p key={idx}>{blk.text}</p>
              ) : null
            )}

            <div className={styles.inlineImgWrap}>
              <Image
                src={article.inlineImage}
                alt="Financial advisors discussing strategy in a modern office"
                fill
                sizes="(max-width: 760px) 100vw, 760px"
                className={styles.coverImg}
              />
            </div>

            {secondHalf.map((blk, idx) =>
              blk.type === "heading" ? (
                <h2 key={idx} className={styles.bodyHeading}>
                  {blk.text}
                </h2>
              ) : blk.type === "paragraph" ? (
                <p key={idx}>{blk.text}</p>
              ) : null
            )}
          </article>
        </div>
      </section>
    </SiteLayout>
  );
}
