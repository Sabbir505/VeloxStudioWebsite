export interface CVEntry {
  title: string;
  subtitle: string; // Company or School
  date: string;
  location?: string;
  description: string[];
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  summary: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  sectionOrder: string[]; // e.g. ['experience', 'education', 'skills', 'projects']
  experience: CVEntry[];
  education: CVEntry[];
  skills: string[];
  projects: CVEntry[];
}

export enum TemplateType {
  MODERN = 'Modern',
  CLASSIC = 'Classic',
  MINIMAL = 'Minimal',
  PROFESSIONAL = 'Professional',
  CREATIVE = 'Creative',
  ACADEMIC = 'Academic',
  TECH = 'Tech',
  ELEGANT = 'Elegant',
  COMPACT = 'Compact',
}

export interface TemplateProps {
  data: CVData;
}