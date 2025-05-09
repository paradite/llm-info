import { OpenAI } from 'openai';
import { AI_PROVIDER_CONFIG, AI_PROVIDERS, ModelEnum } from '../src';

describe('DeepSeek API', () => {
  // Skip test if OPENAI_API_KEY is not set
  const testFn = process.env.DEEPSEEK_API_KEY ? it : it.skip;

  const testModels = [ModelEnum['deepseek-chat']];

  for (const model of testModels) {
    testFn(
      `can make real API call to ${model} model`,
      async () => {
        const openai = new OpenAI({
          baseURL: AI_PROVIDER_CONFIG[AI_PROVIDERS.DEEPSEEK].baseURL,
          apiKey: process.env.DEEPSEEK_API_KEY,
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
