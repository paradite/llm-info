export const AI_PROVIDERS = {
  OPENAI: 'openai',
  ANTHROPIC: 'anthropic',
} as const;

export type AI_PROVIDER_TYPE = (typeof AI_PROVIDERS)[keyof typeof AI_PROVIDERS];
