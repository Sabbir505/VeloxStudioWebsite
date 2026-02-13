"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";

// Flag component with inline SVGs
const Flag = ({ countryCode }: { countryCode: string }) => {
  const flags: Record<string, React.ReactNode> = {
    MA: ( // Morocco
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-5 h-4 rounded-sm shadow-sm">
        <rect width="900" height="600" fill="#c1272d"/>
        <path d="M450,180 L483.5,283.5 L592.5,283.5 L504,349.5 L537.5,453 L450,390 L362.5,453 L396,349.5 L307.5,283.5 L416.5,283.5 Z" fill="none" stroke="#006233" strokeWidth="20"/>
      </svg>
    ),
    BD: ( // Bangladesh
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className="w-5 h-4 rounded-sm shadow-sm">
        <rect width="5" height="3" fill="#006a4e"/>
        <circle cx="2.25" cy="1.5" r="1" fill="#f42a41"/>
      </svg>
    ),
  };

  return flags[countryCode] || null;
};

const teamMembers = [
  {
    name: "Salma Lahmiri",
    role: "Chief Executive Officer (CEO)",
    country: "Morocco",
    countryCode: "MA",
    image: "/assets/CoreMembers/salma-lahmiri.png",
    quote: "Every great journey starts with a vision, is strengthened by the right people, and scales when purpose drives execution.",
  },
  {
    name: "Rahber Haseen",
    role: "Founder & Chief Operating Manager (COM)",
    country: "Bangladesh",
    countryCode: "BD",
    image: "/assets/CoreMembers/rahber-haseen.png",
    quote: "Building systems that empower teams — because vision needs execution, and innovation works only when operations do.",
  },
  {
    name: "Sabbir Hossain",
    role: "Founder & Chief Technology Officer (CTO)",
    country: "Bangladesh",
    countryCode: "BD",
    image: "/assets/CoreMembers/sabbir-hossain.png",
    quote: "Keep Solving.",
  },
  {
    name: "Shoriful Islam",
    role: "Head of Developer (HoD)",
    country: "Bangladesh",
    countryCode: "BD",
    image: "/assets/CoreMembers/shoriful-islam.png",
    quote: "Sometimes, the hardest part of growing isn't learning new things, but unlearning what we were sure we already knew.",
  },
  {
    name: "Hajar Zahir",
    role: "Growth Manager (GM)",
    country: "Morocco",
    countryCode: "MA",
    image: "/assets/CoreMembers/hajar-zahir.png",
    quote: "Meaning comes before momentum.",
  },
];

export default function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex < teamMembers.length - 1;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, 4000);
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

  return (
    <section id="team" className="py-24 bg-background overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-mesh opacity-40" />
      
      {/* Animated orbs */}
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-accent-primary/5 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent-primary/3 rounded-full blur-[120px] animate-float-delayed" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-40 h-px bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent" />
      <div className="absolute top-1/2 right-0 w-40 h-px bg-gradient-to-l from-transparent via-accent-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-primary/10 rounded-full mb-6 border border-accent-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
              </span>
              <span className="text-accent-primary text-sm font-medium">Our Team</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Meet the <span className="text-shimmer">Core Members</span>
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent-primary/50" />
              <div className="w-2 h-2 rotate-45 border border-accent-primary/50" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent-primary/50" />
            </div>
            <p className="max-w-3xl mx-auto text-lg text-text-secondary">
              The passionate individuals behind Velox Studio who drive innovation, 
              creativity, and excellence in everything we do.
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
              aria-label="Previous member"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Cards Container */}
            <div className="relative w-full h-[520px] sm:h-[560px] mx-12 sm:mx-16">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-1/2 w-[280px] sm:w-[340px] md:w-[380px] rounded-2xl border border-border-custom bg-surface overflow-hidden shadow-xl transition-all duration-700 ease-out ${
                    index === currentIndex ? 'hover:shadow-[0_0_50px_rgba(0,255,255,0.2)]' : ''
                  }`}
                  style={getCardStyle(index)}
                >
                  {/* Image Container */}
                  <div className="relative h-64 sm:h-72 md:h-80 bg-surface-elevated overflow-hidden">
                    {/* Decorative gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-primary/10" />
                    
                    {/* Active card glow */}
                    {index === currentIndex && (
                      <div className="absolute inset-0 bg-gradient-to-t from-accent-primary/10 to-transparent animate-pulse-glow" />
                    )}
                    
                    {/* Profile Image */}
                    <div className="absolute inset-3 sm:inset-4 rounded-xl overflow-hidden border border-border-custom shadow-lg bg-background">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 380px"
                        priority={index === 0}
                      />
                      {/* Gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                    </div>
                    
                    {/* Country Badge */}
                    <div className="absolute top-1 right-1 sm:top-2 sm:right-2 px-3 py-1.5 bg-surface/90 backdrop-blur-md border border-border-custom rounded-full text-xs sm:text-sm flex items-center gap-1.5 shadow-md z-10">
                      <Flag countryCode={member.countryCode} />
                      <span className="text-text-secondary font-medium">{member.country}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 bg-surface border-t border-border-custom">
                    <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-1">{member.name}</h3>
                    <p className="text-accent-primary text-sm sm:text-base font-semibold mb-4 whitespace-nowrap">{member.role}</p>
                    <div className="relative">
                      <svg className="absolute -top-1 -left-1 w-5 h-5 text-accent-primary/40" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-text-secondary text-sm sm:text-base italic pl-5 leading-relaxed">
                        &ldquo;{member.quote}&rdquo;
                      </p>
                    </div>
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
              aria-label="Next member"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {teamMembers.map((_, index) => (
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
                aria-label={`Go to member ${index + 1}`}
              >
                {index === currentIndex && isAutoPlaying && (
                  <div className="absolute inset-0 bg-white/30 origin-left animate-[progress_4s_linear]" />
                )}
              </button>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
