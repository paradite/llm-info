export enum ModelEnum {
  'gpt-4' = 'gpt-4',
  'gpt-4-turbo' = 'gpt-4-turbo',
  'gpt-4o' = 'gpt-4o',
  'gpt-4o-64k-output-alpha' = 'gpt-4o-64k-output-alpha',
  'gpt-4o-mini' = 'gpt-4o-mini',
  'gpt-4o-2024-08-06' = 'gpt-4o-2024-08-06',
  'gpt-4.1' = 'gpt-4.1',
  'gpt-4.1-mini' = 'gpt-4.1-mini',
  'gpt-4.1-nano' = 'gpt-4.1-nano',
  'gpt-5' = 'gpt-5',
  'gpt-5-mini' = 'gpt-5-mini',
  'gpt-5-nano' = 'gpt-5-nano',
  'o1-preview' = 'o1-preview',
  'o1-mini' = 'o1-mini',
  'o1' = 'o1',
  'o3' = 'o3',
  'o3-mini' = 'o3-mini',
  'o4-mini' = 'o4-mini',
  'claude-3-5-sonnet-20240620' = 'claude-3-5-sonnet-20240620',
  'claude-3-5-sonnet-20241022' = 'claude-3-5-sonnet-20241022',
  'claude-3-5-haiku-20241022' = 'claude-3-5-haiku-20241022',
  'claude-3-7-sonnet-20250219' = 'claude-3-7-sonnet-20250219',
  'claude-opus-4-20250514' = 'claude-opus-4-20250514',
  'claude-opus-4-1-20250805' = 'claude-opus-4-1-20250805',
  'claude-opus-4-5-20251101' = 'claude-opus-4-5-20251101',
  'claude-sonnet-4-20250514' = 'claude-sonnet-4-20250514',
  'claude-sonnet-4-5-20250929' = 'claude-sonnet-4-5-20250929',
  'claude-haiku-4-5-20251001' = 'claude-haiku-4-5-20251001',
  'deepseek-chat' = 'deepseek-chat',
  'deepseek-reasoner' = 'deepseek-reasoner',
  'gemini-2.5-pro-exp-03-25' = 'gemini-2.5-pro-exp-03-25',
  'gemini-2.5-pro-preview-03-25' = 'gemini-2.5-pro-preview-03-25',
  'gemini-2.5-pro-preview-05-06' = 'gemini-2.5-pro-preview-05-06',
  'gemini-2.5-pro-preview-06-05' = 'gemini-2.5-pro-preview-06-05',
  'gemini-2.5-pro' = 'gemini-2.5-pro',
  'gemini-2.5-flash-preview-04-17' = 'gemini-2.5-flash-preview-04-17',
  'gemini-2.5-flash-preview-05-20' = 'gemini-2.5-flash-preview-05-20',
  'gemini-2.5-flash' = 'gemini-2.5-flash',
  'grok-4' = 'grok-4',
  'grok-code-fast-1' = 'grok-code-fast-1',
}

export enum NonModelEnum {
  'chatgpt' = 'chatgpt',
}

export const AllModels = Object.values(ModelEnum);

export const AllModelLikes = [...AllModels, ...Object.values(NonModelEnum)];

export type ModelLike = ModelEnum | NonModelEnum;
