/**
 * Anti-AI-Slop Design Rules
 *
 * Targets the specific patterns that make AI-generated UI look generic,
 * soulless, and immediately recognizable as "made by AI."
 * Injected into the system prompt to force variety, intent, and craft.
 */

export const ANTI_AI_SLOP_RULES = `
## ANTI-AI-SLOP DIRECTIVES (HUMAN TOUCH)

These rules prevent the "Generic AI" look.

### RULE 1: BROKEN GRIDS (ASYMMETRY IS KING)
AI defaults to 2-column or 4-column balanced grids.
**YOU MUST**: Use asymmetrical layouts.
- Row 1: 1 big card (col-span-2) + 1 small vertical card.
- Row 2: 3 small cards.
- Row 3: 1 full-width section.
*Never stack 3 identical rows of 2 cards.*

### RULE 2: DATA IS MESSY (REALISM)
Real data is never perfect.
- **Numbers**: Use 73.4%, $1,249.00, 142 items. Never "100%", "$50", "10 items".
- **Text**: Some titles are long (wrap 2 lines), some are short.
- **Avatars**: Some have photos, some have initials.

### RULE 3: SCROLLABLE AREAS
Not everything fits on one screen.
- Use \`overflow-x-auto\` for horizontal card lists.
- Make the last card "peek" off-screen (padding-right) to imply scrollability.

### RULE 4: INTENTIONAL EMPTY SPACE
- Don't fill every white pixel.
- if a card has a big number, it doesn't need an icon AND a label AND a trend. Just the number and label is chic.

### RULE 5: NO "LOREM IPSUM" VIBES
- Use specific nouns for the App Type.
- Fitness? "Upper Body Hypertrophy", "Ramsay Park Run".
- Finance? "Netflix Subscription", "Dividend Payout".

### RULE 6: THE "UN-TEMPLATE" CHECK
- If the screen looks like a standard Bootstrap/Tailwind template, **REDO IT**.
- Add a floating element.
- Make an image break out of its container.
- Use a massive font size for one word.
`;
