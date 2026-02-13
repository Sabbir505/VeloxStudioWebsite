import React, { useState } from 'react';
import { Screen } from '../types';
import { Plus, Trash2, Smartphone, ArrowLeft, PanelLeftClose, PanelLeftOpen, Layout, MoreHorizontal, Layers } from 'lucide-react';

interface SidebarProps {
  screens: Screen[];
  activeScreenId: string | null;
  onSelectScreen: (id: string) => void;
  onDeleteScreen: (id: string) => void;
  onAddScreen: () => void;
  onBackToDashboard: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  screens, 
  activeScreenId, 
  onSelectScreen, 
  onDeleteScreen,
  onAddScreen,
  onBackToDashboard
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-[#050505] border-r border-white/5 flex flex-col h-full shrink-0 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] relative z-30`}>
      
      {/* Header */}
      <div className="h-14 flex items-center px-3 border-b border-white/5 justify-between bg-[#050505]/80 backdrop-blur-md">
         {!isCollapsed ? (
             <button 
                onClick={onBackToDashboard} 
                className="flex items-center gap-2 text-[11px] font-medium text-zinc-500 hover:text-zinc-300 transition-colors group py-1.5 px-2 rounded-md hover:bg-white/5 w-full"
             >
                <ArrowLeft className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                <span className="tracking-wide">Back to Projects</span>
             </button>
         ) : (
            <button onClick={onBackToDashboard} className="w-full flex justify-center py-2 text-zinc-600 hover:text-zinc-300">
                <ArrowLeft className="w-4 h-4" />
            </button>
         )}
      </div>

      {/* Screen List */}
      <div className="flex-1 overflow-y-auto py-3 space-y-0.5 no-scrollbar">
        {!isCollapsed && (
            <div className="px-4 mb-2 mt-2 flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Screens</span>
                <span className="text-[9px] text-zinc-600 font-mono bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded-full">{screens.length}</span>
            </div>
        )}

        {screens.map((screen, idx) => {
            const isActive = activeScreenId === screen.id;
            return (
              <div
                key={screen.id}
                onClick={() => onSelectScreen(screen.id)}
                className={`group relative flex items-center mx-2 px-2 py-2 rounded-md cursor-pointer transition-all duration-200 border border-transparent ${
                    isActive 
                    ? 'bg-zinc-900 text-white shadow-sm' 
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40'
                } ${isCollapsed ? 'justify-center mx-2 px-0 py-3' : ''}`}
              >
                {isActive && !isCollapsed && (
                    <div className="absolute left-0 w-0.5 h-4 bg-indigo-500 rounded-full my-auto ml-1"></div>
                )}

                <div className={`relative flex items-center justify-center transition-all ${isActive ? 'text-indigo-400' : 'text-zinc-600 group-hover:text-zinc-500'}`}>
                    <Smartphone className="w-4 h-4" />
                </div>
                
                {!isCollapsed && (
                    <div className="ml-3 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <span className={`text-[13px] truncate ${isActive ? 'font-medium text-zinc-200' : 'font-normal'}`}>
                                {screen.name}
                            </span>
                        </div>
                    </div>
                )}
                
                {!isCollapsed && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteScreen(screen.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded transition-all absolute right-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
        })}
        
        {screens.length === 0 && !isCollapsed && (
           <div className="px-6 py-12 flex flex-col items-center justify-center text-center border border-dashed border-zinc-900 mx-4 rounded-xl mt-4 bg-zinc-900/20">
              <Layers className="w-8 h-8 text-zinc-800 mb-2" />
              <p className="text-[11px] text-zinc-600 font-medium">No screens generated</p>
           </div>
        )}
      </div>

      {/* Footer Action */}
      <div className="p-3 border-t border-white/5 bg-[#050505]">
         <div className="flex gap-2">
            <button
                onClick={onAddScreen}
                className={`flex-1 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/5 py-2 rounded-lg text-xs font-medium transition-all group ${isCollapsed ? 'px-0' : ''}`}
                title="Add New Screen"
            >
                <Plus className="w-3.5 h-3.5 group-hover:text-white" />
                {!isCollapsed && <span>New Screen</span>}
            </button>
            <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-8 flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 border border-white/5 rounded-lg transition-all"
            >
                {isCollapsed ? <PanelLeftOpen className="w-3.5 h-3.5" /> : <PanelLeftClose className="w-3.5 h-3.5" />}
            </button>
         </div>
      </div>
    </div>
  );
};

export default Sidebar;