import { ModelInfoMap, getModelInfoWithId, ModelEnum, ModelLike } from '../src';
import { AutoTokenizer } from '@xenova/transformers';

describe('llm', () => {
  it('tokenizer works', async () => {
    const testSentence =
      "Many words map to one token, but some don't: indivisible.";
    const results: string[] = [];

    // Test only a few specific models instead of all models
    const modelsToTest: ModelLike[] = [
      ModelEnum['gpt-4o'],
      ModelEnum['claude-3-5-sonnet-20241022'],
      ModelEnum['o4-mini'],
      ModelEnum['gemini-2.5-pro-preview-03-25'],
    ];

    for (const model of modelsToTest) {
      if (ModelInfoMap[model].tokenizerId) {
        const tokenizer = await AutoTokenizer.from_pretrained(
          ModelInfoMap[model].tokenizerId
        );
        const tokens = tokenizer.encode(testSentence);
        expect(tokens.length).toBeGreaterThanOrEqual(14);
        expect(tokens.length).toBeLessThanOrEqual(17);
        results.push(`${model}: ${tokens.length}`);
      }
    }
    console.log(`Test sentence: ${testSentence}\n${results.join('\n')}`);
  }, 10000);

  it('model info with id works', () => {
    // Test that we can get model info with ID
    const modelInfoWithId = getModelInfoWithId(ModelEnum['gpt-4o']);
    expect(modelInfoWithId.id).toBe('gpt-4o');
    expect(modelInfoWithId.name).toBe('GPT-4o');
    expect(modelInfoWithId.tokenizerId).toBe('Xenova/gpt-4o');
  });
});
