import { act, renderHook } from '@testing-library/react-hooks';
import { ChangeEvent } from 'react';
import { Program } from '../types';
import { getPrograms } from './getPrograms';
import {
  adaptProgram,
  adaptPrograms,
  adaptStatus,
  checkIsKeyOfVisibleProgram,
  columnFormatters,
  formatDate,
  usePrograms,
} from './usePrograms';

const program: Program = {
  currency: 'EUR',
  id: 1,
  name: 'name',
  pause_at: '',
  return_percentage: '5%',
  status: 'ACTIVE',
  threshold: 10,
};

const adaptedProgram = {
  id: '1',
  name: 'name',
  pause_at: '-',
  return_percentage: '5%',
  status: 'Active',
  threshold: '€0.10',
};

describe('adaptProgram', () => {
  it('should adapt program', () => {
    expect(adaptProgram(program)).toEqual(adaptedProgram);
  });
});

describe('adaptPrograms', () => {
  it('should adapt programs', () => {
    expect(adaptPrograms([program])).toEqual([adaptedProgram]);
  });
});

describe('checkIsKeyOfVisibleProgram', () => {
  it('returns true', () => {
    expect(checkIsKeyOfVisibleProgram('id')).toEqual(true);
  });

  it('returns false', () => {
    expect(checkIsKeyOfVisibleProgram('bbb')).toBe(false);
  });
});

describe('adaptStatus', () => {
  it('should return empty array', () => {
    expect(
      adaptStatus({
        ACTIVE: false,
        PAUSE_SCHEDULED: false,
        PAUSED: false,
      })
    ).toEqual([]);
  });

  it('should return active statuses in array', () => {
    expect(
      adaptStatus({
        ACTIVE: true,
        PAUSE_SCHEDULED: false,
        PAUSED: true,
      })
    ).toEqual(['ACTIVE', 'PAUSED']);
  });
});

describe('formatDate', () => {
  it('should not fail on incorrect date string', () => {
    expect(formatDate('')).toBe('-');
  });

  it('should format date', () => {
    expect(formatDate('2022-06-01T16:41:49.427617Z')).toBe('2022/06/01');
  });
});

describe('columnFormatters', () => {
  describe('id', () => {
    const format = columnFormatters.id;

    it('should return string', () => {
      expect(format(program)).toBe('1');
    });
  });

  describe('name', () => {
    const format = columnFormatters.name;

    it('should return string', () => {
      expect(format(program)).toBe('name');
    });
  });

  describe('pause_at', () => {
    const format = columnFormatters.pause_at;

    it('should not fail on incorrect date string', () => {
      expect(format(program)).toBe('-');
    });

    it('should return string', () => {
      expect(
        format({ ...program, pause_at: '2022-06-01T16:41:49.427617Z' })
      ).toBe('2022/06/01');
    });
  });

  describe('return_percentage', () => {
    const format = columnFormatters.return_percentage;

    it('should return string', () => {
      expect(format(program)).toBe('5%');
    });
  });

  describe('threshold', () => {
    const format = columnFormatters.threshold;

    it('should return string', () => {
      expect(format(program)).toBe('€0.10');
    });
  });

  describe('status', () => {
    const format = columnFormatters.status;

    it('should return string', () => {
      expect(format(program)).toBe('Active');
    });
  });
});

jest.mock('./getPrograms', () => ({
  getPrograms: jest.fn(),
}));

afterEach(() => jest.resetAllMocks());

// suppress console.error to catch error
const original = console.error;
const consoleError = jest.fn();

beforeEach(() => {
  console.error = consoleError;
});

afterEach(() => {
  console.error = original;
});

describe('usePrograms', () => {
  it('should check initial state', () => {
    (getPrograms as any).mockReturnValue(Promise.resolve([program]));

    const { result, waitForNextUpdate } = renderHook(() => usePrograms());
    waitForNextUpdate();

    /** checks initial state */
    expect(result.current.name).toBe('');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.programs).toEqual([]);
    expect(result.current.status).toEqual({
      ACTIVE: false,
      PAUSE_SCHEDULED: false,
      PAUSED: false,
    });
  });

  it('should check handlers', () => {
    (getPrograms as any).mockReturnValue(Promise.resolve([program]));

    const { result, waitForNextUpdate } = renderHook(() => usePrograms());
    waitForNextUpdate();

    /** checks name change */
    const value = 'a';

    act(() => {
      result.current.handleNameChange({
        target: { value },
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.name).toBe(value);

    /** checks status change */

    act(() => {
      result.current.changeStatus('ACTIVE', true);
    });

    expect(result.current.status).toEqual({
      ACTIVE: true,
      PAUSE_SCHEDULED: false,
      PAUSED: false,
    });

    act(() => {
      result.current.changeStatus('PAUSED', true);
    });

    expect(result.current.status).toEqual({
      ACTIVE: true,
      PAUSE_SCHEDULED: false,
      PAUSED: true,
    });

    act(() => {
      result.current.changeStatus('ACTIVE', false);
    });

    expect(result.current.status).toEqual({
      ACTIVE: false,
      PAUSE_SCHEDULED: false,
      PAUSED: true,
    });
  });

  it('should load programs', async () => {
    (getPrograms as any).mockReturnValue(Promise.resolve([program]));

    const { result, waitFor } = renderHook(() => usePrograms());

    await waitFor(() => result.current.programs.length > 0);

    expect(result.current.programs).toEqual([adaptedProgram]);
    expect(result.current.isLoading).toBe(false);
  });

  it('correctly reacts on error in request', async () => {
    const error = 'error';
    (getPrograms as any).mockReturnValue(
      Promise.reject({ error }).catch((e) => console.error(e))
    );

    const { result, waitFor } = renderHook(() => usePrograms());

    await waitFor(() => result.current.isLoading === false);

    expect(result.current.programs).toEqual([]);
    expect(consoleError).toHaveBeenCalledWith({ error });
  });
});
