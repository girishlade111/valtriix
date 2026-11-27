export type RichTextBlock =
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export interface ServiceRecord {
  id: string;
  slug: string;
  title: string;
  navigationLabel: string;
  summary: string;
  overview: string;
  coverImage: string;
  heroImage: string;
  showInHomeSlider: boolean;
  order: number;
  referenceOnly: boolean;
}

export interface ServiceOfferItem {
  id: string;
  title: string;
  description: string;
}

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudyResultItem {
  lead: string;
  detail: string;
}

export interface CaseStudyRecord {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverImage: string;
  secondaryImage: string;
  brandLogo: string;
  brandName: string;
  hoverLabel: string;
  primaryMetric: CaseStudyMetric;
  metrics: CaseStudyMetric[];
  sections: {
    clientOverview: string;
    theChallenge: string;
    ourApproach: string;
    theResults: string;
    conclusion: string;
  };
  keyResults: CaseStudyResultItem[];
  clientDetails: {
    clientLabel: string;
    ageLabel: string;
    industry: string;
    primaryGoal: string;
    investmentPeriod: string;
    service: string;
  };
  quotation: {
    text: string;
    author: string;
    role: string;
    avatarImage: string;
  };
  listingOrder: number;
  homeOrder: number | null;
  referenceOnly: boolean;
}

export interface AuthorRecord {
  id: string;
  name: string;
  avatarImage: string;
}

export interface ArticleRecord {
  id: string;
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  summary: string;
  authorId: string;
  coverImage: string;
  inlineImage: string;
  body: RichTextBlock[];
  featured: boolean;
  listingOrder: number;
  homeOrder: number | null;
  referenceOnly: boolean;
}

export interface AdvisorRecord {
  id: string;
  name: string;
  role: string;
  group: "board" | "leadership" | "private-wealth";
  showOnCompany: boolean;
  image: string;
  socialHref: string;
}

export interface TestimonialSlideRecord {
  id: string;
  author: string;
  role: string;
  quote: string;
  brandLogo: string;
  brandName: string;
}

export interface ReviewCardRecord {
  id: string;
  author: string;
  role: string;
  quote: string;
  avatarImage: string;
  stars: number;
}

export interface CareerRecord {
  id: string;
  title: string;
  location: string;
  compensationLabel: string;
  href: string;
}

export interface OfficeLocationRecord {
  id: string;
  country: string;
  address: string;
  addressHref: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
}

export interface StatisticItem {
  id: string;
  value: string;
  label: string;
}

export interface FAQItemRecord {
  id: string;
  question: string;
  answer: string;
}

export interface ApproachItemRecord {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface AudienceTabRecord {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  image: string;
}

export interface ProcessStepRecord {
  id: string;
  number: string;
  navLabel: string;
  badgeLabel: string;
  title: string;
  description: string;
}

export interface LegalDocumentRecord {
  id: string;
  slug: string;
  title: string;
  lastUpdated: string;
  sections: {
    id: string;
    heading: string;
    paragraphs: string[];
  }[];
  referenceOnly: boolean;
}

export interface ChangelogEntryRecord {
  id: string;
  version: string;
  date: string;
  title: string;
  description: string;
  features: string[];
}
