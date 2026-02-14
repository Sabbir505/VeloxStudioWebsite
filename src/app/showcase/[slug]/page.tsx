import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Navbar, Footer } from "@/components";
import RevealOnScroll from "@/components/RevealOnScroll";
import ProductDetailClient from "./ProductDetailClient";

interface Project {
  name: string;
  slug: string;
  category: string;
  description: string;
  fullDescription: string;
  images: string[];
  tags: string[];
  iosComingSoon?: boolean;
  downloadUrl?: string;
  isMobileApp?: boolean;
  features?: string[];
}

const projects: Project[] = [
  {
    name: "HabitSyncer",
    slug: "habitsyncer",
    category: "Mobile App",
    description: "Cross-platform habit tracking app that syncs seamlessly between iOS and Android devices.",
    fullDescription: "HabitSyncer is a powerful cross-platform habit tracking application designed to help users build and maintain positive habits. With seamless synchronization between iOS and Android devices, you can track your progress anywhere, anytime. The app features intuitive UI, detailed analytics, and smart reminders to keep you motivated on your journey to self-improvement.",
    images: ["/assets/HabitSyncer/bilboard.jpg", "/assets/HabitSyncer/1.png", "/assets/HabitSyncer/2.png", "/assets/HabitSyncer/3.png", "/assets/HabitSyncer/4.png", "/assets/HabitSyncer/5.png"],
    tags: ["iOS", "Android", "Productivity"],
    iosComingSoon: true,
    downloadUrl: "https://play.google.com/store/apps/details?id=com.sabbir404.habitsyncer",
    isMobileApp: true,
    features: ["Cross-platform sync", "Smart reminders", "Detailed analytics", "Custom habit creation", "Progress tracking", "Dark mode support"],
  },
  {
    name: "Harmony",
    slug: "harmony",
    category: "Mobile App",
    description: "Household coordination app that reduces mental load and prevents resentment by making shared responsibilities visible and fairly distributed.",
    fullDescription: "Harmony is a household coordination app designed to reduce mental load and prevent resentment in shared living. Instead of one person silently tracking everything, Harmony makes responsibilities visible, measurable, and fairly distributed. By turning invisible tasks into shared data, couples and roommates gain clarity on who's doing what — replacing reminders, arguments, and assumptions with transparency and balance. The result is fewer conflicts, less cognitive burden, and more space for actual connection at home.",
    images: ["/assets/Harmony/Bilboard.jpg", "/assets/Harmony/1.png", "/assets/Harmony/2.png", "/assets/Harmony/3.png", "/assets/Harmony/4.png", "/assets/Harmony/5.png", "/assets/Harmony/6.png", "/assets/Harmony/7.png"],
    tags: ["iOS", "Android", "Wellness"],
    iosComingSoon: true,
    downloadUrl: "https://play.google.com/store/apps/details?id=com.sabbir404.harmony",
    isMobileApp: true,
    features: ["Fairness Engine", "Transparent Dashboard", "Equal Workload", "Chat Box", "Progress tracking", "Swap Facility"],
  },
  {
    name: "MetroX",
    slug: "metrox",
    category: "Transportation",
    description: "Modern metro navigation and real-time transit tracking application for urban commuters.",
    fullDescription: "MetroX revolutionizes urban commuting with its state-of-the-art metro navigation system. Get real-time updates on train arrivals, plan optimal routes, and never miss a connection again. The app provides detailed station information, accessibility features, and service alerts to ensure a smooth commuting experience in busy metropolitan areas.",
    images: ["/assets/MetroX/bilbord.jpg", "/assets/MetroX/1.png", "/assets/MetroX/2.png", "/assets/MetroX/3.png", "/assets/MetroX/4.png", "/assets/MetroX/5.png"],
    tags: ["iOS", "Android", "Transportation"],
    iosComingSoon: true,
    downloadUrl: "https://play.google.com/store/apps/details?id=com.metrobdbeta.app",
    isMobileApp: true,
    features: ["Real-time tracking", "Route optimization", "Service alerts", "Station information", "Accessibility features", "Offline maps"],
  },
  {
    name: "CryptoChart AI",
    slug: "cryptochart-ai",
    category: "AI / Finance",
    description: "Advanced cryptocurrency charting platform powered by AI for smart trading insights and predictions.",
    fullDescription: "CryptoChart AI is a cutting-edge cryptocurrency analysis platform that leverages artificial intelligence to provide traders with actionable insights. Our advanced algorithms analyze market trends, predict price movements, and offer personalized trading recommendations. Whether you're a seasoned trader or just starting out, CryptoChart AI gives you the edge you need in the volatile crypto market.",
    images: ["/Showcase/cryptochart_AI.png", "/Showcase/cryptochart_AI_1.png"],
    tags: ["AI", "Finance", "Web App"],
    isMobileApp: false,
    features: ["AI-powered predictions", "Real-time charting", "Market sentiment analysis", "Portfolio tracking", "Price alerts", "Technical indicators"],
  },
  {
    name: "Cursor for UI",
    slug: "cursor-for-ui",
    category: "AI / Design",
    description: "AI-powered design assistant that helps create stunning user interfaces with intelligent cursor interactions and suggestions.",
    fullDescription: "Cursor for UI is an innovative AI-powered design tool that transforms the way designers create user interfaces. With intelligent cursor interactions and real-time suggestions, it accelerates the design process while maintaining high-quality outputs. The tool learns from your design patterns and offers contextual recommendations to help you create stunning, consistent interfaces effortlessly.",
    images: ["/Showcase/cursor_for_UI.png", "/Showcase/cursor_for_UI_1.png"],
    tags: ["AI", "Design", "Web App"],
    isMobileApp: false,
    features: ["AI design suggestions", "Smart cursor interactions", "Component library", "Design system integration", "Real-time collaboration", "Export to code"],
  },
  {
    name: "CV Forge",
    slug: "cv-forge",
    category: "AI / Career",
    description: "Transform your plain text resume into professionally designed CVs instantly using AI.",
    fullDescription: "CV Forge transforms your plain text resume into professionally designed CVs using Gemini AI. Paste any text — your LinkedIn bio, a rough draft, or a bullet-point list — and the AI parses it into structured sections. Choose from 9 beautiful templates (Modern, Classic, Minimal, Professional, Creative, Academic, Tech, Elegant, Compact), edit inline with a split-view editor, and download as a high-resolution PNG ready for print.",
    images: ["/Showcase/CV_builder_AI.png", "/Showcase/CV_builder_AI_!.png"],
    tags: ["AI", "Career", "Web App"],
    isMobileApp: false,
    features: ["AI text parsing", "9 professional templates", "Live inline editor", "High-res PNG export", "A4 auto-scaling", "Split view mode"],
  },
  {
    name: "Validate Idea",
    slug: "validate-idea",
    category: "AI / Business",
    description: "AI-powered idea validation platform that helps entrepreneurs assess the viability and potential of their business concepts.",
    fullDescription: "Validate Idea is the ultimate tool for entrepreneurs and innovators looking to test their business concepts before investing time and resources. Our AI-powered platform analyzes market potential, competitive landscape, and feasibility factors to give you a comprehensive assessment of your idea's viability. Make informed decisions and pivot early with data-backed validation.",
    images: ["/Showcase/validate_idea.png", "/Showcase/validate_idea_1.png"],
    tags: ["AI", "Business", "Web App"],
    isMobileApp: false,
    features: ["Idea scoring", "Market analysis", "Competitor research", "Feasibility assessment", "SWOT analysis", "Investor-ready reports"],
  },
];

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === "cursor-for-ui") {
    redirect("/saas/cursor-for-ui");
  }

  if (slug === "cryptochart-ai") {
    redirect("/saas/cryptochart-ai");
  }

  if (slug === "market-insight-analyzer") {
    redirect("/saas/market-insight-analyzer");
  }

  if (slug === "cv-forge") {
    redirect("/saas/cv-forge");
  }

  const project = projects.find((p) => p.slug === slug);

  return (
    <>
      <ProductDetailClient project={project} />
    </>
  );
}
