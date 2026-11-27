import React from "react";
import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { BrandLogo } from "@/components/common/BrandLogo";
import { ActionButton } from "@/components/common/ActionButton";
import styles from "@/app/utility.module.css";

export const metadata: Metadata = {
  title: "Not Found",
  description: "This page doesn't seem to exist anymore.",
};

export default function Custom404Page() {
  return (
    <SiteLayout headerVariant="light">
      <section className={styles.notFoundWrap} aria-labelledby="not-found-heading">
        <BrandLogo variant="dark" href="" height={30} />
        <h1 id="not-found-heading">Oops...Not here</h1>
        <p className={styles.notFoundSub}>This page doesn&apos;t seem to exist anymore</p>
        <ActionButton label="Go Back To Home" href="/" />
      </section>
    </SiteLayout>
  );
}
