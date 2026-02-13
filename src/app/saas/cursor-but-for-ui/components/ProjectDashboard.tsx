
import React, { useState } from 'react';
import { Project, User } from '../types';
import { Plus, Folder, Trash2, Clock, LayoutGrid, Search, ArrowRight, Command, Monitor, LogOut, Sparkles } from 'lucide-react';
import { TEMPLATES, Template } from '../templates';

interface ProjectDashboardProps {
  projects: Project[];
  user: User;
  onCreateProject: (name: string) => void;
  onSelectProject: (id: string) => void;
  onDeleteProject: (id: string) => void;
  onLogout: () => void;
  onCreateFromTemplate: (template: Template) => void;
}

const ProjectDashboard: React.FC<ProjectDashboardProps> = ({
  projects,
  user,
  onCreateProject,
  onSelectProject,
  onDeleteProject,
  onLogout,
  onCreateFromTemplate
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProjectName.trim()) {
      onCreateProject(newProjectName.trim());
      setNewProjectName('');
      setIsCreating(false);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200 selection:bg-indigo-500/30 selection:text-indigo-200 font-sans relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none"></div>
      
      {/* Nav */}
      <div className="border-b border-white/5 bg-transparent backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white text-black rounded flex items-center justify-center font-bold text-xs">C</div>
                  <span className="text-sm font-semibold text-white tracking-tight">Studio</span>
              </div>
              
              <div className="flex items-center gap-4">
                  <div className="text-xs text-zinc-500 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                      <span className="hidden sm:inline font-medium text-zinc-400">{user.email}</span>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="text-xs font-medium text-zinc-500 hover:text-white transition-colors"
                  >
                      Sign Out
                  </button>
              </div>
          </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Projects</h1>
            <p className="text-zinc-500 text-sm">
              Manage your generated interfaces and prototypes.
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative group flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 group-focus-within:text-zinc-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-zinc-900/50 border border-white/5 rounded-lg text-sm text-zinc-300 placeholder:text-zinc-700 focus:outline-none focus:bg-zinc-900 focus:border-white/10 transition-all"
              />
            </div>
            <button 
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-zinc-200 rounded-lg text-sm font-semibold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98]"
            >
                <Plus className="w-4 h-4" />
                <span>New</span>
            </button>
          </div>
        </div>

        {/* Start from Template Section */}
        <div className="mb-12">
           <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h2 className="text-sm font-bold text-white tracking-wide uppercase">Start with a Template</h2>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Blank Canvas Card */}
              <button 
                  onClick={() => setIsCreating(true)}
                  className="group relative h-40 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/20 transition-all hover:bg-zinc-900 flex flex-col items-center justify-center p-6 text-center"
              >
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                     <Plus className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white">Blank Canvas</span>
                  <span className="text-xs text-zinc-500 mt-1">Start from scratch</span>
              </button>

              {/* Template Cards */}
              {TEMPLATES.map((template) => (
                  <button 
                      key={template.id}
                      onClick={() => onCreateFromTemplate(template)}
                      className="group relative h-40 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-indigo-500/30 transition-all hover:bg-zinc-900 flex flex-col items-start justify-end p-5 text-left overflow-hidden"
                  >
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
                      
                      {/* Preview Abstract Shape */}
                      <div className="absolute top-0 left-0 right-0 h-2/3 bg-zinc-800/50 p-3 group-hover:scale-105 transition-transform duration-500 origin-top">
                          {/* Simulated UI lines */}
                          <div className="w-1/2 h-2 bg-white/10 rounded mb-2"></div>
                          <div className="w-full h-16 bg-white/5 rounded border border-white/5 mb-2"></div>
                          <div className="w-2/3 h-2 bg-white/5 rounded"></div>
                      </div>

                      <div className="relative z-20">
                          <span className="text-[10px] text-indigo-400 font-medium bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/10 mb-2 inline-block">
                             {template.category}
                          </span>
                          <h3 className="text-sm font-medium text-white leading-tight">{template.name}</h3>
                          <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">{template.description}</p>
                      </div>
                  </button>
              ))}
           </div>
        </div>

        {/* Create Input */}
        {isCreating && (
           <div className="mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
              <form onSubmit={handleCreate} className="relative max-w-2xl">
                 <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Command className="w-4 h-4 text-zinc-500" />
                 </div>
                 <input 
                    autoFocus
                    type="text" 
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    onBlur={() => !newProjectName && setIsCreating(false)}
                    placeholder="Project name..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-xl"
                 />
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                     <span className="text-[10px] text-zinc-600 font-mono border border-zinc-800 rounded px-1.5 py-0.5">Enter</span>
                 </div>
              </form>
           </div>
        )}

        <div className="mb-4">
           <h2 className="text-sm font-bold text-white tracking-wide uppercase">Your Projects</h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="group relative bg-[#0A0A0A] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all duration-300 cursor-pointer flex flex-col h-[200px] hover:shadow-2xl hover:shadow-black/50"
            >
              {/* Hover Glow */}
              <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="w-10 h-10 rounded-lg bg-zinc-900/50 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-white transition-colors">
                    <LayoutGrid className="w-5 h-5" />
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDeleteProject(project.id);
                  }}
                  className="text-zinc-700 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 relative z-10">
                  <h3 className="text-base font-semibold text-zinc-200 group-hover:text-white transition-colors mb-1">{project.name}</h3>
                  <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      {project.description || "No description."}
                  </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/5 relative z-10">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-600">
                   <Clock className="w-3 h-3" />
                   <span>{new Date(project.lastModified).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                   <Monitor className="w-3 h-3" />
                   <span>{project.screens.length}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {!isCreating && filteredProjects.length === 0 && (
             <div 
                onClick={() => setIsCreating(true)}
                className="col-span-full h-40 flex flex-col items-center justify-center text-zinc-500 border border-dashed border-zinc-800 rounded-xl hover:border-zinc-700 hover:bg-zinc-900/20 transition-all cursor-pointer group"
             >
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Plus className="w-4 h-4 text-zinc-600" />
                </div>
                <span className="text-sm font-medium text-zinc-400">Create new project</span>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
