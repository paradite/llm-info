import {
  AllModels,
  ModelEnum,
  NonModelEnum,
  ModelInfoMap,
  AllModelLikes,
  AI_PROVIDER_NAME_MAP,
  AI_PROVIDERS,
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
      'o3-mini',
      'claude-3-7-sonnet-20250219',
      'deepseek-chat',
      'deepseek-reasoner',
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
      'o3-mini',
      'claude-3-7-sonnet-20250219',
      'deepseek-chat',
      'deepseek-reasoner',
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

  it('provider works', () => {
    console.log(AI_PROVIDER_NAME_MAP);
    expect(AI_PROVIDER_NAME_MAP[AI_PROVIDERS.OPENAI]).toEqual('OpenAI');
    expect(AI_PROVIDER_NAME_MAP[AI_PROVIDERS.ANTHROPIC]).toEqual('Anthropic');
    expect(AI_PROVIDER_NAME_MAP[AI_PROVIDERS.AZURE_OPENAI]).toEqual(
      'Azure OpenAI'
    );
  });
});
