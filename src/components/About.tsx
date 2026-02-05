"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";

export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const values = [
    { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, title: "Speed", desc: "Rapid development" },
    { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: "Precision", desc: "Attention to detail" },
    { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>, title: "Partnership", desc: "True collaboration" },
    { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, title: "Innovation", desc: "Creative solutions" },
  ];
  
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-mesh opacity-50" />
      
      {/* Floating orbs */}
      <div 
        className="absolute top-20 right-10 w-72 h-72 bg-accent-primary/5 rounded-full blur-[80px] animate-float"
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
      />
      <div 
        className="absolute bottom-20 left-10 w-96 h-96 bg-accent-primary/3 rounded-full blur-[100px] animate-float-delayed"
        style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-primary/10 rounded-full mb-6 border border-accent-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
              </span>
              <span className="text-accent-primary text-sm font-medium">Who We Are</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              About <span className="text-shimmer">Velox Studio</span>
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-primary/50" />
              <div className="w-2 h-2 rotate-45 border border-accent-primary/50" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-primary/50" />
            </div>
            <p className="max-w-3xl mx-auto text-lg text-text-secondary">
              We are a dynamic digital studio focused on creating impactful software products 
              and fostering collaborative partnerships that drive innovation.
            </p>
          </div>
        </RevealOnScroll>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Visual Element */}
          <RevealOnScroll direction="left">
            <div className="relative group">
              {/* Decorative border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary/20 via-transparent to-accent-primary/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-border-custom group-hover:border-accent-primary/30 transition-all duration-500 stat-card-glass">
                {/* Use the actual logo - switches based on theme */}
                <Image
                  src="/assets/CoreMembers/group1.png"
                  alt="Velox Studio Logo"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/50" />

                {/* Animated corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-accent-primary/0 group-hover:border-accent-primary/50 transition-all duration-500 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-accent-primary/0 group-hover:border-accent-primary/50 transition-all duration-500 rounded-br-2xl" />

                {/* Floating Cards */}
                <div className="absolute top-8 right-8 px-4 py-2 bg-surface-elevated/90 backdrop-blur-md rounded-lg border border-border-custom hover:border-accent-primary/50 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,255,0.1)] animate-float group/card">
                  <span className="text-accent-primary font-semibold flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Innovation
                  </span>
                </div>
                <div className="absolute bottom-8 left-8 px-4 py-2 bg-surface-elevated/90 backdrop-blur-md rounded-lg border border-border-custom hover:border-accent-primary/50 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,255,0.1)] animate-float-delayed group/card">
                  <span className="text-text-primary font-semibold flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Excellence
                  </span>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right: Text Content */}
          <RevealOnScroll direction="right">
            <div className="space-y-8">
              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:bg-accent-primary/20 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-accent-primary transition-colors">Our Mission</h3>
                </div>
                <p className="text-text-secondary leading-relaxed pl-[52px]">
                  At Velox Studio, we believe in the power of digital innovation to solve 
                  real-world problems. Our mission is to identify gaps in the market and 
                  create software solutions that make a genuine difference.
                </p>
              </div>

              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:bg-accent-primary/20 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-accent-primary transition-colors">Our Approach</h3>
                </div>
                <p className="text-text-secondary leading-relaxed pl-[52px]">
                  We operate on three distinct priorities: developing our own innovative 
                  products, partnering with talented teams through profit-sharing models, 
                  and providing exceptional client services for businesses of all sizes.
                </p>
              </div>

              {/* Key Values */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {values.map((value, index) => (
                  <RevealOnScroll key={index} delay={index * 100}>
                    <div className="group/card p-4 rounded-xl stat-card-glass cursor-default relative overflow-hidden">
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/0 to-accent-primary/0 group-hover/card:from-accent-primary/5 group-hover/card:to-transparent transition-all duration-500" />
                      
                      <div className="relative z-10">
                        <div className="text-2xl mb-2 text-accent-primary transition-transform duration-300 group-hover/card:scale-110 group-hover/card:rotate-3">
                          {value.icon}
                        </div>
                        <h4 className="font-semibold text-text-primary group-hover/card:text-accent-primary transition-colors">{value.title}</h4>
                        <p className="text-sm text-text-muted">{value.desc}</p>
                      </div>
                      
                      {/* Corner accent */}
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-accent-primary/0 group-hover/card:border-accent-primary/30 transition-all duration-500 rounded-br-xl" />
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
