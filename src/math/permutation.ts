import type { CalculationStep, PermutationInput, SolverResult } from '../types';
import {
  assertNonNegativeInteger,
  factorialBigInt,
  formatBigInt,
  MathValidationError,
  permutationBigInt,
} from './utils';

export function solvePermutation(input: PermutationInput): SolverResult {
  const { n, r } = input;
  assertNonNegativeInteger(n, 'n');
  assertNonNegativeInteger(r, 'r');
  if (r > n) {
    throw new MathValidationError('r cannot exceed n for permutations.');
  }

  const answer = permutationBigInt(n, r);
  const nFactorial = factorialBigInt(n);
  const nMinusRFactorial = factorialBigInt(n - r);

  const steps: CalculationStep[] = [
    {
      label: 'Compute n!',
      expression: `${n}!`,
      result: formatBigInt(nFactorial),
    },
    {
      label: 'Compute (n−r)!',
      expression: `${n - r}!`,
      result: formatBigInt(nMinusRFactorial),
    },
    {
      label: 'Divide n! by (n−r)!',
      expression: `${formatBigInt(nFactorial)} \\div ${formatBigInt(nMinusRFactorial)}`,
      result: formatBigInt(answer),
    },
  ];

  if (r === 0) {
    steps.unshift({
      label: 'Special case r = 0',
      expression: 'nP0 = n!/n! = 1',
      result: '1',
    });
  }

  return {
    problemType: 'permutation',
    answer: formatBigInt(answer),
    formula: 'nP_r = \\frac{n!}{(n-r)!}',
    substitutedFormula: `${n}P_{${r}} = \\frac{${n}!}{(${n}-${r})!}`,
    steps,
    explanation:
      'Permutation counts ordered arrangements of r objects chosen from n distinct objects. Order matters, so ABC and BAC are different permutations.',
  };
}

export function validatePermutationInput(n: unknown, r: unknown): PermutationInput {
  if (typeof n !== 'number' || Number.isNaN(n)) {
    throw new MathValidationError('n must be a valid number.');
  }
  if (typeof r !== 'number' || Number.isNaN(r)) {
    throw new MathValidationError('r must be a valid number.');
  }
  assertNonNegativeInteger(n, 'n');
  assertNonNegativeInteger(r, 'r');
  if (r > n) {
    throw new MathValidationError('r cannot exceed n for permutations.');
  }
  return { n, r };
}
