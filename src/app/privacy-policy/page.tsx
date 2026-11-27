import React from "react";
import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";
import { privacyPolicyDoc } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Valtriix Privacy Policy outlining data practices and contact details.",
};

export default function PrivacyPolicyPage() {
  return (
    <SiteLayout headerVariant="light">
      <LegalDocumentLayout document={privacyPolicyDoc} />
    </SiteLayout>
  );
}
