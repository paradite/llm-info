export enum ModelEnum {
  'gpt-4' = 'gpt-4',
  'gpt-4o' = 'gpt-4o',
  'gpt-4o-mini' = 'gpt-4o-mini',
  'claude-3-5-sonnet-20240620' = 'claude-3-5-sonnet-20240620',
}

export enum ModelLikeEnum {
  'chatgpt' = 'chatgpt',
}

export const AllModels = Object.values(ModelEnum);

export type ModelLike = ModelEnum | ModelLikeEnum;

export const AI_PROVIDERS = {
  OPENAI: 'openai',
  ANTHROPIC: 'anthropic',
} as const;

export type AI_PROVIDER_TYPE = (typeof AI_PROVIDERS)[keyof typeof AI_PROVIDERS];

type ModelInfo = {
  name: string;
  provider: AI_PROVIDER_TYPE;
  contextWindowTokenLimit: number;
  outputTokenLimit: number;
  pricePerMillionInputTokens: number | null;
  pricePerMillionOutputTokens: number | null;
};

export const ModelInfoMap: Record<ModelLike, ModelInfo> = {
  [ModelEnum['gpt-4']]: {
    name: 'GPT-4',
    provider: AI_PROVIDERS.OPENAI,
    contextWindowTokenLimit: 128000,
    outputTokenLimit: 4096,
    pricePerMillionInputTokens: 30,
    pricePerMillionOutputTokens: 60,
  },
  [ModelEnum['gpt-4o']]: {
    name: 'GPT-4o',
    provider: AI_PROVIDERS.OPENAI,
    contextWindowTokenLimit: 128000,
    outputTokenLimit: 4096,
    pricePerMillionInputTokens: 5,
    pricePerMillionOutputTokens: 15,
  },
  [ModelEnum['gpt-4o-mini']]: {
    name: 'GPT-4o mini',
    provider: AI_PROVIDERS.OPENAI,
    contextWindowTokenLimit: 128000,
    outputTokenLimit: 4096,
    pricePerMillionInputTokens: 0.15,
    pricePerMillionOutputTokens: 0.6,
  },
  [ModelEnum['claude-3-5-sonnet-20240620']]: {
    name: 'Claude 3.5 Sonnet',
    provider: AI_PROVIDERS.ANTHROPIC,
    contextWindowTokenLimit: 200000,
    outputTokenLimit: 4096,
    pricePerMillionInputTokens: 3,
    pricePerMillionOutputTokens: 15,
  },
  [ModelLikeEnum['chatgpt']]: {
    name: 'ChatGPT',
    provider: AI_PROVIDERS.OPENAI,
    contextWindowTokenLimit: 4096,
    outputTokenLimit: 4096,
    pricePerMillionInputTokens: null,
    pricePerMillionOutputTokens: null,
  },
};
