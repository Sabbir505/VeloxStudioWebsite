"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar, Footer } from "@/components";
import RevealOnScroll from "@/components/RevealOnScroll";

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

interface ProductDetailClientProps {
  project: Project | undefined;
}

export default function ProductDetailClient({ project }: ProductDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const router = useRouter();

  const handleBackToShowcase = () => {
    // Navigate to home page first, then scroll to showcase section
    router.push("/");
    // Use setTimeout to ensure the page has loaded before scrolling
    setTimeout(() => {
      const showcaseElement = document.getElementById("showcase");
      if (showcaseElement) {
        showcaseElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // If element not found (page still loading), try with window.location
        window.location.href = "/#showcase";
      }
    }, 100);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!project || !isAutoPlaying || project.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [project, isAutoPlaying]);

  const handlePrevImage = () => {
    if (!project) return;
    setIsAutoPlaying(false);
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const handleNextImage = () => {
    if (!project) return;
    setIsAutoPlaying(false);
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const handleImageSelect = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentImageIndex(index);
  };

  if (!project) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="mb-6">
              <svg className="w-20 h-20 mx-auto text-text-secondary opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-text-primary mb-4 bg-gradient-to-r from-text-primary to-accent-primary bg-clip-text text-transparent">Product Not Found</h1>
            <p className="text-base text-text-secondary mb-8 max-w-md mx-auto">The product you&apos;re looking for doesn&apos;t exist or may have been moved.</p>
            <button
              onClick={handleBackToShowcase}
              className="group px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-primary/80 text-velox-black font-semibold rounded-xl hover:shadow-[0_0_40px_rgba(0,255,255,0.5)] transition-all duration-300 cursor-pointer inline-flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Showcase
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-10 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 via-background to-background" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-[150px] animate-float-delayed" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Navigation */}
          <RevealOnScroll>
            <button
              onClick={handleBackToShowcase}
              className="group inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-all duration-300 mb-10 cursor-pointer text-sm"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Back to Showcase</span>
            </button>
          </RevealOnScroll>

          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
            {/* Left: Text Content */}
            <RevealOnScroll>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-accent-primary/20 to-accent-primary/10 rounded-full border border-accent-primary/30 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
                  </span>
                  <span className="text-accent-primary text-xs font-semibold tracking-wide">{project.category}</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-text-primary via-accent-primary/90 to-text-primary bg-clip-text text-transparent">
                    {project.name}
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                  {project.description}
                </p>

                {/* Download Button */}
                {project.downloadUrl && (
                  <div className="pt-2">
                    <a
                      href={project.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-primary/80 text-velox-black font-bold rounded-xl hover:shadow-[0_0_50px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-pointer text-sm"
                    >
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                      </svg>
                      Download on Play Store
                    </a>
                  </div>
                )}
              </div>
            </RevealOnScroll>

            {/* Right: Featured Image Preview */}
            <RevealOnScroll>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/20 to-transparent rounded-3xl blur-2xl" />
                <div className="relative bg-gradient-to-br from-surface to-surface-elevated border border-border-custom rounded-2xl overflow-hidden backdrop-blur-sm">
                  <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
                    <Image 
                      src={project.images[0]} 
                      alt={project.name}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                      quality={85}
                      priority
                    />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Image Gallery */}
          <RevealOnScroll>
            <div className="mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-accent-primary to-accent-primary/50 rounded-full" />
                Gallery
              </h2>
              
              <div className="bg-gradient-to-br from-surface to-surface-elevated border border-border-custom rounded-2xl p-4 sm:p-8 backdrop-blur-sm">
                {/* Main Display */}
                <div className="relative">
                  {/* Main Image Display with Transition */}
                  <div className="relative h-[300px] sm:h-[400px] md:h-[480px] lg:h-[520px] rounded-xl overflow-hidden shadow-2xl bg-surface-elevated border border-border-custom">
                    {project.images.map((img, imgIndex) => (
                      <div
                        key={imgIndex}
                        className={`absolute inset-0 transition-opacity duration-700 ${
                          imgIndex === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                      >
                        <Image 
                          src={img} 
                          alt={`${project.name} ${imgIndex + 1}`} 
                          fill 
                          className="object-contain p-4"
                          quality={80}
                          loading={imgIndex === 0 ? "eager" : "lazy"}
                          priority={imgIndex === 0}
                        />
                      </div>
                    ))}
                    
                    {/* Navigation Arrows */}
                    {project.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-surface/80 backdrop-blur-sm border border-border-custom hover:border-accent-primary hover:bg-accent-primary/10 transition-all duration-300 group"
                          aria-label="Previous image"
                        >
                          <svg className="w-5 h-5 text-text-secondary group-hover:text-accent-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-surface/80 backdrop-blur-sm border border-border-custom hover:border-accent-primary hover:bg-accent-primary/10 transition-all duration-300 group"
                          aria-label="Next image"
                        >
                          <svg className="w-5 h-5 text-text-secondary group-hover:text-accent-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Auto-play Toggle */}
                    {project.images.length > 1 && (
                      <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="absolute top-3 right-3 z-20 p-2 rounded-full bg-surface/80 backdrop-blur-sm border border-border-custom hover:border-accent-primary hover:bg-accent-primary/10 transition-all duration-300 group"
                        aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                      >
                        {isAutoPlaying ? (
                          <svg className="w-4 h-4 text-text-secondary group-hover:text-accent-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-text-secondary group-hover:text-accent-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Image Indicators */}
                {project.images.length > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    {project.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleImageSelect(idx)}
                        className={`transition-all duration-300 rounded-full ${
                          idx === currentImageIndex 
                            ? 'w-6 h-1.5 bg-accent-primary' 
                            : 'w-1.5 h-1.5 bg-accent-primary/30 hover:bg-accent-primary/60'
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </RevealOnScroll>

          {/* Content Sections */}
          <div className="grid lg:grid-cols-2 gap-6 mb-16">
            {/* About Section */}
            <RevealOnScroll>
              <div className="h-full bg-gradient-to-br from-surface to-surface-elevated border border-border-custom rounded-2xl p-6 hover:border-accent-primary/30 transition-all duration-300 group backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-accent-primary/10 rounded-lg border border-accent-primary/20 group-hover:bg-accent-primary/20 transition-colors">
                    <svg className="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-text-primary">About</h2>
                </div>
                <p className="text-text-secondary leading-relaxed text-sm">
                  {project.fullDescription}
                </p>
              </div>
            </RevealOnScroll>

            {/* Tags Section */}
            <RevealOnScroll>
              <div className="bg-gradient-to-br from-surface to-surface-elevated border border-border-custom rounded-2xl p-6 hover:border-accent-primary/30 transition-all duration-300 group backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-accent-primary/10 rounded-lg border border-accent-primary/20 group-hover:bg-accent-primary/20 transition-colors">
                    <svg className="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="group/tag px-3 py-1.5 bg-surface-elevated text-text-secondary rounded-full text-sm border border-border-custom flex items-center gap-1.5 hover:border-accent-primary hover:bg-accent-primary/5 hover:text-accent-primary transition-all duration-300 cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-primary/50 group-hover/tag:bg-accent-primary" />
                      {tag}
                      {tag === "iOS" && project.iosComingSoon && (
                        <span className="text-accent-primary font-semibold ml-0.5 text-xs">• Soon</span>
                      )}
                      {tag === "Android" && (
                        <span className="text-green-400 font-semibold ml-0.5 text-xs">• Live</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Features Section */}
          {project.features && (
            <RevealOnScroll>
              <div className="mb-16">
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                  <span className="w-1 h-6 bg-gradient-to-b from-accent-primary to-accent-primary/50 rounded-full" />
                  Key Features
                </h3>
                <div className="bg-gradient-to-br from-surface to-surface-elevated border border-border-custom rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {project.features.map((feature, index) => (
                      <div 
                        key={index} 
                        className="group flex items-start gap-3 p-4 bg-surface-elevated rounded-xl border border-border-custom hover:border-accent-primary/50 hover:bg-accent-primary/5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] cursor-default"
                      >
                        <div className="mt-0.5">
                          <div className="relative">
                            <span className="absolute w-4 h-4 rounded-full bg-accent-primary/20 group-hover:bg-accent-primary/30 blur-sm transition-all" />
                            <svg className="relative w-4 h-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <span className="text-text-secondary group-hover:text-text-primary transition-colors text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          )}

          {/* Call to Action */}
          {project.downloadUrl && (
            <RevealOnScroll>
              <div className="bg-gradient-to-br from-accent-primary/10 via-accent-primary/5 to-transparent border border-accent-primary/20 rounded-2xl p-8 sm:p-10 text-center backdrop-blur-sm">
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
                  Ready to Experience {project.name}?
                </h3>
                <p className="text-sm text-text-secondary mb-6 max-w-2xl mx-auto">
                  Download now and discover all the amazing features that make {project.name} stand out.
                </p>
                <a
                  href={project.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-primary/80 text-velox-black font-bold rounded-xl hover:shadow-[0_0_50px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-pointer text-sm"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  Download on Play Store
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </RevealOnScroll>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
