import { ContentData } from './types';

// Using absolute path - files in public folder are served at root level
export const LOGO_URL = "/logo.png"; 
export const TELEGRAM_LINK = "https://t.me/gkguruji0_bot";
export const SUPPORT_EMAIL = "userrohitai@gmail.com";

export const CONTENT: ContentData = {
  nav: {
    features: "Features",
    pricing: "Plans",
    contact: "Support",
    cta: "Join Now"
  },
  hero: {
    badge: "✨ Rajasthan's #1 Premium Learning Platform",
    headline: "Govt Exams Crack करने का सबसे Powerful तरीका",
    subheadline: "REET, CET, RAS & Patwari के लिए 10,000+ Premium Questions. Smart Practice करें, Leaderboard पर आयें और अपना Selection पक्का करें।",
    ctaPrimary: "Start Free Quiz",
    ctaSecondary: "View Plans",
    stats: [
      { label: "Active Users", value: "50k+" },
      { label: "Questions", value: "10k+" },
      { label: "Success Rate", value: "100%" }
    ]
  },
  features: {
    title: "Why Choose GK Guruji?",
    subtitle: "सिर्फ पढ़ाई नहीं, Smart Strategy। वो Features जो आपको Topper बनायेंगे।",
    list: [
      { id: '1', title: "Smart Practice", description: "Mixed & Topic-wise Quizzes के साथ अपनी कमजोरियों को strength में बदलें।", iconName: "Brain" },
      { id: '2', title: "Deep Mastery", description: "Rajasthan GK के हर कोने से प्रश्न, ताकि exam में कुछ भी out of syllabus न लगे।", iconName: "BookOpen" },
      { id: '3', title: "Live Ranks", description: "Real-time Rank चेक करें और हजारों स्टूडेंट्स के साथ compete करें।", iconName: "TrendingUp" },
      { id: '4', title: "Offline PDFs", description: "NCERT Books और Solved Papers PDF सीधे डाउनलोड करें एक क्लिक में।", iconName: "Download" },
      { id: '5', title: "Gamified", description: "Levels और Badges के साथ पढ़ाई को बोझ नहीं, गेम की तरह enjoy करें।", iconName: "Award" },
      { id: '6', title: "Exam Focused", description: "Strictly optimized for REET, RAS, Patwari & Teacher Exams.", iconName: "Target" },
    ]
  },
  steps: {
    title: "How It Works",
    subtitle: "3 Simple Steps में अपनी तैयारी शुरू करें",
    stepsList: [
      { step: "01", title: "Join Telegram Bot", desc: "Telegram लिंक पर क्लिक करें और 'Start' बटन दबाएं।" },
      { step: "02", title: "Choose Your Plan", desc: "Free Demo लें या अपनी जरूरत के हिसाब से Premium Plan चुनें।" },
      { step: "03", title: "Start Dominating", desc: "Instant Quiz शुरू करें और अपनी तैयारी को रफ्तार दें।" }
    ]
  },
  pricing: {
    title: "Invest in Your Future",
    subtitle: "Premium Content. Affordable Price. Unbeatable Value.",
    plans: [
      {
        id: 'free',
        name: "Free Plan",
        price: "₹0",
        priceSub: "/ Lifetime",
        features: [
          "Daily 10 GK Quizzes",
          "Access of Community",
          "Access of official channel"
        ],
        buttonText: "Try For Free"
      },
      {
        id: 'basic',
        name: "Basic Plan",
        price: "₹30",
        priceSub: "/ Month",
        features: [
          "Unlimited Mixed Questions",
          "Unlimited Topic Wise Questions",
          "Re-attempt every 50 questions",
          "/report of a wrong question",
          "Unlock profile section",
          "Unlock Leaderboard of top 50",
          "Unlock My Progress Graph",
          "Fastly Complete Levels",
          "Quick Revision Feature"
        ],
        buttonText: "Get Basic Access",
        badge: "Best Value"
      },
      {
        id: 'pro',
        name: "Pro Plan",
        price: "₹60",
        priceSub: "/ Month",
        features: [
          "Unlimited Mixed Questions",
          "Unlimited Topic Wise Questions",
          "Unlimited Chapter Wise Questions",
          "Unlimited Exam Wise Questions",
          "Choose Questions Difficulty Level",
          "Download NCERT Books",
          "Download Your Solved Questions",
          "You Can See Explanation",
          "Re-attempt every 50 questions",
          "/report of a wrong question",
          "Advance profile section",
          "Advance Leaderboard of top 100",
          "Advance My Progress Graph"
        ],
        recommended: true,
        buttonText: "Become Pro Member",
        badge: "Most Popular"
      }
    ]
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      { question: "क्या यह Bot सभी Exams के लिए है?", answer: "जी हाँ, यह REET, CET, RAS, Patwari और अन्य सभी Rajasthan State Exams के लिए पूरी तरह अनुकूलित (Optimized) है।" },
      { question: "How to buy Premium Subscription?", answer: "Telegram Bot पर 'Upgrade' बटन दबाएं और अपना प्लान चुनें। Payment 100% सुरक्षित और तेज़ है।" },
      { question: "क्या मुझे Questions के Explanation मिलेंगे?", answer: "हाँ, Pro Plan में हर उत्तर के साथ detailed explanation मिलता है ताकि आपका concept clear हो सके।" }
    ]
  },
  footer: {
    desc: "GK Guruji - Rajasthan's most advanced learning partner. Designed for serious aspirants.",
    copyright: "© 2026 GK Guruji. All rights reserved."
  }
};