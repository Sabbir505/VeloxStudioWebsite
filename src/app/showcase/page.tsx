"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import CustomCursor from "@/components/CustomCursor";
import RevealOnScroll from "@/components/RevealOnScroll";

const projects = [
  {
    name: "CryptoChart AI",
    category: "AI / Finance",
    description: "Advanced cryptocurrency charting platform powered by AI for smart trading insights and predictions.",
    image: "/Showcase/CryptoChart_AI.png",
    tags: ["AI", "Finance", "Web App"],
    color: "cyan",
  },
  {
    name: "FutureLog AI",
    category: "AI / Productivity",
    description: "AI-powered journaling and life logging application that helps you track and predict future outcomes.",
    image: "/Showcase/FutureLog_AI.jpg",
    tags: ["AI", "Productivity", "Mobile"],
    color: "purple",
  },
  {
    name: "HabitSyncer",
    category: "Mobile App",
    description: "Cross-platform habit tracking app that syncs seamlessly between iOS and Android devices.",
    images: ["/Showcase/HabitSyncer_ios.png", "/Showcase/HabitSyncer_android.png"],
    tags: ["iOS", "Android", "Productivity"],
    color: "cyan",
  },
  {
    name: "Harmony",
    category: "Mobile App",
    description: "A beautiful music and meditation app designed to bring peace and harmony to your daily routine.",
    images: ["/Showcase/Harmony_ios.png", "/Showcase/Harmony_android.png"],
    tags: ["iOS", "Android", "Wellness"],
    color: "purple",
  },
  {
    name: "MetroX",
    category: "Transportation",
    description: "Modern metro navigation and real-time transit tracking application for urban commuters.",
    image: "/Showcase/MetroX.jpg",
    tags: ["Android", "Transportation", "Travel"],
    color: "cyan",
  },
];

export default function ShowcasePage() {
  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-mesh opacity-20 pointer-events-none" />
        <div className="fixed top-40 right-1/4 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[150px] pointer-events-none animate-float" />
        <div className="fixed bottom-40 left-1/4 w-96 h-96 bg-accent-secondary/5 rounded-full blur-[120px] pointer-events-none animate-float-delayed" />

        {/* Header */}
        <header className="border-b border-border-custom bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Logo size="md" variant="full" />
            </Link>
            <Link
              href="/"
              className="group text-text-secondary hover:text-accent-primary transition-colors text-sm flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent-primary/10"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          {/* Section Header */}
          <RevealOnScroll>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-secondary/10 rounded-full mb-6 border border-accent-secondary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-secondary"></span>
                </span>
                <span className="text-accent-secondary text-sm font-medium">Our Work</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Product <span className="text-shimmer">Showcase</span>
              </h1>
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <RevealOnScroll key={index} delay={index * 100}>
                <div
                  className="group relative rounded-2xl stat-card-glass overflow-hidden hover:shadow-[0_0_40px_rgba(0,255,255,0.15)] transition-all duration-500"
                >
                  {/* Top Glow Line */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-0 h-px ${project.color === 'cyan' ? 'bg-accent-primary' : 'bg-accent-secondary'} group-hover:w-3/4 transition-all duration-500`} />
                  
                  {/* Image Container - Fixed Height */}
                  <div className="relative h-64 overflow-hidden bg-surface">
                    {project.images ? (
                      <div className="flex gap-2 justify-center items-center h-full p-4">
                        {project.images.map((img, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="relative h-full w-24 shrink-0"
                          >
                            <Image
                              src={`${img}`}
                              alt={`${project.name} ${imgIndex + 1}`}
                              fill
                              className="object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Image
                        src={`${project.image}`}
                        alt={project.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3 relative">
                    <span className={`text-xs font-medium uppercase tracking-wider ${project.color === 'cyan' ? 'text-accent-primary' : 'text-accent-secondary'}`}>
                      {project.category}
                    </span>
                    <h2 className="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors duration-300">
                      {project.name}
                    </h2>
                    <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2.5 py-1 text-xs bg-surface-elevated text-text-secondary rounded-full border border-border-custom hover:border-accent-primary/30 hover:text-accent-primary transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color === 'cyan' ? 'from-accent-primary/5' : 'from-accent-secondary/5'} via-transparent to-transparent`} />
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* CTA Section */}
          <RevealOnScroll delay={600}>
            <div className="mt-24 text-center">
              <div className="inline-block p-10 rounded-3xl stat-card-glass relative overflow-hidden group">
                {/* Background Decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary group-hover:w-full transition-all duration-700" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-primary/10 rounded-full blur-3xl group-hover:bg-accent-primary/20 transition-all duration-500" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent-secondary/10 rounded-full blur-3xl group-hover:bg-accent-secondary/20 transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20">
                    <svg className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">Have a Project in Mind?</h3>
                  <p className="text-text-secondary mb-8 max-w-md mx-auto">
                    Let&apos;s build something amazing together. Reach out to discuss your ideas.
                  </p>
                  <Link
                    href="/#contact"
                    className="group/btn inline-flex items-center gap-2 px-8 py-4 bg-gradient-primary text-velox-black font-semibold rounded-xl btn-enhanced text-lg"
                  >
                    Start a Project
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </main>

        {/* Footer */}
        <footer className="border-t border-border-custom py-8 mt-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 text-center text-text-muted text-sm flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse"></span>
            © {new Date().getFullYear()} Velox Studio. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
