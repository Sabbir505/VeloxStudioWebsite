import { GoogleGenAI, Modality, Type } from "@google/genai";
import { ProductIdea, MarketReport } from "../types";

// Helper to get API key safely
const getApiKey = (): string => {
  const key = process.env.API_KEY;
  if (!key) {
    console.error("API_KEY is missing from environment variables");
    return "";
  }
  return key;
};

// 1. Generate Market Analysis Report
// Uses gemini-3-pro-preview with Search Grounding and Thinking Budget
export const generateMarketAnalysis = async (idea: ProductIdea): Promise<MarketReport> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key not found");

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Act as a senior-level Product Strategy Consultant with access to real-time market data. 
    Conduct a deep-dive, precise, and comprehensive market validation report for the following product idea:
    
    Product Name: ${idea.name}
    Category: ${idea.category}

    PROCESS:
    1. **Inference**: First, infer a highly specific product description, feature set, and target audience based on the name and category.
    2. **Research**: Use Google Search to find *specific* quantitative data (market size numbers, CAGR, pricing of actual competitors). Do not halluncinate data. If exact numbers aren't found, estimate based on similar sectors and explicitly state "Estimated".
    3. **Analysis**: Synthesize this into a detailed report. 

    REQUIREMENTS (BE COMPREHENSIVE):
    - **Market Overview**: Provide specific numbers for Total Addressable Market (TAM) and CAGR. List at least 5-7 distinct key market trends. Assign an "impact" score (0-100) to each trend indicating its current relevance.
    - **Competitors**: Identify the top 5-8 real, named competitors. Do not limit to just 2 or 3. If the market is crowded, list the major players. Gather DETAILED pricing information for each. CRITICAL: Identify the specific "Cash Cow" feature or revenue driver for each.
    - **Feature Matrix**: Compare ALL identified competitors on at least 6-8 critical features. Ensure the comparison is accurate to their current capabilities.
    - **Pricing**: Provide a detailed tiered pricing structure based on market standards.
    - **Sentiment**: Extract at least 5 specific, distinct pain points and 5 desired features from user reviews of these competitors.

    Return a valid JSON object strictly matching this structure (no markdown formatting, just raw JSON):
    {
      "executiveSummary": {
        "verdict": "GO" | "NO-GO" | "PIVOT",
        "confidenceScore": number (0-100),
        "summary": "Concise but data-backed summary justifying the verdict."
      },
      "marketOverview": {
        "totalAddressableMarket": "Specific $ value and year (e.g., '$12.4B (2024)')",
        "growthTrend": "Growing" | "Stable" | "Declining",
        "keyTrends": [
          { "name": "Trend Name", "impact": 85 }
        ]
      },
      "competitors": [
        {
          "name": "Real Competitor Name",
          "strengths": ["Specific strength 1", "Specific strength 2", "Specific strength 3"],
          "weaknesses": ["Specific weakness 1", "Specific weakness 2"],
          "pricingModel": "e.g. Freemium ($0/$20mo)",
          "marketShareEstimate": number (rough estimate 0-100 based on popularity),
          "revenueDriver": "The specific feature, service, or product line that drives the majority of their revenue (e.g. 'Enterprise API licensing', 'In-app purchases for speedups').",
          "pricingTiers": [
             {
               "name": "Tier Name (e.g. Free, Pro)",
               "price": "Price (e.g. $0, $29/mo)",
               "features": ["Feature A", "Feature B"]
             }
          ]
        }
      ],
      "featureComparison": [
        {
          "feature": "Critical Feature Name",
          "comparison": {
             "Competitor A Name": "Yes/No/Value",
             "Competitor B Name": "Yes/No/Value",
             "Competitor C Name": "Yes/No/Value"
             // Ensure all competitors listed above are present here
          }
        }
      ],
      "pricingStrategy": {
        "recommendedPricePoint": "e.g. $29/mo",
        "model": "Subscription / One-time / Freemium",
        "rationale": "Detailed explanation of why this price point wins against competitors.",
        "tiers": [
          {
            "name": "e.g. Basic",
            "price": "$X",
            "features": ["Feature 1", "Feature 2"]
          },
          {
            "name": "e.g. Pro",
            "price": "$Y",
            "features": ["Feature 1", "Feature 2", "Feature 3"]
          }
        ]
      },
      "userSentiment": {
        "painPoints": [
           { "pain": "Specific user complaint", "score": 90, "severity": "High" }
        ],
        "desiredFeatures": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
        "sentimentScore": number (0-100)
      },
      "opportunities": {
        "gaps": ["Market gap 1", "Market gap 2", "Market gap 3"],
        "differentiationStrategy": "Detailed strategy on how to capture the identified gaps."
      }
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        // Increased thinking budget for deeper analysis
        thinkingConfig: { thinkingBudget: 8192 },
      },
    });

    let jsonStr = response.text || "{}";
    // Cleanup if model adds markdown blocks despite instructions
    jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();

    const report: MarketReport = JSON.parse(jsonStr);

    // Attach sources from grounding metadata if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks) {
      report.sources = groundingChunks
        .map((chunk: any) => chunk.web)
        .filter((web: any) => web && web.uri && web.title)
        .slice(0, 8); // Top 8 sources for better coverage
    }

    return report;

  } catch (error) {
    console.error("Error generating report:", error);
    throw error;
  }
};

// 2. Chat Assistant
// Uses gemini-3-flash-preview for fast, conversational responses
export const sendChatMessage = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key not found");

  const ai = new GoogleGenAI({ apiKey });

  // Convert history to compatible format if needed, though SDK usually handles it well.
  // We'll create a fresh chat for simplicity in this demo function, or pass history.
  // Here we use a stateless single-turn approach or simplified chat for the component.
  
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    history: history,
    config: {
      systemInstruction: "You are a helpful assistant for the Market Insight Analyzer app. Keep answers concise and business-focused.",
    }
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};

// 3. Generate Audio Summary (TTS)
// Uses gemini-2.5-flash-preview-tts
export const generateAudioSummary = async (text: string): Promise<ArrayBuffer> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key not found");

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Fenrir' }, // Deep, professional voice
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) {
    throw new Error("No audio data returned");
  }

  // Convert base64 to ArrayBuffer
  const binaryString = atob(base64Audio);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

// 4. Generate Concept Image
// Uses gemini-3-pro-image-preview
export const generateConceptImage = async (prompt: string): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key not found");

  const ai = new GoogleGenAI({ apiKey });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [
        { text: prompt }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
        imageSize: "1K"
      }
    }
  });

  // Extract image
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("No image generated");
};