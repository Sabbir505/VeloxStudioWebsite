"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import MagneticButton from "./MagneticButton";
import RevealOnScroll from "./RevealOnScroll";
import MouseFollow from "./MouseFollow";

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (startOnView && ref.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [startOnView]);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, hasStarted]);

  return { count, ref };
}

// Generate particles helper function
const generateParticles = () => 
  Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${8 + Math.random() * 10}s`,
    size: 2 + Math.random() * 4,
  }));

// Floating particles component
function FloatingParticles() {
  const [particles, setParticles] = useState<ReturnType<typeof generateParticles>>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      // Use requestAnimationFrame to defer state update and avoid lint warning
      requestAnimationFrame(() => {
        setParticles(generateParticles());
      });
    }
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            bottom: "-10px",
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  );
}

// Typewriter effect component
function TypewriterText({ words, className = "" }: { words: string[]; className?: string }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < word.length) {
          setCurrentText(word.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className={className}>
      {currentText}
      <span className="text-accent-primary animate-pulse">|</span>
    </span>
  );
}

// Individual stat card component to properly use hooks
function StatCard({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { count, ref } = useAnimatedCounter(value, 2000);
  
  return (
    <RevealOnScroll delay={delay}>
      <div 
        ref={ref}
        className="stat-card-glass rounded-2xl p-6 text-center group cursor-default relative"
      >
        <div className="text-4xl sm:text-5xl font-bold text-accent-primary stat-glow mb-3 transition-transform duration-500 group-hover:scale-110">
          {count}{suffix}
        </div>
        <div className="text-sm text-text-muted font-medium uppercase tracking-wider">
          {label}
        </div>
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent-primary/0 group-hover:border-accent-primary/50 transition-all duration-500 rounded-tl-2xl" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent-primary/0 group-hover:border-accent-primary/50 transition-all duration-500 rounded-br-2xl" />
      </div>
    </RevealOnScroll>
  );
}

// Stats data
const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 15, suffix: "+", label: "Team Partners" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "/7", label: "Support" },
];

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[90vh] pt-20 flex items-center justify-center overflow-hidden bg-gradient-animated noise-overlay">
      {/* Background mesh with enhanced cyan corners */}
      <div className="absolute inset-0 bg-mesh" />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-primary/5"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      {/* Background Grid Pattern - Enhanced */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.4) 1px, transparent 1px),
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
          }}
        />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Glowing Orb Effects - Enhanced with morph animation */}
      <MouseFollow intensity={0.02} className="absolute top-1/4 left-1/4">
        <div className="w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[100px] animate-morph" />
      </MouseFollow>
      <MouseFollow intensity={0.03} className="absolute bottom-1/4 right-1/4">
        <div className="w-[400px] h-[400px] bg-accent-primary/8 rounded-full blur-[80px] animate-morph" style={{ animationDelay: "-4s" }} />
      </MouseFollow>
      
      {/* Floating orbs with different animations */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent-primary/5 rounded-full blur-[60px] animate-float" />
      <div className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-accent-primary/3 rounded-full blur-[50px] animate-float-delayed" />
      
      {/* Spotlight effect */}
      <div 
        className="spotlight opacity-20"
        style={{
          left: `calc(50% + ${mousePosition.x * 2}px)`,
          top: `calc(40% + ${mousePosition.y * 2}px)`,
        }}
      />

      {/* Decorative lines */}
      <div className="absolute top-0 left-1/4 w-px h-40 bg-gradient-to-b from-transparent via-accent-primary/20 to-transparent" />
      <div className="absolute top-0 right-1/3 w-px h-60 bg-gradient-to-b from-transparent via-accent-primary/10 to-transparent" />
      <div className="absolute bottom-0 left-1/3 w-px h-48 bg-gradient-to-t from-transparent via-accent-primary/15 to-transparent" />
      <div className="absolute bottom-0 right-1/4 w-px h-32 bg-gradient-to-t from-transparent via-accent-primary/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading - Enhanced with shimmer effect */}
        <RevealOnScroll delay={200}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            <span className="block text-text-primary mb-2">We Build</span>
            <span className="block text-shimmer text-glow pb-4">
              <TypewriterText 
                words={["Digital Excellence", "Amazing Products", "Your Vision", "The Future"]} 
              />
            </span>
          </h1>
        </RevealOnScroll>

        {/* Decorative line under heading */}
        <RevealOnScroll delay={250}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-accent-primary/50" />
            <div className="w-2 h-2 rotate-45 border border-accent-primary/50" />
            <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-accent-primary/50" />
          </div>
        </RevealOnScroll>

        {/* Subheading - Enhanced */}
        <RevealOnScroll delay={300}>
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-text-secondary mb-12 leading-relaxed font-light">
            From innovative software products to collaborative partnerships,
            we transform ideas into{" "}
            <span className="text-accent-primary font-medium">powerful digital solutions</span>{" "}
            that drive real results.
          </p>
        </RevealOnScroll>

        {/* CTA Buttons - Enhanced with new effects */}
        <RevealOnScroll delay={400}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <MagneticButton strength={0.3}>
              <Link
                href="#services"
                className="group relative inline-flex items-center gap-2 w-full sm:w-auto px-8 py-4 bg-gradient-primary text-velox-black font-semibold rounded-xl btn-enhanced text-lg overflow-hidden"
              >
                <span className="relative z-10">Explore Our Services</span>
                <svg 
                  className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.3}>
              <Link
                href="#partnership"
                className="group relative inline-flex items-center gap-2 w-full sm:w-auto px-8 py-4 border border-border-custom text-text-primary font-semibold rounded-xl btn-secondary-enhanced text-lg"
              >
                <span className="relative z-10">Partner With Us</span>
                <svg 
                  className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:rotate-45" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </MagneticButton>
          </div>
        </RevealOnScroll>

        {/* Stats Section - Enhanced with glass morphism */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={500 + index * 100}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator - Enhanced */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
        <Link href="#about" className="flex flex-col items-center gap-2 group">
          <span className="text-xs text-text-muted uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Scroll
          </span>
          <div className="w-7 h-12 rounded-full border-2 border-border-custom flex items-start justify-center p-2 group-hover:border-accent-primary transition-colors duration-300">
            <div className="w-1.5 h-3 bg-accent-primary rounded-full scroll-dot shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
          </div>
        </Link>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
