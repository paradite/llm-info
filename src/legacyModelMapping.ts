import { ModelEnum } from './model';
import { ModelInfoLegacy } from './modelInfo';
import { AI_PROVIDERS } from './provider';

export interface LegacyModelMapping {
  modelId: ModelEnum;
  legacyName: string;
  legacyReleaseDate?: string;
  transitionDate?: string;
  notes?: string;
  legacyModelInfo: ModelInfoLegacy;
}

export const LEGACY_MODEL_MAPPINGS: LegacyModelMapping[] = [
  {
    modelId: ModelEnum['deepseek-chat'],
    legacyName: 'DeepSeek-V3 (new)',
    legacyReleaseDate: '2025-03-24',
    transitionDate: '2025-08-21',
    notes: 'Model ID remained the same but refers to a newer version',
    legacyModelInfo: {
      id: 'deepseek-chat',
      name: 'DeepSeek-V3 (new)',
      provider: AI_PROVIDERS.DEEPSEEK,
      contextWindowTokenLimit: 64000,
      outputTokenLimit: 8192,
      pricePerMillionInputTokens: 0.27,
      pricePerMillionOutputTokens: 1.1,
      tokenizerId: null,
      legacy: true,
      legacyReason: 'Replaced by DeepSeek-V3.1 on the same model ID',
      releaseDate: '2025-03-24',
    },
  },
  {
    modelId: ModelEnum['deepseek-reasoner'],
    legacyName: 'DeepSeek-R1',
    legacyReleaseDate: '2025-05-28',
    transitionDate: '2025-08-21',
    notes: 'Model ID remained the same but refers to a newer version',
    legacyModelInfo: {
      id: 'deepseek-reasoner',
      name: 'DeepSeek-R1',
      provider: AI_PROVIDERS.DEEPSEEK,
      contextWindowTokenLimit: 64000,
      outputTokenLimit: 8000,
      pricePerMillionInputTokens: 0.55,
      pricePerMillionOutputTokens: 2.19,
      tokenizerId: 'Xenova/gpt-4o',
      reasoning: true,
      supportsImageInput: false,
      legacy: true,
      legacyReason:
        'Replaced by DeepSeek-V3.1 (Thinking Mode) on the same model ID',
      releaseDate: '2025-05-28',
    },
  },
];

export function getLegacyMappingByModelId(
  modelId: string
): LegacyModelMapping | undefined {
  return LEGACY_MODEL_MAPPINGS.find((mapping) => mapping.modelId === modelId);
}

export function getAllLegacyMappings(): LegacyModelMapping[] {
  return [...LEGACY_MODEL_MAPPINGS];
}
