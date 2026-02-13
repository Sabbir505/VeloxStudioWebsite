
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PreviewArea from './components/PreviewArea';
import GeneratorControls from './components/GeneratorControls';
import Sidebar from './components/Sidebar';
import ProjectDashboard from './components/ProjectDashboard';
import AuthScreen from './components/AuthScreen';
import { Screen, GenerationParams, ChatMessage, Project, User } from './types';
import { generateAppScreensStream, refineScreen } from './services/geminiService';
import { authService } from './services/authService';
import { firestoreService } from './services/firestoreService';
import { MOCK_SCREEN } from './constants';
import { TEMPLATES, Template } from './templates';
import { toPng, toSvg } from 'html-to-image';
import JSZip from 'jszip';

const App: React.FC = () => {
  // --- AUTH STATE ---
  const [user, setUser] = useState<User | null>(null);

  // --- APP STATE ---
  // Projects are now loaded based on the user, init as empty until auth resolves
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeScreenId, setActiveScreenId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [promptCount, setPromptCount] = useState<number>(0);
  const [showLimitDialog, setShowLimitDialog] = useState<boolean>(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  // --- FREE TIER LIMITS ---
  const MAX_PROJECTS = 1;
  const MAX_PROMPTS = 3;

  // Check for session on mount via Firebase listener
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = authService.onAuthChanged((fbUser) => {
      setUser(fbUser);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  // Load User's Projects from Firestore whenever 'user' changes
  useEffect(() => {
    if (!user) {
        setProjects([]);
        setActiveProjectId(null);
        return;
    }

    // Real-time listener on user's projects collection
    const unsubscribe = firestoreService.subscribeProjects(user.id, (firebaseProjects) => {
        if (firebaseProjects.length === 0) {
            // Give new users the demo project
            const demo: Project = {
                id: 'demo-project',
                name: 'Demo Project',
                description: 'A sample project to show capabilities.',
                createdAt: Date.now(),
                lastModified: Date.now(),
                screens: [MOCK_SCREEN]
            };
            firestoreService.saveProject(user.id, demo);
            // The listener will fire again with the saved demo
        } else {
            setProjects(firebaseProjects);
        }
    });

    return unsubscribe;
  }, [user]);


  // Derived state
  const activeProject = projects.find(p => p.id === activeProjectId);
  const screens = activeProject?.screens || [];

  // When entering a project, set the first screen active if none selected
  useEffect(() => {
      if (activeProjectId && screens.length > 0 && !screens.find(s => s.id === activeScreenId)) {
          setActiveScreenId(screens[0].id);
      }
  }, [activeProjectId, screens, activeScreenId]);


  // --- HELPERS ---
  const isRateLimitError = (error: any) => {
    const status = error?.status || error?.error?.status;
    const code = error?.code || error?.error?.code;
    const message = error?.message || error?.error?.message;
    
    return (
      code === 429 || 
      status === 'RESOURCE_EXHAUSTED' || 
      (typeof message === 'string' && (message.includes('429') || message.includes('quota')))
    );
  };

  const updateActiveProject = (updater: (project: Project) => Project) => {
      if (!activeProjectId || !user) return;
      setProjects(prev => {
          const updated = prev.map(p => {
              if (p.id === activeProjectId) {
                  const result = updater(p);
                  // Persist to Firestore in background
                  firestoreService.saveProject(user.id, result).catch(console.error);
                  return result;
              }
              return p;
          });
          return updated;
      });
  };

  // --- ACTIONS ---

  const handleLogin = (user: User) => {
      setUser(user);
  };

  const handleLogout = async () => {
      await authService.logout();
      setUser(null);
  };

  const handleCreateProject = (name: string) => {
      // Free tier: max 1 project
      if (projects.length >= MAX_PROJECTS) {
          setShowLimitDialog(true);
          return;
      }
      const newProject: Project = {
          id: `proj-${Date.now()}`,
          name: name,
          description: 'New project',
          createdAt: Date.now(),
          lastModified: Date.now(),
          screens: []
      };
      setProjects(prev => [newProject, ...prev]);
      setActiveProjectId(newProject.id);
      setMessages([]);
      // Persist to Firestore
      if (user) firestoreService.saveProject(user.id, newProject).catch(console.error);
  };
  
  const handleCreateFromTemplate = (template: Template) => {
      // Free tier: max 1 project
      if (projects.length >= MAX_PROJECTS) {
          setShowLimitDialog(true);
          return;
      }
      // Deep clone screens to ensure unique IDs if needed in future
      const clonedScreens = template.screens.map(s => ({
          ...s,
          id: `${template.id}-screen-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
      }));

      const newProject: Project = {
          id: `proj-${Date.now()}`,
          name: template.name,
          description: `Started from ${template.name} template.`,
          createdAt: Date.now(),
          lastModified: Date.now(),
          screens: clonedScreens
      };

      setProjects(prev => [newProject, ...prev]);
      setActiveProjectId(newProject.id);
      setActiveScreenId(clonedScreens[0].id);
      setMessages([]);
      // Persist to Firestore
      if (user) firestoreService.saveProject(user.id, newProject).catch(console.error);
  };

  const handleDeleteProject = (id: string) => {
      if (confirm('Are you sure you want to delete this project?')) {
          setProjects(prev => prev.filter(p => p.id !== id));
          if (activeProjectId === id) setActiveProjectId(null);
          // Delete from Firestore
          if (user) firestoreService.deleteProject(user.id, id).catch(console.error);
      }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
    }
    setIsProcessing(false);
    
    // Mark screens as not generating
    updateActiveProject(p => ({
        ...p,
        screens: p.screens.map(s => s.isGenerating ? { ...s, isGenerating: false } : s)
    }));

    setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Generation stopped by user.',
        timestamp: Date.now()
    }]);
  };

  const handleGenerate = async (params: GenerationParams) => {
    if (!activeProjectId) return;
    // Free tier: max 3 prompts
    if (promptCount >= MAX_PROMPTS) {
        setShowLimitDialog(true);
        return;
    }
    setPromptCount(prev => prev + 1);
    setIsProcessing(true);
    
    // Create new abort controller
    abortControllerRef.current = new AbortController();
    
    // Add user message
    const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: params.description,
        timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);

    // Create placeholder screens
    const placeholders: Screen[] = Array.from({ length: params.screenCount }).map((_, i) => ({
      id: `placeholder-${Date.now()}-${i}`,
      name: `Preparing Screen ${i + 1}`,
      description: 'AI is constructing this interface...',
      code: '',
      isGenerating: true
    }));
    
    // Reset project screens with placeholders
    updateActiveProject(p => ({
        ...p,
        screens: placeholders,
        description: params.description.slice(0, 100) + (params.description.length > 100 ? '...' : ''),
        lastModified: Date.now()
    }));
    
    if (placeholders.length > 0) {
      setActiveScreenId(placeholders[0].id);
    }

    try {
      await generateAppScreensStream(
          params, 
          (partialScreen, index, isComplete) => {
            setProjects(prevProjects => {
                return prevProjects.map(proj => {
                    if (proj.id !== activeProjectId) return proj;

                    const currentScreens = [...proj.screens];
                    
                    // Logic to update the specific screen index safely
                    if (index < currentScreens.length) {
                        const existing = currentScreens[index];
                        currentScreens[index] = {
                            ...existing,
                            name: partialScreen.name || existing.name,
                            description: partialScreen.description || existing.description,
                            code: partialScreen.code || existing.code,
                            isGenerating: !isComplete
                        };
                    } else if (partialScreen.name) {
                        // Append if new
                        currentScreens.push({
                            id: `gen-extra-${Date.now()}-${index}`,
                            name: partialScreen.name,
                            description: partialScreen.description || '',
                            code: partialScreen.code || '',
                            isGenerating: !isComplete
                        });
                    }
                    
                    return { ...proj, screens: currentScreens, lastModified: Date.now() };
                });
            });
          }, 
          abortControllerRef.current.signal
      );

      // Cleanup logic after stream ends
      updateActiveProject(p => ({
          ...p,
          screens: p.screens.map(s => {
              if (s.isGenerating && s.code.length > 10) return { ...s, isGenerating: false };
              if (s.isGenerating && s.code.length === 0) return { ...s, isGenerating: false, code: '<div class="flex items-center justify-center h-full text-zinc-500">Generation incomplete</div>' };
              return s;
          })
      }));

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I've generated the screens for your application. You can now refine them or ask for changes.`,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMsg]);

    } catch (error: any) {
      if (error.message === "Aborted") {
          console.log("Generation aborted");
          return;
      }
      
      console.error("Failed to generate screens:", error);
      let errorMessage = "Sorry, I encountered an error while generating. Please try again.";
      if (isRateLimitError(error)) {
          errorMessage = "You have exceeded the API rate limit. Please wait a moment before trying again.";
      }
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: errorMessage, timestamp: Date.now() }]);
      
      // Remove broken empty screens
      updateActiveProject(p => ({ ...p, screens: p.screens.filter(s => s.code.length > 0) }));
    } finally {
      setIsProcessing(false);
      abortControllerRef.current = null;
    }
  };

  const handleRefine = async (instruction: string, scope: 'current' | 'all' = 'current') => {
    if (!activeProjectId) return;
    // Free tier: max 3 prompts
    if (promptCount >= MAX_PROMPTS) {
        setShowLimitDialog(true);
        return;
    }
    setPromptCount(prev => prev + 1);
    
    // Prepare targets
    let targets: Screen[] = [];
    if (scope === 'all') {
        targets = [...screens];
    } else {
        if (!activeScreenId) return;
        const s = screens.find(sc => sc.id === activeScreenId);
        if (s) targets = [s];
    }

    if (targets.length === 0) return;

    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: instruction, timestamp: Date.now() }]);

    // Set generating state for targets
    updateActiveProject(p => ({
        ...p,
        screens: p.screens.map(s => targets.find(t => t.id === s.id) ? { ...s, isGenerating: true } : s)
    }));

    setIsProcessing(true);
    let successCount = 0;

    try {
        // We process sequentially to be safe with rate limits and state updates
        // For a better UX in 'all', we might want parallel but let's stick to safe first
        for (const targetScreen of targets) {
             try {
                 const updatedScreen = await refineScreen(targetScreen, instruction);
                 
                 updateActiveProject(p => ({
                    ...p,
                    lastModified: Date.now(),
                    screens: p.screens.map(s => s.id === targetScreen.id ? { ...updatedScreen, id: targetScreen.id, isGenerating: false } : s)
                 }));
                 successCount++;
             } catch (err) {
                 console.error(`Failed to refine screen ${targetScreen.name}`, err);
                 // Revert loading state
                 updateActiveProject(p => ({
                    ...p,
                    screens: p.screens.map(s => s.id === targetScreen.id ? { ...s, isGenerating: false } : s)
                 }));
             }
        }

        if (successCount > 0) {
            setMessages(prev => [...prev, { 
                id: Date.now().toString(), 
                role: 'assistant', 
                content: scope === 'all' ? `Updated ${successCount} screens.` : `Updated screen.`, 
                timestamp: Date.now() 
            }]);
        } else {
             setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: "Failed to apply changes.", timestamp: Date.now() }]);
        }
      
    } catch (error: any) {
      console.error("Refinement failed:", error);
      let errorMessage = "Sorry, I couldn't apply that change.";
      if (isRateLimitError(error)) errorMessage = "Rate limit exceeded.";
      
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: errorMessage, timestamp: Date.now() }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = async (format: 'json' | 'png' | 'svg' | 'zip') => {
    if (format === 'json') {
        const data = JSON.stringify(activeProject, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${activeProject?.name || 'project'}-export.json`;
        a.click();
        URL.revokeObjectURL(url);
    } else if (format === 'zip') {
        const zip = new JSZip();
        const folder = zip.folder("screens");
        const options = { quality: 1.0, pixelRatio: 2, style: { transform: 'none' } };
        
        // Save meta info
        zip.file("project.json", JSON.stringify(activeProject, null, 2));

        const promises = screens.map(async (screen, index) => {
             const elementId = `screen-preview-${screen.id}`;
             const node = document.getElementById(elementId);
             if (node) {
                 try {
                     const dataUrl = await toPng(node, options);
                     const base64Data = dataUrl.split(',')[1];
                     const safeName = screen.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                     folder?.file(`${index + 1}_${safeName}.png`, base64Data, { base64: true });
                 } catch (e) {
                     console.error(`Failed export ${screen.name}`, e);
                 }
             }
        });
        await Promise.all(promises);
        const content = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${activeProject?.name || 'mockups'}.zip`;
        a.click();
        URL.revokeObjectURL(url);
    } else {
        if (!activeScreenId) return;
        const activeScreen = screens.find(s => s.id === activeScreenId);
        if (!activeScreen) return;
        const elementId = `screen-preview-${activeScreenId}`;
        const node = document.getElementById(elementId);
        if (!node) return;

        try {
            const options = { quality: 1.0, pixelRatio: 2, style: { transform: 'none' } };
            const dataUrl = format === 'png' ? await toPng(node, options) : await toSvg(node, options);
            const link = document.createElement('a');
            link.download = `${activeScreen.name.replace(/\s+/g, '-')}.${format}`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error("Export failed:", error);
        }
    }
  };

  const handleDeleteScreen = (id: string) => {
      updateActiveProject(p => {
         const newScreens = p.screens.filter(s => s.id !== id);
         if (activeScreenId === id) setActiveScreenId(newScreens.length > 0 ? newScreens[0].id : null);
         return { ...p, screens: newScreens, lastModified: Date.now() };
      });
  };

  const handleAddScreen = () => {
    const newScreen: Screen = {
        id: `custom-${Date.now()}`,
        name: 'New Screen',
        description: 'Empty custom screen',
        code: '<div class="h-full w-full bg-white flex items-center justify-center text-slate-400">Empty Screen</div>'
    };
    updateActiveProject(p => ({
        ...p,
        screens: [...p.screens, newScreen],
        lastModified: Date.now()
    }));
    setActiveScreenId(newScreen.id);
  };
  
  const handleScreenUpdate = (id: string, newCode: string) => {
      updateActiveProject(p => ({
          ...p,
          screens: p.screens.map(s => s.id === id ? { ...s, code: newCode } : s),
          lastModified: Date.now()
      }));
  };

  // --- RENDER ---

  if (authLoading) {
      return (
          <div className="min-h-screen bg-[#050505] flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-zinc-500 text-sm tracking-widest uppercase">Loading...</span>
              </div>
          </div>
      );
  }

  if (!user) {
      return <AuthScreen onLogin={handleLogin} />;
  }

  if (!activeProjectId) {
      return (
          <ProjectDashboard 
             projects={projects}
             user={user}
             onCreateProject={handleCreateProject}
             onCreateFromTemplate={handleCreateFromTemplate}
             onSelectProject={(id) => {
                 setActiveProjectId(id);
                 setMessages([]); 
             }}
             onDeleteProject={handleDeleteProject}
             onLogout={handleLogout}
          />
      );
  }

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-200 font-sans overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Subscription Limit Dialog */}
      {showLimitDialog && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Free Tier Limit Reached</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              You've used all your free generations. Our <span className="text-indigo-400 font-semibold">Pro subscription</span> is coming soon with unlimited projects, unlimited prompts, priority AI models, and more.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Your usage</p>
              <div className="flex justify-around">
                <div>
                  <p className="text-2xl font-bold text-white">{projects.length}/{MAX_PROJECTS}</p>
                  <p className="text-[11px] text-zinc-500">Projects</p>
                </div>
                <div className="w-px bg-white/10"></div>
                <div>
                  <p className="text-2xl font-bold text-white">{promptCount}/{MAX_PROMPTS}</p>
                  <p className="text-[11px] text-zinc-500">Prompts</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowLimitDialog(false)}
              className="w-full py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all active:scale-[0.98]"
            >
              Got it — I'll wait!
            </button>
            <p className="text-[11px] text-zinc-600 mt-3">Stay tuned. Big things are coming.</p>
          </div>
        </div>
      )}

      <Sidebar 
         screens={screens}
         activeScreenId={activeScreenId}
         onSelectScreen={setActiveScreenId}
         onDeleteScreen={handleDeleteScreen}
         onAddScreen={handleAddScreen}
         onBackToDashboard={() => setActiveProjectId(null)}
      />

      <PreviewArea 
        screens={screens}
        activeScreenId={activeScreenId}
        onSelectScreen={setActiveScreenId}
        onDeleteScreen={handleDeleteScreen}
        onUpdateScreen={handleScreenUpdate}
        isGenerating={isProcessing}
      />

      <GeneratorControls 
        onGenerate={handleGenerate}
        onRefine={handleRefine}
        onExport={handleExport}
        onStop={handleStop}
        isProcessing={isProcessing}
        hasScreens={screens.length > 0}
        messages={messages}
        screens={screens}
      />
    </div>
  );
};

export default App;
