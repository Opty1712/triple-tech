import { getKeys } from './getKeys';

describe('getKeys', () => {
  it('should return empty array', () => {
    expect(getKeys({})).toEqual([]);
  });

  it('should return keys', () => {
    expect(getKeys({ a: 1, b: 2 })).toEqual(['a', 'b']);
  });
});
