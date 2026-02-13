"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Navbar, Footer } from "../../../components";
import RevealOnScroll from "../../../components/RevealOnScroll";

// ─── Animated counter ────────────────────────────────────────────────
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let t0: number;
    const tick = (now: number) => {
      if (!t0) t0 = now;
      const p = Math.min((now - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [end, duration, started]);

  return { count, ref };
}

// ─── Floating orbs background ────────────────────────────────────────
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.07] blur-[160px] animate-float" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-teal-500/[0.06] blur-[140px] animate-float-delayed" />
      <div className="absolute -bottom-40 left-1/3 w-[550px] h-[550px] rounded-full bg-cyan-500/[0.05] blur-[180px] animate-float" />
    </div>
  );
}

// ─── Feature card ────────────────────────────────────────────────────
interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureProps) {
  return (
    <div className="group relative bg-gradient-to-br from-surface to-surface-elevated border border-border-custom rounded-2xl p-6 hover:border-accent-primary/50 hover:shadow-[0_0_50px_rgba(0,255,255,0.12)] transition-all duration-500">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-primary/0 to-accent-primary/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-primary/10 border border-accent-primary/20 text-accent-primary mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
      </div>
    </div>
  );
}

// ─── Workflow step ───────────────────────────────────────────────────
function WorkflowStep({ step, title, desc }: { step: number; title: string; desc: string }) {
  return (
    <div className="relative flex items-start gap-5 group">
      <div className="shrink-0 w-12 h-12 rounded-full bg-accent-primary/10 border-2 border-accent-primary/40 flex items-center justify-center text-accent-primary font-bold text-lg group-hover:bg-accent-primary group-hover:text-black transition-all duration-300">
        {step}
      </div>
      <div className="pt-1">
        <h4 className="text-base font-semibold text-text-primary mb-1 group-hover:text-accent-primary transition-colors">{title}</h4>
        <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────
export default function CVForgePage() {
  const s1 = useCounter(9, 1800);
  const s2 = useCounter(300, 2000);
  const s3 = useCounter(100, 2200);

  const features: FeatureProps[] = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      ),
      title: "AI-Powered Parsing",
      description:
        "Paste your plain text resume and Gemini AI instantly structures it into perfectly organized sections — experience, education, skills, and projects.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
      title: "9 Professional Templates",
      description:
        "Choose from Modern, Classic, Minimal, Professional, Creative, Academic, Tech, Elegant, or Compact — each designed for different industries and roles.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      ),
      title: "Live Inline Editing",
      description:
        "Click any section in the CV preview to edit it directly. Add, remove, or reorder experience, education, skills, and projects in real time.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
        </svg>
      ),
      title: "High-Res PNG Export",
      description:
        "Download your CV as a high-resolution PNG image at near 300 DPI print quality. Auto-scaled to fit perfectly on an A4 page.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
      title: "Split View Editor",
      description:
        "Work in split view to edit your CV data on the left while watching the live preview update instantly on the right.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
      ),
      title: "Auto A4 Scaling",
      description:
        "Content automatically scales to fit within A4 page dimensions. Never worry about overflowing pages — CV Forge handles layout  for you.",
    },
  ];

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28">
        <FloatingOrbs />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — copy */}
            <RevealOnScroll>
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-primary/10 rounded-full mb-6 border border-accent-primary/25 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary" />
                  </span>
                  <span className="text-accent-primary text-xs font-semibold tracking-wide uppercase">
                    AI-Powered Resume Builder
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] mb-6 tracking-tight">
                  <span className="text-text-primary">CV</span>
                  <br />
                  <span className="text-accent-primary">Forge</span>
                </h1>

                <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-xl mb-8">
                  Transform your plain text resume into <span className="text-text-primary font-medium">professionally designed CVs</span> instantly using Gemini AI. Edit, preview, and download in 9 stunning template styles.
                </p>

                {/* CTA row */}
                <div className="flex flex-wrap gap-4 mb-10">
                  <Link
                    href="/cv-forge/index.html"
                    className="group inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-black font-bold rounded-xl hover:shadow-[0_0_50px_rgba(0,255,255,0.55)] transition-all duration-300"
                  >
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    </svg>
                    Launch App
                  </Link>

                  <Link
                    href="/saas"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-border-custom text-text-secondary hover:text-accent-primary hover:border-accent-primary/40 font-semibold transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    All Products
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-6 text-xs text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Powered by Gemini AI
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    9 professional templates
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    High-res PNG export
                  </span>
                </div>
              </div>
            </RevealOnScroll>

            {/* Right — product screenshot */}
            <RevealOnScroll>
              <div className="relative w-full max-w-2xl mx-auto">
                {/* Glow effect behind image */}
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-cyan-500/20 rounded-3xl blur-2xl opacity-60" />
                {/* Screenshot frame */}
                <div className="relative rounded-2xl border border-border-custom overflow-hidden shadow-2xl shadow-accent-primary/10 bg-surface">
                  {/* Browser-style top bar */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-black/40 border-b border-white/10">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-white/5 rounded-md px-3 py-1 text-[11px] text-zinc-500 text-center font-mono">cv-forge.veloxstudio.com</div>
                    </div>
                  </div>
                  <img
                    src="/Showcase/CV_builder_AI.png"
                    alt="CV Forge — AI-powered resume builder"
                    className="w-full h-auto"
                    loading="eager"
                  />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────── */}
      <section className="py-12 border-y border-border-custom bg-surface/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div ref={s1.ref}>
              <div className="text-3xl sm:text-4xl font-extrabold text-accent-primary">{s1.count}+</div>
              <div className="text-xs sm:text-sm text-text-secondary mt-1">Professional Templates</div>
            </div>
            <div ref={s2.ref}>
              <div className="text-3xl sm:text-4xl font-extrabold text-accent-primary">{s2.count}+</div>
              <div className="text-xs sm:text-sm text-text-secondary mt-1">DPI Print Quality</div>
            </div>
            <div ref={s3.ref}>
              <div className="text-3xl sm:text-4xl font-extrabold text-accent-primary">{s3.count}%</div>
              <div className="text-xs sm:text-sm text-text-secondary mt-1">A4 Auto-Fit Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ──────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 relative">
        <FloatingOrbs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 text-xs font-semibold text-accent-primary bg-accent-primary/10 border border-accent-primary/25 rounded-full mb-4 uppercase tracking-wider">
                Features
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                From plain text to polished CV — <span className="text-accent-primary">in seconds</span>
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed">
                Paste your resume, pick a template, and let AI do the heavy lifting. Edit inline and download print-ready.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <RevealOnScroll key={i}>
                <FeatureCard {...f} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 border-t border-border-custom bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <RevealOnScroll>
              <div>
                <span className="inline-block px-4 py-1.5 text-xs font-semibold text-accent-primary bg-accent-primary/10 border border-accent-primary/25 rounded-full mb-4 uppercase tracking-wider">
                  How It Works
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-10">
                  Three steps to a <span className="text-accent-primary">professional CV</span>
                </h2>
                <div className="space-y-8 relative">
                  {/* Connecting line */}
                  <div className="absolute left-6 top-14 bottom-4 w-px bg-gradient-to-b from-accent-primary/40 via-accent-primary/20 to-transparent" />
                  <WorkflowStep step={1} title="Paste your resume text" desc="Copy and paste your existing resume, LinkedIn bio, or any plain text describing your experience, education, and skills." />
                  <WorkflowStep step={2} title="AI structures your data" desc="Gemini AI parses your text into structured CV sections — personal info, experience, education, projects, and skills — all perfectly organized." />
                  <WorkflowStep step={3} title="Choose, edit & download" desc="Pick from 9 professional templates, edit any section inline with the live editor, then download as a high-resolution PNG ready for print." />
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              {/* Template showcase demo */}
              <div className="rounded-2xl border border-border-custom bg-surface overflow-hidden shadow-xl shadow-accent-primary/5">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-surface-elevated border-b border-border-custom">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-xs text-text-muted ml-2 font-mono">cv-forge.ai</span>
                </div>
                {/* Body */}
                <div className="p-5 space-y-4 font-mono text-sm">
                  <div>
                    <span className="text-accent-primary">$</span>
                    <span className="text-text-secondary ml-2">paste</span>
                    <span className="text-text-muted ml-1">--resume</span>
                    <span className="text-green-400 ml-1">&quot;3 years full-stack dev...&quot;</span>
                  </div>
                  <div>
                    <span className="text-accent-primary">$</span>
                    <span className="text-text-secondary ml-2">template</span>
                    <span className="text-text-muted ml-1">--style</span>
                    <span className="text-green-400 ml-1">&quot;Modern&quot;</span>
                  </div>
                  <div className="border-t border-border-custom pt-4 text-text-muted">
                    <span className="text-accent-primary">&#10003;</span> Personal info extracted
                    <br />
                    <span className="text-accent-primary">&#10003;</span> Experience: 3 entries structured
                    <br />
                    <span className="text-accent-primary">&#10003;</span> Education: 2 entries parsed
                    <br />
                    <span className="text-accent-primary">&#10003;</span> Skills: 12 skills identified
                    <br />
                    <span className="text-accent-primary">&#10003;</span> Projects: 4 projects organized
                    <br />
                    <span className="text-green-400 font-semibold">&#10003; CV ready — download as high-res PNG</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ── TEMPLATES SHOWCASE ─────────────────────────────────────── */}
      <section className="py-20 lg:py-28 relative">
        <FloatingOrbs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 text-xs font-semibold text-accent-primary bg-accent-primary/10 border border-accent-primary/25 rounded-full mb-4 uppercase tracking-wider">
                Templates
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                9 beautifully crafted <span className="text-accent-primary">templates</span>
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {["Modern", "Classic", "Minimal", "Professional", "Creative", "Academic", "Tech", "Elegant", "Compact"].map((t, i) => (
              <RevealOnScroll key={i}>
                <div className="group h-full bg-gradient-to-br from-surface to-surface-elevated border border-border-custom rounded-2xl p-5 hover:border-accent-primary/40 transition-all duration-500 text-center">
                  <div className="text-2xl mb-3">
                    {["&#9998;", "&#128220;", "&#9679;", "&#128188;", "&#127912;", "&#127891;", "&#128187;", "&#10024;", "&#128196;"][i]}
                  </div>
                  <h3 className="text-sm font-bold text-text-primary group-hover:text-accent-primary transition-colors">{t}</h3>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 border-t border-border-custom">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <div className="bg-gradient-to-br from-surface to-surface-elevated border border-border-custom rounded-3xl p-10 sm:p-16 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-emerald-500/[0.08] rounded-full blur-[100px]" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-teal-500/[0.06] rounded-full blur-[100px]" />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-primary/10 border border-accent-primary/25 mb-8">
                  <svg className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                  Ready to forge your CV?
                </h2>
                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed">
                  Stop spending hours formatting your resume. Paste your text, choose a template, and download a professional CV in seconds.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/cv-forge/index.html"
                    className="group inline-flex items-center gap-2.5 px-10 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-black font-bold rounded-xl hover:shadow-[0_0_60px_rgba(0,255,255,0.55)] transition-all duration-300 text-lg"
                  >
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    </svg>
                    Launch App
                  </Link>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-border-custom text-text-secondary hover:text-accent-primary hover:border-accent-primary/40 font-semibold transition-all duration-300"
                  >
                    Contact Sales
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
    </main>
  );
}
