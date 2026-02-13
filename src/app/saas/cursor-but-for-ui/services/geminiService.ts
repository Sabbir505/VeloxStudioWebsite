
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { INITIAL_PROMPT_SYSTEM_INSTRUCTION } from '../constants';
import { APP_TYPE_DESIGN_HINTS } from '../designSystem';
import { NAV_STYLE_FOR_APP_TYPE } from '../navigationSystem';
import { APP_TYPE_GRADIENT_PALETTE } from '../visualDesign';
import { GenerationParams, Screen } from '../types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Model fallback chain: each model has its own separate free-tier quota
const MODEL_FALLBACK_CHAIN = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-2.0-flash-lite",
];

// Try an operation across multiple models with retry+backoff per model
async function tryWithModelFallback<T>(
  operation: (model: string) => Promise<T>,
  retriesPerModel = 3,
  initialDelay = 3000
): Promise<T> {
  let lastError: any;
  for (const model of MODEL_FALLBACK_CHAIN) {
    try {
      return await retryWithBackoff(() => operation(model), retriesPerModel, initialDelay);
    } catch (error: any) {
      lastError = error;
      const code = error?.code || error?.error?.code;
      const status = error?.status || error?.error?.status;
      const message = error?.message || '';
      const isUnavailable = code === 503 || code === 429 || status === 'UNAVAILABLE' || status === 'RESOURCE_EXHAUSTED' || message.includes('503') || message.includes('429');
      if (isUnavailable) {
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

// Simple sanitizer to ensure no script execution and fix common layout issues
const sanitizeCode = (code: string): string => {
    return code
        .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "") // Remove scripts
        .replace(/onclick=["']([^"']*)["']/gim, "") // Remove inline events
        .replace(/javascript:/gim, "")
        // Ensure min-h-full is used for the wrapper to fit our preview area
        .replace(/h-screen/g, "min-h-full")
        .replace(/min-h-screen/g, "min-h-full")
        // Enforce safe area padding if missing, but be careful not to double add
        // This is a simple heuristic, the model instruction is the primary defense
        .replace(/class="([^"]*?)min-h-full/g, 'class="$1min-h-full pt-14 ');
};

async function retryWithBackoff<T>(operation: () => Promise<T>, retries = 4, initialDelay = 6000): Promise<T> {
  let lastError: any;
  for (let i = 0; i < retries; i++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      const status = error?.status || error?.error?.status || error?.response?.status;
      const code = error?.code || error?.error?.code;
      const message = error?.message || error?.error?.message;
      const isRateLimit = code === 429 || status === 'RESOURCE_EXHAUSTED' || (typeof message === 'string' && message.includes('429'));
      if ((isRateLimit || code === 503) && i < retries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

// Helper to extract JSON string value starting at a specific index
// returns { value: string, nextIndex: number }
const extractJsonStringValue = (str: string, startIndex: number): { value: string, nextIndex: number, complete: boolean } | null => {
    let result = '';
    let isEscaped = false;
    let i = startIndex;
    let complete = false;

    // First, ensure we are actually at a starting quote
    if (str[i] !== '"') return null;
    i++; // skip starting quote

    for (; i < str.length; i++) {
        const char = str[i];
        
        if (isEscaped) {
            if (char === 'n') result += '\n';
            else if (char === 'r') result += '\r';
            else if (char === 't') result += '\t';
            else if (char === '"') result += '"';
            else if (char === '\\') result += '\\';
            else result += char; // literal for others
            isEscaped = false;
            continue;
        }

        if (char === '\\') {
            isEscaped = true;
            continue;
        }

        if (char === '"') {
            complete = true;
            i++; // consume closing quote
            break;
        }

        result += char;
    }

    return { value: result, nextIndex: i, complete };
};

export const generateAppScreensStream = async (
  params: GenerationParams,
  onScreenUpdate: (screen: Partial<Screen>, index: number, isComplete: boolean) => void,
  signal?: AbortSignal
): Promise<void> => {
  const appTypeHint = APP_TYPE_DESIGN_HINTS[params.appType] || APP_TYPE_DESIGN_HINTS['Custom'] || '';
  const navStyle = NAV_STYLE_FOR_APP_TYPE[params.appType] || 'glassmorphic';
  const gradientPalette = APP_TYPE_GRADIENT_PALETTE[params.appType] || APP_TYPE_GRADIENT_PALETTE['Custom'] || '';

  const prompt = `
    Create a highly detailed, high-fidelity ${params.screenCount} screen mobile app design for a ${params.appType} application.
    
    ### PROJECT CONTEXT
    Description: ${params.description}
    Style: ${params.style}
    Theme: ${params.theme || 'Modern Dark Mode'}
    Navigation Style: ${navStyle} (use the matching nav pattern from the Navigation Design Framework)
    Gradient Palette: ${gradientPalette}
    
    ### APP-TYPE SPECIFIC DESIGN GUIDANCE
    ${appTypeHint}

    ### DESIGN REQUIREMENTS
    1. **CONSISTENCY IS KING**: Every screen must use the SAME locked design tokens: \`px-5\` margins, \`space-y-8\` sections, \`p-5 rounded-2xl bg-[#0A0A0A] border border-white/5\` cards, ONE accent color throughout, same icon style (Lucide SVG stroke-2), same top bar, same bottom nav.
    2. **Visual Richness with Restraint**: MAX 2 gradient elements per screen (hero + 1 accent). ONE hero stat/number at text-4xl font-black per screen max. Everything else: solid accent color. Gradient text on ONE heading max.
    3. **Content Variety within Consistent Structure**: Vary section ORDER and CONTENT TYPE per screen (dashboard=cards+chart, detail=image+info, profile=avatar+stats, settings=list). But use the same card shell, same spacing, same margins on all.
    4. **Realistic Content**: Use imperfect numbers (73%, 1,247, 8.3km). Vary text lengths. Mix item states (completed/in-progress/locked). Use specific timestamps ("Yesterday at 3:42 PM").
    5. **Navigation Consistency**: YOU MUST use the standardized "Bottom Dock" HTML provided in the system instructions for ALL main screens (Home, Search, Profile, etc.). Same tabs, same style. Highlight the correct active tab per screen. Do NOT add it to Onboarding/Login screens.
    6. **Elevation Hierarchy**: Most cards have NO shadow or shadow-sm. Only 1 hero/featured element per screen gets a dramatic shadow. Primary CTA gets accent glow.
    7. **Color**: ONE accent color for the ENTIRE app. Apply 60-30-10 rule (60% bg-[#050505], 30% card bg, 10% accent). Semantic colors for status (green=success, red=error).
    8. **Typography**: Follow the LOCKED type scale from the system instructions. Screen title = text-2xl font-bold. Section head = text-base font-semibold. Body = text-sm. Meta = text-xs. Micro = text-[10px] uppercase.
    9. **Accessibility**: All text WCAG AA contrast (4.5:1). All interactive elements ≥44x44px. Never use color alone.
    10. **The Cohesion Test**: When you view ALL screens side by side, they must look like they belong to the SAME app — same palette, same spacing, same card style, same icon style. Variety comes from CONTENT, not from structure.
    
    ### OUTPUT FORMAT: JSON
    Return a VALID JSON object with this exact structure.
    IMPORTANT: You MUST output the properties in this specific order: "name", "description", "code".
    
    {
      "screens": [
        {
          "name": "Screen Name",
          "description": "Brief description",
          "code": "<div class=\"min-h-full w-full bg-[#050505]\">...HTML...</div>"
        }
      ]
    }

    ### RULES:
    1. **Code**: Return pure HTML string using Tailwind CSS classes.
    2. **Images**: Use \`https://loremflickr.com/{width}/{height}/{keyword}?lock={random_int}\` for content. Use keywords relevant to the app type.
    3. **Container**: Root element must be a \`div\` with \`min-h-full w-full pb-24\`.
    4. **Safety**: ALWAYS add \`pt-14\` to the top of the content to avoid the top bar/notch.
    5. **Ordering**: Always output "name", then "description", then "code" for each screen.
    6. **No Markdown**: Do not use \`\`\`json or \`\`\`html code blocks. Just raw JSON.
    7. **COMPLETENESS (CRITICAL)**: You MUST generate EXACTLY ${params.screenCount} screens. Do NOT stop early. Do NOT truncate. Every screen must have full, complete HTML code. If you are generating a large app, ensure EVERY screen is included in the output.
  `;

  try {
    const streamingResp = await tryWithModelFallback((model) => ai.models.generateContentStream({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: INITIAL_PROMPT_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        maxOutputTokens: 65536,
      },
    }));

    let accumulated = '';
    
    // We will scan the accumulated string repeatedly to find screen objects
    // This is a robust way to handle the stream without complex state machines
    
    for await (const chunk of (streamingResp as unknown as AsyncIterable<GenerateContentResponse>)) {
       if (signal?.aborted) {
           throw new Error("Aborted");
       }

       const text = chunk.text;
       if(!text) continue;
       accumulated += text;

       // Simple manual parser to find "screens" array items
       // We assume the prompt follows the order: name -> description -> code
       
       let searchIndex = 0;
       let screenIndex = 0;

       // Find start of "screens" array
       const screensArrayMatch = /"screens"\s*:\s*\[/.exec(accumulated);
       if (screensArrayMatch) {
           searchIndex = screensArrayMatch.index + screensArrayMatch[0].length;

           while (true) {
               // Look for "name" key
               const nameKeyRegex = /"name"\s*:\s*/g;
               nameKeyRegex.lastIndex = searchIndex;
               const nameMatch = nameKeyRegex.exec(accumulated);
               
               if (!nameMatch) break; // No more screens started yet

               // Extract Name
               const nameStart = nameMatch.index + nameMatch[0].length;
               const nameResult = extractJsonStringValue(accumulated, nameStart);
               if (!nameResult) break; // Incomplete name string

               // Look for "description" key
               const descKeyRegex = /"description"\s*:\s*/g;
               descKeyRegex.lastIndex = nameResult.nextIndex;
               const descMatch = descKeyRegex.exec(accumulated);
               let description = "";
               let codeStartSearchIndex = nameResult.nextIndex;

               if (descMatch) {
                   const descStart = descMatch.index + descMatch[0].length;
                   const descResult = extractJsonStringValue(accumulated, descStart);
                   if (descResult) {
                       description = descResult.value;
                       codeStartSearchIndex = descResult.nextIndex;
                   }
               }

               // Look for "code" key
               const codeKeyRegex = /"code"\s*:\s*/g;
               codeKeyRegex.lastIndex = codeStartSearchIndex;
               const codeMatch = codeKeyRegex.exec(accumulated);

               if (codeMatch) {
                   const codeStart = codeMatch.index + codeMatch[0].length;
                   // Attempt to extract code - might be partial
                   const codeResult = extractJsonStringValue(accumulated, codeStart);
                   
                   if (codeResult) {
                       // We have a code string (partial or complete)
                       const screenData: Partial<Screen> = {
                           name: nameResult.value,
                           description: description,
                           code: sanitizeCode(codeResult.value)
                       };
                       
                       // Emit update
                       onScreenUpdate(screenData, screenIndex, codeResult.complete);
                       
                       // If complete, move search index forward to find next screen
                       if (codeResult.complete) {
                           searchIndex = codeResult.nextIndex;
                       } else {
                           // If code is incomplete, we can't find next screen anyway
                           break; 
                       }
                   } else {
                       // Code key found but string not started? Rare but possible
                       break;
                   }
               } else {
                    // Name found but code key not yet
                    // Emit what we have so far (name/desc)
                    onScreenUpdate({
                        name: nameResult.value,
                        description: description,
                        code: '' // No code yet
                    }, screenIndex, false);
                    break;
               }

               screenIndex++;
           }
       }
    }

  } catch (error) {
    if ((error as Error).message !== "Aborted") {
        console.error("Gemini Generation Error:", error);
    }
    throw error;
  }
};

export const refineScreen = async (screen: Screen, instruction: string): Promise<Screen> => {
    
    const prompt = `
      You are an expert UI Engineer applying the comprehensive Design Mastery Framework from the system instructions.
      Update the following UI based on the user's request while maintaining all design principles.
      
      ### REQUEST: 
      "${instruction}"

      ### INSTRUCTIONS:
      1. **PRIORITIZE FUNCTION & USABILITY**: Ensure the layout remains scannable. Don't break the grid. Follow the 8-point grid system.
      2. **VALID JSON**: You must return a valid JSON object. Escape all double quotes inside the HTML string properly.
      3. **NAVIGATION**: If this is a main screen (Home, Search, etc), ENSURE the standard bottom navigation from the System Instructions is present and the correct tab is highlighted.
      4. **THEME**: If the user asks for a color change, update the entire palette (backgrounds, buttons, text) following the 60-30-10 rule.
      5. **HIERARCHY**: Maintain clear visual hierarchy – ONE primary focal point per screen. Follow the type scale strictly.
      6. **ACCESSIBILITY**: Maintain WCAG AA contrast (4.5:1). All interactive elements ≥ 44x44px. Never rely on color alone.
      7. **COMPONENTS**: All buttons, cards, inputs must follow the component design standards (proper heights, border-radius, padding, states).

      Current HTML:
      ${screen.code}
      
      Structure:
      {
        "screens": [
            {
                "name": "${screen.name}",
                "description": "Updated version",
                "code": "<div class...updated html...</div>"
            }
        ]
      }
    `;

    try {
      const response = await tryWithModelFallback(async (model) => {
        const resp = (await ai.models.generateContent({
          model: model,
          contents: prompt,
          config: {
            systemInstruction: INITIAL_PROMPT_SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
          },
        })) as GenerateContentResponse;
        return resp;
      });
  
      const text = response.text;
      if (!text) throw new Error("No response from Gemini");
  
      let data;
      try {
          data = JSON.parse(text);
      } catch (e) {
          console.warn("Refinement JSON parse failed, attempting manual extraction", e);
          const codeMatch = /"code"\s*:\s*"([\s\S]*?)"\s*}/.exec(text);
          if (codeMatch) {
             const rawCode = codeMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\t/g, '\t');
             data = { screens: [{ code: rawCode }] };
          } else {
             throw new Error("Could not recover JSON from response");
          }
      }

      if (data.screens && data.screens.length > 0) {
        const newCode = data.screens[0].code;
        return {
            ...screen,
            code: sanitizeCode(newCode)
        };
      }
      throw new Error("Invalid refinement response structure");
  
    } catch (error) {
      console.error("Gemini Refinement Error:", error);
      throw error;
    }
}

export const refineElement = async (elementCode: string, instruction: string): Promise<string> => {
    const prompt = `
      You are an expert UI Engineer applying the comprehensive Design Mastery Framework from the system instructions.
      Update the following HTML element based on the user's request while maintaining all design principles.
      
      ### REQUEST: 
      "${instruction}"

      ### CURRENT HTML:
      ${elementCode}

      ### INSTRUCTIONS:
      1. Return ONLY the updated HTML string for this specific element.
      2. Do NOT wrap in markdown code blocks.
      3. Use Tailwind CSS for styling following the 8-point grid and type scale.
      4. Ensure tap targets are at least 44px for buttons (WCAG accessibility).
      5. Follow component design standards: proper height, border-radius, padding, and hover/active states.
      6. Maintain visual consistency with the rest of the screen (same border-radius, spacing patterns, color semantics).
      
      Structure:
      {
        "code": "<updated html element...>"
      }
    `;

    try {
      const response = await tryWithModelFallback(async (model) => {
        const resp = (await ai.models.generateContent({
          model: model,
          contents: prompt,
          config: {
            systemInstruction: INITIAL_PROMPT_SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
          },
        })) as GenerateContentResponse;
        return resp;
      });

      const text = response.text;
      if (!text) throw new Error("No response from Gemini");
      
      let data;
      try {
          data = JSON.parse(text);
      } catch (e) {
          console.warn("Element refinement JSON parse failed", e);
          const codeMatch = /"code"\s*:\s*"([\s\S]*?)"/.exec(text);
          if (codeMatch) {
             const rawCode = codeMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\t/g, '\t');
             data = { code: rawCode };
          } else {
             throw new Error("Could not recover JSON from response");
          }
      }

      if (data.code) {
          return sanitizeCode(data.code);
      }
      throw new Error("Invalid element refinement response");

    } catch (error) {
      console.error("Gemini Element Refinement Error:", error);
      throw error;
    }
}
