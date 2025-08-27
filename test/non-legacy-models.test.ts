import { getAllModelsWithIds } from '../src';

describe('Non-legacy models', () => {
  it('should output all models with legacy equal to false', () => {
    const allModels = getAllModelsWithIds();
    const nonLegacyModels = allModels
      .filter((model) => model.legacy === false)
      .map((model) => model.id)
      .sort();

    const expectedNonLegacyModels = [
      'chatgpt',
      'claude-3-5-haiku-20241022',
      'claude-opus-4-1-20250805',
      'claude-sonnet-4-20250514',
      'deepseek-chat',
      'deepseek-reasoner',
      'gemini-2.5-flash',
      'gemini-2.5-pro',
      'gpt-4.1',
      'gpt-5',
      'gpt-5-mini',
      'gpt-5-nano',
      'grok-4',
      'grok-code-fast-1',
      'o3',
      'o4-mini',
    ];

    expect(nonLegacyModels).toEqual(expectedNonLegacyModels);
  });
});
