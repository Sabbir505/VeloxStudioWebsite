import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { parseCVFromText } from './services/geminiService';
import { CVData, TemplateType } from './types';
import ModernTemplate from './components/templates/ModernTemplate';
import ClassicTemplate from './components/templates/ClassicTemplate';
import MinimalTemplate from './components/templates/MinimalTemplate';
import ProfessionalTemplate from './components/templates/ProfessionalTemplate';
import CreativeTemplate from './components/templates/CreativeTemplate';
import AcademicTemplate from './components/templates/AcademicTemplate';
import TechTemplate from './components/templates/TechTemplate';
import ElegantTemplate from './components/templates/ElegantTemplate';
import CompactTemplate from './components/templates/CompactTemplate';
import CVEditor from './components/CVEditor';
import AuthScreen from './components/AuthScreen';
import { authService, User } from './services/authService';
import { firestoreService } from './services/firestoreService';
import { FileText, Download, Edit2, Layout, Sparkles, AlertCircle, Image as ImageIcon, Loader2, ChevronRight, Wand2, Maximize2, Minimize2, CheckCircle2, Shield, ArrowRight, Star, MousePointerClick, Copy, LogOut, Lock, X } from 'lucide-react';
import html2canvas from 'html2canvas';

const MAX_FREE_ACTIONS = 3;

// Default empty state to prevent crashes if something goes wrong
const EMPTY_DATA: CVData = {
  personalInfo: { fullName: 'Your Name', email: 'email@example.com', phone: '123-456-7890', location: 'City, Country', summary: 'Professional summary goes here...' },
  sectionOrder: ['experience', 'education', 'projects', 'skills'],
  experience: [],
  education: [],
  skills: [],
  projects: []
};

