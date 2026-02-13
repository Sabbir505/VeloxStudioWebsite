import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Screen } from '../types';
import { Minus, Plus, Maximize, Trash2, MousePointer2 } from 'lucide-react';
import InspectorPanel from './InspectorPanel';
import { refineElement } from '../services/geminiService';

interface PreviewAreaProps {
  screens: Screen[];
  activeScreenId: string | null;
  onSelectScreen: (id: string) => void;
  onDeleteScreen?: (id: string) => void;
  onUpdateScreen?: (id: string, code: string) => void;
  isGenerating: boolean;
}

const SCREEN_WIDTH = 375;
const TOTAL_WIDTH = SCREEN_WIDTH;
const MIN_SCREEN_HEIGHT = 812;
const GAP = 64;
const PADDING = 100;
const MAX_COLS = 6;

// Modern Gradient Loader
const GradientLoader = () => (
  <div className="w-full flex-1 relative overflow-hidden bg-[#050505] flex flex-col min-h-full">
    {/* Animated Gradient Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-gradient bg-[length:400%_400%]"></div>
    
    {/* Glassmorphism Overlay */}
    <div className="absolute inset-0 backdrop-blur-[100px]"></div>

    {/* Skeleton Structure - Abstract representation of UI */}
    <div className="relative z-10 p-6 pt-20 space-y-8 h-full flex flex-col opacity-40">
        {/* Header */}
        <div className="flex justify-between items-center">
             <div className="w-24 h-6 bg-white/10 rounded-full animate-pulse"></div>
             <div className="w-10 h-10 bg-white/10 rounded-full animate-pulse"></div>
        </div>

        {/* Hero */}
        <div className="w-full h-64 bg-gradient-to-tr from-white/10 to-white/0 rounded-[2rem] border border-white/5 animate-pulse"></div>

        {/* Content Lines */}
        <div className="space-y-4 flex-1">
             <div className="w-3/4 h-4 bg-white/10 rounded animate-pulse"></div>
             <div className="w-1/2 h-4 bg-white/10 rounded animate-pulse"></div>
             <div className="w-full h-4 bg-white/5 rounded animate-pulse mt-8"></div>
             <div className="w-full h-4 bg-white/5 rounded animate-pulse"></div>
             <div className="w-2/3 h-4 bg-white/5 rounded animate-pulse"></div>
        </div>
        
        {/* Bottom Bar */}
        <div className="w-full h-20 bg-white/5 rounded-[2rem] animate-pulse mt-auto mx-auto mb-4"></div>
    </div>
    
    {/* Floating Status Tag */}
    <div className="absolute inset-0 flex items-center justify-center z-20">
         <div className="px-5 py-2.5 bg-black/30 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-3 shadow-2xl">
             <div className="flex gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-indigo-400 animate-[bounce_1s_infinite_0ms]"></div>
                 <div className="w-2 h-2 rounded-full bg-purple-400 animate-[bounce_1s_infinite_200ms]"></div>
                 <div className="w-2 h-2 rounded-full bg-pink-400 animate-[bounce_1s_infinite_400ms]"></div>
             </div>
             <span className="text-xs font-medium text-white/90 tracking-wide">GENERATING</span>
         </div>
    </div>
  </div>
);

