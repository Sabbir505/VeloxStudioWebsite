import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, Trend, NewsAnalysisResult, SignalAnalysisResult, PraiseAnalysisResult, MarketOverviewResult, UploadedImage, MarketPulseResult, MarketPulseResponse } from "../types";
import { GEMINI_MODEL, SAMPLE_PROMPT, NEWS_PROMPT, SIGNAL_PROMPT, PRAISE_PROMPT, MARKET_OVERVIEW_PROMPT, MARKET_PULSE_PROMPT, BINANCE_SQUARE_PROMPT } from "../constants";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- Chart Analysis Schema ---
const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    coinName: { type: Type.STRING, description: "Name of the cryptocurrency pair, e.g. BTC/USDT" },
    timeframe: { type: Type.STRING, description: "Chart timeframe, e.g. 4H, 1D" },
    trend: { type: Type.STRING, enum: [Trend.BULLISH, Trend.BEARISH, Trend.NEUTRAL], description: "Current market trend" },
    patterns: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List of identified chart patterns" 
    },
    keyLevels: {
      type: Type.OBJECT,
      properties: {
        support: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of support price levels" },
        resistance: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of resistance price levels" }
      },
      required: ["support", "resistance"]
    },
    assessment: { 
      type: Type.STRING, 
      description: "A natural, human-like paragraph describing the technical analysis, context, and potential moves. Do not use bullet points." 
    },
    confidence: { type: Type.NUMBER, description: "Confidence score from 0 to 100" }
  },
  required: ["coinName", "timeframe", "trend", "patterns", "keyLevels", "assessment", "confidence"]
};

// --- Market Overview Schema ---
const marketOverviewSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    sentiment: { type: Type.STRING, enum: ['Bullish', 'Bearish', 'Mixed'] },
    marketMood: { type: Type.STRING, description: "Short descriptive phrase e.g. 'Bitcoin Dominance Squeeze'" },
    topPerformers: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          ticker: { type: Type.STRING },
          change: { type: Type.STRING, description: "Percentage change e.g. +5.2%" }
        },
        required: ['ticker', 'change']
      }
    },
    laggards: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          ticker: { type: Type.STRING },
          change: { type: Type.STRING, description: "Percentage change e.g. -2.1%" }
        },
        required: ['ticker', 'change']
      }
    },
    summary: { type: Type.STRING, description: "Money flow observation" },
    socialPost: { type: Type.STRING, description: "Full social media draft" }
  },
  required: ["sentiment", "marketMood", "topPerformers", "laggards", "summary", "socialPost"]
};

// --- News Analysis Schema ---
const newsSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    topic: { type: Type.STRING, description: "The topic being analyzed" },
    impactLevel: { type: Type.STRING, enum: ['High', 'Medium', 'Low'], description: "Potential market impact" },
    marketSentiment: { type: Type.STRING, enum: ['Hawkish', 'Dovish', 'Neutral', 'Volatile'], description: "Sentiment bias" },
    affectedAssets: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of up to 3 tickers affected" },
    tradingStrategy: { type: Type.STRING, description: "Short actionable strategy directive" },
    keyTakeaway: { type: Type.STRING, description: "One sentence bottom line for traders" },
    socialPost: { type: Type.STRING, description: "The final social media post text" }
  },
  required: ["topic", "impactLevel", "marketSentiment", "affectedAssets", "tradingStrategy", "keyTakeaway", "socialPost"]
};

// --- Market Pulse Schema ---
const marketPulseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    marketOverview: { type: Type.STRING, description: "A 2-sentence summary of the overall market mood." },
    news: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          sentiment: { type: Type.STRING, enum: ['Bullish', 'Bearish', 'Neutral'] },
          timestamp: { type: Type.STRING, description: "Relative time e.g. '2h ago'" }
        },
        required: ['title', 'summary', 'sentiment', 'timestamp']
      }
    },
    upcomingEvents: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          event: { type: Type.STRING },
          date: { type: Type.STRING },
          importance: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
          expectedImpact: { type: Type.STRING }
        },
        required: ['event', 'date', 'importance', 'expectedImpact']
      }
    }
  },
  required: ['marketOverview', 'news', 'upcomingEvents']
};

// --- Signal Analysis Schema ---
const signalSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    coin: { type: Type.STRING, description: "Ticker" },
    timeframe: { type: Type.STRING, description: "Timeframe" },
    direction: { type: Type.STRING, enum: ['Long', 'Short'] },
    entry: { type: Type.STRING },
    stopLoss: { type: Type.STRING },
    stats: {
      type: Type.OBJECT,
      properties: {
        winRate: { type: Type.STRING },
        netPnL: { type: Type.STRING },
        winLossRatio: { type: Type.STRING },
        confidenceScore: { type: Type.STRING, description: "The confidence score or signal strength extracted from the image" }
      },
      required: ["winRate", "netPnL", "winLossRatio", "confidenceScore"]
    },
    targets: { type: Type.ARRAY, items: { type: Type.STRING } },
    formattedPost: { type: Type.STRING, description: "The fully formatted social post string" }
  },
  required: ["coin", "timeframe", "direction", "entry", "stopLoss", "stats", "targets", "formattedPost"]
};

// --- Praise Analysis Schema ---
const praiseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    ticker: { type: Type.STRING, description: "The tickers found (e.g. 'BTC & ETH')" },
    gainDescription: { type: Type.STRING, description: "Short summary of wins including profit % (e.g. 'All Targets Hit (+15%)')" },
    numberOfTargetsHit: { type: Type.INTEGER, description: "Integer representing max TP hit (0-4)" },
    totalProfitPercentage: { type: Type.STRING, description: "The ROI percentage string (e.g. +145%)" },
    socialPost: { type: Type.STRING, description: "The celebratory social media post" }
  },
  required: ["ticker", "gainDescription", "numberOfTargetsHit", "totalProfitPercentage", "socialPost"]
};

