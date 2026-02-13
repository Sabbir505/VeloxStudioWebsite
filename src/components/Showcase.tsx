"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RevealOnScroll from "./RevealOnScroll";

// Define a type for the Project object
interface Project {
  name: string;
  slug: string;
  category: string;
  description: string;
  image?: string;
  images?: string[];
  tags: string[];
  iosComingSoon?: boolean;
  downloadUrl?: string;
  isMobileApp?: boolean;
}

const projects: Project[] = [
  {
    name: "HabitSyncer",
    slug: "habitsyncer",
    category: "Mobile App",
    description: "Cross-platform habit tracking app that syncs seamlessly between iOS and Android devices.",
    images: ["/assets/HabitSyncer/bilboard.jpg"],
    tags: ["iOS", "Android", "Productivity"],
    iosComingSoon: true,
    downloadUrl: "https://play.google.com/store/apps/details?id=com.sabbir404.habitsyncer",
    isMobileApp: true,
  },
  {
    name: "Harmony",
    slug: "harmony",
    category: "Mobile App",
    description: "Household coordination app that reduces mental load and prevents resentment by making shared responsibilities visible and fairly distributed.",
    images: ["/assets/Harmony/Bilboard.jpg"],
    tags: ["iOS", "Android", "Wellness"],
    iosComingSoon: true,
    downloadUrl: "https://play.google.com/store/apps/details?id=com.sabbir404.harmony",
    isMobileApp: true,
  },
  {
    name: "MetroX",
    slug: "metrox",
    category: "Transportation",
    description: "Modern metro navigation and real-time transit tracking application for urban commuters.",
    images: ["/assets/MetroX/bilbord.jpg"],
    tags: ["iOS", "Android", "Transportation"],
    iosComingSoon: true,
    downloadUrl: "https://play.google.com/store/apps/details?id=com.metrobdbeta.app",
    isMobileApp: true,
  },
  {
    name: "CryptoChart AI",
    slug: "cryptochart-ai",
    category: "AI / Finance",
    description: "Advanced cryptocurrency charting platform powered by AI for smart trading insights and predictions.",
    images: ["/Showcase/cryptochart_AI.png"],
    tags: ["AI", "Finance", "Web App"],
    isMobileApp: false,
  },
  {
    name: "Cursor for UI",
    slug: "cursor-for-ui",
    category: "AI / Design",
    description: "AI-powered design assistant that helps create stunning user interfaces with intelligent cursor interactions and suggestions.",
    images: ["/Showcase/cursor_for_UI.png"],
    tags: ["AI", "Design", "Web App"],
    isMobileApp: false,
  },
  {
    name: "CV Builder AI",
    slug: "cv-builder-ai",
    category: "AI / Career",
    description: "Smart resume builder powered by AI that creates professional CVs tailored to job descriptions and industry standards.",
    images: ["/Showcase/CV_builder_AI.png"],
    tags: ["AI", "Career", "Web App"],
    isMobileApp: false,
  },
  {
    name: "Market Mind AI",
    slug: "market-mind-ai",
    category: "AI / Analytics",
    description: "Intelligent market analysis tool that leverages AI to provide deep insights into market trends and consumer behavior.",
    images: ["/Showcase/market_mind_AI.png"],
    tags: ["AI", "Analytics", "Web App"],
    isMobileApp: false,
  },
  {
    name: "Validate Idea",
    slug: "validate-idea",
    category: "AI / Business",
    description: "AI-powered idea validation platform that helps entrepreneurs assess the viability and potential of their business concepts.",
    images: ["/Showcase/validate_idea.png"],
    tags: ["AI", "Business", "Web App"],
    isMobileApp: false,
  },
];

