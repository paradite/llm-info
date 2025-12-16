# Guide: Adding New Models to llm-info

This document describes the process of adding new LLM models to this repository.

## Overview

Adding a new model requires changes to 3-4 files:

1. `src/model.ts` - Add model ID to enum
2. `src/ModelInfoMap.ts` - Add model configuration
3. `test/*.test.ts` - Update relevant tests
4. (Optional) `src/provider.ts` - If adding a new provider

## Step-by-Step Process

### 1. Gather Model Information

Before adding a model, collect the following information from official documentation:

- **Model ID**: The exact API model name (e.g., `claude-opus-4-5-20251101`)
- **Display Name**: Human-readable name (e.g., `Claude Opus 4.5`)
- **Provider**: The AI provider (e.g., `ANTHROPIC`, `OPENAI`, `GOOGLE`)
- **Context Window**: Maximum input tokens (e.g., `200000`)
- **Output Token Limit**: Maximum output tokens (e.g., `64000`)
- **Pricing**: Input/output cost per million tokens
- **Capabilities**: Image support, reasoning, etc.

**Useful documentation sources:**

- Anthropic: https://docs.anthropic.com/en/docs/about-claude/models
- OpenAI: https://platform.openai.com/docs/models
- Google: https://ai.google.dev/gemini-api/docs/models
- xAI: https://docs.x.ai/docs/models

### 2. Add Model to Enum (`src/model.ts`)

Add the model ID to the `ModelEnum`:

```typescript
export enum ModelEnum {
  // ... existing models
  'claude-opus-4-5-20251101' = 'claude-opus-4-5-20251101',
  'claude-sonnet-4-5-20250929' = 'claude-sonnet-4-5-20250929',
  // ... more models
}
```

### 3. Add Model Configuration (`src/ModelInfoMap.ts`)

Add the model's full configuration:

```typescript
[ModelEnum['claude-opus-4-5-20251101']]: {
  name: 'Claude Opus 4.5',
  provider: AI_PROVIDERS.ANTHROPIC,
  contextWindowTokenLimit: 200000,
  outputTokenLimit: 64000,
  pricePerMillionInputTokens: 5,
  pricePerMillionOutputTokens: 25,
  tokenizerId: 'Xenova/claude-tokenizer',
  notes: 'Premium model combining maximum intelligence with practical performance',
  notesUrl: 'https://www.anthropic.com/claude/opus',
  supportsImageInput: true,
  recommendedForCoding: true,
  recommendedForWriting: true,
  legacy: false,
  openRouterModelId: 'anthropic/claude-opus-4-5',
},
```

#### Required Fields

| Field                         | Type           | Description                        |
| ----------------------------- | -------------- | ---------------------------------- |
| `name`                        | string         | Human-readable display name        |
| `provider`                    | AI_PROVIDERS   | Provider constant from provider.ts |
| `contextWindowTokenLimit`     | number         | Max input context tokens           |
| `outputTokenLimit`            | number         | Max output tokens                  |
| `pricePerMillionInputTokens`  | number \| null | Cost per 1M input tokens           |
| `pricePerMillionOutputTokens` | number \| null | Cost per 1M output tokens          |
| `tokenizerId`                 | string \| null | Xenova tokenizer ID                |
| `legacy`                      | boolean        | Whether model is deprecated        |

#### Optional Fields

| Field                   | Type    | Description                       |
| ----------------------- | ------- | --------------------------------- |
| `notes`                 | string  | Additional information            |
| `notesUrl`              | string  | Link to official documentation    |
| `supportsImageInput`    | boolean | Vision/image capability           |
| `recommendedForCoding`  | boolean | Good for coding tasks             |
| `recommendedForWriting` | boolean | Good for writing tasks            |
| `reasoning`             | boolean | Has reasoning/thinking capability |
| `small`                 | boolean | Smaller/faster model variant      |
| `alpha`                 | boolean | Experimental/preview model        |
| `legacyReason`          | string  | Why model is deprecated           |
| `openRouterModelId`     | string  | OpenRouter model identifier       |
| `releaseDate`           | string  | Model release date (YYYY-MM-DD)   |

