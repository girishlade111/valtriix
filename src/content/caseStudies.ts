import type { CaseStudyRecord } from "@/types/content";

const sharedBodySections = {
  clientOverview:
    "Our client, a 42-year-old business owner, wanted to grow personal wealth while balancing business commitments and long-term family goals. They needed a clear investment strategy that offered growth opportunities without taking unnecessary risks",
  theChallenge:
    "With most of their wealth tied to business activities, the client wanted to diversify their investments and build greater financial security. They needed a structured plan to manage risk, identify suitable opportunities, and prepare for future financial needs",
  ourApproach:
    "We started by reviewing the client's financial position, investment preferences, and long-term objectives. We then developed a personalized portfolio strategy focused on diversification, suitable asset allocation, and disciplined investment decisions. Regular portfolio reviews helped us assess progress and adjust the strategy as circumstances changed",
  theResults:
    "Our tailored approach gave the client a clearer financial direction and a more structured way to manage their wealth. Over the illustrative three-year period, the portfolio demonstrated positive growth while remaining aligned with the client's long-term objectives",
  conclusion:
    "With a clear strategy and expert consulting from Valtriix, the business transformed its operations, accelerated growth, and built a strong foundation for long-term success",
};

const sharedKeyResults = [
  { lead: "32%", detail: "Portfolio growth over 3 years" },
  { lead: "6+", detail: "Investment categories reviewed" },
  { lead: "3 Years", detail: "Long-term investment period" },
  { lead: "Quarterly", detail: "Portfolio performance reviews" },
];

