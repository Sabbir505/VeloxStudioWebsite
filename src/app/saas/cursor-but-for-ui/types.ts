
export enum AppType {
  ECOMMERCE = 'E-commerce',
  FOOD_DELIVERY = 'Food Delivery',
  FITNESS = 'Fitness & Health',
  SOCIAL = 'Social Networking',
  TRAVEL = 'Travel & Booking',
  FINANCE = 'Finance & Banking',
  ENTERTAINMENT = 'Entertainment & Media',
  CUSTOM = 'Custom'
}

export interface User {
  email: string;
  name: string;
  id: string;
}

export interface Screen {
  id: string;
  name: string;
  description: string;
  code: string; // HTML string for rendering
  isGenerating?: boolean;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: number;
  lastModified: number;
  screens: Screen[];
}

export interface GeneratedResponse {
  screens: Array<{
    name: string;
    description: string;
    code: string;
  }>;
}

export enum ViewMode {
  CANVAS = 'canvas'
}

export enum DeviceType {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop'
}

export interface GenerationParams {
  appType: string;
  description: string;
  screenCount: number;
  style: string;
  theme?: string; // e.g., "Blue", "Red", "Emerald"
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  type?: 'text' | 'generation_result';
}

export interface UINode {
  tag: string;
  class?: string;
  className?: string;
  text?: string;
  children?: (UINode | string)[];
  attributes?: Record<string, string>;
  src?: string;
  alt?: string;
  placeholder?: string;
  type?: string;
}
