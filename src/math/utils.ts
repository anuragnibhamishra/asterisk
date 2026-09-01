/** Shared math utilities using BigInt for exact integer arithmetic. */

export class MathValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MathValidationError';
  }
}

export function assertNonNegativeInteger(value: number, name: string): void {
  if (!Number.isInteger(value)) {
    throw new MathValidationError(`${name} must be an integer.`);
  }
  if (value < 0) {
    throw new MathValidationError(`${name} must be non-negative.`);
  }
}

export function assertPositiveInteger(value: number, name: string): void {
  if (!Number.isInteger(value)) {
    throw new MathValidationError(`${name} must be an integer.`);
  }
  if (value <= 0) {
    throw new MathValidationError(`${name} must be positive.`);
  }
}

export function toBigInt(value: number): bigint {
  return BigInt(value);
}

export function formatBigInt(value: bigint): string {
  return value.toString();
}

/**
 * Compute n! using BigInt.
 * 0! = 1 by definition.
 */
export function factorialBigInt(n: number): bigint {
  assertNonNegativeInteger(n, 'n');
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}

/**
 * Integer exponentiation: base^exp using BigInt.
 */
export function powBigInt(base: bigint, exp: number): bigint {
  assertNonNegativeInteger(exp, 'exponent');
  if (exp === 0) {
    return 1n;
  }
  let result = 1n;
  let b = base;
  let e = exp;
  while (e > 0) {
    if (e % 2 === 1) {
      result *= b;
    }
    b *= b;
    e = Math.floor(e / 2);
  }
  return result;
}

export function gcdBigInt(a: bigint, b: bigint): bigint {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Compute nCr using multiplicative formula to avoid large intermediate factorials
 * when possible. Falls back to factorial division for clarity in steps.
 */
export function combinationBigInt(n: number, r: number): bigint {
  assertNonNegativeInteger(n, 'n');
  assertNonNegativeInteger(r, 'r');
  if (r > n) {
    throw new MathValidationError('r cannot exceed n.');
  }
  if (r === 0 || r === n) {
    return 1n;
  }
  let k = Math.min(r, n - r);
  let result = 1n;
  for (let i = 0n; i < BigInt(k); i++) {
    result = (result * (BigInt(n) - i)) / (i + 1n);
  }
  return result;
}

export function permutationBigInt(n: number, r: number): bigint {
  assertNonNegativeInteger(n, 'n');
  assertNonNegativeInteger(r, 'r');
  if (r > n) {
    throw new MathValidationError('r cannot exceed n.');
  }
  let result = 1n;
  for (let i = 0; i < r; i++) {
    result *= BigInt(n - i);
  }
  return result;
}

export function productOfFactorials(values: number[]): bigint {
  return values.reduce((acc, v) => acc * factorialBigInt(v), 1n);
}

export function sum(values: number[]): number {
  return values.reduce((acc, v) => acc + v, 0);
}
