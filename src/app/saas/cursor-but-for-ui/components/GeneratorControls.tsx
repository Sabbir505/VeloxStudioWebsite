import React, { useState, useRef, useEffect } from 'react';
import { AppType, GenerationParams, ChatMessage, Screen } from '../types';
import { APP_TYPES, STYLE_PRESETS, THEME_COLORS } from '../constants';
import { Sparkles, Download, Settings2, User, Bot, CornerDownLeft, RefreshCw, Loader2, Image, FileCode, Archive, SendHorizonal, FileJson, Square, Layers, X, Wand2, MessageSquare, ChevronDown, Palette, Check, LayoutTemplate, MonitorSmartphone, ArrowRight } from 'lucide-react';

interface GeneratorControlsProps {
  onGenerate: (params: GenerationParams) => void;
  onRefine: (instruction: string, scope?: 'current' | 'all') => void;
  onExport: (format: 'json' | 'png' | 'svg' | 'zip') => void;
  onStop: () => void;
  isProcessing: boolean;
  hasScreens: boolean;
  messages: ChatMessage[];
  screens?: Screen[];
}

const SAMPLE_IDEAS = [
    { 
        label: "Finance App", 
        prompt: "Create a dark mode fintech dashboard with a balance graph, transaction list, and quick transfer buttons.",
        icon: "💳"
    },
    { 
        label: "Food Delivery", 
        prompt: "Design a vibrant food delivery app featuring a home feed with categories, a restaurant detail page, and a cart.",
        icon: "🍔"
    },
    { 
        label: "Health Tracker", 
        prompt: "Build a health tracking app with activity rings, heart rate history, and a workout summary view.",
        icon: "🏃"
    }
];

