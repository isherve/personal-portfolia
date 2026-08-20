import { slugify, generateCode, getPagination, paginationMeta } from '../utils/helpers';

describe('helpers', () => {
  describe('slugify', () => {
    it('should convert text to slug', () => {
      expect(slugify('Modern Villa in Kacyiru')).toBe('modern-villa-in-kacyiru');
    });

    it('should handle special characters', () => {
      expect(slugify('Hello & World!')).toBe('hello-world');
    });
  });

  describe('generateCode', () => {
    it('should generate code with prefix', () => {
      const code = generateCode('INV');
      expect(code).toMatch(/^INV-\d{4}-\d{4}$/);
    });
  });

  describe('getPagination', () => {
    it('should return correct pagination values', () => {
      const result = getPagination(2, 10);
      expect(result.page).toBe(2);
      expect(result.limit).toBe(10);
      expect(result.skip).toBe(10);
      expect(result.take).toBe(10);
    });

    it('should enforce max limit', () => {
      const result = getPagination(1, 500);
      expect(result.limit).toBe(100);
    });
  });

  describe('paginationMeta', () => {
    it('should calculate total pages', () => {
      const meta = paginationMeta(45, 1, 20);
      expect(meta.totalPages).toBe(3);
      expect(meta.total).toBe(45);
    });
  });
});