const App: React.FC = () => {
  // Auth state
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [usageCount, setUsageCount] = useState(0);
  const [showLimitDialog, setShowLimitDialog] = useState(false);

  const [inputText, setInputText] = useState('');
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(TemplateType.MODERN);
  const [viewMode, setViewMode] = useState<'editor' | 'preview' | 'split'>('split');
  
  const [scale, setScale] = useState(1);
  const previewRef = useRef<HTMLDivElement>(null);

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
    setCvData(null);
    setInputText('');
  };

  // Auto-fit logic to ensure content fits A4 height (approx 1123px at 96dpi / 3508px at 300dpi equivalent logic)
  useLayoutEffect(() => {
    if (!cvData) return;
    
    const checkHeight = () => {
      const element = document.getElementById('resume-preview');
      if (element) {
        // Reset scale to measure true height
        element.style.transform = 'none';
        element.style.width = '210mm'; 
        
        const contentHeight = element.scrollHeight;
        const A4_HEIGHT_PX = 1123; // Approx height of A4 at 96 DPI
        
        if (contentHeight > A4_HEIGHT_PX) {
           // Calculate required scale to fit
           // We limit minimum scale to 0.7 to prevent it becoming unreadable
           const newScale = Math.max(0.7, A4_HEIGHT_PX / contentHeight);
           setScale(newScale);
        } else {
           setScale(1);
        }
      }
    };
    
    // Slight delay to allow DOM to update with new data/template
    const timer = setTimeout(checkHeight, 100);
    return () => clearTimeout(timer);
  }, [cvData, selectedTemplate]);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    
    // Free-tier check
    if (user) {
      const allowed = await firestoreService.canPerformAction(user.id, MAX_FREE_ACTIONS);
      if (!allowed) {
        await refreshUsageCount();
        setShowLimitDialog(true);
        return;
      }
    }

    setLoading(true);
    setError(null);
    try {
      const parsed = await parseCVFromText(inputText);
      setCvData(parsed);
      // Increment usage after successful generation
      if (user) {
        await firestoreService.incrementUsage(user.id);
        await refreshUsageCount();
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to process your CV. Please try again or check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadImage = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    // Free-tier check
    if (user) {
      const allowed = await firestoreService.canPerformAction(user.id, MAX_FREE_ACTIONS);
      if (!allowed) {
        await refreshUsageCount();
        setShowLimitDialog(true);
        return;
      }
    }

    setDownloading(true);
    
    try {
      // Use html2canvas to capture the element
      // Standard A4 width at 96DPI is approx 794px.
      // scale: 3 gives ~2382px width, which is close to 300DPI print quality (2480px).
      // We explicitly set the scale to 3.125 to hit ~2480px width
      const printScale = 3.125;

      const canvas = await html2canvas(element, {
        scale: printScale, 
        useCORS: true, // Handle cross-origin images if needed
        backgroundColor: '#ffffff', // Ensure white background
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1024, // Matches the desktop layout logic
        onclone: (clonedDoc) => {
           const clonedElement = clonedDoc.getElementById('resume-preview');
           if (clonedElement) {
             // Force precise A4 width to prevent layout shifts or text wrapping differences
             // 210mm is standard A4 width.
             clonedElement.style.width = '210mm'; 
             clonedElement.style.maxWidth = 'none';
             clonedElement.style.margin = '0';
             
             // If we are scaling content to fit, we need to replicate that visual scaling in the export
             // However, html2canvas captures the DOM 'as is'.
             // If we applied transform: scale(0.8) in the app, html2canvas will capture that.
             // But for a print export, we often want the full content.
             // Strategy: Since the user specifically asked to fit data into A4, we KEEP the visual scaling.
             if (scale < 1) {
                 clonedElement.style.transform = `scale(${scale})`;
                 clonedElement.style.transformOrigin = 'top left';
                 // Compensate width so it fills the page
                 clonedElement.style.width = `${(100 / scale)}%`;
             } else {
                 clonedElement.style.transform = 'none';
             }

             // Ensure A4 aspect ratio height minimum
             clonedElement.style.minHeight = '297mm';
             
             // Remove shadows for a cleaner "digital document" export
             clonedElement.style.boxShadow = 'none';
             clonedElement.style.transition = 'none';
             
             // Ensure font smoothing for high-res capture
             (clonedElement.style as any).webkitFontSmoothing = 'antialiased';
             (clonedElement.style as any).mozOsxFontSmoothing = 'grayscale';
             
             // Remove border/ring for clean print
             clonedElement.classList.remove('ring-1', 'ring-black/5');
           }

           // Remove any active highlight animations that might be caught in the screenshot
           const highlighted = clonedDoc.querySelectorAll('.highlight-section');
           highlighted.forEach(el => {
             (el as HTMLElement).style.animation = 'none';
             (el as HTMLElement).style.backgroundColor = 'transparent';
             (el as HTMLElement).style.outline = 'none';
             
             // Strip negative margins from sections to avoid padding issues in capture
             const sections = clonedDoc.querySelectorAll('[id^="section-"]');
             sections?.forEach(sec => {
                 sec.classList.remove('-m-2', 'p-2');
             });
           });
        }
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      
      let filename = "cv_forge_resume.png";
      if (cvData?.personalInfo?.fullName) {
        filename = `${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.png`;
      }
      
      link.href = image;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Increment usage after successful download
      if (user) {
        await firestoreService.incrementUsage(user.id);
        await refreshUsageCount();
      }
    } catch (err) {
      console.error("Image generation failed", err);
      setError("Failed to generate image. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const handleFocusSection = (sectionId: string) => {
    // If on mobile (or small screen) where preview might be hidden, switch to preview
    if (window.innerWidth < 768 && viewMode === 'editor') {
       setViewMode('preview');
    }
    
    // Allow small delay for view transition or render
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Reset animation by removing and re-adding class
        element.classList.remove('highlight-section');
        // Trigger reflow
        void element.offsetWidth;
        element.classList.add('highlight-section');
      }
    }, 150);
  };

  const renderTemplate = () => {
    const data = cvData || EMPTY_DATA;
    switch (selectedTemplate) {
      case TemplateType.MODERN: return <ModernTemplate data={data} />;
      case TemplateType.CLASSIC: return <ClassicTemplate data={data} />;
      case TemplateType.MINIMAL: return <MinimalTemplate data={data} />;
      case TemplateType.PROFESSIONAL: return <ProfessionalTemplate data={data} />;
      case TemplateType.CREATIVE: return <CreativeTemplate data={data} />;
      case TemplateType.ACADEMIC: return <AcademicTemplate data={data} />;
      case TemplateType.TECH: return <TechTemplate data={data} />;
      case TemplateType.ELEGANT: return <ElegantTemplate data={data} />;
      case TemplateType.COMPACT: return <CompactTemplate data={data} />;
      default: return <ModernTemplate data={data} />;
    }
  };
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auth loading screen
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-slate-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Auth screen
  if (!user) {
    return <AuthScreen onLogin={(u) => setUser(u)} />;
  }

  // Limit Dialog Component
  const LimitDialog = () => showLimitDialog ? (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200 relative animate-fade-in">
        <button onClick={() => setShowLimitDialog(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
          <X size={20} />
        </button>
        <div className="text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Free Tier Limit Reached</h3>
          <p className="text-slate-500 mb-6">You've used <span className="font-bold text-slate-800">{usageCount}</span> of <span className="font-bold text-slate-800">{MAX_FREE_ACTIONS}</span> free actions.</p>
          <div className="w-full bg-slate-100 rounded-full h-3 mb-6">
            <div className="bg-gradient-to-r from-amber-500 to-red-500 h-3 rounded-full transition-all" style={{ width: `${Math.min(100, (usageCount / MAX_FREE_ACTIONS) * 100)}%` }}></div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6">
            <p className="text-sm text-blue-700 font-medium">🚀 Pro subscription coming soon!</p>
            <p className="text-xs text-blue-500 mt-1">Unlimited CV generations, all templates, and priority support.</p>
          </div>
          <button onClick={() => setShowLimitDialog(false)} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
            Got it
          </button>
        </div>
      </div>
    </div>
  ) : null;

  // If no data yet, show Landing/Input
  if (!cvData && !loading) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
        <LimitDialog />
        
        {/* Navigation */}
        <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-lg border-b border-white/50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <Sparkles size={18} />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">CV Forge</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                <button onClick={() => scrollToSection('features')} className="hover:text-blue-600 transition-colors">Features</button>
                <button onClick={() => scrollToSection('how-it-works')} className="hover:text-blue-600 transition-colors">How it Works</button>
                <button onClick={() => scrollToSection('templates')} className="hover:text-blue-600 transition-colors">Templates</button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 hidden sm:inline">{user.email}</span>
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-bold">{usageCount}/{MAX_FREE_ACTIONS}</span>
                <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Logout">
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 relative overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-400/20 rounded-full blur-[100px] -z-10 animate-float"></div>
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-300/10 rounded-full blur-[80px] -z-10"></div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
                <Star size={12} className="fill-blue-600" /> #1 AI Resume Builder
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Stop Formatting.<br />
                <span className="text-gradient">Start Interviewing.</span>
              </h1>
              
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                Paste your messy notes, old resume, or LinkedIn summary. Our AI architects a professional, ATS-friendly CV in seconds.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-500" /> Free to use
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-500" /> 3 free generations
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-500" /> Privacy focused
                </div>
              </div>
            </div>

            {/* Right Interactive Card */}
            <div className="relative animate-fade-in delay-100">
               <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
               <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
                 
                 <div className="flex justify-between items-center mb-4">
                   <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
                   </div>
                   <span className="text-xs font-mono text-slate-400">input.txt</span>
                 </div>

                 <div className="space-y-4">
                   <div className="relative group">
                      <textarea
                        className="w-full h-48 p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none resize-none text-slate-700 placeholder:text-slate-400 text-base transition-all font-mono"
                        placeholder="Paste your career history here...&#10;&#10;e.g. 'Software Engineer at Google from 2020-2023. Led a team of 5, increased performance by 20%...'"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                      />
                      <div className="absolute bottom-3 right-3 flex gap-2 pointer-events-none">
                         <span className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-400 shadow-sm">Markdown</span>
                         <span className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-400 shadow-sm">Plain Text</span>
                      </div>
                   </div>
                   
                   {error && (
                     <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                       <AlertCircle size={16} /> {error}
                     </div>
                   )}

                   <button
                    onClick={handleGenerate}
                    disabled={!inputText.trim() || loading}
                    className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-blue-500/25 transition-all transform flex items-center justify-center gap-2
                      ${!inputText.trim() 
                        ? 'bg-slate-300 cursor-not-allowed opacity-70' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/40 active:scale-[0.98]'}
                    `}
                   >
                     {loading ? (
                       <Loader2 className="animate-spin" size={20} />
                     ) : (
                       <Wand2 size={20} />
                     )}
                     {loading ? 'Analyzing...' : 'Generate Resume'}
                   </button>
                 </div>
               </div>

               {/* Decorative Floating Elements */}
               <div className="absolute -top-6 -right-6 bg-white p-3 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float delay-75 md:flex hidden">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase">ATS Score</div>
                    <div className="text-lg font-bold text-slate-800">98/100</div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-10 border-y border-slate-200 bg-white/50">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">Built for professionals at</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Mock Logos */}
               <h3 className="text-xl font-bold text-slate-600 flex items-center gap-2"><div className="w-6 h-6 bg-slate-600 rounded"></div> ACME Corp</h3>
               <h3 className="text-xl font-bold text-slate-600 flex items-center gap-2"><div className="w-6 h-6 bg-slate-600 rounded-full"></div> Globex</h3>
               <h3 className="text-xl font-bold text-slate-600 flex items-center gap-2"><div className="w-6 h-6 bg-slate-600 transform rotate-45 rounded"></div> Stark Ind</h3>
               <h3 className="text-xl font-bold text-slate-600 flex items-center gap-2"><div className="w-6 h-6 bg-slate-600 rounded-sm"></div> Wayne Ent</h3>
            </div>
          </div>
        </section>

        {/* Feature Grid (Bento Style) */}
        <section id="features" className="py-24 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Everything you need to <br/>land the job.</h2>
              <p className="text-lg text-slate-600">Powerful features wrapped in a simple interface.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1: AI */}
              <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">AI Context Understanding</h3>
                  <p className="text-slate-600 leading-relaxed max-w-md">
                    We don't just format text. Our AI analyzes your experience, highlights achievements with action verbs, and structures your story for maximum impact.
                  </p>
                </div>
              </div>

              {/* Feature 2: Templates */}
              <div className="bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-800 text-white relative overflow-hidden">
                 <div className="absolute bottom-0 right-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                    <Layout size={180} />
                 </div>
                 <div className="relative z-10">
                   <h3 className="text-2xl font-bold mb-3">10+ Premium Templates</h3>
                   <p className="text-slate-400 mb-6">From Creative to Corporate.</p>
                   <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-900"></div>
                      ))}
                      <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-xs font-bold">+6</div>
                   </div>
                 </div>
              </div>

              {/* Feature 3: Drag & Drop */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                 <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                    <MousePointerClick size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Drag & Drop Editing</h3>
                  <p className="text-slate-600">Reorder sections effortlessly to highlight what matters most for each application.</p>
              </div>

              {/* Feature 4: Privacy */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                 <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                    <Shield size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Privacy First</h3>
                  <p className="text-slate-600">Your personal data isn't stored in our database. You own your documents.</p>
              </div>

              {/* Feature 5: Export */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 shadow-lg text-white">
                 <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-sm">
                    <Download size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">High-Res A4 Export</h3>
                  <p className="text-blue-100">Download print-ready PNGs optimized for A4 paper size automatically.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-6 bg-white border-t border-slate-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">From Chaos to Career-Ready</h2>
              <p className="text-lg text-slate-600">Three simple steps to your new resume.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
               {/* Step 1 */}
               <div className="text-center relative">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6 text-2xl font-bold border border-blue-100 shadow-sm">1</div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800">Paste Content</h3>
                  <p className="text-slate-500 leading-relaxed">Dump your LinkedIn bio, old CV text, or rough notes into the editor.</p>
               </div>
               {/* Step 2 */}
               <div className="text-center relative">
                  <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6 text-2xl font-bold border border-indigo-100 shadow-sm">2</div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800">AI Formatting</h3>
                  <p className="text-slate-500 leading-relaxed">Our engine structures, polishes, and organizes your data instantly.</p>
               </div>
               {/* Step 3 */}
               <div className="text-center relative">
                  <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-6 text-2xl font-bold border border-emerald-100 shadow-sm">3</div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800">Export & Apply</h3>
                  <p className="text-slate-500 leading-relaxed">Choose a design, tweak if needed, and download your high-res PNG.</p>
               </div>
            </div>
          </div>
        </section>
        
        {/* Template Preview Strip */}
        <section id="templates" className="py-20 overflow-hidden bg-slate-50 border-t border-slate-200">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-slate-900">Designs that get you hired.</h2>
           </div>
           
           <div className="relative">
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>
              
              <div className="flex gap-8 animate-float px-6 overflow-x-auto pb-8 custom-scrollbar justify-start md:justify-center">
                 {[
                   { name: 'Modern', color: 'bg-white' },
                   { name: 'Professional', color: 'bg-slate-50' },
                   { name: 'Creative', color: 'bg-rose-50' },
                   { name: 'Tech', color: 'bg-slate-900' },
                   { name: 'Minimal', color: 'bg-white' },
                   { name: 'Elegant', color: 'bg-[#fdfbf7]' },
                 ].map((t, i) => (
                   <div key={i} className={`shrink-0 w-48 h-64 ${t.color} rounded-xl shadow-lg border border-slate-200 flex flex-col items-center justify-center group cursor-default hover:-translate-y-2 transition-transform duration-300`}>
                      <div className="w-20 h-2 bg-slate-200 mb-4 rounded-full"></div>
                      <div className="w-32 h-2 bg-slate-100 mb-2 rounded-full"></div>
                      <div className="w-32 h-2 bg-slate-100 mb-2 rounded-full"></div>
                      <div className="w-24 h-2 bg-slate-100 mb-8 rounded-full"></div>
                      <span className={`text-sm font-bold ${t.name === 'Tech' ? 'text-white' : 'text-slate-600'}`}>{t.name}</span>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 bg-white">
           <div className="max-w-4xl mx-auto bg-slate-900 rounded-[2.5rem] p-12 md:p-16 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to upgrade your career?</h2>
                <p className="text-xl text-slate-400 mb-10 max-w-xl mx-auto">Join thousands of professionals who switched to the smarter way of writing resumes.</p>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
                >
                  Create My CV Now <ArrowRight size={20} />
                </button>
              </div>
           </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-12 px-6">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center text-white">
                    <Sparkles size={12} />
                 </div>
                 <span className="font-bold text-slate-900">CV Forge</span>
              </div>
              <div className="text-slate-500 text-sm">
                © {new Date().getFullYear()} CV Forge AI. All rights reserved.
              </div>
           </div>
        </footer>

      </div>
    );
  }

  // Loading Screen
  if (loading) {
     return (
       <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden">
         <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
         <div className="text-center relative z-10 animate-fade-in">
           <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-8 shadow-2xl"></div>
           <h2 className="text-3xl font-bold text-slate-800 mb-2">Forging your CV...</h2>
           <p className="text-slate-500 text-lg">Analyzing experience • Formatting layout • Polishing details</p>
         </div>
       </div>
     )
  }

  // Main Editor/Preview Interface
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col h-screen overflow-hidden print:h-auto print:overflow-visible print:bg-white font-sans">
      <LimitDialog />
      
      {/* Modern Sticky Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-3 flex justify-between items-center shrink-0 h-18 shadow-sm print:hidden transition-all">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => {
           if(confirm("Return to home? Unsaved changes will be lost.")) {
             setCvData(null);
           }
        }}>
           <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
             <Sparkles size={20} />
           </div>
           <div>
             <h1 className="font-bold text-lg text-slate-800 leading-tight">CV Forge</h1>
             <p className="text-xs text-slate-500 font-medium">AI Resume Builder</p>
           </div>
        </div>
        
        <div className="flex items-center gap-6">
           {/* Template Selector - Desktop */}
           <div className="hidden md:flex items-center bg-slate-100/50 p-1.5 rounded-xl border border-slate-200/60 overflow-x-auto max-w-[40vw] custom-scrollbar gap-1">
             {Object.values(TemplateType).map((t) => (
               <button
                key={t}
                onClick={() => setSelectedTemplate(t)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex-shrink-0
                  ${selectedTemplate === t 
                    ? 'bg-white text-blue-600 shadow-md ring-1 ring-black/5 transform scale-[1.02]' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}
                `}
               >
                 {t}
               </button>
             ))}
           </div>

           <button 
             onClick={handleDownloadImage}
             disabled={downloading}
             className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all transform active:scale-95
               ${downloading 
                 ? 'bg-slate-800 cursor-wait opacity-80' 
                 : 'bg-slate-900 hover:bg-slate-800 text-white hover:shadow-slate-900/20'}
             `}
           >
             {downloading ? (
               <Loader2 size={18} className="animate-spin" />
             ) : (
               <ImageIcon size={18} />
             )}
             {downloading ? 'Exporting...' : 'Download Image'}
           </button>
           
           {/* Mobile Download Icon Only */}
           <button 
             onClick={handleDownloadImage}
             disabled={downloading}
             className="md:hidden p-3 bg-slate-900 text-white rounded-full shadow-lg"
           >
              {downloading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
           </button>
           
           {/* User Info & Logout */}
           <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
             <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-bold">{usageCount}/{MAX_FREE_ACTIONS}</span>
             <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Logout">
               <LogOut size={18} />
             </button>
           </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative print:overflow-visible print:h-auto print:block">
        
        {/* Editor Sidebar (Left) */}
        <div className={`
          w-full md:w-[450px] lg:w-[480px] bg-white border-r border-slate-200 z-20 flex flex-col transition-transform duration-300 absolute md:relative h-full shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]
          ${viewMode === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
          print:hidden
        `}>
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-10">
            <h2 className="font-bold text-slate-800 flex items-center gap-2 text-lg"><Edit2 size={18} className="text-blue-500"/> Editor</h2>
            {/* Mobile View Toggle */}
            <button 
              className="md:hidden flex items-center gap-1 text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full" 
              onClick={() => setViewMode('preview')}
            >
              Preview <ChevronRight size={14}/>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30">
             {cvData && <CVEditor data={cvData} onChange={setCvData} onFocusSection={handleFocusSection} />}
          </div>
        </div>

        {/* Preview Area (Right) */}
        <div className={`
          flex-1 bg-dot-pattern overflow-y-auto relative transition-all duration-300
          ${viewMode === 'editor' ? 'translate-x-full md:translate-x-0 opacity-50 md:opacity-100' : 'translate-x-0 opacity-100'}
          print:overflow-visible print:h-auto print:bg-white print:static print:opacity-100 print:transform-none
        `}>
           {/* Mobile View Toggle Overlay */}
           <button 
             className="md:hidden absolute top-6 left-6 z-30 bg-white p-3 rounded-full shadow-xl text-blue-600 border border-slate-100 print:hidden"
             onClick={() => setViewMode('editor')}
           >
             <Edit2 size={20} />
           </button>
           
           {scale < 1 && (
             <div className="absolute top-4 right-4 z-10 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border border-blue-100 flex items-center gap-2 animate-fade-in print:hidden">
               <Minimize2 size={14}/> Auto-fitting A4 ({Math.round(scale * 100)}%)
             </div>
           )}

           <div className="min-h-full p-6 md:p-12 flex justify-center print:p-0 print:block">
              {/* The Paper Container */}
              <div 
                id="resume-preview" 
                ref={previewRef}
                className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-2xl shadow-slate-400/20 origin-top transition-transform duration-300 print:w-full print:shadow-none print:max-w-none flex flex-col ring-1 ring-black/5"
                style={{
                  transform: scale < 1 ? `scale(${scale})` : 'none',
                  width: scale < 1 ? '210mm' : '210mm', // Keep base width same, just scale visual
                  marginBottom: scale < 1 ? `-${(1 - scale) * 297}mm` : '0', // Pull up bottom space
                }}
              >
                {renderTemplate()}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 shadow-lg shadow-slate-200/50 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
    <div className="mb-3 p-3 bg-white rounded-xl shadow-sm">{icon}</div>
    <span className="font-bold text-slate-800 text-lg mb-1">{title}</span>
    <p className="text-sm text-slate-500">{desc}</p>
  </div>
);

export default App;