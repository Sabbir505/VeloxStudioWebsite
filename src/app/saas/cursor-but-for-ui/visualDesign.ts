/**
 * Visually Stunning UI Design Framework
 * Dribbble-inspired modern app design — Function + Beauty balanced.
 *
 * Integrated into the Gemini system prompt so every generated screen
 * is both usable AND visually spectacular.
 */

// ---------------------------------------------------------------------------
// VISUAL DESIGN INSTRUCTION — injected into the system prompt
// ---------------------------------------------------------------------------
export const VISUAL_DESIGN_INSTRUCTION = `
## VISUAL EXCELLENCE DIRECTIVES (TRENDS 2026)

**Core Aesthetic**: "Dimensional Minimalism" — High depth, low noise.

### A. THE "DYNAMIC ISLAND" EFFECT
- **Fluid Containers**: Use pill-shaped containers for status updates or live activities.
- **Top-Bar Integration**: If showing a notification, make it appear to expand from the top header.
- **Floating Controls**: Place primary actions in a floating glass bar at the bottom, detached from the edge.

### B. BENTO BOX GRIDS (MANDATORY FOR DASHBOARDS)
- Never use a simple list when a grid can tell a story.
- **Variety**: Mix square (aspect-square), portrait (row-span-2), and landscape (col-span-2) cards.
- **Content density**: High density in small cards (numbers), low density in large cards (images).

### C. SOPHISTICATED GRADIENTS (NO RAINBOWS)
- **Mesh Gradients**: Use subtle, multi-point gradients for backgrounds (e.g., \`bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]\`).
- **Text Gradients**: Use ONLY for the single largest number or headline on the screen.
- **Button Glows**: Primary buttons should have a colored drop shadow matching their hue.

### D. DEPTH & GLASS
- **Layering**:
  1. Base: Deep black/zinc.
  2. Mid: Cards with \`border-white/5\`.
  3. Top: Glass overlays with \`backdrop-blur-xl bg-white/5\`.
- **Inner Borders**: Add \`box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.1)\` to cards to simulate a 3D edge.

### E. MICRO-INTERACTIONS (CSS)
- **Active Scaling**: All clickable cards must have \`active:scale-[0.98] transition-transform\`.
- **Hover Lifts**: Interactive elements should \`hover:-translate-y-1\` (desktop only).
- **Magnetic Buttons**: Round buttons should feel like they have weight.

### F. DATA PRESENTATION
- **Big Numbers**: If a number is important, it should be at least \`text-3xl\`.
- **Sparklines**: Use simple SVG paths to show trends. Don't label every axis.
- **Context**: Always show "vs last week" or "vs goal" in small text next to data.

### G. IMAGERY & MEDIA
- **Object-Fit**: Always use \`object-cover\` for images.
- **Avatars**: \`ring-2 ring-black\` to separate avatars from backgrounds.
- **Icon Containers**: \`w-10 h-10 rounded-full flex items-center justify-center bg-zinc-800 text-white\`.
`;

// ---------------------------------------------------------------------------
// Per-app-type gradient palette recommendations
// ---------------------------------------------------------------------------
export const APP_TYPE_GRADIENT_PALETTE: Record<string, string> = {
  'E-commerce': 'Sunset Vibes palette (Primary #FF6B95, Secondary #FEC163, Accent #B06AFF). Use Cyber Sunset gradient for hero cards, Fire & Ice for sale banners.',
  'Food Delivery': 'Fire & Ice palette (Primary #FF0844, Secondary #FFB199). Use Cyber Sunset for featured dishes, Mint Fresh for health labels.',
  'Fitness': 'Energetic Fitness palette (Primary #FA709A, Secondary #FEE140, Accent #FF6B6B). Cyber Sunset hero cards, Mint Fresh for nutrition, Aurora Borealis for achievements.',
  'Social': 'Bold Modern palette (Primary #667eea, Secondary #764ba2, Accent #f093fb). Purple Haze for stories, Neon Nights for live features.',
  'Travel': 'Ocean Dream palette (Primary #13547A, Secondary #80D0C7). Aurora Borealis for premium listings, Cyber Sunset for deals.',
  'Finance': 'Bold Modern palette (Primary #667eea, Secondary #764ba2). Ocean Dream for portfolio, Mint Fresh for positive gains, Fire & Ice for losses.',
  'Entertainment': 'Neon Nights + Purple Haze combo. Bold gradients everywhere — gaming/media apps thrive on visual energy.',
  'Custom': 'Bold Modern palette (Primary #667eea, Secondary #764ba2, Accent #f093fb). Versatile and premium-feeling.',
};
