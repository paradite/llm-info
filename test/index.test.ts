import { AllModels, ModelEnum, ModelLikeEnum, ModelInfoMap } from '../src';
describe('llm', () => {
  it('all models works', () => {
    console.log(AllModels);
    expect(AllModels).toEqual([
      'gpt-4',
      'gpt-4o',
      'claude-3-5-sonnet-20240620',
    ]);
  });
  it('info works', () => {
    const model = ModelEnum['gpt-4'];
    const modelInfo = ModelInfoMap[model];
    console.log(modelInfo);
    expect(modelInfo.name).toBe('GPT-4');

    console.log(ModelInfoMap[ModelEnum['claude-3-5-sonnet-20240620']]);

    const modelLike = ModelLikeEnum['chatgpt'];
    const modelLikeInfo = ModelInfoMap[modelLike];
    console.log(modelLikeInfo);
    expect(modelLikeInfo.name).toBe('ChatGPT');
  });
});
