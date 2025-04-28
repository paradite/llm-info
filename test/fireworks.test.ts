import { OpenAI } from 'openai';
import { AI_PROVIDER_CONFIG, AI_PROVIDERS } from '../src';

describe('Fireworks API', () => {
  // Skip test if FIREWORKS_API_KEY is not set
  const testFn = process.env.FIREWORKS_API_KEY ? it : it.skip;

  const testModels = ['accounts/fireworks/models/deepseek-v3-0324'];

  for (const model of testModels) {
    testFn(
      `can make real API call to ${model} model`,
      async () => {
        const openai = new OpenAI({
          baseURL: AI_PROVIDER_CONFIG[AI_PROVIDERS.FIREWORKS].baseURL,
          apiKey: process.env.FIREWORKS_API_KEY,
        });

        const response = await openai.chat.completions.create({
          model,
          messages: [{ role: 'user', content: 'Hello, who are you?' }],
          max_completion_tokens: 100,
        });

        expect(response.choices[0].message.content).toBeTruthy();
        console.log(`${model} Response:`, response.choices[0].message.content);
      },
      30000
    );
  }
});
