export enum Trend {
  BULLISH = 'Bullish',
  BEARISH = 'Bearish',
  NEUTRAL = 'Neutral/Sideways',
}

export interface KeyLevels {
  support: string[];
  resistance: string[];
}

export interface AnalysisResult {
  coinName: string;
  timeframe: string;
  trend: Trend;
  patterns: string[];
  keyLevels: KeyLevels;
  assessment: string;
  confidence: number;
}

export interface NewsAnalysisResult {
  topic: string;
  impactLevel: 'High' | 'Medium' | 'Low';
  marketSentiment: 'Hawkish' | 'Dovish' | 'Neutral' | 'Volatile';
  affectedAssets: string[];
  tradingStrategy: string;
  keyTakeaway: string;
  socialPost: string;
}

export interface SignalAnalysisResult {
  coin: string;
  timeframe: string;
  direction: 'Long' | 'Short';
  entry: string;
  stopLoss: string;
  stats: {
    winRate: string;
    netPnL: string;
    winLossRatio: string;
    confidenceScore: string;
  };
  targets: string[];
  formattedPost: string;
}

export interface PraiseAnalysisResult {
  ticker: string;
  gainDescription: string;
  numberOfTargetsHit: number;
  totalProfitPercentage: string;
  socialPost: string;
}

export interface MarketOverviewResult {
  sentiment: 'Bullish' | 'Bearish' | 'Mixed';
  marketMood: string;
  topPerformers: { ticker: string; change: string }[];
  laggards: { ticker: string; change: string }[];
  summary: string;
  socialPost: string;
}

export interface NewsItem {
  title: string;
  summary: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  timestamp: string;
}

export interface EventItem {
  event: string;
  date: string;
  importance: 'High' | 'Medium' | 'Low';
  expectedImpact: string;
}

export interface MarketPulseResult {
  marketOverview: string;
  news: NewsItem[];
  upcomingEvents: EventItem[];
}

export interface MarketPulseResponse {
  data: MarketPulseResult;
  sources: { title: string; uri: string }[];
}

export interface UploadedImage {
  base64: string;
  mimeType: string;
}

export interface AppState {
  images: UploadedImage[];
  isAnalyzing: boolean;
  result: AnalysisResult | null;
  marketResult: MarketOverviewResult | null;
  signalResult: SignalAnalysisResult | null;
  praiseResult: PraiseAnalysisResult | null;
  error: string | null;
}