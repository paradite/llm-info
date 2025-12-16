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
      'claude-haiku-4-5-20251001',
      'claude-opus-4-5-20251101',
      'claude-sonnet-4-5-20250929',
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