const cleanJson = (text: string): string => {
    // Remove markdown code blocks if present (e.g. ```json ... ```)
    return text.replace(/```json/g, '').replace(/```/g, '').trim();
};

export const analyzeChartImage = async (base64Image: string, mimeType: string): Promise<AnalysisResult> => {
  try {
    const base64Data = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: {
        parts: [
          { inlineData: { mimeType: mimeType, data: base64Data } },
          { text: SAMPLE_PROMPT }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "You are an expert crypto day trader. You speak concisely using technical terminology. You avoid fluff, robotic transitions, and stating the obvious. Your analysis is sharp, confident, and actionable.",
        temperature: 0.3, 
      }
    });

    const text = response.text;
    if (!text) throw new Error("No analysis generated from the model.");

    return JSON.parse(cleanJson(text)) as AnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    throw new Error("Failed to analyze the chart. Please try a clearer image or try again later.");
  }
};

export const analyzeMarketOverview = async (base64Image: string, mimeType: string): Promise<MarketOverviewResult> => {
  try {
    const base64Data = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: {
        parts: [
          { inlineData: { mimeType: mimeType, data: base64Data } },
          { text: MARKET_OVERVIEW_PROMPT }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: marketOverviewSchema,
        systemInstruction: "You are a crypto market analyst. You analyze heatmaps and price lists to determine overall sentiment and flow. You are concise and professional.",
        temperature: 0.4,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No analysis generated.");

    return JSON.parse(cleanJson(text)) as MarketOverviewResult;

  } catch (error) {
    console.error("Market Overview Analysis Failed:", error);
    throw new Error("Failed to analyze market heatmap.");
  }
};

export const analyzeNewsTopic = async (topic: string): Promise<NewsAnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: {
        parts: [
          { text: `Topic: ${topic}. \n\n ${NEWS_PROMPT}` }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: newsSchema,
        systemInstruction: "You are a cynical, experienced macro trader. You analyze economic news for its liquidity impact. You are concise.",
        temperature: 0.4,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No news analysis generated.");

    return JSON.parse(cleanJson(text)) as NewsAnalysisResult;
  } catch (error) {
    console.error("News Analysis Failed:", error);
    throw new Error("Failed to analyze topic.");
  }
};

export const fetchMarketPulse = async (): Promise<MarketPulseResponse> => {
  try {
    const now = new Date().toLocaleString("en-US", { timeZoneName: "short" });
    const timeAwarePrompt = `Current Date and Time: ${now}.\n\n${MARKET_PULSE_PROMPT}`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: {
        parts: [{ text: timeAwarePrompt }]
      },
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: marketPulseSchema
      }
    });

    const text = response.text;
    if (!text) throw new Error("No market pulse generated.");

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => ({
        title: chunk.web?.title || 'Source',
        uri: chunk.web?.uri || ''
      }))
      .filter((s: any) => s.uri) || [];

    return {
      data: JSON.parse(cleanJson(text)) as MarketPulseResult,
      sources: sources
    };

  } catch (error) {
    console.error("Market Pulse Failed:", error);
    throw new Error("Failed to fetch market data. Please try again.");
  }
};

export const generateBinancePost = async (item: any): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: {
        parts: [
          { text: `${BINANCE_SQUARE_PROMPT}\n\n${JSON.stringify(item)}` }
        ]
      },
      config: {
        temperature: 0.7,
      }
    });

    const text = response.text;
    if (!text) throw new Error("Failed to generate post.");
    return text.trim();

  } catch (error) {
    console.error("Binance Post Generation Failed:", error);
    throw new Error("Failed to create post.");
  }
};

export const analyzeSignalImage = async (base64Image: string, mimeType: string): Promise<SignalAnalysisResult> => {
  try {
    const base64Data = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: {
        parts: [
          { inlineData: { mimeType: mimeType, data: base64Data } },
          { text: SIGNAL_PROMPT }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: signalSchema,
        systemInstruction: "You are a specialized trading bot that extracts numerical data from chart screenshots and formats them into signals.",
        temperature: 0.1, 
      }
    });

    const text = response.text;
    if (!text) throw new Error("No signal analysis generated.");

    return JSON.parse(cleanJson(text)) as SignalAnalysisResult;

  } catch (error) {
    console.error("Signal Analysis Failed:", error);
    throw new Error("Failed to extract signal data. Ensure metrics are visible on the chart.");
  }
};

export const analyzePraiseImage = async (images: UploadedImage[]): Promise<PraiseAnalysisResult> => {
  try {
    const imageParts = images.map(img => ({
      inlineData: {
        mimeType: img.mimeType,
        data: img.base64.split(',')[1] || img.base64
      }
    }));

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: {
        parts: [
          ...imageParts,
          { text: PRAISE_PROMPT }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: praiseSchema,
        systemInstruction: "You are a crypto social media manager. Your task is to verify wins. PRIORITIZE extracting data from 'Long Printed' or 'Short Printed' labels if visible. You must be PRECISE with TP levels and ACCURATE with Profit %. You must write UNIQUE, non-repetitive captions by picking different tones/vibes.",
        temperature: 0.8, 
      }
    });

    const text = response.text;
    if (!text) throw new Error("No analysis generated.");

    return JSON.parse(cleanJson(text)) as PraiseAnalysisResult;

  } catch (error) {
    console.error("Praise Analysis Failed:", error);
    throw new Error("Failed to generate hype post.");
  }
};