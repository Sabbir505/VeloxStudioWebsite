
import { AppType } from './types';
import { DESIGN_SYSTEM_INSTRUCTION, APP_TYPE_DESIGN_HINTS } from './designSystem';
import { NAVIGATION_SYSTEM_INSTRUCTION } from './navigationSystem';
import { VISUAL_DESIGN_INSTRUCTION } from './visualDesign';
import { ANTI_AI_SLOP_RULES } from './antiAISlop';

export const APP_TYPES = [
  { value: AppType.ECOMMERCE, label: 'E-commerce' },
  { value: AppType.FOOD_DELIVERY, label: 'Food Delivery' },
  { value: AppType.FITNESS, label: 'Fitness & Health' },
  { value: AppType.SOCIAL, label: 'Social Networking' },
  { value: AppType.TRAVEL, label: 'Travel & Booking' },
  { value: AppType.FINANCE, label: 'Finance & Banking' },
  { value: AppType.ENTERTAINMENT, label: 'Entertainment & Media' },
  { value: AppType.CUSTOM, label: 'Custom Application' },
];

export const THEME_COLORS = [
  { id: 'auto', label: 'Auto', class: 'bg-zinc-800 border-dashed border-zinc-600' },
  { id: 'slate', label: 'Slate', class: 'bg-slate-500' },
  { id: 'red', label: 'Red', class: 'bg-red-500' },
  { id: 'orange', label: 'Orange', class: 'bg-orange-500' },
  { id: 'amber', label: 'Amber', class: 'bg-amber-500' },
  { id: 'yellow', label: 'Yellow', class: 'bg-yellow-500' },
  { id: 'lime', label: 'Lime', class: 'bg-lime-500' },
  { id: 'green', label: 'Green', class: 'bg-green-500' },
  { id: 'emerald', label: 'Emerald', class: 'bg-emerald-500' },
  { id: 'teal', label: 'Teal', class: 'bg-teal-500' },
  { id: 'cyan', label: 'Cyan', class: 'bg-cyan-500' },
  { id: 'sky', label: 'Sky', class: 'bg-sky-500' },
  { id: 'blue', label: 'Blue', class: 'bg-blue-500' },
  { id: 'indigo', label: 'Indigo', class: 'bg-indigo-500' },
  { id: 'violet', label: 'Violet', class: 'bg-violet-500' },
  { id: 'purple', label: 'Purple', class: 'bg-purple-500' },
  { id: 'fuchsia', label: 'Fuchsia', class: 'bg-fuchsia-500' },
  { id: 'pink', label: 'Pink', class: 'bg-pink-500' },
  { id: 'rose', label: 'Rose', class: 'bg-rose-500' },
];

export const STYLE_PRESETS = [
  {
    id: 'auto',
    label: 'Auto',
    description: 'Balanced function & aesthetics',
    value: 'auto'
  },
  {
    id: 'modern',
    label: 'Modern Clean',
    description: 'High whitespace, card-based',
    value: 'Modern Functional: Extensive whitespace, distinct cards with soft shadows (shadow-sm), clear hierarchy. Backgrounds #F9FAFB (light) or #09090B (dark). Focus on scannability.'
  },
  {
    id: 'glass',
    label: 'Functional Glass',
    description: 'Blur overlays, clear content',
    value: 'Functional Glass: Use backdrop-blur-xl for separation, not decoration. Content must remain high-contrast (text-white). Borders border-white/10. Cards use bg-white/5.'
  },
  {
    id: 'swiss',
    label: 'Swiss Minimal',
    description: 'Grid, typography, whitespace',
    value: 'Swiss International Style: Strict grid alignment. High contrast. Large headings (font-serif). No decoration, only content. Information Architecture is the decoration.'
  },
  {
     id: 'complex',
     label: 'Data Density',
     description: 'Dashboards, dense tables',
     value: 'Data Rich: Compact spacing (gap-2), borders instead of shadows, tabular data, clear data visualization colors. For power users.'
  }
];