// Memoized Screen Component
const ScreenPreview = React.memo(({ 
  screen, 
  index, 
  isActive, 
  onSelect, 
  onDelete,
  inspectMode,
  onElementClick,
  onElementHover
}: { 
  screen: Screen; 
  index: number; 
  isActive: boolean; 
  onSelect: (id: string) => void; 
  onDelete?: (id: string) => void;
  inspectMode: boolean;
  onElementClick?: (e: React.MouseEvent, screenId: string) => void;
  onElementHover?: (e: React.MouseEvent) => void;
}) => {
  return (
    <div 
      className={`screen-content-wrapper relative flex-shrink-0 flex flex-col group transition-all duration-300 ${isActive ? 'z-10' : 'z-0'}`}
      style={{ width: TOTAL_WIDTH, contain: 'layout style' }}
      onClick={(e) => { 
          if (!inspectMode) {
            e.stopPropagation(); 
            onSelect(screen.id);
          }
      }}
    >
      {/* Screen Label */}
      <div className={`mb-4 flex items-center gap-2 self-center transition-all duration-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-60 group-hover:opacity-100'}`}>
        <span className={`text-xs font-medium bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/5 transition-colors ${isActive ? 'text-white border-white/20' : 'text-zinc-500'}`}>{screen.name}</span>
      </div>
      
      {/* Frameless Canvas */}
      <div 
        id={`screen-preview-${screen.id}`}
        className={`relative rounded-3xl overflow-hidden transition-all duration-500 flex flex-col box-border border border-white/5 ${isActive ? 'shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] scale-[1.01] ring-1 ring-white/10' : 'shadow-2xl bg-[#050505]'}`}
        style={{ 
          width: TOTAL_WIDTH, 
          minHeight: MIN_SCREEN_HEIGHT, 
          height: 'auto',
          transform: 'translate3d(0,0,0)',
        }}
      >
        {/* Inner Screen Container */}
        <div 
            className="relative w-full h-full flex-1 bg-[#050505] flex flex-col"
        >
            {/* Screen Content Render */}
            <div className={`w-full flex-1 relative flex flex-col transform-gpu ${screen.isGenerating && !screen.code ? 'bg-[#050505]' : 'bg-[#050505]'}`}>
            {screen.isGenerating && !screen.code ? <GradientLoader /> : (
                <div 
                    className={`w-full flex-1 flex flex-col [&>div]:min-h-full [&>div]:flex-1 ${inspectMode ? 'cursor-crosshair' : ''}`}
                    dangerouslySetInnerHTML={{ __html: screen.code }} 
                    onClick={(e) => inspectMode && onElementClick && onElementClick(e, screen.id)}
                    onMouseMove={(e) => inspectMode && onElementHover && onElementHover(e)}
                    onMouseLeave={(e) => inspectMode && onElementHover && onElementHover(e)}
                />
            )}

            {/* Mini Streaming Indicator */}
            {screen.isGenerating && screen.code && (
                <div className="absolute bottom-4 right-4 z-50 pointer-events-none animate-in fade-in zoom-in duration-300">
                    <div className="flex items-center gap-2 px-2.5 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[9px] font-medium text-white/90 shadow-xl">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                        <span>Streaming...</span>
                    </div>
                </div>
            )}
            </div>
        </div>
      </div>

      {onDelete && !screen.isGenerating && !inspectMode && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(screen.id); }}
          className="absolute top-4 -right-12 p-2 bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-zinc-700 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all z-50 shadow-lg group-hover:-translate-x-full"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}, (prev, next) => {
  return (
    prev.screen === next.screen && 
    prev.isActive === next.isActive &&
    prev.index === next.index &&
    prev.inspectMode === next.inspectMode
  );
});

