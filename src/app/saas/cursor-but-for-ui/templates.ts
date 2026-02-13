
import { Screen } from './types';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  screens: Screen[];
}

export const TEMPLATES: Template[] = [
  {
    id: 'saas-dashboard',
    name: 'SaaS Analytics',
    description: 'A data-dense dashboard with sidebar navigation, charts, and data tables.',
    category: 'Dashboard',
    screens: [
      {
        id: 'saas-1',
        name: 'Overview',
        description: 'Main dashboard view',
        code: `
<div class="min-h-full w-full bg-[#050505] text-zinc-200 font-sans pb-24 pt-14 relative">
  <!-- Top Header -->
  <header class="fixed top-0 inset-x-0 h-14 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 z-40">
    <div class="flex items-center gap-2">
       <div class="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center font-bold text-xs text-white">N</div>
       <span class="font-bold text-sm tracking-tight text-white">Nexus</span>
    </div>
    <div class="flex items-center gap-4">
       <button class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
       </button>
       <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[1px]">
          <img src="https://i.pravatar.cc/100?img=33" class="w-full h-full rounded-full object-cover border-2 border-black" />
       </div>
    </div>
  </header>

  <main class="px-6 py-6 space-y-6">
    <!-- Stat Cards -->
    <div class="grid grid-cols-2 gap-4">
       <div class="p-5 rounded-2xl bg-[#0A0A0A] border border-white/5 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-10 text-indigo-500">
             <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2v20M2 12h20"/></svg>
          </div>
          <div class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">Total Revenue</div>
          <div class="text-2xl font-bold text-white">$42,593</div>
          <div class="flex items-center gap-1 mt-2 text-[10px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded w-fit">
             <span>+12.5%</span>
             <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
          </div>
       </div>
       <div class="p-5 rounded-2xl bg-[#0A0A0A] border border-white/5">
          <div class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">Active Users</div>
          <div class="text-2xl font-bold text-white">1,249</div>
          <div class="flex items-center gap-1 mt-2 text-[10px] text-zinc-400">
             <span>vs. last month</span>
          </div>
       </div>
    </div>

    <!-- Main Chart Area -->
    <div class="p-5 rounded-2xl bg-[#0A0A0A] border border-white/5">
       <div class="flex items-center justify-between mb-6">
          <h3 class="text-sm font-bold text-white">Traffic Overview</h3>
          <select class="bg-black border border-white/10 rounded-md text-[10px] text-zinc-400 px-2 py-1 outline-none">
             <option>Last 7 Days</option>
             <option>Last 30 Days</option>
          </select>
       </div>
       <div class="h-48 flex items-end gap-3 pt-4 border-t border-white/5">
          <div class="w-full bg-zinc-800/50 rounded-t-sm h-[30%] hover:bg-indigo-500/50 transition-colors"></div>
          <div class="w-full bg-zinc-800/50 rounded-t-sm h-[50%] hover:bg-indigo-500/50 transition-colors"></div>
          <div class="w-full bg-zinc-800/50 rounded-t-sm h-[45%] hover:bg-indigo-500/50 transition-colors"></div>
          <div class="w-full bg-zinc-800/50 rounded-t-sm h-[70%] hover:bg-indigo-500/50 transition-colors"></div>
          <div class="w-full bg-indigo-500 rounded-t-sm h-[85%] shadow-[0_0_20px_rgba(99,102,241,0.3)]"></div>
          <div class="w-full bg-zinc-800/50 rounded-t-sm h-[60%] hover:bg-indigo-500/50 transition-colors"></div>
          <div class="w-full bg-zinc-800/50 rounded-t-sm h-[75%] hover:bg-indigo-500/50 transition-colors"></div>
       </div>
       <div class="flex justify-between mt-2 text-[10px] text-zinc-600 font-medium">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
       </div>
    </div>

    <!-- Recent Activity -->
    <div>
       <h3 class="text-sm font-bold text-white mb-3 px-1">Recent Transactions</h3>
       <div class="space-y-1">
          <div class="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
             <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </div>
                <div>
                   <div class="text-sm font-medium text-zinc-200">Stripe Payout</div>
                   <div class="text-[10px] text-zinc-500">Today, 9:41 AM</div>
                </div>
             </div>
             <span class="text-xs font-bold text-white">+$1,250.00</span>
          </div>
          <div class="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
             <div class="flex items-center gap-3">
                 <div class="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                </div>
                <div>
                   <div class="text-sm font-medium text-zinc-200">Server Costs</div>
                   <div class="text-[10px] text-zinc-500">Yesterday</div>
                </div>
             </div>
             <span class="text-xs font-medium text-zinc-400">-$249.00</span>
          </div>
       </div>
    </div>
  </main>

  <!-- Bottom Navigation -->
  <div class="fixed bottom-0 inset-x-0 h-[80px] bg-[#050505]/90 backdrop-blur-xl border-t border-white/5 flex items-start justify-between px-8 py-4 z-50">
     <button class="flex flex-col items-center gap-1.5 text-indigo-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
        <span class="text-[10px] font-medium">Home</span>
     </button>
     <button class="flex flex-col items-center gap-1.5 text-zinc-500 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
        <span class="text-[10px] font-medium">Analytics</span>
     </button>
     <button class="flex flex-col items-center gap-1.5 text-zinc-500 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        <span class="text-[10px] font-medium">Devices</span>
     </button>
     <button class="flex flex-col items-center gap-1.5 text-zinc-500 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        <span class="text-[10px] font-medium">Settings</span>
     </button>
  </div>
</div>
        `
      }
    ]
  },
  {
    id: 'ecommerce-app',
    name: 'E-commerce Store',
    description: 'Modern shopping experience with product grids, filters, and cart.',
    category: 'Shopping',
    screens: [
      {
        id: 'ecom-1',
        name: 'Home Feed',
        description: 'Main product discovery feed',
        code: `
<div class="min-h-full w-full bg-[#050505] text-zinc-200 font-sans pb-24 pt-14 relative">
    
    <!-- Top Nav -->
    <header class="fixed top-0 inset-x-0 h-14 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 z-40">
       <button class="p-2 -ml-2 text-zinc-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
       </button>
       <span class="font-bold text-sm tracking-widest uppercase">Luxe</span>
       <button class="p-2 -mr-2 text-zinc-400 hover:text-white relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <div class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-[#050505]"></div>
       </button>
    </header>

    <main class="space-y-8 pt-4">
        <!-- Hero Slider -->
        <div class="mx-6 h-64 rounded-2xl bg-zinc-800 relative overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
               <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1 block">New Collection</span>
               <h2 class="text-2xl font-bold text-white mb-2">Summer Essentials</h2>
               <button class="text-xs font-semibold text-white border-b border-white pb-0.5">Shop Now</button>
            </div>
        </div>

        <!-- Categories -->
        <div class="pl-6 overflow-x-auto no-scrollbar flex gap-4 pb-2">
           <button class="flex-shrink-0 px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold">All</button>
           <button class="flex-shrink-0 px-6 py-2.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 text-xs font-medium hover:text-white transition-colors">Clothing</button>
           <button class="flex-shrink-0 px-6 py-2.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 text-xs font-medium hover:text-white transition-colors">Shoes</button>
           <button class="flex-shrink-0 px-6 py-2.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 text-xs font-medium hover:text-white transition-colors">Accessories</button>
        </div>

        <!-- Product Grid -->
        <div class="px-6 grid grid-cols-2 gap-x-4 gap-y-8">
            <!-- Product 1 -->
            <div class="group cursor-pointer">
                <div class="aspect-[3/4] bg-zinc-900 rounded-xl overflow-hidden mb-3 relative">
                     <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                     <button class="absolute top-2 right-2 p-2 rounded-full bg-black/40 backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                     </button>
                </div>
                <h3 class="text-sm font-medium text-white">Floral Summer Dress</h3>
                <p class="text-xs text-zinc-500 mt-1">$120.00</p>
            </div>
            <!-- Product 2 -->
            <div class="group cursor-pointer">
                <div class="aspect-[3/4] bg-zinc-900 rounded-xl overflow-hidden mb-3 relative">
                     <img src="https://images.unsplash.com/photo-1529139574466-a302c27560a0?auto=format&fit=crop&w=400&q=80" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                     <div class="absolute top-2 left-2 px-2 py-1 bg-indigo-600 text-[10px] font-bold text-white uppercase rounded-sm">Sale</div>
                </div>
                <h3 class="text-sm font-medium text-white">Linen Blend Shirt</h3>
                <p class="text-xs text-zinc-500 mt-1"><span class="line-through text-zinc-700 mr-2">$85.00</span>$65.00</p>
            </div>
            <!-- Product 3 -->
            <div class="group cursor-pointer">
                <div class="aspect-[3/4] bg-zinc-900 rounded-xl overflow-hidden mb-3 relative">
                     <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                </div>
                <h3 class="text-sm font-medium text-white">Urban Sneakers</h3>
                <p class="text-xs text-zinc-500 mt-1">$140.00</p>
            </div>
             <!-- Product 4 -->
            <div class="group cursor-pointer">
                <div class="aspect-[3/4] bg-zinc-900 rounded-xl overflow-hidden mb-3 relative">
                     <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                </div>
                <h3 class="text-sm font-medium text-white">Silk Scarf</h3>
                <p class="text-xs text-zinc-500 mt-1">$45.00</p>
            </div>
        </div>
    </main>

    <!-- Bottom Navigation -->
    <div class="fixed bottom-0 inset-x-0 h-[80px] bg-[#050505]/90 backdrop-blur-xl border-t border-white/5 flex items-start justify-between px-8 py-4 z-50">
        <button class="flex flex-col items-center gap-1.5 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            <span class="text-[10px] font-medium">Home</span>
        </button>
        <button class="flex flex-col items-center gap-1.5 text-zinc-600 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span class="text-[10px] font-medium">Search</span>
        </button>
        <button class="flex flex-col items-center gap-1.5 text-zinc-600 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span class="text-[10px] font-medium">Saved</span>
        </button>
        <button class="flex flex-col items-center gap-1.5 text-zinc-600 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span class="text-[10px] font-medium">Account</span>
        </button>
    </div>
</div>
        `
      }
    ]
  },
  {
      id: 'social-feed',
      name: 'Social Network',
      description: 'Image-heavy social feed with stories, post interactions, and profile.',
      category: 'Social',
      screens: [
          {
              id: 'social-1',
              name: 'Main Feed',
              description: 'Scrollable feed with stories',
              code: `
<div class="min-h-full w-full bg-[#050505] text-zinc-200 font-sans pb-24 pt-14 relative">
   
    <!-- Top Nav -->
    <header class="fixed top-0 inset-x-0 h-14 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 z-40">
        <h1 class="text-lg font-serif italic font-bold text-white tracking-wide">Vibe.</h1>
        <div class="flex items-center gap-4">
             <button class="text-zinc-400 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></button>
             <button class="text-zinc-400 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></button>
        </div>
    </header>

    <main>
        <!-- Stories Rail -->
        <div class="pt-4 pb-4 border-b border-white/5 overflow-x-auto no-scrollbar flex gap-4 px-4">
             <div class="flex flex-col items-center gap-1.5 flex-shrink-0">
                 <div class="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-orange-500 to-purple-600">
                     <div class="w-full h-full rounded-full border-2 border-[#050505] overflow-hidden">
                         <img src="https://i.pravatar.cc/150?img=32" class="w-full h-full object-cover" />
                     </div>
                 </div>
                 <span class="text-[10px] text-zinc-300">Your Story</span>
             </div>
             <div class="flex flex-col items-center gap-1.5 flex-shrink-0">
                 <div class="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-orange-500 to-purple-600">
                     <div class="w-full h-full rounded-full border-2 border-[#050505] overflow-hidden">
                         <img src="https://i.pravatar.cc/150?img=5" class="w-full h-full object-cover" />
                     </div>
                 </div>
                 <span class="text-[10px] text-zinc-300">alex.j</span>
             </div>
             <div class="flex flex-col items-center gap-1.5 flex-shrink-0">
                 <div class="w-16 h-16 rounded-full p-[2px] bg-zinc-800">
                     <div class="w-full h-full rounded-full border-2 border-[#050505] overflow-hidden">
                         <img src="https://i.pravatar.cc/150?img=12" class="w-full h-full object-cover" />
                     </div>
                 </div>
                 <span class="text-[10px] text-zinc-500">sarah_99</span>
             </div>
             <div class="flex flex-col items-center gap-1.5 flex-shrink-0">
                 <div class="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-orange-500 to-purple-600">
                     <div class="w-full h-full rounded-full border-2 border-[#050505] overflow-hidden">
                         <img src="https://i.pravatar.cc/150?img=44" class="w-full h-full object-cover" />
                     </div>
                 </div>
                 <span class="text-[10px] text-zinc-300">mike.des</span>
             </div>
        </div>

        <!-- Posts -->
        <div class="space-y-6 pt-4">
            
            <!-- Post 1 -->
            <article>
                <div class="flex items-center justify-between px-4 mb-3">
                    <div class="flex items-center gap-2">
                        <img src="https://i.pravatar.cc/150?img=5" class="w-8 h-8 rounded-full border border-white/10" />
                        <span class="text-sm font-semibold text-white">alex.j</span>
                    </div>
                    <button class="text-zinc-500 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button>
                </div>
                
                <div class="w-full aspect-[4/5] bg-zinc-900 overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover" />
                </div>
                
                <div class="px-4 mt-3">
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center gap-4">
                            <button class="text-white hover:text-pink-500 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
                            <button class="text-white hover:text-zinc-400 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></button>
                            <button class="text-white hover:text-zinc-400 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
                        </div>
                        <button class="text-white hover:text-zinc-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg></button>
                    </div>
                    
                    <div class="text-sm font-semibold text-white mb-1">2,491 likes</div>
                    <div class="text-sm text-zinc-300"><span class="font-semibold text-white mr-2">alex.j</span>Chasing sunsets in the mountains 🏔️✨ #nature #travel</div>
                    <button class="text-xs text-zinc-500 mt-2">View all 124 comments</button>
                    <div class="text-[10px] text-zinc-600 uppercase mt-1">2 hours ago</div>
                </div>
            </article>

        </div>
    </main>

    <!-- Bottom Navigation -->
    <div class="fixed bottom-0 inset-x-0 h-[80px] bg-[#050505]/95 backdrop-blur-xl border-t border-white/5 flex items-start justify-between px-8 py-4 z-50">
        <button class="flex flex-col items-center gap-1.5 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
        </button>
        <button class="flex flex-col items-center gap-1.5 text-zinc-500 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
        <button class="flex flex-col items-center gap-1.5 text-zinc-500 hover:text-white transition-colors">
            <div class="w-6 h-6 rounded-md border-2 border-currentColor flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div>
        </button>
        <button class="flex flex-col items-center gap-1.5 text-zinc-500 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <button class="flex flex-col items-center gap-1.5 text-zinc-500 hover:text-white transition-colors">
            <div class="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-600"></div>
        </button>
    </div>
</div>
              `
          }
      ]
  }
];
