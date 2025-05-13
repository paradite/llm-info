# llm-info

[![NPM version](https://img.shields.io/npm/v/llm-info.svg?style=flat-square)](https://npmjs.org/package/llm-info)
[![CI](https://github.com/paradite/llm-info/actions/workflows/node.js.yml/badge.svg)](https://github.com/paradite/llm-info/actions/workflows/node.js.yml)

Information on LLM models, context window token limit, output token limit, pricing and more, developed by [16x Prompt](https://prompt.16x.engineer/) and [16x Eval](https://eval.16x.engineer/) team.

## Information provided

- context window token limit
- output token limit
- pricing
- image input support
- `tokenizerId` for loading tokenizer from `@xenova/transformers`
- and more

## Models included

- GPT-4
- GPT-4 Turbo
- GPT-4o
- GPT-4o mini
- GPT-4.1
- GPT-4.1 mini
- GPT-4.1 nano
- o1
- o1-mini
- o1-preview
- o3-mini
- Claude 3.5 Sonnet
- Claude 3.5 Haiku
- Claude 3.7 Sonnet
- DeepSeek-V3
- DeepSeek-R1
- Gemini 2.5 Pro Experimental
- .. and more

Non-models (model-like) included:

- ChatGPT

## Providers supported

First-party providers:

- OpenAI
- Anthropic
- Azure OpenAI
- DeepSeek
- Google

Third-party providers:

- OpenRouter
- Fireworks

## Install:

```bash
$ yarn add llm-info
```

## Usage

```ts
// Models
import { AllModels, ModelEnum, NonModelEnum, ModelInfoMap } from 'llm-info';

console.log(AllModels);
/*
[
  'gpt-4',
  'gpt-4-turbo',
  'gpt-4o',
  'gpt-4o-64k-output-alpha',
  'gpt-4o-mini',
  'gpt-4o-2024-08-06',
  'o1-preview',
  'o1-mini',
  'o1',
  'claude-3-5-sonnet-20240620',
  'claude-3-5-sonnet-20241022',
  'claude-3-5-haiku-20241022',
  'o3-mini',
  'claude-3-7-sonnet-20250219',
  'deepseek-chat',
  'deepseek-reasoner',
  'gemini-2.5-pro-exp-03-25'
]
*/

// Model Info
const modelInfo = ModelInfoMap['gpt-4o'];
console.log(modelInfo);
/*
{
  name: 'GPT-4o',
  provider: 'openai',
  contextWindowTokenLimit: 128000,
  outputTokenLimit: 4096,
  pricePerMillionInputTokens: 5,
  pricePerMillionOutputTokens: 15,
  tokenizerId: 'Xenova/gpt-4o'
}
*/

// Providers
import { AI_PROVIDER_NAME_MAP } from 'llm-info';

console.log(AI_PROVIDER_NAME_MAP);
/*
{
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  'azure-openai': 'Azure OpenAI',
  deepseek: 'DeepSeek',
  openrouter: 'OpenRouter',
  google: 'Google',
  fireworks: 'Fireworks'
}
*/

// Provider Configuration
import { AI_PROVIDER_CONFIG, AI_PROVIDERS } from 'llm-info';

console.log(AI_PROVIDER_CONFIG);
/*
{
  openai: {
    name: 'OpenAI',
    firstParty: true
  },
  anthropic: {
    name: 'Anthropic',
    firstParty: true
  },
  'azure-openai': {
    name: 'Azure OpenAI',
    firstParty: false,
    baseURL: 'https://<your-resource-name>.openai.azure.com/',
    website: 'https://azure.microsoft.com/en-us/products/ai-services/openai-service'
  },
  deepseek: {
    name: 'DeepSeek',
    firstParty: true,
    baseURL: 'https://api.deepseek.com'
  },
  openrouter: {
    name: 'OpenRouter',
    firstParty: false,
    baseURL: 'https://openrouter.ai/api/v1',
    website: 'https://openrouter.ai'
  },
  google: {
    name: 'Google',
    firstParty: true,
    baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/'
  },
  fireworks: {
    name: 'Fireworks',
    firstParty: false,
    baseURL: 'https://api.fireworks.ai/inference/v1',
    website: 'https://fireworks.ai'
  }
}
*/

// Tokenizer
import { AutoTokenizer } from '@xenova/transformers';
const testSentence =
  "Many words map to one token, but some don't: indivisible.";
const results: string[] = [];
for (let i = 0; i < AllModels.length; i++) {
  const model = AllModels[i];
  if (ModelInfoMap[model].tokenizerId) {
    const tokenizer = await AutoTokenizer.from_pretrained(
      ModelInfoMap[model].tokenizerId
    );
    const tokens = tokenizer.encode(testSentence);
    results.push(`${model}: ${tokens.length}`);
  }
}
console.log(`Test sentence: ${testSentence}\n${results.join('\n')}`);
// Test sentence: Many words map to one token, but some don't: indivisible.
// gpt-4: 15
// gpt-4o: 14
// gpt-4o-mini: 14
// claude-3-5-sonnet-20240620: 16
```

## Testing

```
$ yarn test
```
