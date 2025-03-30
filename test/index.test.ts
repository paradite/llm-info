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
    expect(AllModels).toContain('gpt-4');
    expect(AllModels).toContain('claude-3-5-sonnet-20240620');
    expect(AllModels).toContain('gemini-2.5-pro-exp-03-25');
  });
  it('all modellikes works', () => {
    console.log(AllModelLikes);
    expect(AllModelLikes).toContain('gpt-4');
    expect(AllModelLikes).toContain('claude-3-5-sonnet-20240620');
    expect(AllModelLikes).toContain('chatgpt');
    expect(AllModelLikes).toContain('gemini-2.5-pro-exp-03-25');
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
