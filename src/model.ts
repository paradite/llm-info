export enum ModelEnum {
  'gpt-4' = 'gpt-4',
  'gpt-4-turbo' = 'gpt-4-turbo',
  'gpt-4o' = 'gpt-4o',
  'gpt-4o-64k-output-alpha' = 'gpt-4o-64k-output-alpha',
  'gpt-4o-mini' = 'gpt-4o-mini',
  'gpt-4o-2024-08-06' = 'gpt-4o-2024-08-06',
  'o1-preview' = 'o1-preview',
  'o1-mini' = 'o1-mini',
  'claude-3-5-sonnet-20240620' = 'claude-3-5-sonnet-20240620',
  'claude-3-5-sonnet-20241022' = 'claude-3-5-sonnet-20241022',
}

export enum NonModelEnum {
  'chatgpt' = 'chatgpt',
}

export const AllModels = Object.values(ModelEnum);

export const AllModelLikes = [...AllModels, ...Object.values(NonModelEnum)];

export type ModelLike = ModelEnum | NonModelEnum;
