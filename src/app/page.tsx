import React from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { AmberHero } from "@/components/heroes/AmberHero";
import { HomeServiceSlider } from "@/components/services/HomeServiceSlider";
import { InvestmentApproachSelector } from "@/components/company/InvestmentApproachSelector";
import { WhyChooseUsSection } from "@/components/shared/WhyChooseUsSection";
import { ArchitecturalShowcaseAndCases } from "@/components/video/ArchitecturalShowcaseAndCases";
import { CenteredTestimonialSlider } from "@/components/testimonials/CenteredTestimonialSlider";
import { AudienceTabs } from "@/components/audience/AudienceTabs";
import { WealthPlanningProcess } from "@/components/process/WealthPlanningProcess";
import { EditorialBrandBanner } from "@/components/company/EditorialBrandBanner";
import { ArticlePreviewGrid } from "@/components/blog/ArticlePreviewGrid";

export default function HomePage() {
  return (
    <SiteLayout headerVariant="overlay">
      <AmberHero />
      <HomeServiceSlider />
      <InvestmentApproachSelector />
      <WhyChooseUsSection variant="home-features" />
      <ArchitecturalShowcaseAndCases />
      <CenteredTestimonialSlider />
      <AudienceTabs />
      <WealthPlanningProcess />
      <EditorialBrandBanner />
      <ArticlePreviewGrid />
    </SiteLayout>
  );
}