### 4. Mark Old Models as Legacy (if applicable)

When adding a new model that supersedes an existing one:

```typescript
[ModelEnum['claude-opus-4-1-20250805']]: {
  // ... existing config
  legacy: true,
  legacyReason: 'Superceded by Claude Opus 4.5',
},
```

### 5. Update Tests

#### Update `test/non-legacy-models.test.ts`

Add new non-legacy models and remove newly-legacy ones:

```typescript
const expectedNonLegacyModels = [
  'chatgpt',
  'claude-haiku-4-5-20251001',
  'claude-opus-4-5-20251101',
  'claude-sonnet-4-5-20250929',
  // ... other models (sorted alphabetically)
];
```

#### Update `test/recommended-models.test.ts`

If the model has `recommendedForCoding` or `recommendedForWriting`:

```typescript
const expectedCodingModels = [
  'claude-opus-4-5-20251101',
  'claude-sonnet-4-5-20250929',
  // ... other models (sorted alphabetically)
];
```

#### Create/Update Provider Test (e.g., `test/anthropic.test.ts`)

```typescript
import Anthropic from '@anthropic-ai/sdk';
import { ModelEnum } from '../src';

describe('Anthropic API', () => {
  const testFn = process.env.ANTHROPIC_API_KEY ? it : it.skip;

  const testModels = [
    ModelEnum['claude-opus-4-5-20251101'],
    ModelEnum['claude-sonnet-4-5-20250929'],
  ];

  for (const model of testModels) {
    testFn(
      `can make real API call to ${model} model`,
      async () => {
        const anthropic = new Anthropic({
          apiKey: process.env.ANTHROPIC_API_KEY,
        });

        const response = await anthropic.messages.create({
          model,
          max_tokens: 500,
          messages: [{ role: 'user', content: 'Hello, who are you?' }],
        });

        expect(response.content[0].type).toBe('text');
      },
      30000
    );
  }
});
```

### 6. Add Provider SDK (if needed)

If the provider SDK isn't installed:

```bash
npm install --save-dev @anthropic-ai/sdk --legacy-peer-deps
```

Add test script to `package.json`:

```json
{
  "scripts": {
    "test:anthropic": "jest test/anthropic.test.ts --runInBand"
  }
}
```

### 7. Run Tests

```bash
npm test
```

Ensure all tests pass before committing.

## Adding a New Provider

If adding models from a new provider:

### 1. Add Provider to `src/provider.ts`

```typescript
export const AI_PROVIDERS = {
  // ... existing providers
  NEW_PROVIDER: 'new-provider',
} as const;

export const AI_PROVIDER_CONFIG: Record<AI_PROVIDER, AIProviderConfig> = {
  // ... existing configs
  [AI_PROVIDERS.NEW_PROVIDER]: {
    name: 'New Provider',
    type: 'first-party-sdk', // or 'first-party-base-url', 'third-party'
    website: 'https://newprovider.ai',
    apiKeyUrl: 'https://newprovider.ai/api-keys',
  },
};
```

### 2. Add Provider Name Mapping

```typescript
export const AI_PROVIDER_NAME_MAP: Record<AI_PROVIDER, string> = {
  // ... existing mappings
  [AI_PROVIDERS.NEW_PROVIDER]: 'New Provider',
};
```

## Tokenizer Selection

Common tokenizer IDs:

- `Xenova/claude-tokenizer` - Anthropic Claude models
- `Xenova/gpt-4` - OpenAI GPT-4 and earlier
- `Xenova/gpt-4o` - OpenAI GPT-4o and newer

If unsure, use `Xenova/gpt-4o` as a reasonable default for newer models.

## Checklist

- [ ] Model ID added to `ModelEnum` in `src/model.ts`
- [ ] Model config added to `ModelInfoMap` in `src/ModelInfoMap.ts`
- [ ] Old models marked as legacy (if applicable)
- [ ] `test/non-legacy-models.test.ts` updated
- [ ] `test/recommended-models.test.ts` updated (if applicable)
- [ ] Provider test file created/updated
- [ ] SDK installed (if new provider)
- [ ] All tests pass (`npm test`)
