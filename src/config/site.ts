export const siteConfig = {
  brandName: "Valtriix",
  mode: (process.env.NEXT_PUBLIC_APP_MODE === "production" ? "production" : "reference") as
    | "reference"
    | "production",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  logos: {
    dark: "/assets/brand/valtriix-logo-dark.svg",
    light: "/assets/brand/valtriix-logo-light.svg",
    decorativeMark: "/assets/brand/valtriix-decorative-mark.svg",
    favicon: "/assets/images/general/favicon.png",
  },
  header: {
    navLinks: [
      { label: "About Us", href: "/company" },
      { label: "Services", href: "/services" },
      { label: "Our Insights", href: "/blog" },
    ],
    ctaLabel: "Make An Appointment",
    ctaHref: "/contact",
  },
  allPagesMenu: {
    groups: [
      {
        title: "platform",
        links: [
          { label: "Homepage", href: "/" },
          { label: "Company", href: "/company" },
          { label: "Service", href: "/services" },
          { label: "Service Details", href: "/services/portfolio-management" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "resources",
        links: [
          { label: "Blog", href: "/blog" },
          { label: "Blog Details", href: "/blog/understanding-market-trends-before-you-invest" },
          { label: "Case Study", href: "/case-study" },
          { label: "Case Study Details", href: "/case-study/building-a-clear-strategy-for-lasting-wealth" },
          { label: "Our Advisors", href: "/our-advisors" },
        ],
      },
      {
        title: "legal",
        links: [
          { label: "Privacy policy", href: "/privacy-policy" },
          { label: "Terms & Conditions", href: "/terms-condition" },
          { label: "Changelog", href: "/changelog" },
          { label: "License", href: "/licenses" },
          { label: "Instructions", href: "/instructions" },
          { label: "Styleguide", href: "/style-guide" },
          { label: "404 error", href: "/404" },
        ],
      },
    ],
    featuredCases: [
      {
        title: "Making your money work smarter",
        href: "/case-study/helping-clients-grow-their-wealth",
        image: "/assets/images/general/menu-1.webp",
      },
      {
        title: "A simple guide to growing your wealth",
        href: "/case-study/helping-businesses-improve-financial-performance",
        image: "/assets/images/general/menu-2.webp",
      },
    ],
  },
  partnerLogos: [
    { name: "Dropluxe", src: "/assets/logos/brand-logo-1.svg" },
    { name: "IntelliSpark", src: "/assets/logos/brand-logo-2.svg" },
    { name: "NeuroLink", src: "/assets/logos/brand-logo-3.svg" },
    { name: "DataStack", src: "/assets/logos/brand-logo-4.svg" },
    { name: "Brightly", src: "/assets/logos/brand-logo-5.svg" },
    { name: "LucenAI", src: "/assets/logos/brand-logo-6.svg" },
  ],
  appointmentBanner: {
    heading: "Let's plan your next chapter with us",
    description:
      "Let's build your financial future with a clear plan and personalized guidance that grows with you",
    ctaLabel: "Make An Appointment",
    ctaHref: "/contact",
    image: "/assets/images/cta/cta.webp",
  },
  footer: {
    groups: [
      {
        title: "Company",
        links: [
          { label: "Home", href: "/" },
          { label: "About", href: "/company" },
          { label: "Services", href: "/services" },
          { label: "Case studies", href: "/case-study" },
          { label: "Contact", href: "/contact" },
          { label: "Privacy policy", href: "/privacy-policy" },
          { label: "404", href: "/404" },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Asset Management", href: "/services/asset-management" },
          { label: "Wealth Management", href: "/services/wealth-management" },
          { label: "Financial Consulting", href: "/services/financial-consulting" },
          { label: "Investment Planning", href: "/services/investment-planning" },
          { label: "Wealth Preservation", href: "/services/wealth-preservation" },
        ],
      },
      {
        title: "Quick link",
        links: [
          { label: "Resources", href: "/blog" },
          { label: "Changelog", href: "/changelog" },
          { label: "Terms & Condition", href: "/terms-condition" },
          { label: "Licenses", href: "/licenses" },
        ],
      },
    ],
    socialLabel: "Join us on social",
    socials: [
      { name: "Facebook", href: "https://www.facebook.com/", icon: "/assets/icons/facebook.svg" },
      { name: "X", href: "https://x.com/", icon: "/assets/icons/x.svg" },
      { name: "LinkedIn", href: "https://www.linkedin.com/", icon: "/assets/icons/linkedin.svg" },
    ],
    copyrightPrefix: "© 2026 Your Brand. All Rights Reserved.",
    attributionText: "Powered By Webflow",
    attributionHref: "https://webflow.com/templates",
  },
};
