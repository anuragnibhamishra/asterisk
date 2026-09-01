import { describe, expect, it } from 'vitest';
import {
  combinationBigInt,
  factorialBigInt,
  permutationBigInt,
  powBigInt,
} from '../math/utils';
import { derangementBigInt } from '../math/derangement';

describe('factorialBigInt', () => {
  it('computes 0! = 1', () => {
    expect(factorialBigInt(0)).toBe(1n);
  });

  it('computes 1! = 1', () => {
    expect(factorialBigInt(1)).toBe(1n);
  });

  it('computes 5! = 120', () => {
    expect(factorialBigInt(5)).toBe(120n);
  });

  it('computes large factorials exactly', () => {
    expect(factorialBigInt(20)).toBe(2432902008176640000n);
  });

  it('rejects negative input', () => {
    expect(() => factorialBigInt(-1)).toThrow('non-negative');
  });

  it('rejects non-integer input', () => {
    expect(() => factorialBigInt(2.5)).toThrow('integer');
  });
});

describe('permutationBigInt', () => {
  it('computes 0P0 = 1', () => {
    expect(permutationBigInt(0, 0)).toBe(1n);
  });

  it('computes 5P0 = 1', () => {
    expect(permutationBigInt(5, 0)).toBe(1n);
  });

  it('computes 10P3 = 720', () => {
    expect(permutationBigInt(10, 3)).toBe(720n);
  });

  it('rejects r > n', () => {
    expect(() => permutationBigInt(3, 5)).toThrow('cannot exceed');
  });
});

describe('combinationBigInt', () => {
  it('computes 0C0 = 1', () => {
    expect(combinationBigInt(0, 0)).toBe(1n);
  });

  it('computes 5C0 = 1', () => {
    expect(combinationBigInt(5, 0)).toBe(1n);
  });

  it('computes 5C5 = 1', () => {
    expect(combinationBigInt(5, 5)).toBe(1n);
  });

  it('computes 10C3 = 120', () => {
    expect(combinationBigInt(10, 3)).toBe(120n);
  });

  it('computes 20C10 correctly', () => {
    expect(combinationBigInt(20, 10)).toBe(184756n);
  });

  it('rejects r > n', () => {
    expect(() => combinationBigInt(2, 3)).toThrow('cannot exceed');
  });
});

describe('powBigInt', () => {
  it('computes 4^3 = 64', () => {
    expect(powBigInt(4n, 3)).toBe(64n);
  });

  it('computes n^0 = 1', () => {
    expect(powBigInt(5n, 0)).toBe(1n);
    expect(powBigInt(0n, 0)).toBe(1n);
  });

  it('computes 0^5 = 0', () => {
    expect(powBigInt(0n, 5)).toBe(0n);
  });
});

describe('derangementBigInt', () => {
  it('computes !0 = 1', () => {
    expect(derangementBigInt(0)).toBe(1n);
  });

  it('computes !1 = 0', () => {
    expect(derangementBigInt(1)).toBe(0n);
  });

  it('computes !4 = 9', () => {
    expect(derangementBigInt(4)).toBe(9n);
  });

  it('computes !5 = 44', () => {
    expect(derangementBigInt(5)).toBe(44n);
  });
});
