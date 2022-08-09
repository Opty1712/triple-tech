import { buildQuery } from './getPrograms';

describe('buildQuery', () => {
  it('should return empty string', () => {
    expect(buildQuery({})).toBe('');
  });

  it('should return query for string', () => {
    expect(buildQuery({ name: 'a' })).toBe('name_like=a');
  });

  it('should return query for 1-size array', () => {
    expect(buildQuery({ status: ['ACTIVE'] })).toBe('status=ACTIVE');
  });

  it('should return query for 2-size array', () => {
    expect(buildQuery({ status: ['ACTIVE', 'PAUSED'] })).toBe(
      'status=ACTIVE&status=PAUSED'
    );
  });

  it('should return combined query', () => {
    expect(buildQuery({ name: 'a', status: ['ACTIVE', 'PAUSED'] })).toBe(
      'name_like=a&status=ACTIVE&status=PAUSED'
    );
  });
});
