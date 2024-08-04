export enum ModelEnum {
  'gpt-4' = 'gpt-4',
  'gpt-4o' = 'gpt-4o',
  'gpt-4-turbo' = 'gpt-4-turbo',
  'gpt-4o-64k-output-alpha' = 'gpt-4o-64k-output-alpha',
  'gpt-4o-mini' = 'gpt-4o-mini',
  'claude-3-5-sonnet-20240620' = 'claude-3-5-sonnet-20240620',
}

export enum NonModelEnum {
  'chatgpt' = 'chatgpt',
}

export const AllModels = Object.values(ModelEnum);

export const AllModelLikes = [...AllModels, ...Object.values(NonModelEnum)];

export type ModelLike = ModelEnum | NonModelEnum;
