import { getModelsByProvider, AI_PROVIDERS } from '../src';

describe('getModelsByProvider', () => {
  it('should return OpenAI models from ModelInfoMap', async () => {
    const models = await getModelsByProvider(AI_PROVIDERS.OPENAI);

    // Check that we got some models
    expect(models.length).toBeGreaterThan(0);

    // Check that all models are from OpenAI
    models.forEach((model) => {
      expect(model.provider).toBe(AI_PROVIDERS.OPENAI);
      expect(model.name).toBeTruthy();
      expect(model.contextWindowTokenLimit).toBeGreaterThan(0);
      expect(model.outputTokenLimit).toBeGreaterThan(0);
    });

    // Check that we have specific OpenAI models
    const modelNames = models.map((model) => model.name);
    expect(modelNames).toContain('GPT-4');
    expect(modelNames).toContain('GPT-4o');
  });

  it('should return OpenRouter models from API', async () => {
    // Skip test if in CI environment to avoid rate limiting
    if (process.env.CI) {
      console.log('Skipping OpenRouter API test in CI environment');
      return;
    }

    const models = await getModelsByProvider(AI_PROVIDERS.OPENROUTER);

    // Check that we got some models
    expect(models.length).toBeGreaterThan(0);

    // Check for GPT-4o model
    const gpt4oModel = models.find(
      (model) =>
        model.name.toLowerCase().includes('gpt-4o') ||
        model.name.toLowerCase().includes('gpt4o')
    );
    expect(gpt4oModel).toBeTruthy();
    if (gpt4oModel) {
      expect(gpt4oModel.provider).toBe('openai');
      expect(gpt4oModel.contextWindowTokenLimit).toBeGreaterThan(0);
      expect(gpt4oModel.pricePerMillionInputTokens).toBeGreaterThan(0);
      expect(gpt4oModel.tokenizerId).toBe('Xenova/gpt-4');
    }

    // Check for Claude model
    const claudeModel = models.find((model) =>
      model.name.toLowerCase().includes('claude')
    );
    expect(claudeModel).toBeTruthy();
    if (claudeModel) {
      expect(claudeModel.provider).toBe('anthropic');
      expect(claudeModel.contextWindowTokenLimit).toBeGreaterThan(0);
      expect(claudeModel.pricePerMillionInputTokens).toBeGreaterThan(0);
      expect(claudeModel.tokenizerId).toBe('Xenova/claude-tokenizer');
    }

    // Log some model info for debugging
    console.log('OpenRouter models count:', models.length);
    console.log('GPT-4o model:', gpt4oModel);
    console.log('Claude model:', claudeModel);
  });
});
