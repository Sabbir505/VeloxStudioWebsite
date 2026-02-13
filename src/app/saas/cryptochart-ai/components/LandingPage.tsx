import React from 'react';
import Button from './Button';

interface LandingPageProps {
  onLaunch: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLaunch }) => {
  
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative animate-fade-in">
      
      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50">
        <div className="glass-panel rounded-2xl px-6 py-4 flex items-center justify-between shadow-xl border-white/20 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative">
               <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-lg blur opacity-40"></div>
               <div className="relative bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-white/10">
                 <svg className="w-6 h-6 text-indigo-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
               </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
              CryptoChart<span className="text-cyan-600 dark:text-cyan-400">.AI</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-cyan-600 dark:hover:text-white transition-colors cursor-pointer">Features</a>
            <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="hover:text-cyan-600 dark:hover:text-white transition-colors cursor-pointer">How it Works</a>
            <button onClick={onLaunch} className="text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                Sign In
            </button>
            <Button onClick={onLaunch} className="px-6 py-2 h-auto text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20">
                Launch App
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-20 md:pt-60 md:pb-32 px-4 text-center max-w-5xl mx-auto relative z-10">
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-widest mb-8 animate-slide-up">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            AI-Powered Technical Analysis v3.0
         </div>
         
         <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tight mb-8 leading-[1.1] animate-slide-up" style={{animationDelay: '0.1s'}}>
            Stop Gambling. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500">Start Trading.</span>
         </h1>
         
         <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
            Instant pattern recognition, sentiment analysis, and liquidity detection. Upload any chart and get institutional-grade insights in seconds.
         </p>
         
         <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{animationDelay: '0.3s'}}>
            <Button onClick={onLaunch} className="w-full sm:w-auto px-12 py-5 text-lg shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] hover:scale-105">
                Launch Terminal 🚀
            </Button>
            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 px-6">
                <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-black flex items-center justify-center text-[10px]">
                             {i === 1 ? '👨‍💻' : i === 2 ? '👩‍💻' : '🧑‍💻'}
                        </div>
                    ))}
                </div>
                <span>10,000+ Charts Analyzed</span>
            </div>
         </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-20 px-4 relative z-10">
         <div className="max-w-7xl mx-auto">
             <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Unfair Advantage</h2>
                 <p className="text-slate-600 dark:text-slate-400">Everything you need to trade like a hedge fund.</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {/* Feature 1 */}
                 <div className="glass-panel p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-300">
                     <div className="w-14 h-14 rounded-2xl bg-cyan-100 dark:bg-cyan-500/10 flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                        📈
                     </div>
                     <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Instant Technicals</h3>
                     <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Identify support, resistance, and chart patterns (Flags, Wedges, Head & Shoulders) automatically. No more drawing lines manually.
                     </p>
                 </div>

                 {/* Feature 2 */}
                 <div className="glass-panel p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-300 border-indigo-500/20">
                     <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                        ⚡
                     </div>
                     <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Alpha Decoding</h3>
                     <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Upload screenshots of signals or dashboards. We extract the win-rate, PnL, and targets to verify if a strategy is actually profitable.
                     </p>
                 </div>

                 {/* Feature 3 */}
                 <div className="glass-panel p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-300">
                     <div className="w-14 h-14 rounded-2xl bg-fuchsia-100 dark:bg-fuchsia-500/10 flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                        🌐
                     </div>
                     <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Market Pulse</h3>
                     <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Real-time sentiment analysis on news headlines. Understand if the macro environment is Hawkish or Dovish before you enter a trade.
                     </p>
                 </div>
             </div>
         </div>
      </section>

      {/* How It Works (Added ID for navigation) */}
      <section id="how-it-works" className="py-20 border-y border-slate-200 dark:border-white/5 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 text-center">
             <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-16">How It Works</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                  {/* Connector Line (Desktop) */}
                  <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent z-0"></div>

                  <div className="relative z-10">
                      <div className="w-24 h-24 mx-auto bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-4xl mb-6 shadow-xl">
                          📸
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">1. Snap</h3>
                      <p className="text-slate-500 dark:text-slate-400">Take a screenshot of any chart or news.</p>
                  </div>
                  
                  <div className="relative z-10">
                      <div className="w-24 h-24 mx-auto bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-4xl mb-6 shadow-xl">
                          📤
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">2. Upload</h3>
                      <p className="text-slate-500 dark:text-slate-400">Drop it into the AI terminal.</p>
                  </div>

                  <div className="relative z-10">
                      <div className="w-24 h-24 mx-auto bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-4xl mb-6 shadow-xl">
                          💡
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">3. Profit</h3>
                      <p className="text-slate-500 dark:text-slate-400">Get instant actionable insights.</p>
                  </div>
             </div>
          </div>
      </section>

      {/* Stats Strip */}
      <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around gap-8 text-center">
              <div>
                  <div className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-1">94%</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Pattern Accuracy</div>
              </div>
              <div>
                  <div className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-1">&lt; 5s</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Analysis Time</div>
              </div>
              <div>
                  <div className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-1">24/7</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Market Coverage</div>
              </div>
          </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-4 text-center">
          <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
                  Ready to see the matrix?
              </h2>
              <Button onClick={onLaunch} className="px-16 py-6 text-xl shadow-[0_0_50px_rgba(79,70,229,0.4)]">
                  Get Started for Free
              </Button>
              <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                  No credit card required. Works with any chart screenshot.
              </p>
          </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 border-t border-slate-200 dark:border-white/5 text-center text-slate-500 text-sm">
          <p>© 2024 CryptoChart.AI - Intelligent Market Analysis</p>
      </footer>

    </div>
  );
};

export default LandingPage;