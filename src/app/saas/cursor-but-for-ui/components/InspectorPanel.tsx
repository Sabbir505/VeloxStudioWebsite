import React, { useEffect, useState } from 'react';
import { X, Code, Type, Box, Trash2, Wand2, Loader2, Send } from 'lucide-react';

interface InspectorPanelProps {
  element: Element | null;
  onUpdate: (updates: { className?: string; innerText?: string }) => void;
  onAiUpdate: (prompt: string) => Promise<void>;
  onClose: () => void;
  onDelete: () => void;
}

const InspectorPanel: React.FC<InspectorPanelProps> = ({ element, onUpdate, onAiUpdate, onClose, onDelete }) => {
  const [className, setClassName] = useState('');
  const [innerText, setInnerText] = useState('');
  const [tagName, setTagName] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    if (element) {
      // Safely get class name (SVG elements have className as SVGAnimatedString)
      const currentClass = element.getAttribute('class') || '';
      setClassName(prev => currentClass !== prev ? currentClass : prev);
      
      // Safely get text content (SVG elements might not have innerText)
      // We prioritize innerText for HTML elements as it represents rendered text, fallback to textContent
      const newText = (element instanceof HTMLElement) ? element.innerText : (element.textContent || '');
      setInnerText(prev => newText !== prev ? newText : prev);
      
      setTagName(element.tagName.toLowerCase());
      setAiPrompt('');
    }
  }, [element]);

  if (!element) return null;

  const handleClassChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    setClassName(newVal);
    // Pass to parent to handle DOM update safely
    onUpdate({ className: newVal });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    setInnerText(newVal);
    onUpdate({ innerText: newVal });
  };

  const handleAiSubmit = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    try {
        await onAiUpdate(aiPrompt);
        setAiPrompt('');
    } catch (e) {
        console.error(e);
    } finally {
        setIsAiLoading(false);
    }
  };

  const isContainer = element.children.length > 0;
  // Safe text access for disabled check
  const elementTextLength = ((element instanceof HTMLElement) ? element.innerText : (element.textContent || '')).length;

  return (
    <div 
        className="absolute top-4 right-4 w-80 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl flex flex-col z-[100] animate-in slide-in-from-right-4 fade-in duration-200"
        onWheel={(e) => e.stopPropagation()}
    >
      
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5 bg-zinc-900 rounded-t-xl">
        <div className="flex items-center gap-2">
            <div className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono text-[10px] uppercase font-bold border border-indigo-500/20">
                {tagName}
            </div>
            <span className="text-xs text-zinc-400 font-medium">Inspector</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded text-zinc-500 hover:text-white transition-colors">
            <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
        
        {/* AI Edit Section */}
        <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                <Wand2 className="w-3 h-3" />
                <span>Edit with AI</span>
            </div>
            <div className="relative">
                <textarea 
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    disabled={isAiLoading}
                    className="w-full bg-zinc-900 border border-indigo-500/20 rounded-lg p-2.5 pr-8 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 resize-none h-20 placeholder:text-indigo-500/30"
                    placeholder="e.g. Make this button red and rounded..."
                />
                <button 
                    onClick={handleAiSubmit}
                    disabled={isAiLoading || !aiPrompt.trim()}
                    className="absolute right-2 bottom-2 p-1.5 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                    {isAiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                </button>
            </div>
        </div>

        {/* Classes Input */}
        <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                <Code className="w-3 h-3" />
                <span>Tailwind Classes</span>
            </div>
            <textarea 
                value={className}
                onChange={handleClassChange}
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-xs font-mono text-zinc-300 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all leading-relaxed resize-none h-24"
                placeholder="text-red-500 p-4..."
            />
        </div>

        {/* Text Input - Only if leaf node or mostly text */}
        <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                <Type className="w-3 h-3" />
                <span>Content</span>
            </div>
            <textarea 
                value={innerText}
                onChange={handleTextChange}
                disabled={isContainer && elementTextLength > 50} 
                className={`w-full bg-black/30 border border-white/10 rounded-lg p-3 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all leading-relaxed resize-none h-20 ${isContainer ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder={isContainer ? "Contains nested elements - edit unavailable" : "Element text content..."}
            />
            {isContainer && <p className="text-[10px] text-zinc-600">Editing text on containers is disabled to preserve structure.</p>}
        </div>

        {/* Info / Metrics */}
        <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2">
            <div className="bg-white/5 rounded-lg p-2">
                <span className="block text-[10px] text-zinc-500 uppercase">Width</span>
                <span className="text-xs font-mono text-zinc-300">{Math.round(element.getBoundingClientRect().width)}px</span>
            </div>
            <div className="bg-white/5 rounded-lg p-2">
                <span className="block text-[10px] text-zinc-500 uppercase">Height</span>
                <span className="text-xs font-mono text-zinc-300">{Math.round(element.getBoundingClientRect().height)}px</span>
            </div>
        </div>

        <button 
            onClick={onDelete}
            className="w-full flex items-center justify-center gap-2 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-semibold transition-colors border border-red-500/10"
        >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Element</span>
        </button>

      </div>
    </div>
  );
};

export default InspectorPanel;