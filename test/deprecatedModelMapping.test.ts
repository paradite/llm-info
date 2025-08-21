import {
  DEPRECATED_MODEL_MAPPINGS,
  getDeprecatedMappingByModelId,
  getAllDeprecatedMappings,
  DeprecatedModelMapping,
  getAllDeprecatedModelsInfo,
} from '../src/deprecatedModelMapping';

describe('Deprecated Model Mapping', () => {
  describe('DEPRECATED_MODEL_MAPPINGS', () => {
    it('should contain the deepseek-chat mapping', () => {
      const deepseekMapping = DEPRECATED_MODEL_MAPPINGS.find(
        (mapping) => mapping.modelId === 'deepseek-chat'
      );

      expect(deepseekMapping).toBeDefined();
      expect(deepseekMapping!.deprecatedName).toBe('DeepSeek-V3 (new)');
      expect(deepseekMapping!.deprecatedReleaseDate).toBe('2025-03-24');
      expect(deepseekMapping!.transitionDate).toBe('2025-08-21');
      expect(deepseekMapping!.deprecatedModelInfo).toBeDefined();
      expect(deepseekMapping!.deprecatedModelInfo.name).toBe(
        'DeepSeek-V3 (new)'
      );
      expect(deepseekMapping!.deprecatedModelInfo.legacy).toBe(true);
    });

    it('should have valid structure for all mappings', () => {
      DEPRECATED_MODEL_MAPPINGS.forEach((mapping: DeprecatedModelMapping) => {
        expect(mapping.modelId).toBeDefined();
        expect(typeof mapping.modelId).toBe('string');
        expect(mapping.modelId.length).toBeGreaterThan(0);

        expect(mapping.deprecatedName).toBeDefined();
        expect(typeof mapping.deprecatedName).toBe('string');
        expect(mapping.deprecatedName.length).toBeGreaterThan(0);

        if (mapping.deprecatedReleaseDate) {
          expect(typeof mapping.deprecatedReleaseDate).toBe('string');
        }

        if (mapping.transitionDate) {
          expect(typeof mapping.transitionDate).toBe('string');
        }

        if (mapping.notes) {
          expect(typeof mapping.notes).toBe('string');
        }

        expect(mapping.deprecatedModelInfo).toBeDefined();
        expect(typeof mapping.deprecatedModelInfo).toBe('object');
        expect(mapping.deprecatedModelInfo.name).toBeDefined();
        expect(mapping.deprecatedModelInfo.provider).toBeDefined();
        expect(mapping.deprecatedModelInfo.legacy).toBe(true);
      });
    });
  });

  describe('getDeprecatedMappingByModelId', () => {
    it('should return the correct mapping for deepseek-chat', () => {
      const mapping = getDeprecatedMappingByModelId('deepseek-chat');

      expect(mapping).toBeDefined();
      expect(mapping![0].modelId).toBe('deepseek-chat');
      expect(mapping![0].deprecatedName).toBe('DeepSeek-V3 (new)');
    });

    it('should return undefined for non-existent model ID', () => {
      const mapping = getDeprecatedMappingByModelId('non-existent-model');
      expect(mapping).toEqual([]);
    });

    it('should return undefined for empty string', () => {
      const mapping = getDeprecatedMappingByModelId('');
      expect(mapping).toEqual([]);
    });
  });

  describe('getAllDeprecatedMappings', () => {
    it('should return a copy of all mappings', () => {
      const mappings = getAllDeprecatedMappings();

      expect(Array.isArray(mappings)).toBe(true);
      expect(mappings.length).toBe(DEPRECATED_MODEL_MAPPINGS.length);

      // Should be a copy, not the same reference
      expect(mappings).not.toBe(DEPRECATED_MODEL_MAPPINGS);
      expect(mappings).toEqual(DEPRECATED_MODEL_MAPPINGS);
    });
  });

  describe('getAllDeprecatedModelsInfo', () => {
    it('should return all deprecated model info', () => {
      const modelsInfo = getAllDeprecatedModelsInfo();
      console.log(modelsInfo);
      expect(modelsInfo).toBeDefined();
      expect(modelsInfo.length).toBe(DEPRECATED_MODEL_MAPPINGS.length);
      expect(modelsInfo[0].id).toBe('deepseek-chat');
      expect(modelsInfo[0].name).toBe('DeepSeek-V3 (new)');
      expect(modelsInfo[0].provider).toBe('deepseek');
      expect(modelsInfo[0].legacy).toBe(true);
      expect(modelsInfo[0].legacyReason).toBe(
        'Replaced by DeepSeek-V3.1 on the same model ID'
      );
      expect(modelsInfo[1].id).toBe('deepseek-reasoner');
      expect(modelsInfo[1].name).toBe('DeepSeek-R1');
      expect(modelsInfo[1].provider).toBe('deepseek');
      expect(modelsInfo[1].legacy).toBe(true);
      expect(modelsInfo[1].legacyReason).toBe(
        'Replaced by DeepSeek-V3.1 (Thinking Mode) on the same model ID'
      );
    });
  });
});
