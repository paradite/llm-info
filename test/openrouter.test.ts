import { OpenAI } from 'openai';
import { AI_PROVIDER_CONFIG, AI_PROVIDERS, ModelEnum } from '../src';

describe('OpenRouter API', () => {
  // Skip test if OPENROUTER_API_KEY is not set
  const testFn = process.env.OPENROUTER_API_KEY ? it : it.skip;

  const testModels = [ModelEnum['gpt-4o-mini']];

  for (const model of testModels) {
    testFn(
      `can make real API call to ${model} model through OpenRouter`,
      async () => {
        const openai = new OpenAI({
          baseURL: AI_PROVIDER_CONFIG[AI_PROVIDERS.OPENROUTER].baseURL,
          apiKey: process.env.OPENROUTER_API_KEY,
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
