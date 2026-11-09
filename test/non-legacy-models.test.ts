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
      'claude-opus-5-5',
      'claude-sonnet-4-5-20250929',
      'claude-sonnet-5-5',
      'deepseek-chat',
      'deepseek-flash',
      'deepseek-reasoner',
      'deepseek-v4-pro',
      'gemini-2.5-flash',
      'gemini-3-pro-preview',
      'gemini-3.8-flash',
      'gemini-4-argon',
      'gpt-5-mini',
      'gpt-5-nano',
      'gpt-5.2',
      'gpt-5.2-pro',
      'gpt-6-astra',
      'gpt-6.1-sol',
      'grok-4',
      'grok-code-fast-1',
      'o3',
      'o4-mini',
    ];

    expect(nonLegacyModels).toEqual(expectedNonLegacyModels);
  });
});
