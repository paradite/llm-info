import { OpenAI } from 'openai';

describe('OpenAI API', () => {
  // Skip test if OPENAI_API_KEY is not set
  const testFn = process.env.OPENAI_API_KEY ? it : it.skip;

  const testModels = ['gpt-4o', 'o3-mini'];

  for (const model of testModels) {
    testFn(
      `can make real API call to ${model} model`,
      async () => {
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const response = await openai.chat.completions.create({
          model,
          messages: [{ role: 'user', content: 'Hello, who are you?' }],
          max_tokens: 100,
        });

        expect(response.choices[0].message.content).toBeTruthy();
        console.log(`${model} Response:`, response.choices[0].message.content);
      },
      30000
    );
  }
});
