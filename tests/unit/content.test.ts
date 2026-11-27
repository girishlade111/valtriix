import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { servicesData } from "@/content/services";
import { caseStudiesData, getHomeCaseStudies } from "@/content/caseStudies";
import {
  articlesData,
  getFeaturedArticle,
  getHomeArticles,
  getPopularArticles,
} from "@/content/articles";
import { advisorsData } from "@/content/team";
import { faqData } from "@/content/faq";
import { officeLocationsData } from "@/content/locations";
import { changelogData } from "@/content/changelog";
import { privacyPolicyDoc, termsConditionsDoc } from "@/content/legal";
import { siteConfig } from "@/config/site";

function assetExists(publicUrl: string): boolean {
  const clean = publicUrl.startsWith("/") ? publicUrl.slice(1) : publicUrl;
  return fs.existsSync(path.join(process.cwd(), "public", clean));
}

describe("Valtriix content integrity & route mappings", () => {
  it("contains all 9 unique service records and preserves exact slug-title associations", () => {
    expect(servicesData).toHaveLength(9);
    const wealthMgmt = servicesData.find((s) => s.slug === "wealth-management");
    expect(wealthMgmt?.title).toBe("Long-Term Wealth Preservation Strategies");
    const invPlan = servicesData.find((s) => s.slug === "investment-planning");
    expect(invPlan?.title).toBe("Comprehensive Financial Risk Management");
    expect(servicesData.filter((s) => s.showInHomeSlider)).toHaveLength(4);
    for (const s of servicesData) {
      expect(assetExists(s.coverImage)).toBe(true);
      expect(assetExists(s.heroImage)).toBe(true);
    }
  });

  it("contains 4 case studies with exact homepage order (NeuroLink, LucenAI, Dropluxe)", () => {
    expect(caseStudiesData).toHaveLength(4);
    const homeCs = getHomeCaseStudies();
    expect(homeCs.map((c) => c.brandName)).toEqual(["NeuroLink", "LucenAI", "Dropluxe"]);
    for (const c of caseStudiesData) {
      expect(assetExists(c.coverImage)).toBe(true);
      expect(assetExists(c.secondaryImage)).toBe(true);
      expect(assetExists(c.brandLogo)).toBe(true);
      expect(assetExists(c.quotation.avatarImage)).toBe(true);
    }
  });

  it("contains 10 articles (1 featured + 9 popular + 3 home preview) with local assets", () => {
    expect(articlesData).toHaveLength(10);
    expect(getFeaturedArticle().slug).toBe("understanding-market-trends-before-you-invest");
    expect(getPopularArticles()).toHaveLength(9);
    expect(getHomeArticles()).toHaveLength(3);
    for (const a of articlesData) {
      expect(assetExists(a.coverImage)).toBe(true);
      expect(assetExists(a.inlineImage)).toBe(true);
    }
  });

  it("contains 14 advisors across Board (7), Leadership (4), Private Wealth (3)", () => {
    expect(advisorsData).toHaveLength(14);
    expect(advisorsData.filter((a) => a.group === "board")).toHaveLength(7);
    expect(advisorsData.filter((a) => a.group === "leadership")).toHaveLength(4);
    expect(advisorsData.filter((a) => a.group === "private-wealth")).toHaveLength(3);
    for (const adv of advisorsData) {
      expect(assetExists(adv.image)).toBe(true);
    }
  });

  it("preserves verified FAQ, offices, changelog, legal sections, and site config assets", () => {
    expect(faqData).toHaveLength(4);
    expect(officeLocationsData).toHaveLength(3);
    expect(changelogData).toHaveLength(4);
    expect(privacyPolicyDoc.sections).toHaveLength(10);
    expect(termsConditionsDoc.sections).toHaveLength(16);
    expect(assetExists(siteConfig.logos.dark)).toBe(true);
    expect(assetExists(siteConfig.logos.light)).toBe(true);
    expect(assetExists(siteConfig.logos.decorativeMark)).toBe(true);
    expect(assetExists(siteConfig.appointmentBanner.image)).toBe(true);
  });
});