export const caseStudiesData: CaseStudyRecord[] = [
  {
    id: "cs-1",
    slug: "helping-clients-grow-their-wealth",
    title: "Helping clients grow their wealth",
    summary:
      "We help clients grow their wealth through personalized investment strategies, thoughtful planning",
    coverImage: "/assets/images/case-studies/case-study-1.webp",
    secondaryImage: "/assets/images/case-studies/case-study-details.png",
    brandLogo: "/assets/logos/6ae7090f42eb2faf11714011_brand-logo-1.svg",
    brandName: "Dropluxe",
    hoverLabel: "Clear financial guidance",
    primaryMetric: { value: "32%", label: "Portfolio growth" },
    metrics: [
      { value: "32%", label: "Portfolio growth" },
      { value: "6+", label: "Investment categories reviewed" },
      { value: "3 Years", label: "Long-term investment period" },
    ],
    sections: sharedBodySections,
    keyResults: sharedKeyResults,
    clientDetails: {
      clientLabel: "Business & Entrepreneurship",
      ageLabel: "42 Years",
      industry: "Business & Entrepreneurship",
      primaryGoal: "Long-Term Wealth Growth",
      investmentPeriod: "3 Years",
      service: "Asset & Portfolio Management",
    },
    quotation: {
      text: '"True financial success comes from making thoughtful decisions today while keeping tomorrow\'s possibilities in mind. The right guidance makes every step more meaningful."',
      author: "Kim Tio",
      role: "Asset & Portfolio Management",
      avatarImage: "/assets/images/general/avatar-1.png",
    },
    listingOrder: 1,
    homeOrder: 3,
    referenceOnly: true,
  },
  {
    id: "cs-2",
    slug: "building-a-clear-strategy-for-lasting-wealth",
    title: "Building a Clear Strategy for Lasting Wealth",
    summary:
      "We helped clients develop personalized wealth strategies through smarter investment planning, risk management, and long-term financial guidance.",
    coverImage: "/assets/images/case-studies/case-study-2.webp",
    secondaryImage: "/assets/images/case-studies/case-study-details.png",
    brandLogo: "/assets/logos/6ae95f55b888efcb5efab46f_brand-logo-6.svg",
    brandName: "LucenAI",
    hoverLabel: "Clear financial guidance",
    primaryMetric: { value: "+28%", label: "Statistic" },
    metrics: [
      { value: "+28%", label: "Statistic" },
      { value: "6+", label: "Investment categories reviewed" },
      { value: "3 Years", label: "Long-term investment period" },
    ],
    sections: sharedBodySections,
    keyResults: sharedKeyResults,
    clientDetails: {
      clientLabel: "Business & Entrepreneurship",
      ageLabel: "42 Years",
      industry: "Business & Entrepreneurship",
      primaryGoal: "Long-Term Wealth Growth",
      investmentPeriod: "3 Years",
      service: "Asset & Portfolio Management",
    },
    quotation: {
      text: '"True financial success comes from making thoughtful decisions today while keeping tomorrow\'s possibilities in mind. The right guidance makes every step more meaningful."',
      author: "Sarah Mitchell",
      role: "Asset & Portfolio Management",
      avatarImage: "/assets/images/general/avatar-2.webp",
    },
    listingOrder: 2,
    homeOrder: 2,
    referenceOnly: true,
  },
  {
    id: "cs-3",
    slug: "helping-businesses-improve-financial-performance",
    title: "Helping Businesses Improve Financial Performance",
    summary:
      "Discover how tailored financial planning helped a growing business optimize cash flow, reduce unnecessary expenses, and improve financial performance.",
    coverImage: "/assets/images/case-studies/case-study-3.webp",
    secondaryImage: "/assets/images/case-studies/case-study-details.png",
    brandLogo: "/assets/logos/6ae9193e0c587594cdb13f8f_brand-logo-3.svg",
    brandName: "NeuroLink",
    hoverLabel: "Clear financial guidance",
    primaryMetric: { value: "38%", label: "Investment Planning" },
    metrics: [
      { value: "38%", label: "Investment Planning" },
      { value: "6+", label: "Investment categories reviewed" },
      { value: "3 Years", label: "Long-term investment period" },
    ],
    sections: sharedBodySections,
    keyResults: sharedKeyResults,
    clientDetails: {
      clientLabel: "Business & Entrepreneurship",
      ageLabel: "42 Years",
      industry: "Business & Entrepreneurship",
      primaryGoal: "Long-Term Wealth Growth",
      investmentPeriod: "3 Years",
      service: "Asset & Portfolio Management",
    },
    quotation: {
      text: '"True financial success comes from making thoughtful decisions today while keeping tomorrow\'s possibilities in mind. The right guidance makes every step more meaningful."',
      author: "James Anderson",
      role: "Asset & Portfolio Management",
      avatarImage: "/assets/images/general/avatar-3.webp",
    },
    listingOrder: 3,
    homeOrder: 1,
    referenceOnly: true,
  },
  {
    id: "cs-4",
    slug: "creating-smarter-investment-plans-for-families",
    title: "Creating Smarter Investment Plans for Families",
    summary:
      "We developed a personalized investment strategy that helped a family balance financial risks, diversify assets, and plan confidently for future goals.",
    coverImage: "/assets/images/case-studies/case-study-4.webp",
    secondaryImage: "/assets/images/case-studies/case-study-details.png",
    brandLogo: "/assets/logos/brand-logo-4.svg",
    brandName: "DataStack",
    hoverLabel: "Clear financial guidance",
    primaryMetric: { value: "38%", label: "Investment Planning" },
    metrics: [
      { value: "38%", label: "Investment Planning" },
      { value: "6+", label: "Investment categories reviewed" },
      { value: "3 Years", label: "Long-term investment period" },
    ],
    sections: sharedBodySections,
    keyResults: sharedKeyResults,
    clientDetails: {
      clientLabel: "Business & Entrepreneurship",
      ageLabel: "42 Years",
      industry: "Business & Entrepreneurship",
      primaryGoal: "Long-Term Wealth Growth",
      investmentPeriod: "3 Years",
      service: "Asset & Portfolio Management",
    },
    quotation: {
      text: '"True financial success comes from making thoughtful decisions today while keeping tomorrow\'s possibilities in mind. The right guidance makes every step more meaningful."',
      author: "Emily Carter",
      role: "Asset & Portfolio Management",
      avatarImage: "/assets/images/general/avatar-4.webp",
    },
    listingOrder: 4,
    homeOrder: null,
    referenceOnly: true,
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudyRecord | undefined {
  return caseStudiesData.find((c) => c.slug === slug);
}

export function getHomeCaseStudies(): CaseStudyRecord[] {
  return caseStudiesData
    .filter((c) => c.homeOrder !== null)
    .sort((a, b) => (a.homeOrder ?? 99) - (b.homeOrder ?? 99));
}
