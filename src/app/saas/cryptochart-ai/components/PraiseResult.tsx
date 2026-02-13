import React, { useState } from 'react';
import { PraiseAnalysisResult } from '../types';
import Button from './Button';
import { DISCLAIMER_TEXT } from '../constants';

interface Props {
  data: PraiseAnalysisResult;
  onReset: () => void;
}

const PraiseResult: React.FC<Props> = ({ data, onReset }) => {
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

  return (
    <div className="space-y-8 animate-slide-up max-w-6xl mx-auto pb-12">
      <div className="flex justify-between items-center px-4">
        <div>
           <h2 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
             Signal Confirmed <span className="text-3xl">🚀</span>
           </h2>
           <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Win verification complete.</p>
        </div>
        <Button variant="outline" onClick={onReset} className="text-xs">
           Analyze Next
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Side: Visual Stats Badge */}
        <div className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-teal-500 rounded-3xl blur-lg opacity-40 group-hover:opacity-60 transition duration-1000 animate-pulse"></div>
             <div className="relative glass-panel rounded-3xl p-10 h-full flex flex-col justify-center items-center text-center border border-emerald-500/20">
                
                <span className="px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] border border-emerald-200 dark:border-emerald-500/30 mb-8 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    {data.ticker} Verified
                </span>

                <div className="mb-4 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-[0.2em] font-bold">Realized Gain</div>
                <div className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 dark:from-emerald-300 dark:via-teal-200 dark:to-cyan-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.4)]">
                    {data.totalProfitPercentage}
                </div>
                
                <div className="mt-12 w-full max-w-sm">
                    <div className="flex justify-between text-[10px] text-slate-500 mb-3 font-bold tracking-wider">
                        <span>ENTRY</span>
                        <span>TARGET {data.numberOfTargetsHit}</span>
                    </div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-300 dark:border-white/5 relative shadow-inner">
                         <div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                            style={{ width: `${(data.numberOfTargetsHit / 4) * 100}%`, boxShadow: '0 0 10px rgba(34,211,238,0.5)' }}
                         ></div>
                         {/* Dividers */}
                         <div className="absolute top-0 left-1/4 h-full w-px bg-white dark:bg-slate-900"></div>
                         <div className="absolute top-0 left-2/4 h-full w-px bg-white dark:bg-slate-900"></div>
                         <div className="absolute top-0 left-3/4 h-full w-px bg-white dark:bg-slate-900"></div>
                    </div>
                    <div className="mt-4 text-sm text-emerald-700 dark:text-emerald-200 font-medium bg-emerald-50 dark:bg-emerald-500/5 py-2 rounded-lg border border-emerald-200 dark:border-emerald-500/10">
                        {data.gainDescription}
                    </div>
                </div>
            </div>
        </div>

        {/* Right Side: Social Draft */}
        <div className="flex flex-col">
            <div className="glass-panel rounded-3xl p-1 flex-grow flex flex-col bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-black">
                <div className="p-5 border-b border-slate-200 dark:border-white/5 flex justify-between items-center bg-slate-200/50 dark:bg-white/5 rounded-t-[20px]">
                    <h3 className="text-xs font-bold text-cyan-600 dark:text-cyan-300 uppercase tracking-widest">Generated Tweet</h3>
                    <Button onClick={handleCopy} className="text-xs py-1.5 px-4 h-auto uppercase tracking-wider">
                        {copied ? 'Copied! ✅' : 'Copy'}
                    </Button>
                </div>
                <div className="p-8 flex-grow">
                    <textarea 
                        value={data.socialPost}
                        readOnly
                        className="w-full h-full min-h-[400px] bg-transparent border-none resize-none focus:ring-0 text-slate-700 dark:text-slate-300 font-mono text-base leading-relaxed"
                    />
                </div>
            </div>
            <div className="text-center text-xs text-slate-500 dark:text-slate-600 mt-6 uppercase tracking-widest">
                {DISCLAIMER_TEXT}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PraiseResult;