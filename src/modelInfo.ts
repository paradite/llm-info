import { ModelEnum, ModelLike, NonModelEnum } from './model';
import { AI_PROVIDER_TYPE, AI_PROVIDERS } from './provider';

export type ModelInfo = {
  name: string;
  provider: AI_PROVIDER_TYPE;
  contextWindowTokenLimit: number;
  outputTokenLimit: number;
  pricePerMillionInputTokens: number | null;
  pricePerMillionOutputTokens: number | null;
  tokenizerId: string | null;
  notes?: string;
  notesUrl?: string;
  legacy?: boolean;
  alpha?: boolean;
  small?: boolean;
};

export const ModelInfoMap: Record<ModelLike, ModelInfo> = {
  [ModelEnum['gpt-4']]: {
    name: 'GPT-4',
    provider: AI_PROVIDERS.OPENAI,
    contextWindowTokenLimit: 128000,
    outputTokenLimit: 4096,
    pricePerMillionInputTokens: 30,
    pricePerMillionOutputTokens: 60,
    tokenizerId: 'Xenova/gpt-4',
    legacy: true,
  },
  [ModelEnum['gpt-4-turbo']]: {
    name: 'GPT-4 Turbo',
    provider: AI_PROVIDERS.OPENAI,
    contextWindowTokenLimit: 128000,
    outputTokenLimit: 4096,
    pricePerMillionInputTokens: 10,
    pricePerMillionOutputTokens: 30,
    tokenizerId: 'Xenova/gpt-4',
  },
  [ModelEnum['gpt-4o']]: {
    name: 'GPT-4o',
    provider: AI_PROVIDERS.OPENAI,
    contextWindowTokenLimit: 128000,
    outputTokenLimit: 4096,
    pricePerMillionInputTokens: 5,
    pricePerMillionOutputTokens: 15,
    tokenizerId: 'Xenova/gpt-4o',
  },
  [ModelEnum['gpt-4o-mini']]: {
    name: 'GPT-4o mini',
    provider: AI_PROVIDERS.OPENAI,
    contextWindowTokenLimit: 128000,
    outputTokenLimit: 4096,
    pricePerMillionInputTokens: 0.15,
    pricePerMillionOutputTokens: 0.6,
    tokenizerId: 'Xenova/gpt-4o',
    small: true,
  },
  [ModelEnum['gpt-4o-64k-output-alpha']]: {
    name: 'GPT-4o Long Output',
    provider: AI_PROVIDERS.OPENAI,
    contextWindowTokenLimit: 128000,
    outputTokenLimit: 64000,
    pricePerMillionInputTokens: 6,
    pricePerMillionOutputTokens: 18,
    tokenizerId: 'Xenova/gpt-4o',
    alpha: true,
    notes:
      'OpenAI is offering an experimental version of GPT-4o with a maximum of 64K output tokens per request.',
    notesUrl: 'https://openai.com/gpt-4o-long-output/',
  },
  [ModelEnum['claude-3-5-sonnet-20240620']]: {
    name: 'Claude 3.5 Sonnet',
    provider: AI_PROVIDERS.ANTHROPIC,
    contextWindowTokenLimit: 200000,
    outputTokenLimit: 8192,
    pricePerMillionInputTokens: 3,
    pricePerMillionOutputTokens: 15,
    tokenizerId: 'Xenova/claude-tokenizer',
    notes: '8192 output tokens is in beta.',
    notesUrl: 'https://docs.anthropic.com/en/docs/about-claude/models',
  },
  [NonModelEnum['chatgpt']]: {
    name: 'ChatGPT',
    provider: AI_PROVIDERS.OPENAI,
    contextWindowTokenLimit: 4096,
    outputTokenLimit: 4096,
    pricePerMillionInputTokens: null,
    pricePerMillionOutputTokens: null,
    tokenizerId: null,
  },
};
