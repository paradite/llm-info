import Anthropic from '@anthropic-ai/sdk';
import { ModelEnum } from '../src';

describe('Anthropic API', () => {
  // Skip test if ANTHROPIC_API_KEY is not set
  const testFn = process.env.ANTHROPIC_API_KEY ? it : it.skip;

  const testModels = [
    ModelEnum['claude-opus-4-5-20251101'],
    ModelEnum['claude-sonnet-4-5-20250929'],
  ];

  for (const model of testModels) {
    testFn(
      `can make real API call to ${model} model`,
      async () => {
        const anthropic = new Anthropic({
          apiKey: process.env.ANTHROPIC_API_KEY,
        });

        const response = await anthropic.messages.create({
          model,
          max_tokens: 500,
          messages: [{ role: 'user', content: 'Hello, who are you?' }],
        });

        expect(response.content[0].type).toBe('text');
        if (response.content[0].type === 'text') {
          expect(response.content[0].text).toBeTruthy();
          console.log(`${model} Response:`, response.content[0].text);
        }
      },
      30000
    );
  }
});
