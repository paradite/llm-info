import { AI_PROVIDER_TYPE } from './provider';

export type ModelInfo = {
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
  legacy?: boolean;
  alpha?: boolean;
  small?: boolean;
  reasoning?: boolean;
  recommendedForCoding?: boolean;
};
