import { OpenAI } from 'openai';
import { AI_PROVIDER_CONFIG, AI_PROVIDERS, ModelEnum } from '../src';

describe('Google Gemini API', () => {
  // Skip test if GEMINI_API_KEY is not set
  const testFn = process.env.GEMINI_API_KEY ? it : it.skip;

  const testModels = [ModelEnum['gemini-2.5-pro-exp-03-25']];

  for (const model of testModels) {
    testFn(
      `can make real API call to ${model} model`,
      async () => {
        const openai = new OpenAI({
          baseURL: AI_PROVIDER_CONFIG[AI_PROVIDERS.GOOGLE].baseURL,
          apiKey: process.env.GEMINI_API_KEY,
        });

        const response = await openai.chat.completions.create({
          model,
          messages: [{ role: 'user', content: 'Hello, who are you?' }],
        });

        console.log(response);

        expect(response.choices[0].message.content).toBeTruthy();
        console.log(`${model} Response:`, response.choices[0].message.content);
      },
      30000
    );
  }
});