const PreviewArea: React.FC<PreviewAreaProps> = ({ 
  screens, 
  activeScreenId, 
  onSelectScreen, 
  onDeleteScreen, 
  onUpdateScreen,
  isGenerating 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Inspector State
  const [inspectMode, setInspectMode] = useState(false);
  const [hoverRect, setHoverRect] = useState<{top: number, left: number, width: number, height: number} | null>(null);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getGridDimensions = () => {
    const total = screens.length;
    if (total === 0) return { width: 0, height: 0, cols: 0, rows: 0 };
    const cols = Math.min(total, MAX_COLS);
    const rows = Math.ceil(total / cols);
    const width = (cols * TOTAL_WIDTH) + ((cols - 1) * GAP); 
    const height = (rows * MIN_SCREEN_HEIGHT) + ((rows - 1) * GAP);
    return { width, height, cols, rows };
  };

  const fitToView = useCallback(() => {
    if (!containerRef.current || screens.length === 0) return;
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const { width: contentWidth, height: contentHeight } = getGridDimensions();
    if (contentWidth === 0) return;
    const paddedWidth = contentWidth + (PADDING * 2);
    const paddedHeight = contentHeight + (PADDING * 2);
    const scaleX = containerWidth / paddedWidth;
    const scaleY = containerHeight / paddedHeight;
    const newScale = Math.min(Math.min(scaleX, scaleY), 0.85);
    const newX = (containerWidth - (contentWidth * newScale)) / 2;
    const newY = (containerHeight - (contentHeight * newScale)) / 2;
    setScale(newScale);
    setPosition({ x: newX, y: newY });
  }, [screens.length]);

  useEffect(() => {
    fitToView();
  }, [fitToView]);

  useEffect(() => {
      // Exit inspect mode if switching screens via other means or generating
      if (isGenerating) {
          setInspectMode(false);
          setSelectedElement(null);
          setHoverRect(null);
          setSelectedId(null);
      }
  }, [isGenerating, activeScreenId]);

  // Re-acquire selected element after screen update/re-render
  useEffect(() => {
      if (inspectMode && selectedId && activeScreenId) {
          const screenContainer = document.getElementById(`screen-preview-${activeScreenId}`);
          if (screenContainer) {
              const el = screenContainer.querySelector(`[data-cursor-id="${selectedId}"]`);
              if (el && el !== selectedElement) {
                  setSelectedElement(el);
                  const rect = el.getBoundingClientRect();
                  const containerRect = containerRef.current?.getBoundingClientRect();
                  if (containerRect) {
                      setHoverRect({
                          top: rect.top - containerRect.top,
                          left: rect.left - containerRect.left,
                          width: rect.width,
                          height: rect.height
                      });
                  }
              }
          }
      }
  }, [screens, inspectMode, selectedId, activeScreenId]);

  const handleWheel = (e: React.WheelEvent) => {
    if (!containerRef.current) return;
    
    // Always zoom on wheel (as per user request)
    const zoomSensitivity = 0.001;
    const delta = -e.deltaY * zoomSensitivity; 
    const nextScale = Math.min(Math.max(0.1, scale + delta), 3);

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const worldX = (mouseX - position.x) / scale;
    const worldY = (mouseY - position.y) / scale;

    const newX = mouseX - worldX * nextScale;
    const newY = mouseY - worldY * nextScale;

    setScale(nextScale);
    setPosition({ x: newX, y: newY });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag if clicking on background and NOT in inspect mode
    if (inspectMode) return;
    if ((e.target as HTMLElement).closest('.screen-content-wrapper')) return;
    if ((e.target as HTMLElement).closest('button')) return;
    
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => setIsDragging(false);
  
  const updateScaleCentered = (newScale: number) => {
    if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const worldX = (centerX - position.x) / scale;
        const worldY = (centerY - position.y) / scale;
        const newX = centerX - worldX * newScale;
        const newY = centerY - worldY * newScale;
        setPosition({ x: newX, y: newY });
    }
    setScale(newScale);
  };
  
  const handleZoomIn = () => updateScaleCentered(Math.min(scale + 0.1, 3));
  const handleZoomOut = () => updateScaleCentered(Math.max(scale - 0.1, 0.1));

  // --- INSPECTOR LOGIC ---

  const handleInspectHover = (e: React.MouseEvent) => {
      if (!inspectMode) return;
      e.stopPropagation();
      const target = e.target as HTMLElement;
      
      // Don't highlight the container itself if possible
      if (target.id.startsWith('screen-preview') || target.tagName === 'BODY' || target.tagName === 'HTML') {
          setHoverRect(null);
          return;
      }

      const rect = target.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();

      if (containerRect) {
          // We need to calculate position relative to the SCALED content div
          // But since the highlight is absolute over the viewport/container, let's just stick to screen coords relative to container
          setHoverRect({
              top: rect.top - containerRect.top,
              left: rect.left - containerRect.left,
              width: rect.width,
              height: rect.height
          });
      }
  };

  const handleInspectClick = (e: React.MouseEvent, screenId: string) => {
      if (!inspectMode) return;
      e.stopPropagation();
      e.preventDefault();
      
      const target = e.target as Element;
      if (target) {
          // Identify element with stable ID
          let id = target.getAttribute('data-cursor-id');
          if (!id) {
              id = `el-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
              target.setAttribute('data-cursor-id', id);
              // Save state immediately to persist ID
              saveCurrentScreenState();
          }
          
          setSelectedId(id);
          setSelectedElement(target);
          if (screenId !== activeScreenId) {
              onSelectScreen(screenId);
          }
      }
  };

  const saveCurrentScreenState = useCallback(() => {
    if (!activeScreenId || !onUpdateScreen) return;
    const screenEl = document.getElementById(`screen-preview-${activeScreenId}`);
    if (screenEl) {
        // We now have a nested structure: Bezel -> ScreenWrapper -> Content
        // The dangerouslySetInnerHTML is inside the inner div
        const screenWrapper = screenEl.querySelector('.transform-gpu');
        if (screenWrapper && screenWrapper.lastElementChild) {
             const newCode = screenWrapper.lastElementChild.innerHTML;
             
             // The div with dangerouslySetInnerHTML is a child of the flex-col wrapper
             const contentDiv = screenEl.querySelector('[dangerouslySetInnerHTML]') || screenEl.querySelector('.w-full.flex-1.flex.flex-col');
             
             if (contentDiv) {
                 onUpdateScreen(activeScreenId, contentDiv.innerHTML);
             }
        }
    }
  }, [activeScreenId, onUpdateScreen]);

  const handleElementUpdate = (updates: { className?: string; innerText?: string }) => {
    if (!selectedElement || !activeScreenId) return;

    if (updates.className !== undefined) {
        // Safe update for both HTML and SVG elements
        selectedElement.setAttribute('class', updates.className);
    }
    
    if (updates.innerText !== undefined) {
        // Prefer innerText, fall back to textContent for SVGs
        if (selectedElement instanceof HTMLElement) {
            selectedElement.innerText = updates.innerText;
        } else {
            selectedElement.textContent = updates.innerText;
        }
    }

    // Force re-render of hover rect if size changed
    const rect = selectedElement.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
        setHoverRect({
            top: rect.top - containerRect.top,
            left: rect.left - containerRect.left,
            width: rect.width,
            height: rect.height
        });
    }

    // Debounce save to prevent trashing the DOM/State
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
        saveCurrentScreenState();
    }, 600);
  };

  const handleAiRefine = async (prompt: string) => {
      if (!selectedElement || !activeScreenId) return;
      
      const currentHTML = selectedElement.outerHTML;
      try {
          const newHTML = await refineElement(currentHTML, prompt);
          if (newHTML && selectedElement.parentElement) {
              // Create a temp container to parse the new HTML safely
              const temp = document.createElement('div');
              temp.innerHTML = newHTML;
              const newEl = temp.firstElementChild;
              
              if (newEl instanceof Element) {
                  // If we replaced it, we need to ensure the ID is carried over or handled
                  const currentId = selectedElement.getAttribute('data-cursor-id') || selectedId;
                  if (currentId) newEl.setAttribute('data-cursor-id', currentId);

                  selectedElement.replaceWith(newEl);
                  setSelectedElement(newEl); 
                  
                  // Update hover rect
                  const rect = newEl.getBoundingClientRect();
                  const containerRect = containerRef.current?.getBoundingClientRect();
                  if (containerRect) {
                       setHoverRect({
                          top: rect.top - containerRect.top,
                          left: rect.left - containerRect.left,
                          width: rect.width,
                          height: rect.height
                      });
                  }
  
                  saveCurrentScreenState();
              }
          }
      } catch (e) {
          console.error("AI Refine Error", e);
          throw e;
      }
  };

  const handleDeleteElement = () => {
      if(selectedElement) {
          selectedElement.remove();
          setSelectedElement(null);
          setHoverRect(null);
          setSelectedId(null);
          saveCurrentScreenState();
      }
  };

  const gridDims = getGridDimensions();

  return (
    <div 
      className="flex-1 relative bg-[#0C0C0E] overflow-hidden select-none"
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Background with centralized radial gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-[#0C0C0E] to-[#0C0C0E]"></div>

      {/* Subtle Dot Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: `${24 * scale}px ${24 * scale}px`,
          backgroundPosition: `${position.x}px ${position.y}px`
        }}
      />

      <div 
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: '0 0',
          width: gridDims.width, 
          willChange: isDragging ? 'transform' : 'auto',
          transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: `${GAP}px`, width: `${gridDims.width}px`, alignItems: 'flex-start' }}>
          {screens.map((screen, index) => (
            <ScreenPreview
                key={screen.id}
                screen={screen}
                index={index}
                isActive={activeScreenId === screen.id}
                onSelect={onSelectScreen}
                onDelete={onDeleteScreen}
                inspectMode={inspectMode}
                onElementClick={handleInspectClick}
                onElementHover={handleInspectHover}
            />
          ))}
        </div>
      </div>
      
      {/* Inspector Highlight Overlay */}
      {inspectMode && hoverRect && (
          <div 
             className="absolute pointer-events-none z-50 border-2 border-indigo-500 bg-indigo-500/10 transition-all duration-75"
             style={{
                 top: hoverRect.top,
                 left: hoverRect.left,
                 width: hoverRect.width,
                 height: hoverRect.height,
             }}
          />
      )}

      {/* Inspector Panel Overlay */}
      {inspectMode && selectedElement && (
          <InspectorPanel 
              element={selectedElement}
              onUpdate={handleElementUpdate}
              onAiUpdate={handleAiRefine}
              onClose={() => { setSelectedElement(null); setSelectedId(null); }}
              onDelete={handleDeleteElement}
          />
      )}

      {/* Toolbar */}
      <div className="absolute bottom-8 right-8 flex items-center gap-3 z-50">
        
        {/* Inspection Toggle */}
        <button 
            onClick={() => {
                setInspectMode(!inspectMode);
                setSelectedElement(null);
                setHoverRect(null);
                setSelectedId(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-2xl transition-all ${
                inspectMode 
                ? 'bg-indigo-600 border-indigo-500 text-white' 
                : 'bg-zinc-900/90 backdrop-blur-md border-white/10 text-zinc-400 hover:text-white'
            }`}
        >
            <MousePointer2 className="w-4 h-4" />
            <span className="text-xs font-semibold">{inspectMode ? 'Inspecting' : 'Inspect'}</span>
        </button>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-1 bg-zinc-900/90 backdrop-blur-md border border-white/10 p-1.5 rounded-full shadow-2xl">
            <button onClick={handleZoomOut} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"><Minus className="w-4 h-4" /></button>
            <span className="text-[10px] font-mono text-zinc-500 w-8 text-center">{Math.round(scale * 100)}%</span>
            <button onClick={handleZoomIn} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"><Plus className="w-4 h-4" /></button>
            <div className="w-px h-3 bg-white/10 mx-1" />
            <button onClick={fitToView} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"><Maximize className="w-3.5 h-3.5" /></button>
        </div>
      </div>
    </div>
  );
};

export default PreviewArea;