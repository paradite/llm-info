export const AI_PROVIDERS = {
  OPENAI: 'openai',
  ANTHROPIC: 'anthropic',
  AZURE_OPENAI: 'azure-openai',
  DEEPSEEK: 'deepseek',
  OPENROUTER: 'openrouter',
  GOOGLE: 'google',
  FIREWORKS: 'fireworks',
} as const;

export type AI_PROVIDER_TYPE = (typeof AI_PROVIDERS)[keyof typeof AI_PROVIDERS];

export type AI_PROVIDER_CONFIG_TYPE =
  | {
      name: string;
      firstParty: true;
      baseURL?: string;
      website?: string;
    }
  | {
      name: string;
      firstParty: false;
      baseURL: string;
      website: string;
    };

export const AI_PROVIDER_CONFIG: Record<
  AI_PROVIDER_TYPE,
  AI_PROVIDER_CONFIG_TYPE
> = {
  [AI_PROVIDERS.OPENAI]: {
    name: 'OpenAI',
    firstParty: true,
  },
  [AI_PROVIDERS.ANTHROPIC]: {
    name: 'Anthropic',
    firstParty: true,
  },
  [AI_PROVIDERS.AZURE_OPENAI]: {
    name: 'Azure OpenAI',
    firstParty: false,
    baseURL: 'https://<your-resource-name>.openai.azure.com/',
    website:
      'https://azure.microsoft.com/en-us/products/ai-services/openai-service',
  },
  [AI_PROVIDERS.DEEPSEEK]: {
    name: 'DeepSeek',
    firstParty: true,
    baseURL: 'https://api.deepseek.com',
  },
  [AI_PROVIDERS.OPENROUTER]: {
    name: 'OpenRouter',
    firstParty: false,
    baseURL: 'https://openrouter.ai/api/v1',
    website: 'https://openrouter.ai',
  },
  [AI_PROVIDERS.GOOGLE]: {
    name: 'Google',
    firstParty: true,
    baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
  },
  [AI_PROVIDERS.FIREWORKS]: {
    name: 'Fireworks',
    firstParty: false,
    baseURL: 'https://api.fireworks.ai/inference/v1',
    website: 'https://fireworks.ai',
  },
} as const;

export const AI_PROVIDER_NAME_MAP: Record<AI_PROVIDER_TYPE, string> = {
  [AI_PROVIDERS.OPENAI]: AI_PROVIDER_CONFIG[AI_PROVIDERS.OPENAI].name,
  [AI_PROVIDERS.ANTHROPIC]: AI_PROVIDER_CONFIG[AI_PROVIDERS.ANTHROPIC].name,
  [AI_PROVIDERS.AZURE_OPENAI]:
    AI_PROVIDER_CONFIG[AI_PROVIDERS.AZURE_OPENAI].name,
  [AI_PROVIDERS.DEEPSEEK]: AI_PROVIDER_CONFIG[AI_PROVIDERS.DEEPSEEK].name,
  [AI_PROVIDERS.OPENROUTER]: AI_PROVIDER_CONFIG[AI_PROVIDERS.OPENROUTER].name,
  [AI_PROVIDERS.GOOGLE]: AI_PROVIDER_CONFIG[AI_PROVIDERS.GOOGLE].name,
  [AI_PROVIDERS.FIREWORKS]: AI_PROVIDER_CONFIG[AI_PROVIDERS.FIREWORKS].name,
} as const;
