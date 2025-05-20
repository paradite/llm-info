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
  'deepseek-chat' = 'deepseek-chat',
  'deepseek-reasoner' = 'deepseek-reasoner',
  'gemini-2.5-pro-exp-03-25' = 'gemini-2.5-pro-exp-03-25',
  'gemini-2.5-pro-preview-03-25' = 'gemini-2.5-pro-preview-03-25',
  'gemini-2.5-pro-preview-05-06' = 'gemini-2.5-pro-preview-05-06',
  'gemini-2.5-flash-preview-04-17' = 'gemini-2.5-flash-preview-04-17',
  'gemini-2.5-flash-preview-05-20' = 'gemini-2.5-flash-preview-05-20',
}

export enum NonModelEnum {
  'chatgpt' = 'chatgpt',
}

export const AllModels = Object.values(ModelEnum);

export const AllModelLikes = [...AllModels, ...Object.values(NonModelEnum)];

export type ModelLike = ModelEnum | NonModelEnum;
