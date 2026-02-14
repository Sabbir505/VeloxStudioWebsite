"use client";

import { useEffect, useState, useRef } from "react";
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
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-accent-primary/[0.07] blur-[160px] animate-float" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-purple-500/[0.06] blur-[140px] animate-float-delayed" />
      <div className="absolute -bottom-40 left-1/3 w-[550px] h-[550px] rounded-full bg-accent-primary/[0.05] blur-[180px] animate-float" />
    </div>
  );
}

// ─── Typewriter effect ───────────────────────────────────────────────
function Typewriter({ words, speed = 90, pause = 2200 }: { words: string[]; speed?: number; pause?: number }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    const delay = deleting ? speed / 2 : speed;

    if (!deleting && text === word) {
      setTimeout(() => setDeleting(true), pause);
      return;
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const timer = setTimeout(() => {
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, index, words, speed, pause]);

  return (
    <span className="text-accent-primary">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// ─── Feature card ────────────────────────────────────────────────────
interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
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
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-primary/10 border-2 border-accent-primary/40 flex items-center justify-center text-accent-primary font-bold text-lg group-hover:bg-accent-primary group-hover:text-black transition-all duration-300">
        {step}
      </div>
      <div className="pt-1">
        <h4 className="text-base font-semibold text-text-primary mb-1 group-hover:text-accent-primary transition-colors">{title}</h4>
        <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ─── Mock UI preview component ───────────────────────────────────────
function MockPreview() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Dashboard", "Profile", "Settings"];

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Phone frame */}
      <div className="relative mx-auto w-[280px] sm:w-[320px] rounded-[2.5rem] border-2 border-border-custom bg-surface p-2 shadow-2xl shadow-accent-primary/10">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-surface rounded-b-2xl z-10" />
        {/* Screen */}
        <div className="rounded-[2rem] overflow-hidden bg-black aspect-[9/19.5] relative">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[10px] text-white/70">
            <span>9:41</span>
            <div className="flex gap-1 items-center">
              <div className="w-3.5 h-2 border border-white/40 rounded-sm relative">
                <div className="absolute inset-[1px] right-[3px] bg-green-400 rounded-sm" />
              </div>
            </div>
          </div>

          {/* App content */}
          <div className="px-4 pt-2">
            {/* Nav tabs */}
            <div className="flex gap-1 bg-white/5 rounded-xl p-1 mb-4">
              {tabs.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 text-[10px] py-1.5 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === i
                      ? "bg-accent-primary text-black"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Content skeleton with subtle animation */}
            <div className="space-y-3">
              {/* Card */}
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-primary/60 to-purple-500/60" />
                  <div className="space-y-1 flex-1">
                    <div className="h-2.5 w-24 bg-white/10 rounded-full" />
                    <div className="h-2 w-16 bg-white/5 rounded-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-white/5 rounded-full" />
                  <div className="h-2 w-3/4 bg-white/5 rounded-full" />
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2">
                {["#00FFFF", "#A855F7", "#22C55E"].map((c, i) => (
                  <div key={i} className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-2 text-center">
                    <div className="text-sm font-bold" style={{ color: c }}>
                      {["2.4k", "89%", "142"][i]}
                    </div>
                    <div className="text-[8px] text-white/30 mt-0.5">
                      {["Users", "Score", "Tasks"][i]}
                    </div>
                  </div>
                ))}
              </div>

              {/* List items */}
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.02]">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06]" />
                  <div className="flex-1 space-y-1">
                    <div className="h-2 w-20 bg-white/10 rounded-full" />
                    <div className="h-1.5 w-28 bg-white/5 rounded-full" />
                  </div>
                  <div className="w-5 h-5 rounded-full border border-accent-primary/30" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom nav */}
          <div className="absolute bottom-0 inset-x-0 flex justify-around py-3 bg-black/80 backdrop-blur-sm border-t border-white/[0.05]">
            {["M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
              "3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
              "16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
              "10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            ].map((d, i) => (
              <svg key={i} className={`w-5 h-5 ${i === 0 ? "text-accent-primary" : "text-white/25"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={d} />
              </svg>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative glow behind phone */}
      <div className="absolute inset-0 -z-10 blur-[80px] opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-primary/30 rounded-full" />
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────
export default function CursorForUIPage() {
  const s1 = useCounter(10, 1800);
  const s2 = useCounter(50, 2000);
  const s3 = useCounter(95, 2200);

  const features: FeatureProps[] = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      ),
      title: "AI-Powered Generation",
      description:
        "Describe your UI in plain English and watch production-ready screens materialize in seconds, powered by Gemini.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      ),
      title: "Multi-Device Preview",
      description:
        "Instantly preview your designs across mobile, tablet, and desktop viewports — all in a single workspace.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
        </svg>
      ),
      title: "Design System Baked-In",
      description:
        "Every generated screen follows a strict design system — consistent typography, spacing, elevation, and color tokens.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
      ),
      title: "Conversational Refinement",
      description:
        "Chat with the AI to iterate on any screen — change layouts, swap colours, add components — all through natural language.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      ),
      title: "One-Click Export",
      description:
        "Export individual screens as PNG/SVG or download your entire project as a ready-to-use ZIP file in one click.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      ),
      title: "Anti-AI-Slop Engine",
      description:
        "A built-in quality filter eliminates generic AI patterns — every design is unique, polished, and production-worthy.",
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
                    AI-First Design Tool
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] mb-6 tracking-tight">
                  <span className="text-text-primary">Cursor,</span>
                  <br />
                  <span className="text-text-primary">but for</span>
                  <br />
                  <Typewriter words={["UI Design", "Mockups", "Prototypes", "Interfaces"]} />
                </h1>

                <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-xl mb-8">
                  Describe any app in plain English — get <span className="text-text-primary font-medium">production-ready</span> mobile &amp; web mockups in seconds. Iterate with chat. Export to code.
                </p>

                {/* CTA row */}
                <div className="flex flex-wrap gap-4 mb-10">
                  <a
                    href="/cursor-for-ui/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-black font-bold rounded-xl hover:shadow-[0_0_50px_rgba(0,255,255,0.55)] transition-all duration-300"
                  >
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    </svg>
                    Launch App
                  </a>

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
                    Free to start
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    No credit card required
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Export-ready
                  </span>
                </div>
              </div>
            </RevealOnScroll>

            {/* Right — product screenshot */}
            <RevealOnScroll>
              <div className="relative w-full max-w-2xl mx-auto">
                {/* Glow effect behind image */}
                <div className="absolute -inset-4 bg-gradient-to-r from-accent-primary/20 via-purple-500/10 to-accent-primary/20 rounded-3xl blur-2xl opacity-60" />
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
                      <div className="bg-white/5 rounded-md px-3 py-1 text-[11px] text-zinc-500 text-center font-mono">cursor-for-ui.veloxstudio.com</div>
                    </div>
                  </div>
                  <img 
                    src="/Showcase/cursor_for_ui_preview.png" 
                    alt="Cursor for UI — AI-powered interface designer" 
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
              <div className="text-3xl sm:text-4xl font-extrabold text-accent-primary">{s1.count}x</div>
              <div className="text-xs sm:text-sm text-text-secondary mt-1">Faster Than Manual Design</div>
            </div>
            <div ref={s2.ref}>
              <div className="text-3xl sm:text-4xl font-extrabold text-accent-primary">{s2.count}+</div>
              <div className="text-xs sm:text-sm text-text-secondary mt-1">Template Combinations</div>
            </div>
            <div ref={s3.ref}>
              <div className="text-3xl sm:text-4xl font-extrabold text-accent-primary">{s3.count}%</div>
              <div className="text-xs sm:text-sm text-text-secondary mt-1">Design Consistency Score</div>
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
                Everything you need to ship UI <span className="text-accent-primary">10x faster</span>
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed">
                From prompt to pixel-perfect mockup — no Figma, no hand-coding, no generic templates.
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
                  Three steps to a <span className="text-accent-primary">stunning UI</span>
                </h2>
                <div className="space-y-8 relative">
                  {/* Connecting line */}
                  <div className="absolute left-[23px] top-14 bottom-4 w-px bg-gradient-to-b from-accent-primary/40 via-accent-primary/20 to-transparent" />
                  <WorkflowStep step={1} title="Describe your vision" desc="Choose an app type & style preset, or simply type a prompt describing the UI you need." />
                  <WorkflowStep step={2} title="Generate & refine" desc="The AI builds full-fidelity screens. Chat to tweak colours, layout, content — anything." />
                  <WorkflowStep step={3} title="Export & ship" desc="Download individual screens or your whole project as PNG, SVG, or a structured ZIP bundle." />
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              {/* Code-like prompt demo */}
              <div className="rounded-2xl border border-border-custom bg-surface overflow-hidden shadow-xl shadow-accent-primary/5">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-surface-elevated border-b border-border-custom">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-xs text-text-muted ml-2 font-mono">prompt.ai</span>
                </div>
                {/* Body */}
                <div className="p-5 space-y-4 font-mono text-sm">
                  <div>
                    <span className="text-accent-primary">$</span>
                    <span className="text-text-secondary ml-2">generate</span>
                    <span className="text-text-muted ml-1">--type</span>
                    <span className="text-green-400 ml-1">&quot;fitness-app&quot;</span>
                  </div>
                  <div>
                    <span className="text-accent-primary">$</span>
                    <span className="text-text-secondary ml-2">style</span>
                    <span className="text-text-muted ml-1">--preset</span>
                    <span className="text-green-400 ml-1">&quot;minimal-elegant&quot;</span>
                    <span className="text-text-muted ml-1">--color</span>
                    <span className="text-green-400 ml-1">&quot;emerald&quot;</span>
                  </div>
                  <div className="border-t border-border-custom pt-4 text-text-muted">
                    <span className="text-accent-primary">✓</span> Generating 5 screens…
                    <br />
                    <span className="text-accent-primary">✓</span> Applied design-system tokens
                    <br />
                    <span className="text-accent-primary">✓</span> Anti-AI-slop filter passed
                    <br />
                    <span className="text-green-400 font-semibold">✓ Ready — open preview</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ── USE CASES ──────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 relative">
        <FloatingOrbs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 text-xs font-semibold text-accent-primary bg-accent-primary/10 border border-accent-primary/25 rounded-full mb-4 uppercase tracking-wider">
                Use Cases
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                Built for every <span className="text-accent-primary">creator</span>
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    />
                  </svg>
                ),
                title: "Startup Founders",
                desc: "Validate product ideas with realistic mockups before writing a line of code.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 6.75 2.25 2.25m0 0 2.25-2.25M12 9v6m9 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "UI/UX Designers",
                desc: "Rapidly prototype screens and iterate through designs with AI assistance.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 21 12l-3.75 5.25" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 17.25 3 12l3.75-5.25" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 4.5 9.75 19.5" />
                  </svg>
                ),
                title: "Developers",
                desc: "Skip the design phase — jump straight to implementation with clear visual specs.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 4h6M7.5 4.5h9A1.5 1.5 0 0118 6v14.25A1.5 1.5 0 0116.5 21h-9A1.5 1.5 0 016 19.5V6A1.5 1.5 0 017.5 4.5z"
                    />
                  </svg>
                ),
                title: "Product Managers",
                desc: "Communicate feature requirements visually instead of lengthy PRDs.",
              },
            ].map((uc, i) => (
              <RevealOnScroll key={i}>
                <div className="group h-full bg-gradient-to-br from-surface to-surface-elevated border border-border-custom rounded-2xl p-6 hover:border-accent-primary/40 transition-all duration-500 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-primary/10 border border-accent-primary/25 text-accent-primary mb-4 group-hover:scale-105 transition-transform">
                    {uc.icon}
                  </div>
                  <h3 className="text-base font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">{uc.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{uc.desc}</p>
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
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent-primary/[0.08] rounded-full blur-[100px]" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/[0.06] rounded-full blur-[100px]" />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-primary/10 border border-accent-primary/25 mb-8">
                  <svg className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                  Ready to design at the speed of thought?
                </h2>
                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed">
                  Stop pushing pixels. Start shipping interfaces. Try Cursor for UI free — no sign-up walls, no rate limits on free tier.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="/cursor-for-ui/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 px-10 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-black font-bold rounded-xl hover:shadow-[0_0_60px_rgba(0,255,255,0.55)] transition-all duration-300 text-lg"
                  >
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    </svg>
                    Launch App
                  </a>
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
