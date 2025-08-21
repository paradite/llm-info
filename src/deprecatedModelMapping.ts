import { ModelEnum } from './model';
import { ModelInfoLegacy } from './modelInfo';
import { AI_PROVIDERS } from './provider';

export interface DeprecatedModelMapping {
  modelId: ModelEnum;
  deprecatedName: string;
  deprecatedReleaseDate?: string;
  transitionDate?: string;
  notes?: string;
  deprecatedModelInfo: ModelInfoLegacy;
}

export const DEPRECATED_MODEL_MAPPINGS: DeprecatedModelMapping[] = [
  {
    modelId: ModelEnum['deepseek-chat'],
    deprecatedName: 'DeepSeek-V3 (new)',
    deprecatedReleaseDate: '2025-03-24',
    transitionDate: '2025-08-21',
    notes: 'Model ID remained the same but refers to a newer version',
    deprecatedModelInfo: {
      id: ModelEnum['deepseek-chat'],
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
    deprecatedName: 'DeepSeek-R1',
    deprecatedReleaseDate: '2025-05-28',
    transitionDate: '2025-08-21',
    notes: 'Model ID remained the same but refers to a newer version',
    deprecatedModelInfo: {
      id: ModelEnum['deepseek-reasoner'],
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

export function getDeprecatedMappingByModelId(
  modelId: string
): DeprecatedModelMapping[] {
  return DEPRECATED_MODEL_MAPPINGS.filter(
    (mapping) => mapping.modelId === modelId
  );
}

export function getAllDeprecatedMappings(): DeprecatedModelMapping[] {
  return [...DEPRECATED_MODEL_MAPPINGS];
}

export function getAllDeprecatedModelsInfo(): ModelInfoLegacy[] {
  return DEPRECATED_MODEL_MAPPINGS.map(
    (mapping) => mapping.deprecatedModelInfo
  );
}
