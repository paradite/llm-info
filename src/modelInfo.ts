import { ModelEnum } from './model';
import { AI_PROVIDER_TYPE } from './provider';

export type ModelInfoCurrent = {
  name: string;
  provider: AI_PROVIDER_TYPE;
  id: string;
  contextWindowTokenLimit: number;
  outputTokenLimit: number | null;
  pricePerMillionInputTokens: number | null;
  pricePerMillionOutputTokens: number | null;
  tokenizerId: string | null;
  notes?: string;
  notesUrl?: string;
  legacy: false;
  alpha?: boolean;
  small?: boolean;
  reasoning?: boolean;
  recommendedForCoding?: boolean;
  recommendedForWriting?: boolean;
  supportsImageInput?: boolean;
  openRouterModelId?: string;
  releaseDate?: string; // ISO date string for models with same ID but different versions
};

export type ModelInfoLegacy = {
  name: string;
  provider: AI_PROVIDER_TYPE;
  id: string;
  contextWindowTokenLimit: number;
  outputTokenLimit: number | null;
  pricePerMillionInputTokens: number | null;
  pricePerMillionOutputTokens: number | null;
  tokenizerId: string | null;
  notes?: string;
  notesUrl?: string;
  legacy: true;
  legacyReason: string;
  alpha?: boolean;
  small?: boolean;
  reasoning?: boolean;
  recommendedForCoding?: boolean;
  recommendedForWriting?: boolean;
  supportsImageInput?: boolean;
  openRouterModelId?: string;
  releaseDate?: string; // ISO date string for models with same ID but different versions
};

export type ModelInfoDeprecated = {
  name: string;
  provider: AI_PROVIDER_TYPE;
  id: ModelEnum;
  contextWindowTokenLimit: number;
  outputTokenLimit: number | null;
  pricePerMillionInputTokens: number | null;
  pricePerMillionOutputTokens: number | null;
  tokenizerId: string | null;
  notes?: string;
  notesUrl?: string;
  legacy: true;
  legacyReason: string;
  deprecated: true;
  alpha?: boolean;
  small?: boolean;
  reasoning?: boolean;
  recommendedForCoding?: boolean;
  recommendedForWriting?: boolean;
  supportsImageInput?: boolean;
  openRouterModelId?: string;
  releaseDate: string; // ISO date string for models with same ID but different versions
};

export type ModelInfo =
  | ModelInfoCurrent
  | ModelInfoLegacy
  | ModelInfoDeprecated;
