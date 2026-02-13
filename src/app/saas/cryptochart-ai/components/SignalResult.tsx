import React, { useState } from 'react';
import { SignalAnalysisResult } from '../types';
import Button from './Button';
import { DISCLAIMER_TEXT } from '../constants';

interface Props {
  data: SignalAnalysisResult;
  onReset: () => void;
}

const SignalResult: React.FC<Props> = ({ data, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.formattedPost);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const isPnLPositive = data.stats.netPnL && !data.stats.netPnL.includes('-');

  return (
    <div className="space-y-8 animate-slide-up pb-12">
      <div className="flex justify-between items-center px-4">
        <div>
           <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Strategy Signal</h2>
           <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Extracted metrics from image</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" onClick={onReset} className="text-xs">
              New Signal
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Stats Visualizer */}
        <div className="space-y-6">
             {/* Main Card */}
            <div className="glass-panel rounded-3xl p-8 relative overflow-hidden group border-t-4 border-t-fuchsia-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 dark:bg-fuchsia-500/20 rounded-full blur-[50px] -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50"></div>
                
                <h3 className="text-[10px] uppercase text-fuchsia-600 dark:text-fuchsia-300 font-bold mb-6 tracking-widest">System Performance</h3>
                
                <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                    <div>
                        <div className="text-[10px] text-slate-500 mb-1 font-bold uppercase tracking-wider">Win Rate</div>
                        <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{data.stats.winRate}</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-500 mb-1 font-bold uppercase tracking-wider">Confidence</div>
                        <div className="text-3xl font-black text-cyan-600 dark:text-cyan-400">{data.stats.confidenceScore}</div>
                    </div>
                    {isPnLPositive && (
                        <div>
                            <div className="text-[10px] text-slate-500 mb-1 font-bold uppercase tracking-wider">Net PnL</div>
                            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{data.stats.netPnL}</div>
                        </div>
                    )}
                    <div>
                        <div className="text-[10px] text-slate-500 mb-1 font-bold uppercase tracking-wider">W/L Ratio</div>
                        <div className="text-3xl font-black text-slate-800 dark:text-white">{data.stats.winLossRatio}</div>
                    </div>
                </div>
            </div>
            
            {/* Trade Plan */}
            <div className="glass-panel rounded-3xl p-8">
                <h3 className="text-[10px] uppercase text-slate-500 dark:text-slate-400 font-bold mb-6 tracking-widest">Execution Plan</h3>
                 <div className="space-y-4 font-mono text-sm">
                    <div className="flex justify-between p-3 bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-white/5">
                        <span className="text-slate-500 dark:text-slate-400">Entry</span>
                        <span className="text-slate-800 dark:text-white font-bold">{data.entry}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-xl">
                        <span className="text-rose-600 dark:text-rose-400">Stop Loss</span>
                        <span className="text-rose-500 dark:text-rose-300 font-bold">{data.stopLoss}</span>
                    </div>
                    <div className="space-y-2 pt-2">
                        {data.targets.map((tp, idx) => (
                             <div key={idx} className="flex justify-between p-2 px-3 border-b border-slate-100 dark:border-white/5 last:border-0">
                                <span className="text-slate-500 text-xs font-bold">TP{idx+1}</span>
                                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{tp}</span>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>
        </div>

        {/* Right Col: Code/Social Preview */}
        <div className="lg:col-span-2">
             <div className="glass-panel rounded-3xl p-1 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-black h-full flex flex-col">
                <div className="bg-slate-200/50 dark:bg-white/5 rounded-t-[20px] p-4 border-b border-slate-200 dark:border-white/5 flex justify-between items-center">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                    </div>
                    <Button variant="ghost" onClick={handleCopy} className="text-xs py-1 h-auto uppercase tracking-wider">
                         {copied ? 'Copied' : 'Copy Output'}
                    </Button>
                </div>
                <div className="p-8 flex-grow font-mono text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap selection:bg-cyan-500/30">
                    {data.formattedPost}
                </div>
             </div>
             <div className="text-center text-xs text-slate-500 dark:text-slate-600 mt-6 uppercase tracking-widest">{DISCLAIMER_TEXT}</div>
        </div>

      </div>
    </div>
  );
};

export default SignalResult;