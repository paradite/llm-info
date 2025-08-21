# llm-info

[![NPM version](https://img.shields.io/npm/v/llm-info.svg?style=flat-square)](https://npmjs.org/package/llm-info)
[![CI](https://github.com/paradite/llm-info/actions/workflows/node.js.yml/badge.svg)](https://github.com/paradite/llm-info/actions/workflows/node.js.yml)

Information on LLM models, context window token limit, output token limit, pricing and more, developed by [16x Prompt](https://prompt.16x.engineer/) and [16x Eval](https://eval.16x.engineer/) team.

Related projects:

- [send-prompt](https://github.com/paradite/send-prompt): A unified TypeScript library for AI model interactions with standardized interfaces and function calling.
- [ai-file-edit](https://github.com/paradite/ai-file-edit): A library for editing files using AI models such as GPT, Claude, and Gemini.

## Information provided

- context window token limit
- output token limit
- pricing
- image input support
- `tokenizerId` for loading tokenizer from `@xenova/transformers`
- legacy status and legacy reason
- alpha/beta status
- small model indicator
- reasoning model indicator
- coding recommendation
- writing recommendation
- OpenRouter model ID mapping
- notes and documentation URLs
- API keys page URLs for easy access to provider API key management
- and more

## Models included

- GPT-4o
- GPT-4.1
- o1
- o3-mini
- Claude 3.5 Sonnet
- Claude 3.5 Haiku
- Claude 3.7 Sonnet
- Claude Sonnet 4
- DeepSeek-V3
- DeepSeek-R1
- Gemini 2.5 Pro
- Gemini 2.5 Flash
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
  // ...
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
  tokenizerId: 'Xenova/gpt-4o',
  supportsImageInput: true,
  legacy: false
}
*/

// Example with more fields including recommendations
const recentModelInfo = ModelInfoMap['claude-sonnet-4-20250514'];
console.log(recentModelInfo);
/*
{
  name: 'Claude Sonnet 4',
  provider: 'anthropic',
  contextWindowTokenLimit: 200000,
  outputTokenLimit: 64000,
  pricePerMillionInputTokens: 3,
  pricePerMillionOutputTokens: 15,
  tokenizerId: 'Xenova/claude-tokenizer',
  notes: 'Optimal balance of intelligence, cost, and speed',
  notesUrl: 'https://www.anthropic.com/claude/sonnet',
  supportsImageInput: true,
  recommendedForCoding: true,
  recommendedForWriting: true,
  legacy: false,
  openRouterModelId: 'anthropic/claude-sonnet-4'
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
    firstParty: true,
    apiKeysPage: 'https://platform.openai.com/api-keys'
  },
  anthropic: {
    name: 'Anthropic',
    firstParty: true,
    apiKeysPage: 'https://console.anthropic.com/settings/keys'
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
    baseURL: 'https://api.deepseek.com',
    apiKeysPage: 'https://platform.deepseek.com/api_keys'
  },
  openrouter: {
    name: 'OpenRouter',
    firstParty: false,
    baseURL: 'https://openrouter.ai/api/v1',
    website: 'https://openrouter.ai',
    apiKeysPage: 'https://openrouter.ai/keys'
  },
  google: {
    name: 'Google',
    firstParty: true,
    baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
    apiKeysPage: 'https://aistudio.google.com/app/apikey'
  },
  fireworks: {
    name: 'Fireworks',
    firstParty: false,
    baseURL: 'https://api.fireworks.ai/inference/v1',
    website: 'https://fireworks.ai'
  },
  xai: {
    name: 'xAI',
    firstParty: true,
    baseURL: 'https://api.x.ai/v1',
    apiKeysPage: 'https://console.x.ai/'
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

## Legacy Model Mappings

Some model IDs have been reused for newer versions. The library includes a legacy mapping system to track these transitions:

```typescript
import { getLegacyMappingByModelId, getAllLegacyMappings } from 'llm-info';

// Check for legacy model mappings
const legacyMapping = getLegacyMappingByModelId('deepseek-chat');
if (legacyMapping) {
  console.log(`Model ID: ${legacyMapping.modelId}`);
  console.log(`Legacy Name: ${legacyMapping.legacyName}`);
  console.log(`Current Name: ${legacyMapping.currentName}`);
  console.log(`Legacy Release: ${legacyMapping.legacyReleaseDate}`);
  console.log(`Transition Date: ${legacyMapping.transitionDate}`);
}
/*
Model ID: deepseek-chat
Legacy Name: DeepSeek-V3 (new)
Current Name: DeepSeek-V3.1
Legacy Release: 2025-03-24
Transition Date: 2025-08-21
*/

// Get all legacy mappings
const allMappings = getAllLegacyMappings();
console.log(allMappings);
/*
[
  {
    modelId: 'deepseek-chat',
    legacyName: 'DeepSeek-V3 (new)',
    currentName: 'DeepSeek-V3.1',
    legacyReleaseDate: '2025-03-24',
    transitionDate: '2025-08-21',
    notes: 'Model ID remained the same but refers to a newer version',
    legacyModelInfo: {
      name: 'DeepSeek-V3 (new)',
      provider: 'deepseek',
      contextWindowTokenLimit: 64000,
      outputTokenLimit: 8192,
      pricePerMillionInputTokens: 0.27,
      pricePerMillionOutputTokens: 1.10,
      tokenizerId: null,
      legacy: true,
      legacyReason: 'Replaced by DeepSeek-V3.1 on the same model ID',
      releaseDate: '2025-03-24',
      openRouterModelId: 'deepseek/deepseek-chat-v3-0324'
    }
  }
]
*/
```

### Current Legacy Mappings

- **deepseek-chat**: Originally "DeepSeek-V3 (new)" (released 2025-03-24), now refers to "DeepSeek-V3.1" (transitioned 2025-08-21)

## Testing

```
$ yarn test
```