const GeneratorControls: React.FC<GeneratorControlsProps> = ({ 
  onGenerate, 
  onRefine,
  onExport,
  onStop,
  isProcessing,
  hasScreens,
  messages,
  screens = []
}) => {
  const [input, setInput] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showStyleMenu, setShowStyleMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [generationMode, setGenerationMode] = useState<'auto' | 'single'>('auto');
  
  // Default to Auto
  const [selectedStyle, setSelectedStyle] = useState(STYLE_PRESETS[0]);
  const [selectedColor, setSelectedColor] = useState(THEME_COLORS[0]);
  
  // Refinement Scope UI
  const [pendingChange, setPendingChange] = useState<{ type: 'style' | 'color', value: any } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const styleMenuRef = useRef<HTMLDivElement>(null);
  const colorMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
          if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
              setShowExportMenu(false);
          }
          if (styleMenuRef.current && !styleMenuRef.current.contains(event.target as Node)) {
              setShowStyleMenu(false);
          }
          if (colorMenuRef.current && !colorMenuRef.current.contains(event.target as Node)) {
              setShowColorMenu(false);
          }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const detectScreenCount = (text: string): number | null => {
    const explicitMatch = text.match(/\b(\d+)\s*(?:screens?|pages?|views?|uis?)\b/i);
    if (explicitMatch) {
      const count = parseInt(explicitMatch[1]);
      if (count > 0 && count <= 30) return count; 
    }
    const listMatches = text.match(/(?:^|[\r\n])\s*\d+[.)]\s/g);
    if (listMatches && listMatches.length > 0) {
        const count = listMatches.length;
        if (count > 0 && count <= 30) return count;
    }
    return null;
  };

  const isNewProjectPrompt = (text: string) => {
      const lower = text.toLowerCase();
      const count = detectScreenCount(text);
      if (count && count > 1) return true;
      if (/^(create|generate|design|build|make).+(app|application|interface|ui|screens)/i.test(lower)) return true;
      if (lower.split(' ').length < 10 && (lower.includes('app') || lower.includes('dashboard') || lower.includes('interface'))) return true;
      return false;
  };

  const handleSubmit = (textOverride?: string) => {
    const textToSubmit = textOverride || input;
    if (!textToSubmit.trim()) return;

    const detectedCount = detectScreenCount(textToSubmit);
    const isGeneration = textOverride ? true : (isNewProjectPrompt(textToSubmit) || !hasScreens);

    if (isGeneration) {
      let count = detectedCount || 8;
      if (generationMode === 'single') count = 1;

      onGenerate({
        appType: AppType.CUSTOM,
        description: textToSubmit,
        screenCount: count,
        style: selectedStyle.id === 'auto' ? 'auto' : selectedStyle.value,
        theme: selectedColor.id === 'auto' ? 'auto' : selectedColor.label
      });
    } else {
      onRefine(textToSubmit, 'current');
    }
    setInput('');
  };

  const handleApplyScope = (scope: 'current' | 'all') => {
      if (!pendingChange) return;

      if (pendingChange.type === 'color') {
          const color = pendingChange.value;
          setSelectedColor(color);
          if (scope === 'all') {
              onRefine(`Change the entire app theme to use ${color.label} as the primary color. Update all backgrounds, buttons, and accents to match the ${color.label} palette.`, 'all');
          } else {
              onRefine(`Update the primary color palette of THIS screen to use ${color.label}.`, 'current');
          }
      } else if (pendingChange.type === 'style') {
          const style = pendingChange.value;
          setSelectedStyle(style);
           if (scope === 'all') {
              onRefine(`Refine the visual style of ALL screens to match the '${style.label}' style. Description: ${style.value}`, 'all');
          } else {
              onRefine(`Refine the visual style of THIS screen to match the '${style.label}' style. Description: ${style.value}`, 'current');
          }
      }
      setPendingChange(null);
  };

  const initiateChange = (type: 'color' | 'style', value: any) => {
      // If no screens, just update state for future generation
      if (!hasScreens || isProcessing) {
          if (type === 'color') setSelectedColor(value);
          else setSelectedStyle(value);
          
          if (type === 'color') setShowColorMenu(false);
          else setShowStyleMenu(false);
          return;
      }

      // If screens exist, prompt for scope
      setPendingChange({ type, value });
      
      if (type === 'color') setShowColorMenu(false);
      else setShowStyleMenu(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleExportClick = (format: 'json' | 'png' | 'svg' | 'zip') => {
      onExport(format);
      setShowExportMenu(false);
  };

  return (
    <div className="w-[420px] bg-[#050505] border-l border-white/5 flex flex-col h-full shrink-0 z-20 relative shadow-2xl">
      
      {/* Scope Selection Overlay */}
      {pendingChange && (
          <div className="absolute inset-0 z-50 bg-[#050505]/90 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
              <div className="bg-[#121215] border border-white/10 rounded-2xl shadow-2xl p-5 w-full max-w-sm ring-1 ring-white/5 space-y-4">
                  <div className="text-center">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-3">
                          <Settings2 className="w-5 h-5 text-indigo-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Apply {pendingChange.type === 'color' ? 'Theme' : 'Style'} Change</h3>
                      <p className="text-sm text-zinc-400 mt-1">
                          Apply <span className="text-white font-medium">{pendingChange.value.label}</span> to active screen or all?
                      </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                      <button 
                        onClick={() => handleApplyScope('current')}
                        className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all group"
                      >
                          <MonitorSmartphone className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300" />
                          <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-200">Active Only</span>
                      </button>
                      <button 
                        onClick={() => handleApplyScope('all')}
                        className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-indigo-600/10 border border-indigo-500/20 hover:bg-indigo-600/20 hover:border-indigo-500/30 transition-all group"
                      >
                          <LayoutTemplate className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
                          <span className="text-xs font-medium text-indigo-300 group-hover:text-indigo-200">All Screens</span>
                      </button>
                  </div>
                  
                  <button 
                    onClick={() => setPendingChange(null)}
                    className="w-full py-2 text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors tracking-wide uppercase font-medium"
                  >
                      Cancel
                  </button>
              </div>
          </div>
      )}

      {/* Header */}
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-5 shrink-0 bg-[#050505]">
        <div className="flex items-center gap-3">
             <h2 className="text-sm font-semibold text-white tracking-tight">AI Designer</h2>
        </div>
        
        <div className="flex items-center gap-2">
            {/* Color Theme Selector */}
             <div className="relative" ref={colorMenuRef}>
                 <button 
                    onClick={() => setShowColorMenu(!showColorMenu)}
                    className="w-7 h-7 rounded-md bg-zinc-900 border border-white/10 flex items-center justify-center hover:bg-zinc-800 transition-colors group"
                    title={`Theme: ${selectedColor.label}`}
                 >
                    {selectedColor.id === 'auto' ? (
                        <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-indigo-400 via-purple-400 to-emerald-400 group-hover:scale-110 transition-transform shadow-sm" />
                    ) : (
                        <div className={`w-3 h-3 rounded-full ${selectedColor.class} ring-2 ring-zinc-900 group-hover:scale-110 transition-transform shadow-sm`} />
                    )}
                 </button>

                 {showColorMenu && (
                    <div className="absolute right-0 top-full mt-2 w-72 bg-[#121215] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 p-3 ring-1 ring-white/5 animate-in fade-in zoom-in-95 duration-200 grid grid-cols-6 gap-2">
                        {THEME_COLORS.map((color) => (
                            <button
                                key={color.id}
                                onClick={() => initiateChange('color', color)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${selectedColor.id === color.id ? 'ring-2 ring-white ring-offset-2 ring-offset-[#121215]' : 'hover:scale-110'}`}
                                title={color.label}
                            >
                                <div className={`w-full h-full rounded-full ${color.class} border border-white/10`} />
                            </button>
                        ))}
                    </div>
                 )}
             </div>

             {/* Style Selector */}
             <div className="relative" ref={styleMenuRef}>
                 <button 
                    onClick={() => setShowStyleMenu(!showStyleMenu)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all text-xs font-medium"
                    title="Design Style"
                 >
                    <span className="truncate max-w-[80px]">{selectedStyle.label}</span>
                    <ChevronDown className="w-3 h-3 opacity-50 shrink-0" />
                 </button>

                 {showStyleMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-[#121215] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 p-1 ring-1 ring-white/5 animate-in fade-in zoom-in-95 duration-200">
                        {STYLE_PRESETS.map((style) => (
                            <button
                                key={style.id}
                                onClick={() => initiateChange('style', style)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between group transition-colors ${selectedStyle.id === style.id ? 'bg-indigo-500/10 text-indigo-400' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}`}
                            >
                                <div>
                                    <span className="block font-medium">{style.label}</span>
                                    <span className="block text-[9px] opacity-60 mt-0.5 leading-tight">{style.description}</span>
                                </div>
                                {selectedStyle.id === style.id && <Check className="w-3 h-3 text-indigo-500" />}
                            </button>
                        ))}
                    </div>
                 )}
             </div>

             {/* Export Button */}
            <div className="relative" ref={exportMenuRef}>
                <button 
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  disabled={!hasScreens}
                  className="w-7 h-7 flex items-center justify-center rounded-md bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Export"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                
                {showExportMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-[#121215] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 ring-1 ring-white/5 animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-1 space-y-0.5">
                            <button onClick={() => handleExportClick('json')} className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 rounded-lg transition-colors text-left">
                                <FileJson className="w-3.5 h-3.5" />
                                <span>Export JSON</span>
                            </button>
                            <button onClick={() => handleExportClick('zip')} className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 rounded-lg transition-colors text-left">
                                <Archive className="w-3.5 h-3.5" />
                                <span>Export ZIP</span>
                            </button>
                            <div className="my-1 border-t border-white/5"></div>
                            <button onClick={() => handleExportClick('png')} className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 rounded-lg transition-colors text-left">
                                <Image className="w-3.5 h-3.5" />
                                <span>Export PNG</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar scroll-smooth">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in duration-500 px-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 border border-white/10 flex items-center justify-center mb-5 shadow-[0_0_40px_-10px_rgba(99,102,241,0.2)]">
               <Wand2 className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-sm font-medium text-white mb-2">Start Designing</h3>
            <p className="text-xs text-zinc-500 mb-6 max-w-[260px] leading-relaxed">
              Describe your app idea, and I'll generate the screens and code for you.
            </p>
            
            <div className="w-full space-y-2">
                {SAMPLE_IDEAS.map((idea, idx) => (
                    <button 
                        key={idx}
                        onClick={() => handleSubmit(idea.prompt)}
                        className="w-full text-left p-3 rounded-xl border border-white/5 bg-zinc-900/30 hover:bg-zinc-800/80 hover:border-white/10 transition-all group relative overflow-hidden"
                    >
                        <div className="flex items-center gap-3 relative z-10">
                            <span className="text-sm bg-zinc-900/80 rounded-md p-1.5 border border-white/5 text-zinc-400 group-hover:text-white transition-colors">{idea.icon}</span>
                            <div>
                                <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors block">{idea.label}</span>
                            </div>
                            <ArrowRight className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 ml-auto opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        </div>
                    </button>
                ))}
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300 gap-1`}>
               <span className="text-[10px] text-zinc-600 font-medium px-1">
                   {msg.role === 'user' ? 'You' : 'AI Designer'}
               </span>
               <div className={`max-w-[90%] px-4 py-3 text-xs leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-zinc-800/80 text-zinc-100 rounded-2xl rounded-tr-sm border border-white/5' 
                  : 'bg-zinc-900/50 text-zinc-300 rounded-2xl rounded-tl-sm border border-white/5'
              }`}>
                {msg.content}
              </div>
            </div>
          ))
        )}
        
        {isProcessing && (
           <div className="flex flex-col items-start gap-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <span className="text-[10px] text-zinc-600 font-medium px-1">AI Designer</span>
             <div className="bg-zinc-900/50 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-3">
                 <Loader2 className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
                 <span className="text-xs text-zinc-400">Generating screens...</span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#050505] relative z-30">
        <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-md pointer-events-none"></div>
            
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden transition-all group-focus-within:border-zinc-700 group-focus-within:bg-[#0a0a0c]">
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isProcessing ? "Generation in progress..." : "Describe changes or new screens..."}
                    className="w-full p-3 pr-12 text-sm text-zinc-200 bg-transparent placeholder:text-zinc-600 focus:outline-none resize-none min-h-[50px] max-h-32 custom-scrollbar"
                    rows={1}
                    style={{ minHeight: '50px' }}
                    disabled={isProcessing}
                />
                
                <div className="absolute right-2 bottom-2">
                    <button 
                        onClick={() => isProcessing ? onStop() : handleSubmit()}
                        disabled={!isProcessing && !input.trim()}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                        isProcessing 
                            ? 'text-white bg-zinc-800 hover:bg-zinc-700' 
                            : 'text-zinc-400 hover:text-white hover:bg-indigo-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-600'
                        }`}
                    >
                        {isProcessing ? <Square className="w-3.5 h-3.5 fill-current" /> : <CornerDownLeft className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
        
        <div className="mt-2 flex items-center justify-between px-1">
             <div className="flex gap-2">
                <button
                    onClick={() => setGenerationMode('auto')}
                    className={`text-[10px] font-medium px-2 py-1 rounded transition-colors ${generationMode === 'auto' ? 'bg-white/5 text-zinc-300' : 'text-zinc-600 hover:text-zinc-400'}`}
                >
                    Auto Flow
                </button>
                <button
                    onClick={() => setGenerationMode('single')}
                    className={`text-[10px] font-medium px-2 py-1 rounded transition-colors ${generationMode === 'single' ? 'bg-white/5 text-zinc-300' : 'text-zinc-600 hover:text-zinc-400'}`}
                >
                    Single Screen
                </button>
             </div>
             <span className="text-[10px] text-zinc-700 font-mono">CMD+ENTER</span>
        </div>
      </div>
    </div>
  );
};

export default GeneratorControls;