import React, { useState } from 'react';
import { ProductIdea } from '../types';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';

interface IdeaInputProps {
  onSubmit: (idea: ProductIdea) => void;
  isLoading: boolean;
  variant?: 'default' | 'compact';
}

const IdeaInput: React.FC<IdeaInputProps> = ({ onSubmit, isLoading, variant = 'default' }) => {
  const [idea, setIdea] = useState<ProductIdea>({
    name: '',
    category: 'SaaS'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(idea);
  };

  return (
    <div className={`w-full ${variant === 'default' ? 'max-w-3xl mx-auto p-6 animate-fade-in-up' : ''}`}>
      {variant === 'default' && (
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 mb-6 shadow-2xl shadow-blue-900/20 ring-1 ring-white/10 backdrop-blur-xl">
            <Sparkles className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-400 mb-6 tracking-tight">
            Validate Your Idea
          </h1>
          <p className="text-slate-400 text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Instantly generate comprehensive market research, competitor analysis, and pricing strategies using AI.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className={`bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 shadow-2xl relative overflow-hidden group ${variant === 'compact' ? 'p-6 md:p-8 rounded-3xl' : 'p-8 md:p-10 rounded-[2rem]'}`}>
        
        {/* Subtle hover glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-20 blur-2xl transition duration-1000"></div>

        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Product Name</label>
            <div className="relative">
               <input
                type="text"
                required
                className="w-full bg-[#020617]/50 border border-white/10 rounded-xl px-4 py-3.5 text-lg text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all shadow-inner"
                placeholder="e.g. FitTrack Pro"
                value={idea.name}
                onChange={(e) => setIdea({ ...idea, name: e.target.value })}
              />
              <Lightbulb className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
            <div className="relative">
               <select
                className="w-full bg-[#020617]/50 border border-white/10 rounded-xl px-4 py-3.5 text-lg text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all shadow-inner appearance-none cursor-pointer"
                value={idea.category}
                onChange={(e) => setIdea({ ...idea, category: e.target.value })}
              >
                <option value="SaaS">SaaS / Web Application</option>
                <option value="Mobile App">Mobile Application</option>
                <option value="E-commerce">Physical Product / E-commerce</option>
                <option value="Service">Professional Service</option>
                <option value="Content">Media / Content Platform</option>
                <option value="Marketplace">Two-sided Marketplace</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0 group-hover:shadow-blue-600/30"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Validating...
              </span>
            ) : (
              <>
                Generate Report <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
      
      {variant === 'default' && (
        <div className="mt-8 flex justify-center gap-8 text-slate-500 text-sm">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <span>Deep Market Data</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              <span>Competitor Intel</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span>Pricing Strategy</span>
           </div>
        </div>
      )}
    </div>
  );
};

export default IdeaInput;