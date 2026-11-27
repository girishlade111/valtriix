import React from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { BrandLogo } from "@/components/common/BrandLogo";
import { ActionButton } from "@/components/common/ActionButton";
import styles from "@/app/utility.module.css";

export default function NotFound() {
  return (
    <SiteLayout headerVariant="light">
      <section className={styles.notFoundWrap} aria-labelledby="global-not-found-heading">
        <BrandLogo variant="dark" href="" height={30} />
        <h1 id="global-not-found-heading">Oops...Not here</h1>
        <p className={styles.notFoundSub}>This page doesn&apos;t seem to exist anymore</p>
        <ActionButton label="Go Back To Home" href="/" />
      </section>
    </SiteLayout>
  );
}
