"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import MagneticButton from "./MagneticButton";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/saas", label: "SaaS" },
  { href: "/#partnership", label: "Partnership" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border-custom shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo size="md" variant="full" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <MagneticButton key={link.href} strength={0.2}>
                <Link
                  href={link.href}
                  className="text-text-secondary hover:text-accent-primary transition-all duration-200 text-sm font-medium nav-link-glow"
                >
                  {link.label}
                </Link>
              </MagneticButton>
            ))}
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            <MagneticButton strength={0.3}>
              <Link
                href="/#contact"
                className="px-5 py-2.5 bg-gradient-primary text-velox-black font-semibold rounded-lg transition-all duration-200 btn-lift text-sm"
              >
                Get Started
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-text-primary transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-text-primary transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-text-primary transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-border-custom">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-accent-primary transition-all duration-200 text-lg nav-link-glow"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="px-5 py-3 bg-gradient-primary text-velox-black font-semibold rounded-lg text-center mt-2 btn-lift"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