export default function Showcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const router = useRouter();

  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex < projects.length - 1;

  // Handle hash scroll on mount
  useEffect(() => {
    if (window.location.hash === "#showcase") {
      setTimeout(() => {
        const element = document.getElementById("showcase");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    if (canGoLeft) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    if (canGoRight) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const absDistance = Math.abs(diff);
    
    const baseOffset = 300;
    const translateX = diff * baseOffset;
    const scale = Math.max(0.6, 1 - absDistance * 0.15);
    const opacity = Math.max(0.3, 1 - absDistance * 0.25);
    const zIndex = 10 - absDistance;
    const rotateY = diff * -5;

    return {
      opacity,
      transform: `translateX(calc(-50% + ${translateX}px)) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
      zIndex,
    };
  };

  const openProductPage = (project: Project) => {
    if (project.slug === "cursor-for-ui") {
      router.push("/saas/cursor-for-ui");
    } else {
      router.push(`/showcase/${project.slug}`);
    }
  };

  return (
    <section id="showcase" className="py-24 bg-surface overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-mesh opacity-30" />
      
      {/* Animated orbs */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-accent-primary/5 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent-primary/3 rounded-full blur-[120px] animate-float-delayed" />
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-1/3 w-px h-32 bg-gradient-to-b from-transparent via-accent-primary/20 to-transparent" />
      <div className="absolute bottom-0 right-1/3 w-px h-32 bg-gradient-to-t from-transparent via-accent-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-primary/10 rounded-full mb-6 border border-accent-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
              </span>
              <span className="text-accent-primary text-sm font-medium">Our Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Product <span className="text-shimmer">Showcase</span>
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent-primary/50" />
              <div className="w-2 h-2 rotate-45 border border-accent-primary/50" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent-primary/50" />
            </div>
            <p className="max-w-3xl mx-auto text-lg text-text-secondary">
              Explore our portfolio of innovative digital products. From AI-powered applications 
              to beautiful mobile experiences, see what we&apos;ve been building.
            </p>
          </div>
        </RevealOnScroll>

        {/* Carousel */}
        <RevealOnScroll>
          <div className="relative flex items-center justify-center">
            {/* Left Arrow */}
            <button
              onClick={goToPrevious}
              disabled={!canGoLeft}
              className={`absolute left-0 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full stat-card-glass flex items-center justify-center transition-all duration-300 ${
                canGoLeft 
                  ? "hover:bg-accent-primary hover:border-accent-primary hover:text-velox-black hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] cursor-pointer group" 
                  : "opacity-30 cursor-not-allowed"
              }`}
              aria-label="Previous project"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Cards Container */}
            <div className="relative w-full h-[520px] sm:h-[560px] mx-12 sm:mx-16">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-1/2 ${
                    project.isMobileApp 
                      ? 'w-[320px] sm:w-[400px] md:w-[500px]' 
                      : 'w-[300px] sm:w-[360px] md:w-[420px]'
                  } rounded-2xl border border-border-custom bg-background overflow-hidden shadow-xl transition-all duration-700 ease-out cursor-pointer ${
                    index === currentIndex ? 'hover:shadow-[0_0_50px_rgba(0,255,255,0.2)] hover:border-accent-primary/50' : ''
                  }`}
                  style={getCardStyle(index)}
                  onClick={() => openProductPage(project)}
                >
                  {/* Image Container */}
                  <div className={`relative ${
                    project.isMobileApp 
                      ? 'h-48 sm:h-56 md:h-64' 
                      : 'h-52 sm:h-60 md:h-72'
                  } bg-surface-elevated overflow-hidden`}>
                    {/* Decorative gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-primary/10" />
                    
                    {/* Animated glow for active card */}
                    {index === currentIndex && (
                      <div className="absolute inset-0 bg-gradient-to-t from-accent-primary/10 to-transparent animate-pulse-glow" />
                    )}
                    
                    {/* Product Image */}
                    <div className="absolute inset-3 sm:inset-4 rounded-xl overflow-hidden border border-border-custom shadow-lg bg-surface">
                      {project.images ? (
                        project.isMobileApp ? (
                          // Mobile apps: billboard image
                          <div className="relative w-full h-full">
                            <Image 
                              src={project.images[0]} 
                              alt={project.name} 
                              fill 
                              className="object-cover transition-transform duration-500 hover:scale-105"
                              sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 380px"
                              quality={100}
                            />
                          </div>
                        ) : (
                          // AI products: single image
                          <div className="relative w-full h-full">
                            <Image 
                              src={project.images[0]} 
                              alt={project.name} 
                              fill 
                              className="object-cover transition-transform duration-500 hover:scale-105"
                              sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 380px"
                              quality={100}
                            />
                          </div>
                        )
                      ) : (
                        <Image 
                          src={project.image!} 
                          alt={project.name} 
                          fill 
                          className="object-cover transition-transform duration-700 hover:scale-110" 
                          sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 380px"
                          priority={index === 0}
                          quality={100}
                        />
                      )}
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-1 right-1 sm:top-2 sm:right-2 px-3 py-1.5 bg-surface/90 backdrop-blur-md border border-border-custom rounded-full text-xs sm:text-sm flex items-center gap-1.5 shadow-md z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse"></span>
                      <span className="text-accent-primary font-medium">{project.category}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 bg-background border-t border-border-custom">
                    <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">{project.name}</h3>
                    <p className="text-text-secondary text-sm sm:text-base leading-relaxed line-clamp-2 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag: string, tagIndex: number) => (
                        <span key={tagIndex} className="px-2.5 py-1 text-xs bg-surface-elevated text-text-secondary rounded-full border border-border-custom flex items-center gap-1 hover:border-accent-primary/30 transition-colors">
                          {tag}
                          {tag === "iOS" && project.iosComingSoon && (
                            <span className="text-accent-primary font-medium">• Soon</span>
                          )}
                          {tag === "Android" && (
                            <span className="text-green-400 font-medium">• Live</span>
                          )}
                        </span>
                      ))}
                    </div>
                    {project.downloadUrl && (
                      <a
                        href={project.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 hover:bg-accent-primary/20 text-accent-primary text-sm font-medium rounded-lg border border-accent-primary/30 hover:border-accent-primary transition-all duration-300"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                        </svg>
                        Download on Play Store
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={goToNext}
              disabled={!canGoRight}
              className={`absolute right-0 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full stat-card-glass flex items-center justify-center transition-all duration-300 ${
                canGoRight 
                  ? "hover:bg-accent-primary hover:border-accent-primary hover:text-velox-black hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] cursor-pointer group" 
                  : "opacity-30 cursor-not-allowed"
              }`}
              aria-label="Next project"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`relative h-2 rounded-full transition-all duration-500 overflow-hidden ${
                  index === currentIndex 
                    ? "bg-accent-primary w-8 shadow-[0_0_15px_rgba(0,255,255,0.6)]" 
                    : "bg-border-custom w-2 hover:bg-text-muted hover:w-4"
                }`}
                aria-label={`Go to project ${index + 1}`}
              >
                {/* Progress indicator for active dot */}
                {index === currentIndex && isAutoPlaying && (
                  <div className="absolute inset-0 bg-white/30 origin-left animate-[progress_5s_linear]" />
                )}
              </button>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
