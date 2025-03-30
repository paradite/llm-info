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
  reasoning?: boolean;
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
    legacy: true,
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
  [ModelEnum['gpt-4o-2024-08-06']]: {
    name: 'GPT-4o 08-06',
    provider: AI_PROVIDERS.OPENAI,
    contextWindowTokenLimit: 128000,
    outputTokenLimit: 16384,
    pricePerMillionInputTokens: 2.5,
    pricePerMillionOutputTokens: 10,
    tokenizerId: 'Xenova/gpt-4o',
    notes:
      'This model is a version of GPT-4o that was released on August 6, 2024. It has a maximum of 16K output tokens per request.',
    legacy: true,
  },
  [ModelEnum['o1-preview']]: {
    name: 'o1-preview',
    provider: AI_PROVIDERS.OPENAI,
    contextWindowTokenLimit: 128000,
    outputTokenLimit: 32768,
    pricePerMillionInputTokens: 15,
    pricePerMillionOutputTokens: 60,
    tokenizerId: 'Xenova/gpt-4o',
    notes:
      'An early preview of our o1 model, designed to reason about hard problems using broad general knowledge about the world.',
    alpha: true,
    legacy: true,
  },
  [ModelEnum['o1-mini']]: {
    name: 'o1-mini',
    provider: AI_PROVIDERS.OPENAI,
    contextWindowTokenLimit: 128000,
    outputTokenLimit: 65536,
    pricePerMillionInputTokens: 1.1,
    pricePerMillionOutputTokens: 4.4,
    tokenizerId: 'Xenova/gpt-4o',
    notes:
      "A faster and cheaper version of o1, particularly adept at coding, math, and science tasks where extensive general knowledge isn't required.",
    small: true,
    legacy: true,
    reasoning: true,
  },
  [ModelEnum['o1']]: {
    name: 'o1',
    provider: AI_PROVIDERS.OPENAI,
    contextWindowTokenLimit: 200000,
    outputTokenLimit: 100000,
    pricePerMillionInputTokens: 15,
    pricePerMillionOutputTokens: 60,
    tokenizerId: 'Xenova/gpt-4o',
    notes: 'Reasoning model designed to solve hard problems across domains.',
    legacy: true,
    reasoning: true,
  },
  [ModelEnum['claude-3-5-sonnet-20240620']]: {
    name: 'Claude 3.5 Sonnet (Old)',
    provider: AI_PROVIDERS.ANTHROPIC,
    contextWindowTokenLimit: 200000,
    outputTokenLimit: 8192,
    pricePerMillionInputTokens: 3,
    pricePerMillionOutputTokens: 15,
    tokenizerId: 'Xenova/claude-tokenizer',
    notes: '8192 output tokens is in beta.',
    notesUrl: 'https://docs.anthropic.com/en/docs/about-claude/models',
    legacy: true,
  },
  [ModelEnum['claude-3-5-sonnet-20241022']]: {
    name: 'Claude 3.5 Sonnet',
    provider: AI_PROVIDERS.ANTHROPIC,
    contextWindowTokenLimit: 200000,
    outputTokenLimit: 8192,
    pricePerMillionInputTokens: 3,
    pricePerMillionOutputTokens: 15,
    tokenizerId: 'Xenova/claude-tokenizer',
    notes: 'New version of Claude 3.5 Sonnet released on October 22, 2024.',
    notesUrl: 'https://www.anthropic.com/news/3-5-models-and-computer-use',
  },
  [ModelEnum['claude-3-5-haiku-20241022']]: {
    name: 'Claude 3.5 Haiku',
    provider: AI_PROVIDERS.ANTHROPIC,
    contextWindowTokenLimit: 200000,
    outputTokenLimit: 8192,
    pricePerMillionInputTokens: 1,
    pricePerMillionOutputTokens: 5,
    tokenizerId: 'Xenova/claude-tokenizer',
    legacy: true,
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
  [ModelEnum['o3-mini']]: {
    name: 'o3-mini',
    provider: AI_PROVIDERS.OPENAI,
    contextWindowTokenLimit: 200000,
    outputTokenLimit: 100000,
    pricePerMillionInputTokens: 1.1,
    pricePerMillionOutputTokens: 4.4,
    tokenizerId: 'Xenova/gpt-4o',
    reasoning: true,
  },
  [ModelEnum['claude-3-7-sonnet-20250219']]: {
    name: 'Claude 3.7 Sonnet',
    provider: AI_PROVIDERS.ANTHROPIC,
    contextWindowTokenLimit: 200000,
    outputTokenLimit: 8192,
    pricePerMillionInputTokens: 3,
    pricePerMillionOutputTokens: 15,
    tokenizerId: 'Xenova/claude-tokenizer',
  },
  [ModelEnum['deepseek-chat']]: {
    name: 'DeepSeek-V3 (New)',
    provider: AI_PROVIDERS.DEEPSEEK,
    contextWindowTokenLimit: 64000,
    outputTokenLimit: 8000,
    pricePerMillionInputTokens: 0.27,
    pricePerMillionOutputTokens: 1.1,
    tokenizerId: 'Xenova/gpt-4o',
  },
  [ModelEnum['deepseek-reasoner']]: {
    name: 'DeepSeek-R1',
    provider: AI_PROVIDERS.DEEPSEEK,
    contextWindowTokenLimit: 64000,
    outputTokenLimit: 8000,
    pricePerMillionInputTokens: 0.55,
    pricePerMillionOutputTokens: 2.19,
    tokenizerId: 'Xenova/gpt-4o',
    reasoning: true,
  },
  [ModelEnum['gemini-2.5-pro-exp-03-25']]: {
    name: 'Gemini 2.5 Pro Experimental',
    provider: AI_PROVIDERS.GOOGLE,
    contextWindowTokenLimit: 1048576,
    outputTokenLimit: 65536,
    pricePerMillionInputTokens: 0,
    pricePerMillionOutputTokens: 0,
    tokenizerId: 'Xenova/gpt-4o',
    notes: 'This is an experimental model that is currently free to test.',
  },
};
