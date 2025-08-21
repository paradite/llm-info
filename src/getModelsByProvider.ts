import { ModelInfo } from './modelInfo';
import { getAllModelsWithIds } from './ModelInfoMap';
import { AI_PROVIDER_TYPE, AI_PROVIDERS } from './provider';

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
export function convertOpenRouterModelToModelInfo(
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
    id: model.id,
    contextWindowTokenLimit: model.context_length,
    outputTokenLimit: null,
    pricePerMillionInputTokens: promptPrice,
    pricePerMillionOutputTokens: completionPrice,
    tokenizerId,
    notes: model.description,
    legacy: false,
  };
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

  // For other providers, use the local ModelInfoMap with IDs
  return getAllModelsWithIds().filter((model) => model.provider === provider);
}

/**
 * Get all models that share the same API model ID
 * This is useful for models like DeepSeek V3 and V3.1 that use the same API endpoint
 * @param apiModelId The API model ID to search for
 * @returns Array of ModelInfo objects that share the same API model ID
 */
export function getModelsByApiId(apiModelId: string): ModelInfo[] {
  return getAllModelsWithIds().filter((model) => model.id === apiModelId);
}
