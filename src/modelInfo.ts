import { ModelEnum, ModelLike, NonModelEnum } from './model';
import { AI_PROVIDER_TYPE, AI_PROVIDERS } from './provider';

export type ModelInfo = {
  name: string;
  provider: AI_PROVIDER_TYPE;
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

export type OpenRouterModelResponse = {
  data: Array<{
    id: string;
    name: string;
    created: number;
    description: string;
    architecture: {
      input_modalities: string[];
      output_modalities: string[];
      tokenizer: string;
    };
    top_provider: {
      is_moderated: boolean;
    };
    pricing: {
      prompt: string;
      completion: string;
      image: string;
      request: string;
      input_cache_read: string;
      input_cache_write: string;
      web_search: string;
      internal_reasoning: string;
    };
    context_length: number;
    per_request_limits: Record<string, string>;
  }>;
};

/**
 * Convert OpenRouter model to ModelInfo
 * @param model OpenRouter model
 * @returns ModelInfo object
 */
function convertOpenRouterModelToModelInfo(
  model: OpenRouterModelResponse['data'][0]
): ModelInfo {
  // Extract provider from id (e.g., 'openai/gpt-4' -> 'openai')
  const providerId = model.id.split('/')[0] as AI_PROVIDER_TYPE;

  // Convert pricing strings to numbers (per million tokens)
  const promptPrice = parseFloat(model.pricing.prompt) * 1000000;
  const completionPrice = parseFloat(model.pricing.completion) * 1000000;

  // Determine tokenizer based on model name
  // Default to GPT tokenizer, except for Claude models
  let tokenizerId = 'Xenova/gpt-4';
  if (model.name.toLowerCase().includes('claude')) {
    tokenizerId = 'Xenova/claude-tokenizer';
  }

  return {
    name: model.name,
    provider: providerId,
    contextWindowTokenLimit: model.context_length,
    outputTokenLimit: null,
    pricePerMillionInputTokens: promptPrice,
    pricePerMillionOutputTokens: completionPrice,
    tokenizerId,
    notes: model.description,
  };
}

/**
 * Get all models from a specific provider
 * @param provider The AI provider to get models from
 * @returns Promise with an array of ModelInfo objects for the specified provider
 */
export async function getModelsByProvider(
  provider: AI_PROVIDER_TYPE
): Promise<ModelInfo[]> {
  // For OpenRouter, fetch from API
  if (provider === AI_PROVIDERS.OPENROUTER) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/models');
      if (!response.ok) {
        throw new Error(
          `Failed to fetch OpenRouter models: ${response.statusText}`
        );
      }
      const data = (await response.json()) as OpenRouterModelResponse;
      return data.data.map(convertOpenRouterModelToModelInfo);
    } catch (error) {
      console.error('Error fetching OpenRouter models:', error);
      return [];
    }
  }

  // For other providers, use the local ModelInfoMap
  return Object.entries(ModelInfoMap)
    .filter(([_, modelInfo]) => modelInfo.provider === provider)
    .map(([_, modelInfo]) => modelInfo);
}

/**
 * Get all available models from OpenRouter API
 * @returns Promise with the OpenRouter API response
 */
export async function getOpenRouterModels(): Promise<OpenRouterModelResponse> {
  const response = await fetch('https://openrouter.ai/api/v1/models');
  if (!response.ok) {
    throw new Error(
      `Failed to fetch OpenRouter models: ${response.statusText}`
    );
  }
  return response.json() as Promise<OpenRouterModelResponse>;
}

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
    recommendedForCoding: true,
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
    recommendedForCoding: true,
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
    recommendedForCoding: true,
  },
  [ModelEnum['deepseek-chat']]: {
    name: 'DeepSeek-V3 (New)',
    provider: AI_PROVIDERS.DEEPSEEK,
    contextWindowTokenLimit: 64000,
    outputTokenLimit: 8000,
    pricePerMillionInputTokens: 0.27,
    pricePerMillionOutputTokens: 1.1,
    tokenizerId: 'Xenova/gpt-4o',
    recommendedForCoding: true,
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
    reasoning: true,
    recommendedForCoding: true,
  },
  [ModelEnum['gemini-2.5-pro-preview-03-25']]: {
    name: 'Gemini 2.5 Pro Preview',
    provider: AI_PROVIDERS.GOOGLE,
    contextWindowTokenLimit: 1048576,
    outputTokenLimit: 65536,
    pricePerMillionInputTokens: 2.5,
    pricePerMillionOutputTokens: 15,
    tokenizerId: 'Xenova/gpt-4o',
    notes: 'The pricing is for prompt with context length > 200k tokens',
    notesUrl: 'https://ai.google.dev/gemini-api/docs/pricing',
    reasoning: true,
    recommendedForCoding: true,
  },
};
