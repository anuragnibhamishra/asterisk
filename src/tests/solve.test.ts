import { describe, expect, it } from 'vitest';
import { solve } from '../math';
import { isSolverError } from '../types';

describe('solve dispatcher', () => {
  it('solves factorial', () => {
    const result = solve('factorial', { n: '5' });
    expect(isSolverError(result)).toBe(false);
    if (!isSolverError(result)) {
      expect(result.answer).toBe('120');
      expect(result.problemType).toBe('factorial');
    }
  });

  it('solves permutation 10P3', () => {
    const result = solve('permutation', { n: '10', r: '3' });
    if (!isSolverError(result)) {
      expect(result.answer).toBe('720');
    }
  });

  it('solves combination 10C3', () => {
    const result = solve('combination', { n: '10', r: '3' });
    if (!isSolverError(result)) {
      expect(result.answer).toBe('120');
    }
  });

  it('solves 0C0', () => {
    const result = solve('combination', { n: '0', r: '0' });
    if (!isSolverError(result)) {
      expect(result.answer).toBe('1');
    }
  });

  it('solves 0P0', () => {
    const result = solve('permutation', { n: '0', r: '0' });
    if (!isSolverError(result)) {
      expect(result.answer).toBe('1');
    }
  });

  it('solves permutation with repetition 4^3', () => {
    const result = solve('permutation-with-repetition', { n: '4', r: '3' });
    if (!isSolverError(result)) {
      expect(result.answer).toBe('64');
    }
  });

  it('solves combination with repetition', () => {
    const result = solve('combination-with-repetition', { n: '3', r: '2' });
    if (!isSolverError(result)) {
      expect(result.answer).toBe('6');
    }
  });

  it('solves circular permutation for n=5', () => {
    const result = solve('circular-permutation', { n: '5' });
    if (!isSolverError(result)) {
      expect(result.answer).toBe('24');
    }
  });

  it('solves permutation with identical objects MISSISSIPPI', () => {
    const result = solve('permutation-identical-objects', {
      frequencies: '1, 4, 4, 2',
    });
    if (!isSolverError(result)) {
      expect(result.answer).toBe('34650');
    }
  });

  it('solves derangement !4', () => {
    const result = solve('derangement', { n: '4' });
    if (!isSolverError(result)) {
      expect(result.answer).toBe('9');
    }
  });

  it('returns error for r > n in permutation', () => {
    const result = solve('permutation', { n: '3', r: '5' });
    expect(isSolverError(result)).toBe(true);
    if (isSolverError(result)) {
      expect(result.message).toContain('cannot exceed');
    }
  });

  it('returns error for missing n', () => {
    const result = solve('factorial', {});
    expect(isSolverError(result)).toBe(true);
  });

  it('returns error for negative n', () => {
    const result = solve('factorial', { n: '-1' });
    expect(isSolverError(result)).toBe(true);
  });

  it('returns error for circular n=0', () => {
    const result = solve('circular-permutation', { n: '0' });
    expect(isSolverError(result)).toBe(true);
  });

  it('returns error for n=0, r>0 in permutation with repetition', () => {
    const result = solve('permutation-with-repetition', { n: '0', r: '2' });
    expect(isSolverError(result)).toBe(true);
  });

  it('handles large values exactly', () => {
    const result = solve('combination', { n: '50', r: '25' });
    if (!isSolverError(result)) {
      expect(result.answer).toBe('126410606437752');
    }
  });
});
