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
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-amber-500/[0.07] blur-[160px] animate-float" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-orange-500/[0.06] blur-[140px] animate-float-delayed" />
      <div className="absolute -bottom-40 left-1/3 w-[550px] h-[550px] rounded-full bg-amber-500/[0.05] blur-[180px] animate-float" />
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

// ─── MAIN PAGE ───────────────────────────────────────────────────────
export default function CryptoChartAIPage() {
  const s1 = useCounter(5, 1800);
  const s2 = useCounter(30, 2000);
  const s3 = useCounter(98, 2200);

  const features: FeatureProps[] = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
        </svg>
      ),
      title: "Screenshot-Based Analysis",
      description:
        "Simply upload a screenshot of any crypto chart — the AI identifies patterns, support/resistance levels, and key price action instantly.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      ),
      title: "AI Pattern Recognition",
      description:
        "Powered by Gemini, the AI detects chart patterns like flags, wedges, SFPs, and liquidity sweeps with Smart Money precision.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      title: "Market Heatmap Overview",
      description:
        "Upload a market heatmap screenshot (e.g., Coin360) and get instant sentiment analysis, top performers, and laggard breakdowns.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
        </svg>
      ),
      title: "Social-Ready Reports",
      description:
        "Get professionally written social media posts with your analysis — ready to copy-paste to Twitter/X with hashtags and formatting.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
        </svg>
      ),
      title: "Signal Analysis",
      description:
        "Upload trading signal screenshots from groups or channels and get an unbiased AI breakdown of setup quality and risk.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ),
      title: "Dark & Light Mode",
      description:
        "Full theme support with a polished dark mode for comfortable late-night chart analysis sessions.",
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
                    AI-Powered Trading Analysis
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] mb-6 tracking-tight">
                  <span className="text-text-primary">CryptoChart</span>
                  <br />
                  <span className="text-accent-primary">AI</span>
                </h1>

                <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-xl mb-8">
                  Upload any crypto chart screenshot — get <span className="text-text-primary font-medium">instant AI-powered technical analysis</span>, pattern recognition, support/resistance levels, and social-media ready reports.
                </p>

                {/* CTA row */}
                <div className="flex flex-wrap gap-4 mb-10">
                  <Link
                    href="/cryptochart-ai/index.html"
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
                    Upload & analyze in seconds
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Social-ready reports
                  </span>
                </div>
              </div>
            </RevealOnScroll>

            {/* Right — product screenshot */}
            <RevealOnScroll>
              <div className="relative w-full max-w-2xl mx-auto">
                {/* Glow effect behind image */}
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-amber-500/20 rounded-3xl blur-2xl opacity-60" />
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
                      <div className="bg-white/5 rounded-md px-3 py-1 text-[11px] text-zinc-500 text-center font-mono">cryptochart-ai.veloxstudio.com</div>
                    </div>
                  </div>
                  <img
                    src="/Showcase/CryptoChart_AI.png"
                    alt="CryptoChart AI — AI-powered crypto chart analysis"
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
              <div className="text-3xl sm:text-4xl font-extrabold text-accent-primary">{s1.count}s</div>
              <div className="text-xs sm:text-sm text-text-secondary mt-1">Average Analysis Time</div>
            </div>
            <div ref={s2.ref}>
              <div className="text-3xl sm:text-4xl font-extrabold text-accent-primary">{s2.count}+</div>
              <div className="text-xs sm:text-sm text-text-secondary mt-1">Chart Patterns Detected</div>
            </div>
            <div ref={s3.ref}>
              <div className="text-3xl sm:text-4xl font-extrabold text-accent-primary">{s3.count}%</div>
              <div className="text-xs sm:text-sm text-text-secondary mt-1">Pattern Accuracy Score</div>
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
                Your AI trading analyst — <span className="text-accent-primary">always on</span>
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed">
                From chart screenshot to professional analysis in seconds. No manual drawing, no guesswork.
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
                  Three steps to <span className="text-accent-primary">instant analysis</span>
                </h2>
                <div className="space-y-8 relative">
                  {/* Connecting line */}
                  <div className="absolute left-[23px] top-14 bottom-4 w-px bg-gradient-to-b from-accent-primary/40 via-accent-primary/20 to-transparent" />
                  <WorkflowStep step={1} title="Upload your chart" desc="Take a screenshot of any crypto chart from TradingView, Binance, or any platform — and drop it in." />
                  <WorkflowStep step={2} title="AI analyzes everything" desc="Gemini AI identifies the asset, timeframe, market structure, patterns, and key levels in seconds." />
                  <WorkflowStep step={3} title="Get your report" desc="Receive a professional technical analysis with a confidence score and a copy-paste social media post." />
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              {/* Analysis output demo */}
              <div className="rounded-2xl border border-border-custom bg-surface overflow-hidden shadow-xl shadow-accent-primary/5">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-surface-elevated border-b border-border-custom">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-xs text-text-muted ml-2 font-mono">analysis.ai</span>
                </div>
                {/* Body */}
                <div className="p-5 space-y-4 font-mono text-sm">
                  <div>
                    <span className="text-accent-primary">$</span>
                    <span className="text-text-secondary ml-2">analyze</span>
                    <span className="text-text-muted ml-1">--chart</span>
                    <span className="text-green-400 ml-1">&quot;BTC_4H.png&quot;</span>
                  </div>
                  <div>
                    <span className="text-accent-primary">$</span>
                    <span className="text-text-secondary ml-2">mode</span>
                    <span className="text-text-muted ml-1">--type</span>
                    <span className="text-green-400 ml-1">&quot;technical-analysis&quot;</span>
                  </div>
                  <div className="border-t border-border-custom pt-4 text-text-muted">
                    <span className="text-accent-primary">✓</span> Asset detected: BTC/USDT
                    <br />
                    <span className="text-accent-primary">✓</span> Timeframe: 4H
                    <br />
                    <span className="text-accent-primary">✓</span> Pattern: Ascending channel
                    <br />
                    <span className="text-accent-primary">✓</span> Support: $94,200 | Resistance: $98,500
                    <br />
                    <span className="text-accent-primary">✓</span> Confidence: 87/100
                    <br />
                    <span className="text-green-400 font-semibold">✓ Social post generated — copy to clipboard</span>
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
                Built for every <span className="text-accent-primary">trader</span>
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { emoji: "📈", title: "Day Traders", desc: "Get instant technical analysis on any chart before entering a position. Save hours of manual charting." },
              { emoji: "🐦", title: "Crypto Influencers", desc: "Generate professional social media posts with chart analysis — grow your audience with consistent quality." },
              { emoji: "📊", title: "Swing Traders", desc: "Identify key levels, market structure, and multi-timeframe confluence for better trade entries." },
              { emoji: "🔍", title: "Signal Reviewers", desc: "Validate trading signals from groups and channels — get unbiased AI assessment of any setup." },
            ].map((uc, i) => (
              <RevealOnScroll key={i}>
                <div className="group h-full bg-gradient-to-br from-surface to-surface-elevated border border-border-custom rounded-2xl p-6 hover:border-accent-primary/40 transition-all duration-500 text-center">
                  <div className="text-4xl mb-4">{uc.emoji}</div>
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
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-500/[0.08] rounded-full blur-[100px]" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-500/[0.06] rounded-full blur-[100px]" />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-primary/10 border border-accent-primary/25 mb-8">
                  <svg className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                  Ready to analyze smarter?
                </h2>
                <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed">
                  Stop staring at charts for hours. Let AI do the heavy lifting — upload a screenshot and get professional-grade analysis instantly.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/cryptochart-ai/index.html"
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
