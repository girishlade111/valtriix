import type { ArticleRecord, RichTextBlock } from "@/types/content";

const sharedArticleBody: RichTextBlock[] = [
  { type: "heading", level: 4, text: "Understand your financial goals" },
  {
    type: "paragraph",
    text: "Before making any investment decision, take time to define what you want to achieve. Your goals may include building wealth, securing your retirement, buying property, or creating financial stability for your family. Clear priorities help you choose strategies that fit your timeline and personal circumstances",
  },
  { type: "heading", level: 4, text: "Know your risk tolerance" },
  {
    type: "paragraph",
    text: "Every investment comes with some level of risk. Understanding how much uncertainty you're comfortable with can help you build a portfolio that suits your financial situation. Consider your time horizon, income needs, and ability to handle market fluctuations before committing your money",
  },
  { type: "heading", level: 4, text: "Make informed investment choices" },
  {
    type: "paragraph",
    text: "Successful investing starts with understanding your options. Research different asset classes, review potential returns, and consider the costs involved. Avoid making decisions based solely on market headlines or short-term trends. A well-informed approach can help you stay focused on your long-term objectives",
  },
  { type: "heading", level: 4, text: "Build a diversified portfolio" },
  {
    type: "paragraph",
    text: "Diversification helps spread your investments across different asset classes, industries, and markets. Rather than relying on a single opportunity, a balanced portfolio can help manage risk and reduce the impact of poor performance in one area. The right mix depends on your goals, risk tolerance, and investment timeline",
  },
  { type: "heading", level: 4, text: "Stay focused on the long term" },
  {
    type: "paragraph",
    text: "Financial markets naturally experience periods of growth and uncertainty. Reacting emotionally to every market movement can lead to decisions that undermine your long-term plans. Regularly review your portfolio, make adjustments when your circumstances change, and remain focused on your broader financial goals",
  },
  { type: "heading", level: 4, text: "Seek Professional Financial Guidance" },
  {
    type: "paragraph",
    text: "You don't have to navigate every financial decision alone. An experienced financial adviser can help you understand your options, evaluate potential risks, and develop a strategy tailored to your needs. Professional guidance can bring clarity to complex decisions and help you move forward with a more structured plan",
  },
  { type: "heading", level: 4, text: "Make Your Next Financial Decision with Confidence" },
  {
    type: "paragraph",
    text: "Building wealth isn't about predicting every market movement or finding the perfect investment. It's about making thoughtful decisions, staying consistent, and having a strategy that evolves with your life. With a clear plan and the right support, you can take meaningful steps toward a more secure financial future. At Valtriix, we believe informed decisions create stronger financial futures. Our approach focuses on understanding your goals, identifying opportunities, and helping you make financial choices with greater clarity and confidence",
  },
];

