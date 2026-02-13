import React, { useState, useEffect } from 'react';
import ImageUpload from './components/ImageUpload';
import AnalysisResult from './components/AnalysisResult';
import NewsAnalysis from './components/NewsAnalysis';
import SignalResult from './components/SignalResult';
import PraiseResult from './components/PraiseResult';
import MarketOverviewResult from './components/MarketOverviewResult';
import LandingPage from './components/LandingPage';
import { AppState, UploadedImage } from './types';
import { analyzeChartImage, analyzeSignalImage, analyzePraiseImage, analyzeMarketOverview } from './services/geminiService';
import Button from './components/Button';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE_MB } from './constants';

const initialState: AppState = {
  images: [],
  isAnalyzing: false,
  result: null,
  marketResult: null,
  signalResult: null,
  praiseResult: null,
  error: null,
};

function App() {
  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<'chart' | 'news' | 'signal' | 'praise'>('chart');
  const [chartMode, setChartMode] = useState<'single' | 'market'>('single');
  const [state, setState] = useState<AppState>(initialState);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize theme based on HTML class or default
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    setState(initialState);
  }, [activeTab]);

  const runPraiseAnalysis = async () => {
    if (state.images.length === 0) return;
    setState(prev => ({ ...prev, isAnalyzing: true, error: null }));
    try {
      const praiseData = await analyzePraiseImage(state.images);
      setState(prev => ({ ...prev, isAnalyzing: false, praiseResult: praiseData }));
    } catch (err: any) {
      setState(prev => ({ ...prev, isAnalyzing: false, error: err.message || "Analysis failed" }));
    }
  };

  const handleImagesSelected = async (newImages: UploadedImage[]) => {
    const targetTab = activeTab === 'news' ? 'chart' : activeTab;
    if (activeTab === 'news') setActiveTab('chart');

    if (targetTab === 'praise') {
      setState(prev => ({ ...prev, images: [...prev.images, ...newImages], error: null, praiseResult: null, result: null, signalResult: null, marketResult: null }));
      return;
    }

    setState(prev => ({ ...prev, images: newImages, error: null, isAnalyzing: true, result: null, signalResult: null, praiseResult: null, marketResult: null }));

    try {
      if (targetTab === 'signal') {
        const signalData = await analyzeSignalImage(newImages[0].base64, newImages[0].mimeType);
        setState(prev => ({ ...prev, isAnalyzing: false, signalResult: signalData }));
      } else if (targetTab === 'chart') {
          if (chartMode === 'market') {
            const marketData = await analyzeMarketOverview(newImages[0].base64, newImages[0].mimeType);
            setState(prev => ({ ...prev, isAnalyzing: false, marketResult: marketData }));
          } else {
            const analysis = await analyzeChartImage(newImages[0].base64, newImages[0].mimeType);
            setState(prev => ({ ...prev, isAnalyzing: false, result: analysis }));
          }
      }
    } catch (err: any) {
      setState(prev => ({ ...prev, isAnalyzing: false, error: err.message || "Something went wrong during analysis." }));
    }
  };

  const resetAnalysis = () => setState(initialState);
  const removeImage = (indexToRemove: number) => setState(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== indexToRemove) }));

  // Paste handler
  useEffect(() => {
    if (view !== 'app') return; // Only enable paste in app mode
    
    const handleGlobalPaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT' || target.isContentEditable) return;
      if (state.isAnalyzing) return;
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (!file) continue;
          e.preventDefault();
          if (!ALLOWED_FILE_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE_MB * 1024 * 1024) return;
          const reader = new FileReader();
          reader.onload = (evt) => {
            const result = evt.target?.result as string;
            if (result) handleImagesSelected([{ base64: result, mimeType: file.type }]);
          };
          reader.readAsDataURL(file);
          break;
        }
      }
    };
    window.addEventListener('paste', handleGlobalPaste);
    return () => window.removeEventListener('paste', handleGlobalPaste);
  }, [state.isAnalyzing, activeTab, chartMode, view]); 

  const getLoadingMessage = () => {
      switch (activeTab) {
          case 'signal': return { title: 'Decoding Alpha...', subtitle: 'Calculating probability metrics' };
          case 'praise': return { title: 'Verifying Win...', subtitle: 'Generating hype content' };
          case 'chart': return chartMode === 'market' ? { title: 'Scanning Heatmap...', subtitle: 'Analyzing market breadth' } : { title: 'Reading Price Action...', subtitle: 'Identifying liquidity & patterns' };
          default: return { title: 'Processing...', subtitle: 'Please wait' };
      }
  };

  const loadingText = getLoadingMessage();
  const hasImages = state.images && state.images.length > 0;

  return (
    <div className="relative min-h-screen text-slate-800 dark:text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-900 dark:selection:text-cyan-50 bg-slate-50 dark:bg-[#05050a] transition-colors duration-300 overflow-x-hidden">
      
      {/* --- Dynamic Background (Persistent) --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-indigo-400 dark:bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 dark:opacity-40 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-400 dark:bg-cyan-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 dark:opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-20 w-96 h-96 bg-fuchsia-400 dark:bg-fuchsia-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 dark:opacity-40 animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 brightness-100 contrast-150"></div>
      </div>

      {view === 'landing' ? (
        <LandingPage onLaunch={() => setView('app')} />
      ) : (
        <>
          {/* --- App Navbar --- */}
          <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 animate-fade-in">
            <div className="glass-panel rounded-2xl px-6 py-4 flex items-center justify-between shadow-xl dark:shadow-2xl border-white/20 dark:border-white/10">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-200"></div>
                  <div className="relative bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-white/10">
                    <svg className="w-6 h-6 text-indigo-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
                  CryptoChart<span className="text-cyan-600 dark:text-cyan-400">.AI</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-white/10"
                    title="Toggle Theme"
                >
                    {isDarkMode ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                    )}
                </button>
              </div>
            </div>
          </nav>

          {/* --- Main Content --- */}
          <div className="pt-36 pb-20 px-4 sm:px-6 relative z-10 animate-fade-in">
            
            {/* Intro / Tab Switcher */}
            <div className="max-w-5xl mx-auto mb-12">
                {!hasImages && activeTab !== 'news' && (
                    <div className="mb-12 text-center animate-slide-up">
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 drop-shadow-sm dark:drop-shadow-lg transition-colors">
                        See The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 dark:from-cyan-400 dark:via-indigo-400 dark:to-fuchsia-400">Matrix</span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                        Upload any crypto chart. Our AI decodes liquidity, structure, and sentiment in seconds.
                        </p>
                    </div>
                )}

                {/* Neon Tab Switcher */}
                <div className="flex justify-center mb-10">
                  <div className="inline-flex bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-1.5 rounded-2xl border border-white/20 dark:border-white/10 shadow-xl relative transition-colors">
                      {[
                          { id: 'chart', label: 'Vision', icon: '📈' },
                          { id: 'signal', label: 'Signal', icon: '⚡' },
                          { id: 'praise', label: 'Verify', icon: '💎' },
                          { id: 'news', label: 'Pulse', icon: '🌐' }
                      ].map((tab) => (
                          <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id as any)}
                              className={`relative px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                                  activeTab === tab.id 
                                  ? 'text-slate-900 dark:text-white shadow-[0_0_20px_rgba(34,211,238,0.2)]' 
                                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-300'
                              }`}
                          >
                              {activeTab === tab.id && (
                                  <span className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-white/10 z-0"></span>
                              )}
                              <span className="relative z-10">{tab.icon} {tab.label}</span>
                          </button>
                      ))}
                  </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto min-h-[400px]">
                {(activeTab === 'chart' || activeTab === 'signal' || activeTab === 'praise') && (
                    <div className={`transition-all duration-500 ease-out`}>
                        
                        {/* RESULTS VIEW */}
                        {activeTab === 'chart' && state.result ? (
                            <AnalysisResult data={state.result} onReset={resetAnalysis} />
                        ) : activeTab === 'chart' && state.marketResult ? (
                            <MarketOverviewResult data={state.marketResult} onReset={resetAnalysis} />
                        ) : activeTab === 'signal' && state.signalResult ? (
                            <SignalResult data={state.signalResult} onReset={resetAnalysis} />
                        ) : activeTab === 'praise' && state.praiseResult ? (
                            <PraiseResult data={state.praiseResult} onReset={resetAnalysis} />
                        ) : (
                            /* UPLOAD VIEW */
                            <div className="max-w-4xl mx-auto animate-fade-in">
                                {/* Sub-Mode Toggle */}
                                {activeTab === 'chart' && !hasImages && (
                                    <div className="flex justify-center mb-8">
                                        <div className="inline-flex bg-white/50 dark:bg-black/20 p-1 rounded-lg border border-slate-200 dark:border-white/5 backdrop-blur-sm">
                                            <button 
                                                onClick={() => setChartMode('single')}
                                                className={`px-6 py-2 text-xs font-bold rounded-md transition-all uppercase tracking-wider ${chartMode === 'single' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                                            >
                                                Single Asset
                                            </button>
                                            <button 
                                                onClick={() => setChartMode('market')}
                                                className={`px-6 py-2 text-xs font-bold rounded-md transition-all uppercase tracking-wider ${chartMode === 'market' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/25' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                                            >
                                                Market Heatmap
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {hasImages ? (
                                    <div className="space-y-8 animate-slide-up">
                                        <div className="relative rounded-3xl overflow-hidden glass-panel p-3">
                                            {/* Image Display */}
                                            <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-black/40 min-h-[400px] flex items-center justify-center border border-slate-200 dark:border-white/5">
                                                {state.images.length > 1 ? (
                                                    <div className="grid grid-cols-2 gap-3 w-full p-3">
                                                        {state.images.map((img, idx) => (
                                                            <div key={idx} className="relative group">
                                                                <img src={img.base64} className="w-full h-64 object-cover rounded-xl" alt={`Upload ${idx}`} />
                                                                {activeTab === 'praise' && !state.isAnalyzing && (
                                                                    <button onClick={() => removeImage(idx)} className="absolute top-2 right-2 bg-white/80 dark:bg-black/60 backdrop-blur p-2 rounded-lg text-slate-800 dark:text-white hover:bg-rose-500 hover:text-white transition-colors">
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <img src={state.images[0].base64} alt="Analysis Target" className="w-full h-auto max-h-[600px] object-contain" />
                                                )}
                                                
                                                {state.images.length === 1 && activeTab === 'praise' && !state.isAnalyzing && (
                                                     <button onClick={() => removeImage(0)} className="absolute top-4 right-4 bg-white/80 dark:bg-black/50 backdrop-blur text-slate-800 dark:text-white p-2 rounded-xl hover:bg-red-500/80 hover:text-white transition-all border border-slate-200 dark:border-white/10 shadow-lg">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                     </button>
                                                )}
                                            </div>

                                            {/* Loading Overlay */}
                                            {state.isAnalyzing && (
                                                <div className="absolute inset-0 bg-white/80 dark:bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center z-20">
                                                    <div className="relative mb-8">
                                                        <div className="w-24 h-24 rounded-full border border-slate-300 dark:border-white/10 opacity-30 animate-[spin_3s_linear_infinite]"></div>
                                                        <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-t-2 border-r-2 border-cyan-500 dark:border-cyan-400 animate-[spin_1s_linear_infinite]"></div>
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="w-2 h-2 bg-slate-800 dark:bg-white rounded-full animate-ping"></div>
                                                        </div>
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white tracking-widest uppercase animate-pulse">{loadingText.title}</h3>
                                                    <p className="text-cyan-600 dark:text-cyan-400/80 text-sm mt-3 font-mono">{loadingText.subtitle}</p>
                                                </div>
                                            )}
                                            
                                            {/* Error Overlay */}
                                            {!state.isAnalyzing && state.error && (
                                                <div className="absolute inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center z-20 p-8 text-center">
                                                    <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mb-6 border border-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.2)]">
                                                        <svg className="w-10 h-10 text-rose-500 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Interruption Detected</h3>
                                                    <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md leading-relaxed">{state.error}</p>
                                                    <div className="flex gap-4">
                                                        <Button onClick={() => setState(prev => ({...prev, error: null}))} variant="secondary">Change Image</Button>
                                                        <Button onClick={activeTab === 'praise' ? runPraiseAnalysis : () => handleImagesSelected(state.images)}>Try Again</Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Praise Tab Action Bar */}
                                        {activeTab === 'praise' && !state.isAnalyzing && (
                                            <div className="glass-panel p-6 rounded-2xl flex flex-col items-center gap-6 animate-slide-up">
                                                <div className="flex gap-4 w-full sm:w-auto">
                                                    <Button onClick={runPraiseAnalysis} className="flex-1 sm:flex-none px-12 py-4 text-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                                        Verify Win 🚀
                                                    </Button>
                                                    <Button onClick={resetAnalysis} variant="outline" className="px-8">
                                                        Clear
                                                    </Button>
                                                </div>
                                                <div className="w-full border-t border-slate-200 dark:border-white/5 pt-6 mt-2">
                                                    <ImageUpload onImagesSelected={handleImagesSelected} isAnalyzing={state.isAnalyzing} multiple={true} variant="compact" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="animate-slide-up">
                                        <ImageUpload onImagesSelected={handleImagesSelected} isAnalyzing={state.isAnalyzing} multiple={activeTab === 'praise'} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'news' && (
                    <NewsAnalysis />
                )}

            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;