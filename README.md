# llm-info

Information on LLM models:

- context window token limit
- output token limit
- pricing
- and more

## Models

- GPT-4
- GPT-4o
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

// {
//   name: 'GPT-4',
//   contextWindowTokenLimit: 128000,
//   outputTokenLimit: 4096,
//   pricePerMillionInputTokens: 30,
//   pricePerMillionOutputTokens: 60
// }

console.log(ModelInfoMap[ModelEnum['claude-3-5-sonnet-20240620']]);
// {
//   name: 'Claude 3.5 Sonnet',
//   contextWindowTokenLimit: 200000,
//   outputTokenLimit: 4096,
//   pricePerMillionInputTokens: 3,
//   pricePerMillionOutputTokens: 15
// }

const modelLike = ModelLikeEnum['chatgpt'];
const modelLikeInfo = ModelInfoMap[modelLike];
console.log(modelLikeInfo);

// {
//   name: 'ChatGPT',
//   contextWindowTokenLimit: 4096,
//   outputTokenLimit: 4096,
//   pricePerMillionInputTokens: null,
//   pricePerMillionOutputTokens: null
// }
```

## Testing

```
$ yarn test
```
