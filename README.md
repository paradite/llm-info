# llm-info

[![NPM version](https://img.shields.io/npm/v/llm-info.svg?style=flat-square)](https://npmjs.org/package/llm-info)
[![CI](https://github.com/paradite/llm-info/actions/workflows/node.js.yml/badge.svg)](https://github.com/paradite/llm-info/actions/workflows/node.js.yml)

Information on LLM models, context window token limit, output token limit, pricing and more.

Information provided includes:

- context window token limit
- output token limit
- pricing
- and more

Models included:

- GPT-4
- GPT-4o
- GPT-4o mini
- Claude 3.5 Sonnet

Non-models (model-like) included:

- ChatGPT

## Install:

```bash
$ yarn add llm-info
```

## Usage

```ts
// Models
import { AllModels, ModelEnum, NonModelEnum, ModelInfoMap } from 'llm-info';

console.log(AllModels);
// [ 'gpt-4', 'gpt-4o', 'gpt-4o-mini', 'claude-3-5-sonnet-20240620' ]

console.log(AllModelLikes);
/*
[
  'gpt-4',
  'gpt-4o',
  'gpt-4o-mini',
  'claude-3-5-sonnet-20240620',
  'chatgpt'
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
