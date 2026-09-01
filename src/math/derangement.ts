import type { CalculationStep, DerangementInput, SolverResult } from '../types';
import {
  assertNonNegativeInteger,
  factorialBigInt,
  formatBigInt,
  MathValidationError,
} from './utils';

/**
 * Compute derangement count D(n) using the inclusion-exclusion formula:
 * D(n) = n! × Σ(k=0..n) (-1)^k / k!
 * All intermediate divisions are exact for integer results.
 */
export function derangementBigInt(n: number): bigint {
  assertNonNegativeInteger(n, 'n');
  const nFact = factorialBigInt(n);
  let sum = 0n;
  for (let k = 0; k <= n; k++) {
    const term = nFact / factorialBigInt(k);
    sum = k % 2 === 0 ? sum + term : sum - term;
  }
  return sum;
}

export function solveDerangement(input: DerangementInput): SolverResult {
  const { n } = input;
  assertNonNegativeInteger(n, 'n');

  const answer = derangementBigInt(n);
  const nFact = factorialBigInt(n);
  const steps: CalculationStep[] = [
    {
      label: 'Compute n!',
      expression: `${n}!`,
      result: formatBigInt(nFact),
    },
  ];

  const terms: string[] = [];
  let partialSum = 0n;
  for (let k = 0; k <= n; k++) {
    const term = nFact / factorialBigInt(k);
    partialSum = k % 2 === 0 ? partialSum + term : partialSum - term;
    const sign = k % 2 === 0 ? '+' : '-';
    terms.push(`${sign} \\frac{${formatBigInt(nFact)}}{${k}!}`);
    steps.push({
      label: `Term k = ${k}`,
      expression: `${sign} \\frac{${formatBigInt(nFact)}}{${k}!} = ${k % 2 === 0 ? '' : '-'}${formatBigInt(term)}`,
      result: formatBigInt(partialSum),
    });
  }

  return {
    problemType: 'derangement',
    answer: formatBigInt(answer),
    formula: '!n = n! \\sum_{k=0}^{n} \\frac{(-1)^k}{k!}',
    substitutedFormula: `!${n} = ${n}! \\left( ${terms.join(' ')} \\right)`,
    steps,
    explanation:
      'A derangement is a permutation where no element appears in its original position. The inclusion-exclusion formula subtracts invalid arrangements (fixed points) to count permutations with no object in its starting place.',
  };
}

export function validateDerangementInput(n: unknown): DerangementInput {
  if (typeof n !== 'number' || Number.isNaN(n)) {
    throw new MathValidationError('n must be a valid number.');
  }
  assertNonNegativeInteger(n, 'n');
  return { n };
}
