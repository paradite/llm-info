# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a TypeScript library that provides comprehensive information about LLM models including context window limits, output token limits, pricing, and provider configurations. The library is published to npm as `llm-info` and used by tools like 16x Prompt and 16x Eval.

## Commands

### Build and Development
- `npm run compile` - Build the library using tsup (generates ESM and CJS outputs in dist/)
- `npm run prepublishOnly` - Clean and rebuild before publishing
- `npm test` - Run all Jest tests with experimental VM modules support
- `npm run test:openai` - Run specific OpenAI tests in band

### Testing Individual Providers
- `jest test/openai.test.ts --runInBand` - Test OpenAI models
- `jest test/anthropic.test.ts --runInBand` - Test Anthropic models (if exists)
- `jest test/gemini.test.ts --runInBand` - Test Google Gemini models
- `jest test/deepseek.test.ts --runInBand` - Test DeepSeek models
- `jest test/fireworks.test.ts --runInBand` - Test Fireworks models
- `jest test/openrouter.test.ts --runInBand` - Test OpenRouter models

## Architecture

### Core Files
- `src/index.ts` - Main entry point, re-exports all modules
- `src/ModelInfoMap.ts` - Central registry of all model configurations
- `src/provider.ts` - Provider definitions and configurations
- `src/model.ts` - Model enums and type definitions
- `src/modelInfo.ts` - Model information interfaces
- `src/getModelsByProvider.ts` - Utility to filter models by provider

### Model Definition Pattern
Models are defined in `ModelInfoMap.ts` with this structure:
```typescript
[ModelEnum['model-id']]: {
  name: 'Display Name',
  provider: AI_PROVIDERS.PROVIDER_NAME,
  contextWindowTokenLimit: number,
  outputTokenLimit: number,
  pricePerMillionInputTokens: number,
  pricePerMillionOutputTokens: number,
  tokenizerId: 'Xenova/tokenizer-name',
  supportsImageInput?: boolean,
  legacy?: boolean,
  legacyReason?: string,
  recommendedForCoding?: boolean,
  recommendedForWriting?: boolean,
  // ... other optional fields
}
```

### Provider Integration Pattern
1. Add provider constant to `AI_PROVIDERS` in `src/provider.ts`
2. Add provider configuration to `AI_PROVIDER_CONFIG`
3. Update `AI_PROVIDER_NAME_MAP`
4. Define models in `ModelInfoMap.ts` using the new provider
5. Add model enum entries to `src/model.ts`
6. Create tests in `test/[provider].test.ts`

### Provider Types
- **First Party SDK**: Providers with native SDKs (OpenAI, Anthropic, Google)
- **First Party Base URL**: First-party providers using base URL (DeepSeek)
- **Third Party**: Aggregator services (OpenRouter, Fireworks)

## Testing Structure

Tests validate:
- Model information completeness and correctness
- Provider configurations
- Tokenizer functionality (when available)
- Type safety and exports

Each provider should have its own test file following the pattern in existing tests.

## Build Output

The library generates dual ESM/CJS builds:
- `dist/index.js` - ESM build
- `dist/index.cjs` - CommonJS build
- `dist/index.d.ts` - TypeScript declarations

## Adding New Models

When adding new models:
1. Add model ID to appropriate enum in `src/model.ts`
2. Add model configuration to `ModelInfoMap.ts`
3. Ensure provider exists in `src/provider.ts`
4. Add tests to verify the model information
5. Update README.md model list if it's a significant addition
6. Test with `npm test` before committing

## Special Considerations

- All models must have complete pricing and token limit information
- Tokenizer IDs should use Xenova transformers when available
- Legacy models should be marked with `legacy: true` and include `legacyReason`
- Image support should be explicitly marked with `supportsImageInput: true`
- Recommendation flags help users choose appropriate models for their use case