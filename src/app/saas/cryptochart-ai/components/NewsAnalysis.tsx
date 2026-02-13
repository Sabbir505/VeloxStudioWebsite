import React, { useState, useEffect } from 'react';
import Button from './Button';
import { analyzeNewsTopic, fetchMarketPulse, generateBinancePost } from '../services/geminiService';
import { NewsAnalysisResult, MarketPulseResult } from '../types';
import { DISCLAIMER_TEXT } from '../constants';

const NewsAnalysis: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [isAnalyzingTopic, setIsAnalyzingTopic] = useState(false);
  const [topicResult, setTopicResult] = useState<NewsAnalysisResult | null>(null);
  const [topicCopied, setTopicCopied] = useState(false);

  const [pulseData, setPulseData] = useState<MarketPulseResult | null>(null);
  const [sources, setSources] = useState<{title: string, uri: string}[]>([]);
  const [isLoadingPulse, setIsLoadingPulse] = useState(true);
  const [pulseError, setPulseError] = useState<string | null>(null);

  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isGeneratingPost, setIsGeneratingPost] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<string | null>(null);
  const [postCopied, setPostCopied] = useState(false);

  useEffect(() => {
    loadMarketPulse();
  }, []);

  const loadMarketPulse = async () => {
    setIsLoadingPulse(true);
    setPulseError(null);
    try {
      const { data, sources } = await fetchMarketPulse();
      setPulseData(data);
      setSources(sources);
    } catch (err) {
      setPulseError("Failed to load market data.");
    } finally {
      setIsLoadingPulse(false);
    }
  };

  const handleAnalyzeTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setIsAnalyzingTopic(true);
    setTopicResult(null);
    try {
      const data = await analyzeNewsTopic(topic);
      setTopicResult(data);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze topic. Please try again.");
    } finally {
      setIsAnalyzingTopic(false);
    }
  };

  const handleCopyTopic = async () => {
    if (!topicResult) return;
    try {
      await navigator.clipboard.writeText(`${topicResult.socialPost}\n\n#Macro #Crypto\n${DISCLAIMER_TEXT}`);
      setTopicCopied(true);
      setTimeout(() => setTopicCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const openPostGenerator = async (item: any) => {
    setSelectedItem(item);
    setGeneratedPost(null);
    setIsGeneratingPost(true);
    try {
      const post = await generateBinancePost(item);
      setGeneratedPost(post);
    } catch (error) {
      console.error(error);
      setGeneratedPost("Error generating post. Please try again.");
    } finally {
      setIsGeneratingPost(false);
    }
  };

  const handleCopyGeneratedPost = async () => {
    if (!generatedPost) return;
    try {
      await navigator.clipboard.writeText(generatedPost);
      setPostCopied(true);
      setTimeout(() => setPostCopied(false), 2000);
    } catch (err) { console.error(err); }
  };

  const closeModal = () => { setSelectedItem(null); setGeneratedPost(null); };

  return (
    <div className="max-w-7xl mx-auto space-y-16 relative pb-12 animate-slide-up">
      
      {/* 1. Market Pulse Dashboard */}
      <section>
        <div className="flex justify-between items-center mb-8 px-2">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            <span className="text-3xl">🌍</span> Global Market Pulse
          </h2>
          <Button 
            variant="outline" 
            onClick={loadMarketPulse} 
            isLoading={isLoadingPulse} 
            className="text-xs uppercase tracking-wider"
          >
            Live Update
          </Button>
        </div>

        {isLoadingPulse ? (
           <div className="glass-panel rounded-3xl p-20 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent mb-6"></div>
              <p className="text-cyan-600 dark:text-cyan-200 font-medium animate-pulse">Scanning institutional data sources...</p>
           </div>
        ) : pulseError ? (
           <div className="glass-panel border-rose-500/30 bg-rose-100 dark:bg-rose-500/5 p-8 rounded-3xl text-center text-rose-600 dark:text-rose-200">
             {pulseError}
             <div className="mt-4">
               <Button onClick={loadMarketPulse} variant="outline" className="border-rose-500/50 hover:bg-rose-500/10">Try Again</Button>
             </div>
           </div>
        ) : pulseData ? (
           <div className="space-y-10">
              {/* Overview */}
              <div className="glass-panel p-10 rounded-3xl bg-gradient-to-r from-indigo-50 to-slate-100 dark:from-indigo-900/60 dark:to-slate-900/60 border-indigo-200 dark:border-indigo-500/30 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none group-hover:bg-indigo-500/20 dark:group-hover:bg-indigo-500/30 transition-colors duration-1000"></div>
                <h3 className="text-indigo-600 dark:text-indigo-300 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 relative z-10">Market Mood</h3>
                <p className="text-2xl text-slate-800 dark:text-white font-medium leading-relaxed relative z-10 max-w-4xl">
                  {pulseData.marketOverview}
                </p>
              </div>

              {/* News Cards Grid */}
              <div>
                 <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 px-2">
                    📰 Breaking Headlines <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded ml-2 border border-black/5 dark:border-white/5">Click to post</span>
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pulseData.news.map((item, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => openPostGenerator(item)}
                          className="glass-panel rounded-2xl p-6 hover:border-cyan-500/40 hover:bg-white dark:hover:bg-slate-800/80 transition-all cursor-pointer group flex flex-col h-full hover:-translate-y-1 duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                        >
                           <div className="flex justify-between items-start mb-5">
                              <span className={`text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider border ${
                                item.sentiment === 'Bullish' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' :
                                item.sentiment === 'Bearish' ? 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30' :
                                'bg-slate-100 dark:bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-500/30'
                              }`}>
                                {item.sentiment}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono font-bold">{item.timestamp}</span>
                           </div>
                           <h4 className="text-slate-800 dark:text-white font-bold mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-2 text-lg tracking-tight">
                             {item.title}
                           </h4>
                           <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow line-clamp-3 font-light">
                             {item.summary}
                           </p>
                           <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex justify-end">
                              <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 flex items-center gap-1 uppercase tracking-wider">
                                GENERATE POST <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                              </span>
                           </div>
                        </div>
                    ))}
                 </div>
              </div>

              {/* Events Cards Grid */}
              <div>
                 <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 px-2">
                    📅 Calendar (7 Days)
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       {pulseData.upcomingEvents.map((event, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => openPostGenerator(event)}
                            className="glass-panel rounded-2xl p-5 hover:border-fuchsia-500/40 hover:bg-white dark:hover:bg-slate-800/80 transition-all cursor-pointer group flex gap-5 items-center hover:shadow-[0_0_20px_rgba(217,70,239,0.1)]"
                          >
                             <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-3 text-center min-w-[70px] flex flex-col justify-center border border-slate-200 dark:border-white/5 group-hover:border-fuchsia-500/30 transition-colors">
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block uppercase tracking-wider">{event.date.split(' ')[0] || 'DATE'}</span>
                             </div>
                             <div className="flex-1">
                                <h4 className="text-slate-800 dark:text-white font-bold text-sm mb-1.5 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-300 transition-colors">
                                  {event.event}
                                </h4>
                                <div className="flex gap-2 items-center">
                                    <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold tracking-wider ${
                                          event.importance === 'High' ? 'border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-500/10' :
                                          event.importance === 'Medium' ? 'border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10' :
                                          'border-slate-500/30 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-500/10'
                                       }`}>
                                         {event.importance}
                                    </span>
                                </div>
                             </div>
                          </div>
                       ))}
                 </div>
              </div>
           </div>
        ) : null}
      </section>

      {/* 2. Deep Dive Section */}
      <section className="mt-20">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-2 px-2">
           🔎 Deep Dive Research
        </h2>
        <div className="glass-panel rounded-3xl p-3 mb-10 flex items-center">
          <form onSubmit={handleAnalyzeTopic} className="flex gap-3 w-full">
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Query specific narratives (e.g. 'Ethereum ETF flows', 'Solana Network congestion')"
              className="flex-1 bg-transparent border-none rounded-xl px-6 py-4 text-slate-800 dark:text-white placeholder-slate-500 focus:ring-0 text-lg font-light"
              disabled={isAnalyzingTopic}
            />
            <Button type="submit" isLoading={isAnalyzingTopic} disabled={!topic.trim()} className="rounded-xl shadow-none px-10">
              Analyze
            </Button>
          </form>
        </div>

        {/* Deep Dive Result */}
        {topicResult && (
          <div className="space-y-6 animate-slide-up glass-panel p-10 rounded-3xl">
            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-white/5 text-center">
                  <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">Impact</span>
                  <div className={`text-2xl font-black mt-2 ${
                      topicResult.impactLevel === 'High' ? 'text-rose-600 dark:text-rose-400' : 
                      topicResult.impactLevel === 'Medium' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-300'
                  }`}>
                      {topicResult.impactLevel} ⚡
                  </div>
               </div>
               <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-white/5 text-center">
                  <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">Bias</span>
                  <div className="text-2xl font-black mt-2 text-indigo-600 dark:text-indigo-400">
                      {topicResult.marketSentiment}
                  </div>
               </div>
               <div className="col-span-2 bg-slate-100 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-white/5 flex flex-col justify-center">
                   <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold mb-3">Assets in Play</span>
                   <div className="flex flex-wrap gap-2">
                      {topicResult.affectedAssets?.map((asset, i) => (
                          <span key={i} className="px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded-lg text-xs text-slate-700 dark:text-white border border-slate-300 dark:border-slate-700 font-mono font-bold">
                              {asset}
                          </span>
                      )) || <span className="text-slate-500 text-sm">General Market</span>}
                   </div>
               </div>
            </div>
            
            {/* Strategy & Takeaway */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 p-8 rounded-2xl">
                  <h3 className="text-indigo-600 dark:text-indigo-400 font-bold mb-2 text-[10px] uppercase tracking-[0.2em]">Strategy Directive</h3>
                  <p className="text-slate-800 dark:text-white font-bold text-2xl">{topicResult.tradingStrategy}</p>
               </div>
               <div className="bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 p-8 rounded-2xl">
                  <h3 className="text-slate-500 dark:text-slate-400 font-bold mb-2 text-[10px] uppercase tracking-[0.2em]">Key Takeaway</h3>
                  <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">{topicResult.keyTakeaway}</p>
               </div>
            </div>

            {/* Social Draft */}
            <div className="bg-slate-200/50 dark:bg-black/30 rounded-2xl p-1 border border-slate-200 dark:border-white/5">
              <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-white/5">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest">Generated Post</h3>
                  <Button onClick={handleCopyTopic} variant="ghost" className="text-xs py-1 px-4 h-auto uppercase tracking-wider">
                      {topicCopied ? 'Copied! ✅' : 'Copy'}
                  </Button>
              </div>
              <textarea 
                  value={topicResult.socialPost}
                  readOnly
                  className="w-full h-64 bg-transparent border-none p-6 font-mono text-sm text-slate-700 dark:text-slate-300 focus:ring-0 resize-none leading-relaxed"
              />
            </div>
          </div>
        )}
      </section>

      {/* Post Generator Modal */}
      {selectedItem && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 animate-fade-in">
            <div className="glass-panel border-white/10 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden bg-white dark:bg-[#0a0a0f]">
               <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                     <span className="text-yellow-500 dark:text-yellow-400">🔶</span> Binance Square
                  </h3>
                  <button onClick={closeModal} className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
               </div>
               
               <div className="p-8">
                  {isGeneratingPost ? (
                     <div className="flex flex-col items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 border-t-transparent mb-6"></div>
                        <p className="text-slate-500 dark:text-slate-300 animate-pulse font-medium">Crafting content...</p>
                     </div>
                  ) : (
                     <div className="space-y-6">
                        <textarea 
                           className="w-full h-80 bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-2xl p-5 font-mono text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 focus:outline-none leading-relaxed resize-none"
                           value={generatedPost || ''}
                           readOnly
                        />
                        <div className="flex gap-4">
                           <Button onClick={handleCopyGeneratedPost} className="w-full bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-300 dark:hover:bg-yellow-400 text-black font-bold border-none shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                              {postCopied ? 'Copied! ✅' : 'Copy Post'}
                           </Button>
                           <Button onClick={() => openPostGenerator(selectedItem)} variant="outline">
                              Regenerate
                           </Button>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default NewsAnalysis;