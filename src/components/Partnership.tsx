"use client";

import { useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import MagneticButton from "./MagneticButton";

const benefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Profit Sharing",
    description: "Fair profit-sharing model where your success is our success. No upfront costs, shared rewards.",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Quality Assurance",
    description: "Comprehensive testing and QA services to ensure your product meets the highest standards.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    title: "Marketing & Publicity",
    description: "Full marketing support to launch and grow your product in the market.",
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Technical Infrastructure",
    description: "Hosting, DevOps, and technical infrastructure handled by our expert team.",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "Design Support",
    description: "UI/UX design, branding, and visual assets created by professional designers.",
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Business Strategy",
    description: "Strategic guidance on product positioning, pricing, and market fit.",
    gradient: "from-rose-500/20 to-red-500/20",
  },
];

const process = [
  {
    step: "01",
    title: "Apply",
    description: "Share your idea or skills with us through our partnership application.",
  },
  {
    step: "02",
    title: "Evaluate",
    description: "We review your proposal and discuss potential collaboration.",
  },
  {
    step: "03",
    title: "Partner",
    description: "Agree on terms and start building together.",
  },
  {
    step: "04",
    title: "Launch & Grow",
    description: "Launch your product and share in the success.",
  },
];

export default function Partnership() {
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);

  return (
    <section id="partnership" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-mesh opacity-40" />
      
      {/* Animated orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent-primary/5 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent-primary/3 rounded-full blur-[100px] animate-float-delayed" />
      
      {/* Decorative lines */}
      <div className="absolute top-20 left-1/4 w-px h-40 bg-gradient-to-b from-transparent via-accent-primary/20 to-transparent" />
      <div className="absolute bottom-20 right-1/4 w-px h-40 bg-gradient-to-t from-transparent via-accent-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-primary/10 rounded-full mb-6 border border-accent-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
              </span>
              <span className="text-accent-primary text-sm font-medium">Partnership Program</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Build With <span className="text-shimmer">Us</span>
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent-primary/50" />
              <div className="w-2 h-2 rotate-45 border border-accent-primary/50" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent-primary/50" />
            </div>
            <p className="max-w-3xl mx-auto text-lg text-text-secondary">
              Join our Product Team Collaboration program. Bring your ideas or work on ours. 
              We provide everything you need to succeed – you focus on building.
            </p>
          </div>
        </RevealOnScroll>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: What We Provide */}
          <RevealOnScroll direction="left">
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                What We Provide
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <RevealOnScroll key={index} delay={index * 50}>
                    <div
                      className="group relative p-5 rounded-xl stat-card-glass overflow-hidden cursor-default"
                      onMouseEnter={() => setHoveredBenefit(index)}
                      onMouseLeave={() => setHoveredBenefit(null)}
                    >
                      {/* Animated gradient background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      
                      <div className="relative z-10">
                        <div className="text-accent-primary mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                          {benefit.icon}
                        </div>
                        <h4 className="font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">{benefit.title}</h4>
                        <p className="text-sm text-text-secondary">{benefit.description}</p>
                      </div>
                      
                      {/* Corner accent */}
                      <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-accent-primary/0 group-hover:border-accent-primary/30 transition-all duration-500 rounded-br-xl" />
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Right: The Process */}
          <RevealOnScroll direction="right">
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                How It Works
              </h3>
              <div className="space-y-6">
                {process.map((item, index) => (
                  <RevealOnScroll key={index} delay={index * 100}>
                    <div className="flex gap-4 group">
                      <div className="relative">
                        <div className="shrink-0 w-14 h-14 rounded-full stat-card-glass flex items-center justify-center group-hover:bg-accent-primary/20 group-hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all duration-500">
                          <span className="text-accent-primary font-bold text-lg">{item.step}</span>
                        </div>
                        {/* Connecting line */}
                        {index < process.length - 1 && (
                          <div className="absolute top-14 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-accent-primary/30 to-transparent" />
                        )}
                      </div>
                      <div className="pt-2">
                        <h4 className="font-semibold text-text-primary text-lg group-hover:text-accent-primary transition-colors">{item.title}</h4>
                        <p className="text-text-secondary">{item.description}</p>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>

              {/* CTA Box */}
              <RevealOnScroll delay={400}>
                <div className="mt-10 p-6 rounded-2xl stat-card-glass relative overflow-hidden group">
                  {/* Animated border glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent" />
                  </div>
                  
                  <div className="relative z-10">
                    <h4 className="text-xl font-bold mb-3">Ready to Partner?</h4>
                    <p className="text-text-secondary mb-5">
                      Whether you have an idea or the skills, we&apos;d love to hear from you.
                    </p>
                    <MagneticButton strength={0.3}>
                      <a
                        href="#contact"
                        className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-velox-black font-semibold rounded-xl btn-enhanced"
                      >
                        Apply for Partnership
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </MagneticButton>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </RevealOnScroll>
        </div>

        {/* Bottom Banner */}
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-2xl stat-card-glass p-8 md:p-12 group">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-primary/8 rounded-full blur-3xl animate-float-delayed" />
            
            {/* Animated top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Have a Product Idea?
                </h3>
                <p className="text-text-secondary">
                  We&apos;re always looking for the next big thing. Let&apos;s build it together.
                </p>
              </div>
              <MagneticButton strength={0.3}>
                <a
                  href="#contact"
                  className="group/btn shrink-0 px-8 py-4 bg-text-primary text-background font-semibold rounded-xl hover:bg-accent-primary hover:text-velox-black transition-all duration-300 btn-enhanced flex items-center gap-2"
                >
                  Share Your Idea
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </MagneticButton>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
