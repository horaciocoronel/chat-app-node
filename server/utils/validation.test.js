const expect = require('expect');
const {isRealString} = require('./validation');

	describe('isRealString', () => {
		it('should reject non string values', () => {

			expect(isRealString('      ')).toBe(false);
			expect(isRealString('')).toBe(false);
			expect(isRealString(3)).toBe(false);
			expect(isRealString([3, 4])).toBe(false);
		});
		it('should reject string with only spaces', () => {
			expect(isRealString('     ')).toBe(false);
		});
		it('should allow string with non-space characters', () => {
			expect(isRealString('myname')).toBe(true);
			expect(isRealString('name')).toBe(true);
		});

	})
