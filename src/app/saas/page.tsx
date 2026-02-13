"use client";

import Link from "next/link";
import { Navbar, Footer } from "@/components";
import RevealOnScroll from "@/components/RevealOnScroll";
import CustomCursor from "@/components/CustomCursor";

interface AIProduct {
  name: string;
  slug: string;
  category: string;
  description: string;
  tags: string[];
  comingSoon: boolean;
  icon: React.ReactNode;
}

const aiProducts: AIProduct[] = [
  {
    name: "CryptoChart AI",
    slug: "cryptochart-ai",
    category: "AI / Finance",
    description: "Advanced cryptocurrency charting platform powered by AI for smart trading insights and predictions.",
    tags: ["AI", "Finance", "Web App"],
    comingSoon: true,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    name: "Cursor for UI",
    slug: "cursor-but-for-ui",
    category: "AI / Design",
    description: "AI-powered design assistant that helps create stunning user interfaces with intelligent cursor interactions and suggestions.",
    tags: ["AI", "Design", "Web App"],
    comingSoon: false,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    name: "CV Builder AI",
    slug: "cv-builder-ai",
    category: "AI / Career",
    description: "Smart resume builder powered by AI that creates professional CVs tailored to job descriptions and industry standards.",
    tags: ["AI", "Career", "Web App"],
    comingSoon: true,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    name: "Market Mind AI",
    slug: "market-mind-ai",
    category: "AI / Analytics",
    description: "Intelligent market analysis tool that leverages AI to provide deep insights into market trends and consumer behavior.",
    tags: ["AI", "Analytics", "Web App"],
    comingSoon: true,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    name: "Validate Idea",
    slug: "validate-idea",
    category: "AI / Business",
    description: "AI-powered idea validation platform that helps entrepreneurs assess the viability and potential of their business concepts.",
    tags: ["AI", "Business", "Web App"],
    comingSoon: true,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
];

export default function SaaSPage() {
  return (
    <main className="min-h-screen bg-background">
      <CustomCursor />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 via-background to-background" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-[150px] animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[180px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <RevealOnScroll>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-accent-primary/20 to-accent-primary/10 rounded-full mb-6 border border-accent-primary/30 backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-primary"></span>
                </span>
                <span className="text-accent-primary text-xs font-semibold tracking-wide">AI-Powered Solutions</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-text-primary via-accent-primary/90 to-text-primary bg-clip-text text-transparent">
                  Our SaaS Products
                </span>
              </h1>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-accent-primary/50 to-accent-primary" />
                <div className="relative">
                  <div className="absolute inset-0 bg-accent-primary/20 blur-md rounded-full" />
                  <div className="relative w-2.5 h-2.5 rotate-45 border-2 border-accent-primary bg-background" />
                </div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent via-accent-primary/50 to-accent-primary" />
              </div>
              
              <p className="max-w-2xl mx-auto text-lg sm:text-xl text-text-secondary mb-6 leading-relaxed">
                Discover our suite of AI-powered software solutions designed to transform your workflow, 
                boost productivity, and drive innovation in your business.
              </p>
              
              {/* Coming Soon Notice */}
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500/10 to-amber-500/5 rounded-full border border-amber-500/30 backdrop-blur-sm">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-amber-500 font-semibold text-sm">All products launching soon — Stay tuned!</span>
              </div>
            </div>
          </RevealOnScroll>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-16">
            {aiProducts.map((product) => (
              <RevealOnScroll key={product.slug}>
                <Link href={product.slug === "cursor-but-for-ui" ? `/saas/cursor-for-ui` : `/showcase/${product.slug}`}>
                  <div className="group h-full bg-gradient-to-br from-surface to-surface-elevated border border-border-custom rounded-2xl overflow-hidden hover:border-accent-primary/50 hover:shadow-[0_0_40px_rgba(0,255,255,0.2)] transition-all duration-500 cursor-pointer p-6 relative backdrop-blur-sm">
                    {/* Coming Soon / Live Badge */}
                    {product.comingSoon ? (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-amber-500/10 text-amber-500 text-[10px] font-bold rounded-full border border-amber-500/40 backdrop-blur-sm">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                          </span>
                          COMING SOON
                        </span>
                      </div>
                    ) : (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-500/20 to-green-500/10 text-green-400 text-[10px] font-bold rounded-full border border-green-500/40 backdrop-blur-sm">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
                          </span>
                          LIVE
                        </span>
                      </div>
                    )}
                    
                    {/* Product Icon */}
                    <div className="mb-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-primary/5 border border-accent-primary/20 group-hover:border-accent-primary/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 text-accent-primary">
                        {product.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                            {product.name}
                          </h3>
                        </div>
                        <span className="inline-block px-2.5 py-1 bg-accent-primary/10 text-accent-primary text-[10px] font-semibold rounded-full border border-accent-primary/30 mb-3">
                          {product.category}
                        </span>
                      </div>
                      
                      <p className="text-sm text-text-secondary leading-relaxed min-h-[60px]">
                        {product.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {product.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 text-[10px] bg-surface-elevated text-text-secondary rounded-full border border-border-custom group-hover:border-accent-primary/30 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover Arrow */}
                    <div className="flex items-center gap-2 text-accent-primary font-semibold text-sm mt-4 group-hover:gap-3 transition-all">
                      <span>Explore</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/0 via-accent-primary/0 to-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Notify Section */}
      <section className="pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll>
            <div className="bg-gradient-to-br from-surface to-surface-elevated border border-border-custom rounded-2xl p-8 sm:p-12 text-center backdrop-blur-sm relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent-primary/5 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-primary/5 rounded-full blur-[80px]" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-primary/5 border border-accent-primary/30 mb-6">
                  <svg className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
                  Be the First to Know
                </h2>
                
                <p className="text-base text-text-secondary mb-8 max-w-xl mx-auto leading-relaxed">
                  Our AI-powered SaaS products are almost ready! Get notified when we launch and be among the first to experience the future of productivity.
                </p>
                
                <Link
                  href="/#contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-primary/80 text-velox-black font-bold rounded-xl hover:shadow-[0_0_40px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-pointer text-base"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Notify Me on Launch
                </Link>
              </div>
            </div>
          </RevealOnScroll>

          {/* CTA Section */}
          <RevealOnScroll>
            <div className="mt-8">
              <div className="bg-gradient-to-br from-accent-primary/10 via-accent-primary/5 to-transparent border border-accent-primary/20 rounded-2xl p-8 sm:p-12 text-center backdrop-blur-sm">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
                  Need a Custom AI Solution?
                </h2>
                
                <p className="text-base text-text-secondary mb-8 max-w-xl mx-auto leading-relaxed">
                  We specialize in building tailored AI-powered applications. Let&apos;s discuss how we can 
                  create the perfect solution for your business needs.
                </p>
                
                <Link
                  href="/#contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-primary/80 text-velox-black font-bold rounded-xl hover:shadow-[0_0_40px_rgba(0,255,255,0.6)] transition-all duration-300 cursor-pointer text-base"
                >
                  Get in Touch
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
    </main>
  );
}