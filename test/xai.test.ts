import { OpenAI } from 'openai';
import { AI_PROVIDER_CONFIG, AI_PROVIDERS, ModelEnum } from '../src';

describe('xAI API', () => {
  // Skip test if XAI_API_KEY is not set
  const testFn = process.env.XAI_API_KEY ? it : it.skip;

  const testModels = [ModelEnum['grok-4'], ModelEnum['grok-code-fast-1']];

  for (const model of testModels) {
    testFn(
      `can make real API call to ${model} model`,
      async () => {
        const openai = new OpenAI({
          baseURL: AI_PROVIDER_CONFIG[AI_PROVIDERS.XAI].baseURL,
          apiKey: process.env.XAI_API_KEY,
        });

        const response = await openai.chat.completions.create({
          model,
          messages: [{ role: 'user', content: 'Hello, who are you?' }],
        });

        expect(response.choices[0].message.content).toBeTruthy();
        console.log(`${model} Response:`, response.choices[0].message.content);
      },
      30000
    );
  }
});
