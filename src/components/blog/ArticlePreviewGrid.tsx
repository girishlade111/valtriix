import React from "react";
import { getHomeArticles } from "@/content/articles";
import { ActionButton } from "@/components/common/ActionButton";
import { ArticleCard } from "@/components/blog/ArticleCard";
import styles from "./ArticlePreviewGrid.module.css";

export function ArticlePreviewGrid() {
  const articles = getHomeArticles();

  return (
    <section
      className="blog-section padding-bottom"
      aria-labelledby="home-news-heading"
    >
      <div className="container">
        <div className={styles.headRow}>
          <h2 id="home-news-heading" className="section-title">
            News and updates
          </h2>
          <ActionButton label="View All Articles" href="/blog" variant="dark" />
        </div>

        <div className={styles.grid}>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
