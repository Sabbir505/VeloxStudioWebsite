import React, { useState, useEffect } from 'react';
import { ProductIdea, MarketReport, AppView } from './types';
import { generateMarketAnalysis } from './services/geminiService';
import { authService, User } from './services/authService';
import { firestoreService } from './services/firestoreService';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ChatAssistant from './components/ChatAssistant';
import AuthScreen from './components/AuthScreen';

const MAX_FREE_ACTIONS = 3;

const App: React.FC = () => {
  // Auth state
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [usageCount, setUsageCount] = useState(0);
  const [showLimitDialog, setShowLimitDialog] = useState(false);

  const [view, setView] = useState<AppView>(AppView.INPUT);
  const [currentIdea, setCurrentIdea] = useState<ProductIdea | null>(null);
  const [reportData, setReportData] = useState<MarketReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = authService.onAuthChanged((appUser) => {
      if (appUser) {
        setUser(appUser);
        // Load usage count in background (don't block auth)
        firestoreService.getUsageCount(appUser.id).then(setUsageCount).catch(() => setUsageCount(0));
      } else {
        setUser(null);
        setUsageCount(0);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const refreshUsageCount = async () => {
    if (user) {
      const count = await firestoreService.getUsageCount(user.id);
      setUsageCount(count);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    setView(AppView.INPUT);
  };

  const handleIdeaSubmit = async (idea: ProductIdea) => {
    // Free-tier check
    if (user) {
      const allowed = await firestoreService.canPerformAction(user.id, MAX_FREE_ACTIONS);
      if (!allowed) {
        await refreshUsageCount();
        setShowLimitDialog(true);
        return;
      }
    }

    setCurrentIdea(idea);
    setView(AppView.LOADING);
    setError(null);

    try {
      const data = await generateMarketAnalysis(idea);
      setReportData(data);
      setView(AppView.REPORT);
      // Increment usage after successful analysis
      if (user) {
        await firestoreService.incrementUsage(user.id);
        await refreshUsageCount();
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to analyze market. Please check your API Key and try again. " + (err.message || ""));
      setView(AppView.INPUT);
    }
  };

  const handleReset = () => {
    setReportData(null);
    setCurrentIdea(null);
    setView(AppView.INPUT);
  };

  // Auth loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-slate-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Auth screen
  if (!user) {
    return <AuthScreen onLogin={(u) => setUser(u)} />;
  }

  // Limit Dialog
  const LimitDialog = () => showLimitDialog ? (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/10 relative animate-fade-in">
        <button onClick={() => setShowLimitDialog(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <div className="text-center">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Free Tier Limit Reached</h3>
          <p className="text-slate-400 mb-6">You've used <span className="font-bold text-white">{usageCount}</span> of <span className="font-bold text-white">{MAX_FREE_ACTIONS}</span> free analyses.</p>
          <div className="w-full bg-white/5 rounded-full h-3 mb-6">
            <div className="bg-gradient-to-r from-amber-500 to-red-500 h-3 rounded-full transition-all" style={{ width: `${Math.min(100, (usageCount / MAX_FREE_ACTIONS) * 100)}%` }}></div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-6">
            <p className="text-sm text-blue-400 font-medium">🚀 Pro subscription coming soon!</p>
            <p className="text-xs text-blue-600 mt-1">Unlimited market analyses, PDF exports, and priority processing.</p>
          </div>
          <button onClick={() => setShowLimitDialog(false)} className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors">
            Got it
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-indigo-500/30 font-sans">
      <LimitDialog />
      
      {/* Modern, organic background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden print:hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[100px] opacity-60" />
        <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] bg-emerald-900/5 rounded-full blur-[120px]" />
      </div>

      {view === AppView.INPUT && (
        <div className="fixed top-6 right-6 z-30 print:hidden">
          <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-[#020617]/70 backdrop-blur-xl border border-white/10 shadow-2xl">
            <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full font-bold border border-blue-500/20">
              {usageCount}/{MAX_FREE_ACTIONS}
            </span>
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-slate-300 border border-white/10"
              title={user?.email || user?.name}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 7.5v9a2.25 2.25 0 0 1-2.25 2.25H4.5A2.25 2.25 0 0 1 2.25 16.5v-9A2.25 2.25 0 0 1 4.5 5.25h15A2.25 2.25 0 0 1 21.75 7.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m3 7.5 9 6 9-6" />
              </svg>
              <span className="text-xs font-semibold max-w-[220px] truncate">
                {user?.email || user?.name}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full bg-white/5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors border border-white/10"
              title="Logout"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <main className="relative z-10 flex flex-col min-h-screen">
        {/* Only show simple header on Result/Loading views, Landing Page has its own header structure */}
        {view !== AppView.INPUT && (
          <header className="px-6 py-4 border-b border-white/5 bg-[#020617]/70 backdrop-blur-xl sticky top-0 z-20 print:hidden transition-all duration-300 animate-fade-in">
             <div className="max-w-7xl mx-auto flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/20">M</div>
                 <span className="font-bold text-lg tracking-tight text-white">Market Insight Analyzer</span>
               </div>
               {view === AppView.REPORT && (
                 <div className="text-xs font-medium text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                   v2.0 • AI-Powered
                 </div>
               )}
               <div className="flex items-center gap-3">
                 <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full font-bold border border-blue-500/20">{usageCount}/{MAX_FREE_ACTIONS}</span>
                 <button onClick={handleLogout} className="p-2 rounded-full bg-white/5 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors border border-white/5" title="Logout">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                 </button>
               </div>
             </div>
          </header>
        )}

        <div className="flex-1 flex flex-col justify-center">
          {view === AppView.INPUT && (
            <div className="w-full">
              {error && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-xl w-full p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-center text-sm backdrop-blur-md animate-fade-in shadow-2xl">
                  {error}
                </div>
              )}
              <LandingPage onStartAnalysis={handleIdeaSubmit} isLoading={false} />
            </div>
          )}

          {view === AppView.LOADING && (
             <div className="flex flex-col items-center justify-center p-8 animate-fade-in min-h-[80vh]">
                <div className="relative mb-10">
                  <div className="w-24 h-24 rounded-full border-4 border-slate-800"></div>
                  <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 blur-xl animate-pulse"></div>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Synthesizing Market Data</h2>
                <p className="text-slate-400 text-center max-w-md text-lg font-light leading-relaxed">
                  Our AI is researching competitors, calculating TAM, and analyzing user sentiment trends.
                </p>
                
                <div className="mt-10 w-full max-w-sm bg-slate-800/50 rounded-full h-1.5 overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 animate-progress-bar rounded-full"></div>
                </div>
                <div className="mt-3 flex justify-between w-full max-w-sm text-xs font-medium text-slate-500 uppercase tracking-widest">
                   <span>Researching</span>
                   <span>Analyzing</span>
                   <span>Generating</span>
                </div>
             </div>
          )}

          {view === AppView.REPORT && reportData && currentIdea && (
            <Dashboard 
              report={reportData} 
              idea={currentIdea} 
              onReset={handleReset} 
            />
          )}
        </div>
      </main>
      
      {view === AppView.REPORT && <ChatAssistant />}

      <style>{`
        @keyframes progress-bar {
          0% { width: 0%; }
          40% { width: 40%; }
          70% { width: 80%; }
          100% { width: 95%; }
        }
        .animate-progress-bar {
          animation: progress-bar 5s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default App;