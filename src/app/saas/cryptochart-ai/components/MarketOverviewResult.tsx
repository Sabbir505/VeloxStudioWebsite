import React, { useState } from 'react';
import { MarketOverviewResult } from '../types';
import Button from './Button';
import { DISCLAIMER_TEXT } from '../constants';

interface Props {
  data: MarketOverviewResult;
  onReset: () => void;
}

const MarketOverviewResult: React.FC<Props> = ({ data, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.socialPost);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getSentimentStyle = (sentiment: string) => {
      switch(sentiment) {
          case 'Bullish': return 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-100 dark:bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]';
          case 'Bearish': return 'text-rose-600 dark:text-rose-400 border-rose-500/30 bg-rose-100 dark:bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.1)]';
          default: return 'text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-100 dark:bg-amber-500/10';
      }
  };

  const topPerformers = data.topPerformers || [];
  const laggards = data.laggards || [];

  return (
    <div className="space-y-6 animate-slide-up pb-12">
      {/* Header */}
      <div className="glass-panel rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-t-white/10">
        <div>
           <h2 className="text-4xl font-bold text-slate-800 dark:text-white tracking-tight mb-4">Market Overview</h2>
           <div className="flex flex-wrap gap-3">
               <span className={`px-5 py-2 rounded-full text-sm font-bold border flex items-center gap-2 uppercase tracking-wider ${getSentimentStyle(data.sentiment)}`}>
                   {data.sentiment === 'Bullish' && '🚀'}
                   {data.sentiment === 'Bearish' && '🩸'}
                   {data.sentiment === 'Mixed' && '⚖️'}
                   {data.sentiment}
               </span>
               <span className="px-5 py-2 rounded-full text-sm font-bold border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-indigo-600 dark:text-indigo-300">
                   {data.marketMood}
               </span>
           </div>
        </div>
        <div className="flex gap-4">
            <Button variant="outline" onClick={onReset}>New Analysis</Button>
            <Button onClick={handleCopy}>{copied ? 'Copied!' : 'Copy Update'}</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-6">
              
              {/* Money Flow Summary */}
              <div className="glass-panel rounded-3xl p-8 border-l-4 border-l-cyan-500">
                  <h3 className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-4">Money Flow Analysis</h3>
                  <p className="text-xl font-light text-slate-700 dark:text-white leading-relaxed">{data.summary}</p>
              </div>

              {/* Movers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Top Performers */}
                  <div className="glass-panel rounded-3xl p-6">
                      <h3 className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          Top Strength
                      </h3>
                      <div className="space-y-3">
                          {topPerformers.length > 0 ? topPerformers.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/10 transition-colors">
                                  <span className="font-bold text-slate-700 dark:text-slate-200 font-mono">{item.ticker}</span>
                                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{item.change}</span>
                              </div>
                          )) : (
                              <span className="text-slate-500 text-sm italic">No significant gainers found.</span>
                          )}
                      </div>
                  </div>

                  {/* Laggards */}
                  <div className="glass-panel rounded-3xl p-6">
                      <h3 className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                          Weakness
                      </h3>
                      <div className="space-y-3">
                          {laggards.length > 0 ? laggards.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-rose-50 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/10 transition-colors">
                                  <span className="font-bold text-slate-700 dark:text-slate-200 font-mono">{item.ticker}</span>
                                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{item.change}</span>
                              </div>
                          )) : (
                              <span className="text-slate-500 text-sm italic">No significant losers found.</span>
                          )}
                      </div>
                  </div>
              </div>
          </div>

          {/* Sidebar / Social Draft */}
          <div className="glass-panel rounded-3xl p-1 bg-gradient-to-br from-slate-100 to-white dark:from-slate-900/80 dark:to-black/80 h-full flex flex-col">
                <div className="bg-slate-200/50 dark:bg-white/5 rounded-t-[20px] p-4 border-b border-slate-200 dark:border-white/5 flex justify-between items-center">
                    <h3 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Social Update</h3>
                    <Button variant="ghost" onClick={handleCopy} className="text-xs py-1 h-auto uppercase tracking-wider">
                         {copied ? 'Copied' : 'Copy'}
                    </Button>
                </div>
                <textarea 
                    value={data.socialPost}
                    readOnly
                    className="w-full flex-grow min-h-[400px] bg-transparent border-none p-6 font-mono text-sm text-slate-700 dark:text-slate-300 resize-none focus:ring-0 leading-relaxed"
                />
          </div>

      </div>
      <p className="text-center text-xs text-slate-500 dark:text-slate-600 mt-4 uppercase tracking-widest">{DISCLAIMER_TEXT}</p>
    </div>
  );
};

export default MarketOverviewResult;