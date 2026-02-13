"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import RevealOnScroll from "@/components/RevealOnScroll";

const teamMembers = [
  {
    name: "Salma Lahmiri",
    role: "Chief Executive Officer (CEO)",
    country: "Morocco",
    flag: "🇲🇦",
    image: "/Salma.png",
    quote: "Every great journey starts with a vision, is strengthened by the right people, and scales when purpose drives execution.",
    color: "cyan",
  },
  {
    name: "Rahber Haseen",
    role: "Founder & Chief Operating Manager",
    country: "Bangladesh",
    flag: "🇧🇩",
    image: "/Rahber.jpg",
    quote: "Building systems that empower teams — because vision needs execution, and innovation works only when operations do.",
    color: "purple",
  },
  {
    name: "Sabbir Hossain",
    role: "Founder & Chief Technology Officer (CTO)",
    country: "Bangladesh",
    flag: "🇧🇩",
    image: "/Sabbir.jpg",
    quote: "Keep Solving.",
    color: "cyan",
  },
  {
    name: "Shoriful Islam",
    role: "Head of Developer (HoD)",
    country: "Bangladesh",
    flag: "🇧🇩",
    image: "/Fahim.png",
    quote: "Sometimes, the hardest part of growing isn't learning new things, but unlearning what we were sure we already knew.",
    color: "purple",
  },
  {
    name: "Hajar Zahir",
    role: "Growth Manager (GM)",
    country: "Morocco",
    flag: "🇲🇦",
    image: "/Hajar.jpg",
    quote: "Meaning comes before momentum.",
    color: "cyan",
  },
];

export default function TeamPage() {
  return (
    <>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-mesh opacity-20 pointer-events-none" />
        <div className="fixed top-1/4 right-1/3 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[150px] pointer-events-none animate-float" />
        <div className="fixed bottom-1/4 left-1/3 w-96 h-96 bg-accent-secondary/5 rounded-full blur-[120px] pointer-events-none animate-float-delayed" />

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
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-primary/10 rounded-full mb-6 border border-accent-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
                </span>
                <span className="text-accent-primary text-sm font-medium">Our Team</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Meet the <span className="text-shimmer">Core Members</span>
              </h1>
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

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <RevealOnScroll key={index} delay={index * 100}>
                <div
                  className="group relative rounded-2xl stat-card-glass overflow-hidden hover:shadow-[0_0_40px_rgba(0,255,255,0.15)] transition-all duration-500"
                >
                  {/* Top Glow Line */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-0 h-px ${member.color === 'cyan' ? 'bg-accent-primary' : 'bg-accent-secondary'} group-hover:w-3/4 transition-all duration-500`} />

                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={`${member.image}`}
                      alt={member.name}
                      fill
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    
                    {/* Country Flag */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-surface/80 backdrop-blur-md rounded-full text-sm flex items-center gap-2 border border-border-custom">
                      <span>{member.flag}</span>
                      <span className="text-text-secondary">{member.country}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative">
                    <h3 className="text-xl font-bold text-text-primary mb-1 group-hover:text-accent-primary transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className={`text-sm font-medium mb-4 ${member.color === 'cyan' ? 'text-accent-primary' : 'text-accent-secondary'}`}>
                      {member.role}
                    </p>
                    
                    {/* Quote */}
                    <div className="relative">
                      <svg className="absolute -top-2 -left-1 w-5 h-5 text-accent-primary/20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-text-secondary text-sm italic pl-5 leading-relaxed">
                        &ldquo;{member.quote}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.color === 'cyan' ? 'from-accent-primary/5' : 'from-accent-secondary/5'} via-transparent to-transparent`} />
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Join Us CTA */}
          <RevealOnScroll delay={600}>
            <div className="mt-20 text-center">
              <div className="inline-block p-10 rounded-3xl stat-card-glass relative overflow-hidden group">
                {/* Background Decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary group-hover:w-full transition-all duration-700" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-primary/10 rounded-full blur-3xl group-hover:bg-accent-primary/20 transition-all duration-500" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent-secondary/10 rounded-full blur-3xl group-hover:bg-accent-secondary/20 transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent-secondary/10 flex items-center justify-center border border-accent-secondary/20">
                    <svg className="w-8 h-8 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">Want to Join Our Team?</h3>
                  <p className="text-text-secondary mb-8 max-w-md mx-auto">
                    We&apos;re always looking for talented individuals who share our passion for innovation.
                  </p>
                  <Link
                    href="/#contact"
                    className="group/btn inline-flex items-center gap-2 px-8 py-4 bg-gradient-primary text-velox-black font-semibold rounded-xl btn-enhanced text-lg"
                  >
                    Get in Touch
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
