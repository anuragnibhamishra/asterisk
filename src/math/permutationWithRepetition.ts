import type { CalculationStep, PermutationWithRepetitionInput, SolverResult } from '../types';
import {
  assertNonNegativeInteger,
  formatBigInt,
  MathValidationError,
  powBigInt,
  toBigInt,
} from './utils';

export function solvePermutationWithRepetition(
  input: PermutationWithRepetitionInput,
): SolverResult {
  const { n, r } = input;
  assertNonNegativeInteger(n, 'n');
  assertNonNegativeInteger(r, 'r');

  if (n === 0 && r > 0) {
    throw new MathValidationError(
      'When n = 0, r must be 0 (no choices available for r > 0).',
    );
  }

  const answer = r === 0 ? 1n : powBigInt(toBigInt(n), r);
  const steps: CalculationStep[] = [];

  if (r === 0) {
    steps.push({
      label: 'Special case r = 0',
      expression: 'n^0 = 1',
      result: '1',
    });
  } else if (n === 0) {
    steps.push({
      label: 'No available choices',
      expression: '0^r = 0',
      result: '0',
    });
  } else {
    const factors = Array(r).fill(String(n));
    steps.push({
      label: 'Expand as repeated multiplication',
      expression: factors.join(' \\times '),
    });
    steps.push({
      label: 'Compute power',
      expression: `${n}^{${r}}`,
      result: formatBigInt(answer),
    });
  }

  return {
    problemType: 'permutation-with-repetition',
    answer: formatBigInt(answer),
    formula: 'n^r',
    substitutedFormula: `${n}^{${r}}`,
    steps,
    explanation:
      'Permutation with repetition counts ordered arrangements of length r when each of r positions can be filled with any of n types, and reuse is allowed. Each position has n independent choices.',
  };
}

export function validatePermutationWithRepetitionInput(
  n: unknown,
  r: unknown,
): PermutationWithRepetitionInput {
  if (typeof n !== 'number' || Number.isNaN(n)) {
    throw new MathValidationError('n must be a valid number.');
  }
  if (typeof r !== 'number' || Number.isNaN(r)) {
    throw new MathValidationError('r must be a valid number.');
  }
  assertNonNegativeInteger(n, 'n');
  assertNonNegativeInteger(r, 'r');
  if (n === 0 && r > 0) {
    throw new MathValidationError(
      'When n = 0, r must be 0 (no choices available for r > 0).',
    );
  }
  return { n, r };
}
