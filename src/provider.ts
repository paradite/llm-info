export const AI_PROVIDERS = {
  OPENAI: 'openai',
  ANTHROPIC: 'anthropic',
  AZURE_OPENAI: 'azure-openai',
  DEEPSEEK: 'deepseek',
  OPENROUTER: 'openrouter',
} as const;

export type AI_PROVIDER_TYPE = (typeof AI_PROVIDERS)[keyof typeof AI_PROVIDERS];

export const AI_PROVIDER_CONFIG = {
  [AI_PROVIDERS.OPENAI]: {
    name: 'OpenAI',
  },
  [AI_PROVIDERS.ANTHROPIC]: {
    name: 'Anthropic',
  },
  [AI_PROVIDERS.AZURE_OPENAI]: {
    name: 'Azure OpenAI',
  },
  [AI_PROVIDERS.DEEPSEEK]: {
    name: 'DeepSeek',
    baseURL: 'https://api.deepseek.com',
  },
  [AI_PROVIDERS.OPENROUTER]: {
    name: 'OpenRouter',
    baseURL: 'https://openrouter.ai/api/v1',
  },
} as const;

export const AI_PROVIDER_NAME_MAP = {
  [AI_PROVIDERS.OPENAI]: AI_PROVIDER_CONFIG[AI_PROVIDERS.OPENAI].name,
  [AI_PROVIDERS.ANTHROPIC]: AI_PROVIDER_CONFIG[AI_PROVIDERS.ANTHROPIC].name,
  [AI_PROVIDERS.AZURE_OPENAI]:
    AI_PROVIDER_CONFIG[AI_PROVIDERS.AZURE_OPENAI].name,
  [AI_PROVIDERS.DEEPSEEK]: AI_PROVIDER_CONFIG[AI_PROVIDERS.DEEPSEEK].name,
  [AI_PROVIDERS.OPENROUTER]: AI_PROVIDER_CONFIG[AI_PROVIDERS.OPENROUTER].name,
} as const;
