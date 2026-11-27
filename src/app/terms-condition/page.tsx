import React from "react";
import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";
import { termsConditionsDoc } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Valtriix Terms and Conditions for accessing our website and articles.",
};

export default function TermsConditionPage() {
  return (
    <SiteLayout headerVariant="light">
      <LegalDocumentLayout document={termsConditionsDoc} />
    </SiteLayout>
  );
}
