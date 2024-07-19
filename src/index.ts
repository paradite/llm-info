export enum ModelEnum {
  'gpt-4' = 'gpt-4',
  'gpt-4o' = 'gpt-4o',
  'claude-3-5-sonnet-20240620' = 'claude-3-5-sonnet-20240620',
}

export enum ModelLikeEnum {
  'chatgpt' = 'chatgpt',
}

export const AllModels = Object.values(ModelEnum);

export type ModelLike = ModelEnum | ModelLikeEnum;

type ModelInfo = {
  name: string;
  contextWindowTokenLimit: number;
  outputTokenLimit: number;
  pricePerMillionInputTokens: number | null;
  pricePerMillionOutputTokens: number | null;
};

export const ModelInfoMap: Record<ModelLike, ModelInfo> = {
  [ModelEnum['gpt-4']]: {
    name: 'GPT-4',
    contextWindowTokenLimit: 128000,
    outputTokenLimit: 4096,
    pricePerMillionInputTokens: 30,
    pricePerMillionOutputTokens: 60,
  },
  [ModelEnum['gpt-4o']]: {
    name: 'GPT-4o',
    contextWindowTokenLimit: 128000,
    outputTokenLimit: 4096,
    pricePerMillionInputTokens: 5,
    pricePerMillionOutputTokens: 15,
  },
  [ModelEnum['claude-3-5-sonnet-20240620']]: {
    name: 'Claude 3.5 Sonnet',
    contextWindowTokenLimit: 200000,
    outputTokenLimit: 4096,
    pricePerMillionInputTokens: 3,
    pricePerMillionOutputTokens: 15,
  },
  [ModelLikeEnum['chatgpt']]: {
    name: 'ChatGPT',
    contextWindowTokenLimit: 4096,
    outputTokenLimit: 4096,
    pricePerMillionInputTokens: null,
    pricePerMillionOutputTokens: null,
  },
};
