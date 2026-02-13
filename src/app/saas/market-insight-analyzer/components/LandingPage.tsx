import React from 'react';
import IdeaInput from './IdeaInput';
import { ProductIdea } from '../types';
import { 
  Target, Users, DollarSign, Zap, BarChart3, Globe, 
  ShieldCheck, ArrowRight, CheckCircle2, TrendingUp, Layers
} from 'lucide-react';

interface LandingPageProps {
  onStartAnalysis: (idea: ProductIdea) => void;
  isLoading: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartAnalysis, isLoading }) => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          
          {/* Left Column: Copy */}
          <div className="text-center lg:text-left animate-fade-in-up">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wide uppercase mb-6">
                <Zap className="w-3 h-3 fill-current" />
                Powered by Gemini 2.0 Flash
             </div>
             
             <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
                Turn your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">idea</span> into an <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">empire.</span>
             </h1>
             
             <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Stop guessing. Get instant, AI-driven market validation, competitor intelligence, and pricing strategies for your next big product.
             </p>
             
             <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-slate-300 font-medium mb-10">
                <div className="flex items-center gap-2">
                   <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                   <span>Real-time Market Data</span>
                </div>
                <div className="flex items-center gap-2">
                   <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                   <span>Competitor Revenue Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                   <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                   <span>User Sentiment Scraper</span>
                </div>
             </div>
          </div>

          {/* Right Column: CTA Card */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
             {/* Decorative Background for Card */}
             <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 rounded-[2.5rem] blur-2xl opacity-70"></div>
             
             <div className="relative">
                <IdeaInput onSubmit={onStartAnalysis} isLoading={isLoading} variant="compact" />
                
                {/* Floaties */}
                <div className="absolute -top-6 -right-6 bg-[#0f172a] border border-white/10 p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce hidden md:flex" style={{ animationDuration: '3s' }}>
                   <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                   </div>
                   <div>
                      <p className="text-xs text-slate-400">Growth Potential</p>
                      <p className="text-sm font-bold text-white">+127% YoY</p>
                   </div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-[#0f172a] border border-white/10 p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce hidden md:flex" style={{ animationDuration: '4s' }}>
                   <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-400" />
                   </div>
                   <div>
                      <p className="text-xs text-slate-400">Target Audience</p>
                      <p className="text-sm font-bold text-white">2.4M Users</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats Strip */}
      <section className="border-y border-white/5 bg-[#020617]/50 backdrop-blur-sm">
         <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
               { label: 'Data Sources', value: '100M+' },
               { label: 'Reports Generated', value: '50k+' },
               { label: 'Time Saved', value: '1000h+' },
               { label: 'Accuracy', value: '98%' },
            ].map((stat, i) => (
               <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{stat.label}</div>
               </div>
            ))}
         </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 relative">
         <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Deep intelligence. <br/><span className="text-slate-500">Zero effort.</span></h2>
               <p className="text-slate-400 text-lg">We combine search grounding with advanced reasoning models to produce reports that usually cost thousands of dollars.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {[
                  {
                     icon: <Globe className="w-6 h-6 text-blue-400" />,
                     title: "Market Size & Trends",
                     desc: "Get precise TAM calculations and identify emerging trends before your competitors do."
                  },
                  {
                     icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
                     title: "Competitor Recon",
                     desc: "Uncover hidden weaknesses and revenue drivers of top players in your space."
                  },
                  {
                     icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
                     title: "Strategic Pricing",
                     desc: "Stop guessing. Get data-backed pricing tiers that maximize conversion and LTV."
                  },
                  {
                     icon: <Layers className="w-6 h-6 text-purple-400" />,
                     title: "Feature Matrix",
                     desc: "A comprehensive gap analysis showing exactly what features you need to build to win."
                  },
                  {
                     icon: <Users className="w-6 h-6 text-pink-400" />,
                     title: "User Sentiment",
                     desc: "We scrape reviews to tell you exactly what users hate about current solutions."
                  },
                  {
                     icon: <Target className="w-6 h-6 text-orange-400" />,
                     title: "Go-To-Market",
                     desc: "Actionable strategies to penetrate the market and acquire your first 1,000 users."
                  }
               ].map((feature, i) => (
                  <div key={i} className="bg-[#0f172a]/40 border border-white/5 p-8 rounded-3xl hover:bg-[#0f172a]/60 transition-colors group">
                     <div className="w-12 h-12 rounded-2xl bg-[#020617] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        {feature.icon}
                     </div>
                     <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                     <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#020617]">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm">M</div>
               <span className="font-bold text-slate-200">Market Insight Analyzer</span>
            </div>
            <p className="text-slate-500 text-sm">
               © 2024 Market Insight Analyzer. Powered by Google Gemini.
            </p>
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;