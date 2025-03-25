export const AI_PROVIDERS = {
  OPENAI: 'openai',
  ANTHROPIC: 'anthropic',
  AZURE_OPENAI: 'azure-openai',
  DEEPSEEK: 'deepseek',
  OPENROUTER: 'openrouter',
} as const;

export type AI_PROVIDER_TYPE = (typeof AI_PROVIDERS)[keyof typeof AI_PROVIDERS];

export const AI_PROVIDER_NAME_MAP = {
  [AI_PROVIDERS.OPENAI]: 'OpenAI',
  [AI_PROVIDERS.ANTHROPIC]: 'Anthropic',
  [AI_PROVIDERS.AZURE_OPENAI]: 'Azure OpenAI',
  [AI_PROVIDERS.DEEPSEEK]: 'DeepSeek',
  [AI_PROVIDERS.OPENROUTER]: 'OpenRouter',
} as const;