export const INITIAL_PROMPT_SYSTEM_INSTRUCTION = `
You are a world-class Product Designer who has shipped award-winning mobile apps.
You design with INTENTION — every pixel, every spacing decision, every color choice has a reason.
Your work is indistinguishable from hand-crafted designs by the best human designers.
You NEVER produce generic, template-looking UI. Each screen you create has its own personality and story.

${ANTI_AI_SLOP_RULES}

${DESIGN_SYSTEM_INSTRUCTION}

${NAVIGATION_SYSTEM_INSTRUCTION}

${VISUAL_DESIGN_INSTRUCTION}

### VISUAL LANGUAGE — LOCKED DESIGN TOKENS (override any conflicting guidance):
These values are ABSOLUTE. Use them on every screen without exception.
1. **Background**: Main: \`bg-[#050505]\`. Cards: \`bg-[#09090b]\` (Surface 1).
2. **Borders**: \`border border-white/[0.06]\` on all cards.
3. **Side Margins**: \`px-5\` on ALL screens.
4. **Section Spacing**: \`space-y-8\` between all major sections.
5. **Card Style**: \`p-5 rounded-3xl\` (Big soft corners).
6. **Border Radius System**: Cards = \`rounded-3xl\`. Inner elements = \`rounded-2xl\`.
7. **Typography**:
   - Screen title: \`text-2xl font-bold tracking-tight text-white\`.
   - Section head: \`text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4\`.
   - Body: \`text-[15px] text-zinc-400 leading-relaxed\`.
   - Hero number (MAX 1 per screen): \`text-4xl font-black tracking-tighter\`.
8. **Accent Color**: ONE accent per app. Stick to it.
9. **Icons**: Lucide-style SVGs, stroke-width 2, size 20-24px.
10. **Top Bar**: Fixed, h-14, \`bg-[#050505]/80 backdrop-blur-md border-b border-white/5\`.

### NAVIGATION CONSISTENCY (CRITICAL):
For all MAIN application screens, include the bottom navigation bar.
**Navigation Style**: Glassmorphic "Island" style is preferred.

**Bottom Navigation Requirements:**
- Floating Island Effect: \`fixed bottom-6 left-4 right-4 h-16 bg-[#09090b]/80 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-around px-6 shadow-2xl z-50\`
- NO full-width bar attached to bottom. We are in 2026.
- Active tab: \`text-white bg-white/10 rounded-full p-3\`
- Inactive tabs: \`text-zinc-500 hover:text-zinc-300\`
- 4-5 tabs max.
- Use \`<nav aria-label="Main navigation">\`

**Glassmorphic Navigation HTML Blueprint:**
\`\`\`html
<nav class="fixed bottom-6 left-5 right-5 z-50">
  <div class="h-16 bg-[#0F0F10]/80 backdrop-blur-xl border border-white/[0.08] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center justify-between px-2">
    <!-- Active Tab -->
    <button class="w-14 h-full flex items-center justify-center rounded-full bg-white/10 text-white relative">
       <div class="absolute inset-0 bg-white/5 blur-lg rounded-full"></div>
       <svg class="w-6 h-6 relative z-10">...</svg>
    </button>
    <!-- Inactive Tab -->
    <button class="w-14 h-full flex items-center justify-center rounded-full text-zinc-500 hover:text-zinc-300 transition-colors">
       <svg class="w-6 h-6">...</svg>
    </button>
    <!-- Middle "Action" Tab (Optional) -->
     <button class="w-14 h-14 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 hover:scale-105 transition-transform">
        <svg class="w-6 h-6">...</svg>
     </button>
  </div>
</nav>
\`\`\`

### COMPONENT BLUEPRINTS:

**A. Data Visualization (Simulated with HTML/CSS)**
   - **Bar Charts**: Flex container with bottom alignment. Bars are \`w-full rounded-t-sm bg-zinc-800\` with varying \`h-[x]\` values. Active bars use accent color.
   - **Heatmaps**: Grid (grid-cols-7) of small squares (\`aspect-square rounded-sm bg-zinc-900\`). "Active" days use accent color opacity levels (e.g., \`bg-green-500/20\`, \`bg-green-500/60\`).
   - **Progress Rings/Lines**: \`h-1.5 bg-zinc-800 rounded-full overflow-hidden\` with inner div \`bg-white h-full\`.

**B. Cards & Lists**
   - **Rich Cards**: ALWAYS \`p-5 rounded-2xl bg-[#0A0A0A] border border-white/5\`. Include: Icon/Image + Title + Subtitle + one bottom row with tags/stats.
   - **List Items**: \`flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors\`. Left icon box, middle text, right arrow/status.

### STRICT RULES:
1. **Root**: \`<div class="min-h-full w-full bg-[#050505] text-zinc-200 font-sans pb-24 pt-14 relative">\`.
2. **No Placeholders**: Do not use "Lorem Ipsum" or "Item 1". Use realistic content specific to the App Type.
3. **Spacing**: ALWAYS \`px-5\` for side margins. \`space-y-8\` between sections.
4. **One Accent Color**: Pick ONE accent color for the entire app (based on app type) and reuse it on every screen. Do NOT change accent color between screens.
5. **Card Consistency**: Every card uses the same \`p-5 rounded-2xl bg-[#0A0A0A] border border-white/5\` treatment. Vary the CONTENT inside cards, not the card shell.
`;

