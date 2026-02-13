"use client";

import { useState } from "react";
import Link from "next/link";
import RevealOnScroll from "./RevealOnScroll";

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Custom Website Development",
    description: "Tailored websites for restaurants, institutions, companies, and businesses of all sizes. Built with modern technologies for speed, security, and scalability.",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Secure"],
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android. From concept to deployment, we build apps that users love.",
    features: ["iOS & Android", "Cross-Platform", "App Store Ready", "Push Notifications"],
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    title: "Marketing & Publicity",
    description: "Comprehensive digital marketing campaigns to promote your apps, websites, and digital products. Reach your target audience effectively.",
    features: ["Social Media", "SEO/SEM", "Content Strategy", "Analytics"],
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "Design Services",
    description: "Professional logo design, posters, banners, and branding materials that capture your brand's essence and make a lasting impression.",
    features: ["Logo Design", "Brand Identity", "Print Materials", "Digital Assets"],
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: "UI/UX Design",
    description: "User interface and experience design that puts users first. We create intuitive, beautiful interfaces that drive engagement and conversions.",
    features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Software Product Development",
    description: "We identify market gaps and build innovative software products that solve real-world problems. Websites, apps, and digital platforms.",
    features: ["Market Research", "MVP Development", "Scalable Solutions", "Ongoing Support"],
    gradient: "from-rose-500/20 to-red-500/20",
  },
];

export default function Services() {
  const [, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 bg-surface relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-mesh opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-primary/10 rounded-full mb-6 border border-accent-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
              </span>
              <span className="text-accent-primary text-sm font-medium">Our Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              What We <span className="text-shimmer">Offer</span>
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent-primary/50" />
              <div className="w-2 h-2 rotate-45 border border-accent-primary/50" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent-primary/50" />
            </div>
            <p className="max-w-3xl mx-auto text-lg text-text-secondary">
              Comprehensive digital solutions tailored to your needs. From development 
              to design to marketing, we&apos;ve got you covered.
            </p>
          </div>
        </RevealOnScroll>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <RevealOnScroll key={index} delay={index * 100}>
              <Link href="/services" className="block h-full">
                <div 
                  className="group relative p-6 rounded-2xl stat-card-glass h-full cursor-pointer overflow-hidden"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Animated background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-surface-elevated flex items-center justify-center text-accent-primary mb-5 group-hover:bg-accent-primary/20 group-hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all duration-500 group-hover:scale-110">
                      {service.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 group-hover:text-accent-primary transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary mb-5 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-3 py-1 text-xs font-medium bg-surface-elevated text-text-secondary rounded-full border border-border-custom group-hover:border-accent-primary/30 group-hover:bg-accent-primary/10 transition-all duration-300"
                          style={{ transitionDelay: `${featureIndex * 50}ms` }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-accent-primary/0 group-hover:border-accent-primary/30 transition-all duration-500 rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-accent-primary/0 group-hover:border-accent-primary/30 transition-all duration-500 rounded-bl-2xl" />
                  
                  {/* Arrow indicator */}
                  <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-accent-primary/0 group-hover:bg-accent-primary/20 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0">
                    <svg className="w-4 h-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        {/* CTA */}
        <RevealOnScroll delay={600}>
          <div className="text-center mt-16">
            <Link
              href="/services"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-primary text-velox-black font-semibold rounded-xl btn-enhanced text-lg"
            >
              <span>Request a Service</span>
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
