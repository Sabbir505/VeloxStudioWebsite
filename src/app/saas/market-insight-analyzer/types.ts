export interface ProductIdea {
  name: string;
  category: string;
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
}

export interface Competitor {
  name: string;
  strengths: string[];
  weaknesses: string[];
  pricingModel: string;
  marketShareEstimate: number; // 0-100
  revenueDriver: string;
  pricingTiers?: PricingTier[];
}

export interface PainPoint {
  pain: string;
  score: number; // 0-100 representing severity/frequency
  severity: "High" | "Medium" | "Low";
}

export interface FeatureComparison {
  feature: string;
  comparison: {
    [competitorName: string]: string; // "Yes", "No", "$10", "Limited"
  };
}

export interface MarketTrend {
  name: string;
  impact: number; // 0-100
}

export interface MarketReport {
  executiveSummary: {
    verdict: "GO" | "NO-GO" | "PIVOT";
    confidenceScore: number;
    summary: string;
  };
  marketOverview: {
    totalAddressableMarket: string;
    growthTrend: "Growing" | "Stable" | "Declining";
    keyTrends: MarketTrend[];
  };
  competitors: Competitor[];
  featureComparison: FeatureComparison[];
  pricingStrategy: {
    recommendedPricePoint: string;
    model: string;
    rationale: string;
    tiers: PricingTier[];
  };
  userSentiment: {
    painPoints: PainPoint[]; 
    desiredFeatures: string[];
    sentimentScore: number; // 0-100
  };
  opportunities: {
    gaps: string[];
    differentiationStrategy: string;
  };
  sources?: Array<{
    title: string;
    uri: string;
  }>;
}

export enum AppView {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  REPORT = 'REPORT'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}