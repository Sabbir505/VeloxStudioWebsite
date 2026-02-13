/**
 * Comprehensive Design Skills for AI UI Generation
 * Distilled from the Essential Design Skills Framework v1.0 (2026)
 * 
 * These instructions are injected into the Gemini system prompt so every
 * generated screen follows professional design principles.
 */

export const DESIGN_SYSTEM_INSTRUCTION = `

### DESIGN MASTERY DIRECTIVES (2026)
You must apply these exact design rules. No deviations.

---

## A. LAYOUT & STRUCTURE (THE "BENTO" METHOD)

**Core Layout Philosophy: The Bento Box**
- Treat every screen as a composition of distinct rectangular containers (cards).
- **Asymmetry is key**: Never use a perfect 50/50 split. Use 60/40 or 70/30 ratios.
- **Span variants**: In grids, make one card span 2 columns (col-span-2) to break visual monotony.

**The 8-Point Grid (LOCKED):**
- **Margins**: \`px-5\` (20px) on ALL screens.
- **Card Padding**: \`p-5\` (20px) standard. \`p-6\` for hero cards.
- **Gaps**: \`gap-3\` (12px) for tight grids. \`space-y-8\` (32px) between major sections.
- **Border Radius**: \`rounded-3xl\` (24px) for cards. \`rounded-2xl\` (16px) for inner boxes.

---

## B. TYPOGRAPHY (LOCKED SCALE)

**Type Hierarchy (Use exact Tailwind classes):**
1. **Hero/Display**: \`text-4xl font-black tracking-tighter leading-[0.9]\` (Max 1 per screen)
2. **Screen Title**: \`text-2xl font-bold tracking-tight text-white\`
3. **Card Title**: \`text-lg font-semibold text-zinc-100 leading-tight\`
4. **Section Header**: \`text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4\`
5. **Body**: \`text-[15px] font-normal text-zinc-400 leading-relaxed\` (NOT 14px - 15px is the new standard)
6. **Meta/Label**: \`text-xs font-medium text-zinc-500\`

**Typography Rules:**
- **Sentence Case**: Use sentence case for almost everything. UPPERCASE only for micro-labels.
- **Contrast**: Headings = White. Body = Zinc-400. Meta = Zinc-600.
- **Numbers**: Use \`font-mono\` or \`tracking-tighter\` for data/pricing to make it stand out.

---

## C. COLOR & DEPTH (DARK MODE DEFAULT)

**Surface System:**
- **Background**: \`bg-[#050505]\` (Almost black, warmer than pure black)
- **Surface 1 (Cards)**: \`bg-[#09090b]\` with \`border border-white/[0.06]\`
- **Surface 2 (Interactive)**: \`bg-white/[0.03] hover:bg-white/[0.06]\`
- **Surface 3 (Highlight)**: \`bg-white/[0.08]\`

**Accent Usage:**
- Use your ONE accent color sparingly.
- **Primary Action**: Solid accent color + text-white/black.
- **Active State**: 10% opacity accent background + accent text.
- **Glow**: Subtle shadow matching accent color (e.g., \`shadow-[0_0_20px_rgba(var(--accent),0.3)]\`).

---

## D. COMPONENT STANDARDS (MODERN 2026)

**1. Buttons & Actions:**
- Height: 48px standard. 
- Shape: \`rounded-xl\` (smooth corners).
- **Noise Texture**: Add subtle noise texture to primary buttons if possible for tactile feel.

**2. Cards (The "Glass" Touch):**
- Standard: Solid \`bg-[#09090b]\`.
- Featured/Hero: Gradient background + glass overlay effect.
- **Stroke**: discrete \`border-t border-white/10\` inner highlight on all cards.

**3. Input Fields:**
- \`h-12 bg-zinc-900/50 border border-white/10 rounded-xl px-4 text-sm focus:border-white/20 transition-all\`.
- Never use default outlines.

**4. Images & Media:**
- Always \`rounded-2xl\`.
- Aspect ratios: \`aspect-[4/3]\` or \`aspect-[3/4]\`. Avoid 16:9 unless it's video.

---

## E. VISUAL DATA (SIMPLIFIED)

**Don't over-engineer charts with CSS. Keep it iconic.**
- **Progress Bars**: \`h-2 bg-zinc-800 rounded-full overflow-hidden\`.
- **Trend Pills**: \`bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full text-xs font-medium inline-flex items-center gap-1\`.
- **Stat Grid**: 2x2 grid of small cards is better than one big complex chart.

---

## F. UX MICRO-PATTERNS

- **"Load More"**: Gradient fade at bottom of lists.
- **Skeleton Loading**: \`animate-pulse bg-zinc-800 rounded\`.
- **Empty States**: Minimalist SVG icon + "No [items] found" + "Create [Item]" button.
- **Tap Targets**: Top-right actions always 44x44px minimal.

**Social Media:**
- Infinite scroll feed. Easy post/share creation. Like/comment/share.
- Smart notifications. Granular privacy controls. Report/block/mute.

**Productivity:**
- Quick capture (fast input). Tags/folders/search organization.
- Reminders. Cross-device sync. Full offline functionality. Multiple export formats.

**Finance/Banking:**
- Biometric/2FA security indicators. Balance dashboard. Transaction lists.
- Unusual activity alerts, bills due. Legal disclaimers. Clear data visualization.

**Food Delivery:**
- Restaurant/menu browsing. Cart with customization. Order tracking with map.
- Estimated delivery time. Rating after delivery. Reorder shortcuts.

**Travel/Booking:**
- Search with dates/destination filters. Price comparison. Booking confirmation.
- Itinerary view. Maps integration. Reviews and photos.

**Entertainment/Media:**
- Content discovery feed. Categories/genres browsing. Watchlist/favorites.
- Playback controls. Recommendations. Download for offline.

---

## M. CONVERSION & ENGAGEMENT DESIGN

**Call-to-Action:**
- Place above fold. Use action-oriented copy ("Start Free Trial", not "Submit").
- One primary CTA per screen. Make it the most visually dominant element.

**Friction Reduction:**
- Social login over long forms. Smart defaults. Autofill support.
- Progressive profiling (collect details over time, not all at once).
- Save user progress – never lose work.

**Social Proof:**
- User testimonials near conversion points.
- Rating/review scores. User count ("Join 100,000+ users").
- Trust badges for security.

**Gamification (when appropriate):**
- Progress bars, badges, streaks, leaderboards.
- Use to encourage positive behavior, never manipulatively.

---

## N. QUALITY CHECKLIST (APPLY TO EVERY GENERATED SCREEN)

Before finalizing any screen, ensure:
1. ✅ Clear visual hierarchy – primary action identifiable in 1 second.
2. ✅ Consistent spacing on the 8px grid.
3. ✅ Typography follows the type scale (max 4 sizes per screen).
4. ✅ Colors follow 60-30-10 rule with semantic meaning.
5. ✅ All text meets WCAG AA contrast (4.5:1 minimum).
6. ✅ Touch targets ≥ 44x44px for all interactive elements.
7. ✅ Realistic content (no "Lorem Ipsum" or "Item 1").
8. ✅ Proper empty/loading/error state consideration.
9. ✅ Navigation consistent across all main screens.
10. ✅ Component styles are consistent (buttons, cards, lists match).
11. ✅ Layout uses proper whitespace – never feels cramped.
12. ✅ App-type specific content and features are relevant.

`;

