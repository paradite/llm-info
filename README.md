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

## Install:

```bash
$ yarn add llm-info
```

## Usage

```ts
import { AllModels, ModelEnum, ModelLikeEnum, ModelInfoMap } from 'llm-info';

console.log(AllModels);
// [ 'gpt-4', 'gpt-4o', 'claude-3-5-sonnet-20240620' ]

const model = ModelEnum['gpt-4'];
const modelInfo = ModelInfoMap[model];
console.log(modelInfo);
/*
{
  name: 'GPT-4',
  provider: 'openai',
  contextWindowTokenLimit: 128000,
  outputTokenLimit: 4096,
  pricePerMillionInputTokens: 30,
  pricePerMillionOutputTokens: 60
}
*/

console.log(ModelInfoMap[ModelEnum['claude-3-5-sonnet-20240620']]);
/*
{
  name: 'Claude 3.5 Sonnet',
  provider: 'anthropic',
  contextWindowTokenLimit: 200000,
  outputTokenLimit: 4096,
  pricePerMillionInputTokens: 3,
  pricePerMillionOutputTokens: 15
}
*/

const modelLike = ModelLikeEnum['chatgpt'];
const modelLikeInfo = ModelInfoMap[modelLike];
console.log(modelLikeInfo);
/*
{
  name: 'ChatGPT',
  provider: 'openai',
  contextWindowTokenLimit: 4096,
  outputTokenLimit: 4096,
  pricePerMillionInputTokens: null,
  pricePerMillionOutputTokens: null
}
*/
```

## Testing

```
$ yarn test
```
