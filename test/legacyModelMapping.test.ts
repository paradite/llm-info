import {
  LEGACY_MODEL_MAPPINGS,
  getLegacyMappingByModelId,
  getAllLegacyMappings,
  LegacyModelMapping,
} from '../src/legacyModelMapping';

describe('Legacy Model Mapping', () => {
  describe('LEGACY_MODEL_MAPPINGS', () => {
    it('should contain the deepseek-chat mapping', () => {
      const deepseekMapping = LEGACY_MODEL_MAPPINGS.find(
        (mapping) => mapping.modelId === 'deepseek-chat'
      );

      expect(deepseekMapping).toBeDefined();
      expect(deepseekMapping!.legacyName).toBe('DeepSeek-V3 (new)');
      expect(deepseekMapping!.legacyReleaseDate).toBe('2025-03-24');
      expect(deepseekMapping!.transitionDate).toBe('2025-08-21');
      expect(deepseekMapping!.legacyModelInfo).toBeDefined();
      expect(deepseekMapping!.legacyModelInfo.name).toBe('DeepSeek-V3 (new)');
      expect(deepseekMapping!.legacyModelInfo.legacy).toBe(true);
    });

    it('should have valid structure for all mappings', () => {
      LEGACY_MODEL_MAPPINGS.forEach((mapping: LegacyModelMapping) => {
        expect(mapping.modelId).toBeDefined();
        expect(typeof mapping.modelId).toBe('string');
        expect(mapping.modelId.length).toBeGreaterThan(0);

        expect(mapping.legacyName).toBeDefined();
        expect(typeof mapping.legacyName).toBe('string');
        expect(mapping.legacyName.length).toBeGreaterThan(0);

        if (mapping.legacyReleaseDate) {
          expect(typeof mapping.legacyReleaseDate).toBe('string');
        }

        if (mapping.transitionDate) {
          expect(typeof mapping.transitionDate).toBe('string');
        }

        if (mapping.notes) {
          expect(typeof mapping.notes).toBe('string');
        }

        expect(mapping.legacyModelInfo).toBeDefined();
        expect(typeof mapping.legacyModelInfo).toBe('object');
        expect(mapping.legacyModelInfo.name).toBeDefined();
        expect(mapping.legacyModelInfo.provider).toBeDefined();
        expect(mapping.legacyModelInfo.legacy).toBe(true);
      });
    });
  });

  describe('getLegacyMappingByModelId', () => {
    it('should return the correct mapping for deepseek-chat', () => {
      const mapping = getLegacyMappingByModelId('deepseek-chat');

      expect(mapping).toBeDefined();
      expect(mapping!.modelId).toBe('deepseek-chat');
      expect(mapping!.legacyName).toBe('DeepSeek-V3 (new)');
    });

    it('should return undefined for non-existent model ID', () => {
      const mapping = getLegacyMappingByModelId('non-existent-model');
      expect(mapping).toBeUndefined();
    });

    it('should return undefined for empty string', () => {
      const mapping = getLegacyMappingByModelId('');
      expect(mapping).toBeUndefined();
    });
  });

  describe('getAllLegacyMappings', () => {
    it('should return a copy of all mappings', () => {
      const mappings = getAllLegacyMappings();

      expect(Array.isArray(mappings)).toBe(true);
      expect(mappings.length).toBe(LEGACY_MODEL_MAPPINGS.length);

      // Should be a copy, not the same reference
      expect(mappings).not.toBe(LEGACY_MODEL_MAPPINGS);
      expect(mappings).toEqual(LEGACY_MODEL_MAPPINGS);
    });
  });
});
