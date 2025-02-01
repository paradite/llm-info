import {
  AllModels,
  ModelEnum,
  NonModelEnum,
  ModelInfoMap,
  AllModelLikes,
} from '../src';

describe('llm', () => {
  it('all models works', () => {
    console.log(AllModels);
    expect(AllModels).toEqual([
      'gpt-4',
      'gpt-4-turbo',
      'gpt-4o',
      'gpt-4o-64k-output-alpha',
      'gpt-4o-mini',
      'gpt-4o-2024-08-06',
      'o1-preview',
      'o1-mini',
      'o1',
      'claude-3-5-sonnet-20240620',
      'claude-3-5-sonnet-20241022',
      'claude-3-5-haiku-20241022',
    ]);
  });
  it('all modellikes works', () => {
    console.log(AllModelLikes);
    expect(AllModelLikes).toEqual([
      'gpt-4',
      'gpt-4-turbo',
      'gpt-4o',
      'gpt-4o-64k-output-alpha',
      'gpt-4o-mini',
      'gpt-4o-2024-08-06',
      'o1-preview',
      'o1-mini',
      'o1',
      'claude-3-5-sonnet-20240620',
      'claude-3-5-sonnet-20241022',
      'claude-3-5-haiku-20241022',
      'chatgpt',
    ]);
  });
  it('info works', () => {
    const modelInfo = ModelInfoMap['gpt-4o'];
    console.log(modelInfo);
    expect(modelInfo.name).toBe('GPT-4o');

    console.log(ModelInfoMap[ModelEnum['claude-3-5-sonnet-20240620']]);

    const modelLike = NonModelEnum['chatgpt'];
    const modelLikeInfo = ModelInfoMap[modelLike];
    console.log(modelLikeInfo);
    expect(modelLikeInfo.name).toBe('ChatGPT');
  });
});
