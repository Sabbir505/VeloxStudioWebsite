import React, { useState, useEffect } from 'react';
import type { AnalysisResult as ResultType } from '../types';
import { Trend } from '../types';
import Button from './Button';
import { DISCLAIMER_TEXT } from '../constants';

interface Props {
  data: ResultType;
  onReset: () => void;
}

const AnalysisResult: React.FC<Props> = ({ data, onReset }) => {
  const [copied, setCopied] = useState(false);
  const [socialText, setSocialText] = useState('');

  useEffect(() => {
    const ticker = data.coinName.split('/')[0].toUpperCase();
    const trendEmoji = data.trend === Trend.BULLISH ? '🟢' : data.trend === Trend.BEARISH ? '🔴' : '🦀';
    const text = `
💎 $${ticker} Analysis [${data.timeframe}] ${trendEmoji}

${data.assessment}

🔑 Key Levels:
🧱 Resistance: ${data.keyLevels.resistance.slice(0, 2).join(', ')}
🍏 Support: ${data.keyLevels.support.slice(0, 2).join(', ')}

#Crypto #Trading $${ticker}
${DISCLAIMER_TEXT}
    `.trim();
    setSocialText(text);
  }, [data]);

  const getTrendStyles = (trend: Trend) => {
    switch (trend) {
      case Trend.BULLISH: return 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]';
      case Trend.BEARISH: return 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-500/10 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.15)]';
      default: return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10 border-amber-500/30';
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 50) return 'text-amber-600 dark:text-amber-400';
    return 'text-rose-600 dark:text-rose-400';
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(socialText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="space-y-8 animate-slide-up pb-12">
      {/* Header Section */}
      <div className="glass-panel rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-3">
             <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight font-mono">{data.coinName}</h2>
             <span className="text-xs font-bold text-cyan-600 dark:text-cyan-300 px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg border border-cyan-500/30 uppercase tracking-wider">
               {data.timeframe}
             </span>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-5 py-2 rounded-full text-sm font-bold border ${getTrendStyles(data.trend)} flex items-center gap-2 uppercase tracking-wide`}>
              {data.trend === Trend.BULLISH && '🚀'}
              {data.trend === Trend.BEARISH && '📉'}
              {data.trend === Trend.NEUTRAL && '⚖️'}
              {data.trend}
            </span>
            <div className="h-8 w-px bg-slate-200 dark:bg-white/10 mx-2"></div>
            <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">
              AI Confidence: <span className={`font-bold text-lg ${getConfidenceColor(data.confidence)}`}>{data.confidence}%</span>
            </span>
          </div>
        </div>
        <div className="flex gap-4 w-full md:w-auto relative z-10">
          <Button variant="outline" onClick={onReset} className="flex-1 md:flex-none">
            New Scan
          </Button>
          <Button onClick={handleCopy} className="flex-1 md:flex-none">
            {copied ? 'Copied! ✅' : 'Copy Setup'}
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Technicals */}
        <div className="glass-panel rounded-3xl p-8 border-t-4 border-t-indigo-500">
          <h3 className="text-sm font-bold text-indigo-500 dark:text-indigo-300 uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
            Patterns & Levels
          </h3>
          
          <div className="mb-8">
            <h4 className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">Detected Structure</h4>
            <div className="flex flex-wrap gap-2">
                {data.patterns.length > 0 ? (
                data.patterns.map((pattern, idx) => (
                    <span key={idx} className="text-xs bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-medium">
                    {pattern}
                    </span>
                ))
                ) : (
                <span className="text-sm text-slate-500 italic">No clear patterns detected</span>
                )}
            </div>
          </div>

          <div className="space-y-6">
             <div>
               <div className="flex justify-between items-center mb-2">
                 <span className="text-[10px] font-bold text-rose-500 dark:text-rose-400 uppercase tracking-widest">Resistance</span>
               </div>
               <div className="font-mono text-sm text-rose-600 dark:text-rose-100 bg-rose-100 dark:bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                 {data.keyLevels.resistance.map((lvl, i) => (
                   <div key={i} className="py-0.5">{lvl}</div>
                 ))}
               </div>
             </div>

             <div>
               <div className="flex justify-between items-center mb-2">
                 <span className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-widest">Support</span>
               </div>
               <div className="font-mono text-sm text-emerald-600 dark:text-emerald-100 bg-emerald-100 dark:bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                 {data.keyLevels.support.map((lvl, i) => (
                   <div key={i} className="py-0.5">{lvl}</div>
                 ))}
               </div>
             </div>
          </div>
        </div>

        {/* Assessment (Narrative) */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-8 flex flex-col">
            <h3 className="text-sm font-bold text-cyan-600 dark:text-cyan-300 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></span>
                AI Narrative
            </h3>
            <p className="text-slate-700 dark:text-slate-200 text-lg leading-relaxed font-light mb-8">
              {data.assessment}
            </p>
            
            <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/5">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Social Draft</h3>
                    <button onClick={handleCopy} className="text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors uppercase font-bold tracking-wider">
                        {copied ? 'Copied' : 'Copy Text'}
                    </button>
                </div>
                <div className="bg-slate-50 dark:bg-[#05050a] rounded-xl p-4 border border-slate-200 dark:border-white/10 shadow-inner">
                    <textarea 
                        value={socialText}
                        onChange={(e) => setSocialText(e.target.value)}
                        className="w-full h-80 bg-transparent border-none focus:ring-0 p-0 font-mono text-sm text-slate-600 dark:text-slate-400 resize-none leading-relaxed"
                    />
                </div>
            </div>
        </div>
      </div>
      
      <p className="text-center text-xs text-slate-500 dark:text-slate-600 mt-4 uppercase tracking-widest">{DISCLAIMER_TEXT}</p>
    </div>
  );
};

export default AnalysisResult;