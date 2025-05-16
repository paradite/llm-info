import { OpenAI } from 'openai';
import { GoogleGenAI } from '@google/genai';
import { AI_PROVIDER_CONFIG, AI_PROVIDERS, ModelEnum } from '../src';

describe('Google Gemini API', () => {
  // Skip test if GEMINI_API_KEY is not set
  const testFn = process.env.GEMINI_API_KEY ? it : it.skip;

  // const testModels = [
  //   'gemini-2.5-flash-preview-04-17',
  //   ModelEnum['gemini-2.5-pro-exp-03-25'],
  //   ModelEnum['gemini-2.5-pro-preview-05-06'],
  // ];

  const testModels = [
    // ModelEnum['gemini-2.5-pro-exp-03-25'],
    ModelEnum['gemini-2.5-flash-preview-04-17'],
  ];

  for (const model of testModels) {
    testFn(
      `can make real API call to ${model} model using OpenAI-compatible client`,
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

    testFn(
      'can make real API call using native Google GenAI SDK',
      async () => {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const response = await ai.models.generateContent({
          model,
          contents: 'Hello, who are you?',
          config: {
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
        });

        expect(response.text).toBeTruthy();
        console.log('Native SDK Response:', JSON.stringify(response, null, 2));
      },
      30000
    );
  }
});
