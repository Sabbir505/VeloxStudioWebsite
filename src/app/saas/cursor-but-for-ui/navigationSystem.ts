/**
 * Modern Navigation Bar Design System
 * Glassmorphism, Fluid Animations & 2026 Trends
 * 
 * Injected into the Gemini system prompt so every generated
 * navigation bar follows premium, modern design patterns.
 */

export const NAVIGATION_SYSTEM_INSTRUCTION = `

### NAVIGATION DESIGN (ISLAND ARCHITECTURE)

**Primary Style: The Floating Island**
Instead of a heavy bar stuck to the bottom, use a floating architectural element.

**1. The Dock (Main Nav)**
- **Position**: \`fixed bottom-6 left-1/2 -translate-x-1/2 z-50\`.
- **Look**: \`h-16 pl-6 pr-6 bg-[#121212]/90 backdrop-blur-2xl border border-white/[0.08] rounded-full shadow-[0_8px_40px_rgba(0,0,0,0.45)] flex items-center gap-8\`.
- **Items**: 
  - Active: Icon + optional dot indicator.
  - Inactive: Icon 50% opacity.
  - Action Button: Can be "broken out" (larger circle in center).

**2. The Top Shelf (Header)**
- **Position**: \`sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-md\`.
- **Content**: Avatar (Left) + Page Title (Center/Left) + Actions (Right).
- **Separation**: subtle \`border-b border-white/5\`.

**3. Contextual Pills**
- For sub-navigation (e.g. "Week / Month / Year"), use a segmented control pill:
- \`bg-zinc-900 rounded-full p-1 inline-flex\`.
- Active item: \`bg-zinc-800 text-white rounded-full shadow-sm\`.

**Effect Details:**
- Box-shadow: 0 16px 48px rgba(primary, 0.4)
- Items on top: Use rgba(255,255,255,0.2) for active pill

**Tailwind Implementation:**
\`\`\`html
<nav class="fixed bottom-5 left-4 right-4 z-50">
  <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-[0_16px_48px_rgba(99,102,241,0.4)] px-6 py-3 flex items-center justify-around">
    <button class="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
      <svg class="w-5 h-5">...</svg>
      <span class="text-xs font-semibold">Home</span>
    </button>
    <button class="p-2.5 text-white/60 hover:text-white transition-colors active:scale-95">
      <svg class="w-5 h-5">...</svg>
    </button>
  </div>
</nav>
\`\`\`

---

## D. TOP NAVIGATION BAR (HEADER)

**Glassmorphic header for all screens with a top bar:**
\`\`\`html
<header class="fixed top-0 inset-x-0 z-40">
  <div class="h-14 bg-black/60 backdrop-blur-2xl saturate-[1.8] border-b border-white/[0.06] flex items-center justify-between px-5">
    <!-- Left: Back/Logo -->
    <!-- Center: Title (optional) -->
    <!-- Right: Actions -->
  </div>
</header>
\`\`\`

**Header Layout Patterns:**
1. **Logo + Actions**: \`[Logo/Avatar]  ···spacer···  [🔔] [⚙️]\`
2. **Back + Title + Action**: \`[←]  ···Title (centered)···  [⋮]\`
3. **Search Integrated**: \`[☰]  [🔍 Search...]  [👤]\`
4. **Greeting + Avatar**: \`[Good morning, Alex]  ···spacer···  [Avatar]\`

---

## E. ACTIVE STATE DESIGN RULES

**Every navigation MUST have clearly distinguishable active/inactive states:**

**Active Tab:**
- Icon: accent color, filled variant, scaled 1.1x, lifted -4px (translateY)
- Label: accent color, font-semibold
- Optional: glow aura (bg-[accent]/20 blur-xl behind icon)
- Optional: indicator dot/bar above or below

**Inactive Tab:**
- Icon: white/40 opacity, outline/stroke variant
- Label: white/40 opacity, font-medium
- Hover (web): white/70 opacity with 200ms transition
- Active press: scale(0.95) with 100ms transition

**Tab Count:**
- 3-5 tabs maximum
- If more needed, use "More" tab with expandable menu
- Each tab icon must be unique and recognizable

---

## F. NAVIGATION MICRO-INTERACTIONS

**Tap Feedback (apply to all nav items):**
\`\`\`
On press: transform scale(0.95), duration 100ms
On release: transform scale(1), duration 200ms ease-out
\`\`\`

**Notification Badge:**
\`\`\`html
<div class="relative">
  <svg class="w-6 h-6">...</svg>
  <div class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center ring-2 ring-black">
    <span class="text-[8px] font-bold text-white">3</span>
  </div>
</div>
\`\`\`

**Status Dot (online/active):**
\`\`\`html
<div class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-black"></div>
\`\`\`

---

## G. NAVIGATION CONTENT RULES PER APP TYPE

**Fitness/Health:**
Tabs: Home, Workouts, Progress/Stats, Community, Profile
Icons: house, dumbbell, chart-bar, users, user-circle

**E-Commerce:**
Tabs: Home, Search, Cart, Orders, Profile
Icons: house, search, shopping-bag, package, user-circle
Badge: Show cart item count on Cart tab

**Social Media:**
Tabs: Feed, Search/Explore, Create (+), Notifications, Profile
Icons: house, compass, plus-circle, bell, user-circle
Badge: Show notification count on bell

**Finance/Banking:**
Tabs: Home, Cards, Send/Pay, Activity, Profile
Icons: house, credit-card, arrow-up-right, receipt, user-circle

**Food Delivery:**
Tabs: Home, Search, Orders, Favorites, Profile
Icons: house, search, receipt, heart, user-circle
Badge: Active order indicator dot on Orders

**Travel/Booking:**
Tabs: Explore, Search, Trips, Saved, Profile
Icons: compass, search, briefcase, bookmark, user-circle

**Entertainment/Media:**
Tabs: Home, Browse, Library, Downloads, Profile
Icons: house, grid, bookmark, download, user-circle

**Productivity:**
Tabs: Home, Tasks, Calendar, Notes, Settings
Icons: house, check-square, calendar, file-text, settings

---

## H. NAVIGATION ACCESSIBILITY REQUIREMENTS

1. All nav items MUST be \`<button>\` elements (or \`<a>\` if linking)
2. Include \`aria-label\` on the \`<nav>\` element: \`aria-label="Main navigation"\`
3. Active tab gets \`aria-current="page"\`
4. All icons must have \`aria-hidden="true"\` (labels provide meaning)
5. Touch targets: minimum 44x44px (padding counts)
6. Focus-visible outlines: \`focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black\`
7. Color is NEVER the only active indicator — always combine with: filled icon, scale, glow, or indicator shape

---

## I. NAVIGATION PERFORMANCE

1. Use \`transform\` and \`opacity\` for animations (GPU-accelerated)
2. Add \`will-change: transform\` on animated nav items
3. Limit backdrop-filter to the nav container only (not individual items)
4. Use \`contain: layout paint\` on fixed nav to prevent reflow
5. Keep nav HTML lightweight — avoid deeply nested elements

---

## J. TOP BAR + BOTTOM NAV COORDINATION

**When both exist on a screen:**
- Top bar: h-14 (56px), fixed top, z-40
- Bottom nav: h-[84px] (64px + 20px safe area), fixed bottom, z-50
- Content: \`pt-14 pb-24\` to not overlap with either bar
- Both should use matching glass intensity and border style for visual unity
- Top bar border: border-bottom border-white/[0.06]
- Bottom nav border: border-top border-white/[0.08]

`;

export const NAV_STYLE_FOR_APP_TYPE: Record<string, string> = {
  'E-commerce': 'glassmorphic',
  'Food Delivery': 'glassmorphic',
  'Fitness & Health': 'glassmorphic',
  'Social Networking': 'floating-pill',
  'Travel & Booking': 'glassmorphic',
  'Finance & Banking': 'glassmorphic',
  'Entertainment & Media': 'floating-pill',
  'Custom': 'glassmorphic',
};