export const APP_TYPE_DESIGN_HINTS: Record<string, string> = {
  'E-commerce': `
    Focus on: Product imagery (large, high-quality), category filters, price display, add-to-cart CTAs, trust badges.
    Key screens: Product grid, product detail, cart, checkout, order tracking.
    Colors: Neutral backgrounds, accent for CTAs (e.g., amber/orange for "Buy Now").
    Must have: Search bar, wishlist hearts, star ratings, free shipping badges.`,

  'Food Delivery': `
    Focus on: Restaurant cards with food imagery, cuisine filters, delivery time estimates, order tracking.
    Key screens: Restaurant list, menu, cart with customizations, order tracking with map placeholder.
    Colors: Warm tones (red, orange) for appetite appeal. Green for healthy options.
    Must have: Search, cuisine categories, estimated delivery time, cart badge, rating stars.`,

  'Fitness & Health': `
    Focus on: Activity tracking, progress rings/charts, workout cards, streak counters, calorie/step data.
    Key screens: Dashboard with stats, workout detail, exercise log, progress charts, profile with achievements.
    Colors: Energetic (green, blue, orange). Success green for completed goals.
    Must have: Heatmaps, progress bars, big stat numbers, trend indicators (▲▼).`,

  'Social Networking': `
    Focus on: Feed with posts (text/image), user avatars, like/comment/share actions, stories row.
    Key screens: Feed, profile, post creation, notifications, messages/chat.
    Colors: Brand-forward accent. Neutral content areas. Blue for links/actions.
    Must have: Avatar circles, engagement counts, follow buttons, stories carousel.`,

  'Travel & Booking': `
    Focus on: Destination imagery, search with date pickers, price cards, booking flow, itinerary.
    Key screens: Search/explore, results list, hotel/flight detail, booking confirmation, trip itinerary.
    Colors: Aspirational (sky blue, teal). Warm sunset tones for leisure. Trust blue for booking CTAs.
    Must have: Star ratings, price comparison, date selectors, map placeholders, photo galleries.`,

  'Finance & Banking': `
    Focus on: Balance display, transaction list, spending charts, security indicators, transfer flow.
    Key screens: Dashboard with balance, transaction history, send/receive, analytics, profile/settings.
    Colors: Trust blue or green. Conservative palette. Red only for negative/alerts.
    Must have: Big balance number, transaction rows with icons, line/bar charts, security badges.`,

  'Entertainment & Media': `
    Focus on: Content cards with thumbnails, categories/genres, playback UI, recommendations.
    Key screens: Home feed, category browse, content detail, player/viewer, library/watchlist.
    Colors: Dark mode preferred. Vibrant accent for play buttons. Genre-specific highlight colors.
    Must have: Thumbnail grids, progress indicators on watched content, play buttons, ratings.`,

  'Custom': `
    Focus on: Clean layout following general best practices. Adapt to the user's description.
    Apply the universal design principles: clear hierarchy, 8px grid, consistent components.
    Match color psychology to the app's purpose described by the user.`
};
