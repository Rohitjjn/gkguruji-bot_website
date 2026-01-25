export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceSub: string;
  features: string[];
  recommended?: boolean;
  buttonText: string;
  badge?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContentData {
  nav: {
    features: string;
    pricing: string;
    contact: string;
    cta: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { label: string; value: string }[];
  };
  features: {
    title: string;
    subtitle: string;
    list: Feature[];
  };
  pricing: {
    title: string;
    subtitle: string;
    plans: PricingPlan[];
  };
  steps: {
    title: string;
    subtitle: string;
    stepsList: { step: string; title: string; desc: string }[];
  };
  faq: {
    title: string;
    items: FAQItem[];
  };
  footer: {
    desc: string;
    copyright: string;
  };
}