export const articlesData: ArticleRecord[] = [
  {
    id: "art-featured",
    slug: "understanding-market-trends-before-you-invest",
    title: "Understanding market trends before you invest",
    category: "Investing",
    publishedAt: "October 30, 2026",
    summary:
      "Understanding market trends helps you make informed investment decisions, manage risks, and find opportunities to grow your wealth with greater confidence.",
    authorId: "auth-ralph",
    coverImage: "/assets/images/blog/blog-1.webp",
    inlineImage: "/assets/images/blog/blog-detail.webp",
    body: sharedArticleBody,
    featured: true,
    listingOrder: 0,
    homeOrder: null,
    referenceOnly: true,
  },
  {
    id: "art-1",
    slug: "making-better-financial-decisions-with-confidence",
    title: "Making better financial decisions with confidence",
    category: "Investing",
    publishedAt: "October 30, 2026",
    summary:
      "Explore practical ways to make confident financial decisions by understanding your goals, evaluating options, and building a plan for long-term stability.",
    authorId: "auth-daniel",
    coverImage: "/assets/images/blog/blog-2.webp",
    inlineImage: "/assets/images/blog/blog-detail.webp",
    body: sharedArticleBody,
    featured: false,
    listingOrder: 1,
    homeOrder: 1,
    referenceOnly: true,
  },
  {
    id: "art-2",
    slug: "what-every-investor-should-know-about-market-trends",
    title: "What every investor should know about market trends",
    category: "Market Insights",
    publishedAt: "October 30, 2026",
    summary:
      "Stay informed about market trends, economic signals, and investment developments to better understand changing conditions and make smarter financial decisions.",
    authorId: "auth-emily-c",
    coverImage: "/assets/images/blog/blog-3.webp",
    inlineImage: "/assets/images/blog/blog-detail.webp",
    body: sharedArticleBody,
    featured: false,
    listingOrder: 2,
    homeOrder: 2,
    referenceOnly: true,
  },
  {
    id: "art-3",
    slug: "common-investment-mistakes-and-how-to-avoid-them",
    title: "Common investment mistakes and how to avoid them",
    category: "Risk Management",
    publishedAt: "October 30, 2026",
    summary:
      "Learn how to recognize common investment mistakes, manage unnecessary risks, and make informed choices that keep your financial goals on the right track.",
    authorId: "auth-james",
    coverImage: "/assets/images/blog/blog-4.webp",
    inlineImage: "/assets/images/blog/blog-detail.webp",
    body: sharedArticleBody,
    featured: false,
    listingOrder: 3,
    homeOrder: 3,
    referenceOnly: true,
  },
  {
    id: "art-4",
    slug: "5-investment-strategies-for-a-stronger-financial-future",
    title: "5 Investment strategies for a stronger financial future",
    category: "Investing",
    publishedAt: "October 30, 2026",
    summary:
      "Discover five practical investment strategies to diversify your portfolio, manage risk, and build a stronger financial foundation for long-term growth.",
    authorId: "auth-daniel-2",
    coverImage: "/assets/images/blog/blog-5.webp",
    inlineImage: "/assets/images/blog/blog-detail.webp",
    body: sharedArticleBody,
    featured: false,
    listingOrder: 4,
    homeOrder: null,
    referenceOnly: true,
  },
  {
    id: "art-5",
    slug: "why-diversification-matters-in-your-investment-portfolio",
    title: "Why diversification matters in your investment portfolio",
    category: "Market Insights",
    publishedAt: "October 30, 2026",
    summary:
      "Understand why diversification matters and how spreading investments across assets can balance risk while supporting your long-term goals and future plans.",
    authorId: "auth-emily-p",
    coverImage: "/assets/images/blog/blog-6.webp",
    inlineImage: "/assets/images/blog/blog-detail.webp",
    body: sharedArticleBody,
    featured: false,
    listingOrder: 5,
    homeOrder: null,
    referenceOnly: true,
  },
  {
    id: "art-6",
    slug: "making-smarter-financial-decisions-at-every-stage",
    title: "Making smarter financial decisions at every stage",
    category: "Risk Management",
    publishedAt: "October 30, 2026",
    summary:
      "Make smarter financial decisions with a clear plan for managing money, evaluating opportunities, and keeping your priorities aligned with future goals.",
    authorId: "auth-michael",
    coverImage: "/assets/images/blog/blog-7.webp",
    inlineImage: "/assets/images/blog/blog-detail.webp",
    body: sharedArticleBody,
    featured: false,
    listingOrder: 6,
    homeOrder: null,
    referenceOnly: true,
  },
  {
    id: "art-7",
    slug: "how-business-owners-can-grow-their-wealth",
    title: "How business owners can grow their wealth",
    category: "Investing",
    publishedAt: "October 30, 2026",
    summary:
      "Explore wealth-building strategies that help business owners manage income, protect assets, and make confident decisions for long-term growth and stability.",
    authorId: "auth-charlotte",
    coverImage: "/assets/images/blog/blog-8.webp",
    inlineImage: "/assets/images/blog/blog-detail.webp",
    body: sharedArticleBody,
    featured: false,
    listingOrder: 7,
    homeOrder: null,
    referenceOnly: true,
  },
  {
    id: "art-8",
    slug: "navigating-market-uncertainty-with-a-clear-strategy",
    title: "Navigating market uncertainty with a clear strategy",
    category: "Market Insights",
    publishedAt: "October 30, 2026",
    summary:
      "Learn how to navigate market uncertainty with a clear investment strategy, thoughtful risk management, and decisions guided by your financial goals wisely.",
    authorId: "auth-ethan",
    coverImage: "/assets/images/blog/blog-9.webp",
    inlineImage: "/assets/images/blog/blog-detail.webp",
    body: sharedArticleBody,
    featured: false,
    listingOrder: 8,
    homeOrder: null,
    referenceOnly: true,
  },
  {
    id: "art-9",
    slug: "the-power-of-starting-your-investment-journey-early",
    title: "The power of starting your investment journey early",
    category: "Risk Management",
    publishedAt: "October 30, 2026",
    summary:
      "Learn how to navigate market uncertainty with a clear investment strategy, thoughtful risk management, and decisions guided by your financial goals wisely.",
    authorId: "auth-isabella",
    coverImage: "/assets/images/blog/blog-10.webp",
    inlineImage: "/assets/images/blog/blog-detail.webp",
    body: sharedArticleBody,
    featured: false,
    listingOrder: 9,
    homeOrder: null,
    referenceOnly: true,
  },
];

export function getArticleBySlug(slug: string): ArticleRecord | undefined {
  return articlesData.find((a) => a.slug === slug);
}

export function getFeaturedArticle(): ArticleRecord {
  return articlesData.find((a) => a.featured) || articlesData[0];
}

export function getPopularArticles(): ArticleRecord[] {
  return articlesData
    .filter((a) => !a.featured)
    .sort((a, b) => a.listingOrder - b.listingOrder);
}

export function getHomeArticles(): ArticleRecord[] {
  return articlesData
    .filter((a) => a.homeOrder !== null)
    .sort((a, b) => (a.homeOrder ?? 99) - (b.homeOrder ?? 99));
}