export const MOCK_SCREEN = {
  id: 'dashboard-1',
  name: 'Fitness Dashboard',
  description: 'High-fidelity fitness tracker with activity heatmap and volume charts.',
  code: `
    <div class="min-h-full w-full bg-[#050505] text-zinc-200 font-sans pb-32 pt-20 relative selection:bg-indigo-500/30">
      
      <!-- Top Bar (Floating) -->
      <header class="fixed top-0 inset-x-0 h-16 bg-[#050505]/80 backdrop-blur-md z-40 flex items-center justify-between px-6 border-b border-white/[0.04]">
         <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[1.5px]">
               <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" class="w-full h-full rounded-full object-cover border-2 border-black" alt="Profile" />
            </div>
            <div>
               <span class="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-0.5">Welcome Back</span>
               <span class="block text-lg font-bold text-white leading-none">Alex Johnson</span>
            </div>
         </div>
         <button class="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
         </button>
      </header>
    
      <main class="px-5 space-y-8">
        
        <!-- Hero Section (Bento Row 1) -->
        <section class="grid grid-cols-1 md:grid-cols-3 gap-3">
           <!-- Main Hero Card -->
           <div class="md:col-span-2 p-6 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 relative overflow-hidden shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] group">
              <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all duration-700"></div>
              
              <div class="relative z-10 flex flex-col justify-between h-full min-h-[180px]">
                 <div class="flex justify-between items-start">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 text-[11px] font-medium text-white/90">
                       <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                       Live Workout
                    </span>
                    <svg class="w-6 h-6 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                 </div>
                 
                 <div>
                    <h2 class="text-3xl font-black tracking-tight text-white mb-1">Upper Body Power</h2>
                    <p class="text-indigo-100 text-sm font-medium">45 mins • High Intensity</p>
                 </div>
                 
                 <button class="w-full mt-6 bg-white py-3 rounded-xl text-indigo-900 font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-xl">
                    Resume Session
                 </button>
              </div>
           </div>

           <!-- Secondary Stats Card -->
           <div class="p-5 rounded-3xl bg-[#0F0F10] border border-white/[0.06] flex flex-col justify-center relative group hover:border-white/10 transition-colors">
              <div class="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent rounded-3xl"></div>
              <span class="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Weekly Load</span>
              <div class="flex items-baseline gap-1">
                 <span class="text-4xl font-black text-white tracking-tighter">12.4</span>
                 <span class="text-sm font-bold text-zinc-500">tons</span>
              </div>
              <div class="mt-4 flex items-center gap-2 text-[11px] font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg w-fit">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                 +24% vs last week
              </div>
           </div>
        </section>

        <!-- Activity Grid (Bento Row 2) -->
        <section>
           <h3 class="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-4 pl-1">Recent Activity</h3>
           <div class="grid grid-cols-2 gap-3">
              <div class="p-5 rounded-3xl bg-[#09090b] border border-white/[0.04] hover:bg-white/[0.02] transition-colors relative overflow-hidden">
                 <div class="flex justify-between items-center mb-4">
                    <div class="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 ring-1 ring-inset ring-rose-500/20">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                    </div>
                    <span class="text-xs text-zinc-500">Today</span>
                 </div>
                 <div class="text-2xl font-bold text-white mb-0.5">5.2 km</div>
                 <div class="text-xs text-zinc-500">Morning Run</div>
              </div>
              
              <div class="p-5 rounded-3xl bg-[#09090b] border border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                 <div class="flex justify-between items-center mb-4">
                    <div class="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 ring-1 ring-inset ring-cyan-500/20">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                    </div>
                    <span class="text-xs text-zinc-500">Yesterday</span>
                 </div>
                 <div class="text-2xl font-bold text-white mb-0.5">42 min</div>
                 <div class="text-xs text-zinc-500">HIIT Cardio</div>
              </div>
           </div>
        </section>

        <!-- Chart Section -->
        <section class="p-6 rounded-3xl bg-[#09090b] border border-white/[0.06]">
            <div class="flex items-center justify-between mb-8">
               <div>
                  <h3 class="text-base font-bold text-white">Recovery Score</h3>
                  <p class="text-xs text-zinc-500 mt-1">Based on RHR & Sleep data</p>
               </div>
               <div class="text-right">
                  <div class="text-3xl font-black text-indigo-400">92<span class="text-sm text-zinc-600 font-bold">%</span></div>
               </div>
            </div>
            
            <!-- Simple clean geometric chart -->
            <div class="flex items-end gap-2 h-32 w-full">
               <div class="flex-1 bg-zinc-800/40 rounded-t-lg h-[40%] hover:bg-zinc-700/60 transition-all cursor-pointer relative group">
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Mon</div>
               </div>
               <div class="flex-1 bg-zinc-800/40 rounded-t-lg h-[60%] hover:bg-zinc-700/60 transition-all cursor-pointer"></div>
               <div class="flex-1 bg-zinc-800/40 rounded-t-lg h-[35%] hover:bg-zinc-700/60 transition-all cursor-pointer"></div>
               <div class="flex-1 bg-zinc-800/40 rounded-t-lg h-[80%] hover:bg-zinc-700/60 transition-all cursor-pointer"></div>
               <div class="flex-1 bg-indigo-500 rounded-t-lg h-[92%] shadow-[0_0_20px_rgba(99,102,241,0.25)] relative">
                  <div class="absolute inset-0 bg-white/10 rounded-t-lg"></div>
               </div>
               <div class="flex-1 bg-zinc-800/40 rounded-t-lg h-[70%] hover:bg-zinc-700/60 transition-all cursor-pointer"></div>
               <div class="flex-1 bg-zinc-800/40 rounded-t-lg h-[50%] hover:bg-zinc-700/60 transition-all cursor-pointer"></div>
            </div>
        </section>

      </main>
    
      <!-- Floating Island Navigation -->
      <nav class="fixed bottom-6 left-6 right-6 z-50">
        <div class="h-16 bg-[#161616]/80 backdrop-blur-2xl border border-white/[0.1] rounded-full shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5)] flex items-center justify-between px-2 pl-3">
          
          <button class="w-12 h-12 flex items-center justify-center rounded-full text-zinc-500 hover:text-zinc-200 transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
          </button>
          
          <button class="w-12 h-12 flex items-center justify-center rounded-full text-zinc-500 hover:text-zinc-200 transition-colors">
             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
          </button>

          <!-- Floating Action Button effect -->
          <button class="w-14 h-12 flex items-center justify-center rounded-full bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] mx-2 hover:scale-105 transition-transform">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
          
          <button class="w-12 h-12 flex items-center justify-center rounded-full text-zinc-500 hover:text-zinc-200 transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          </button>
          
          <button class="w-12 h-12 flex items-center justify-center rounded-full text-zinc-500 hover:text-zinc-200 transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            <span class="text-[10px] font-medium">Settings</span>
         </button>
      </div>
    </div>
  `
};
