import { getAllModelsWithIds } from '../src';

describe('Recommended models', () => {
  it('should output all non-legacy models recommended for coding', () => {
    const allModels = getAllModelsWithIds();
    // filter out legacy models for coding
    const codingModels = allModels
      .filter((model) => model.recommendedForCoding === true && !model.legacy)
      .map((model) => model.id)
      .sort();

    const expectedCodingModels = [
      'claude-sonnet-4-20250514',
      'deepseek-chat',
      'gemini-2.5-pro',
      'gpt-4.1',
      'gpt-5',
    ];

    expect(codingModels).toEqual(expectedCodingModels);
  });

  it('should output all non-legacy models recommended for writing', () => {
    const allModels = getAllModelsWithIds();
    // keep legacy models for writing
    const writingModels = allModels
      .filter((model) => model.recommendedForWriting === true)
      .map((model) => model.id)
      .sort();

    const expectedWritingModels = [
      'claude-sonnet-4-20250514',
      'gemini-2.5-pro',
      'gpt-4.1',
      'gpt-5',
    ];

    expect(writingModels).toEqual(expectedWritingModels);
  });
});
