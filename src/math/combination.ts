import type { CalculationStep, CombinationInput, SolverResult } from '../types';
import {
  assertNonNegativeInteger,
  combinationBigInt,
  factorialBigInt,
  formatBigInt,
  MathValidationError,
} from './utils';

export function solveCombination(input: CombinationInput): SolverResult {
  const { n, r } = input;
  assertNonNegativeInteger(n, 'n');
  assertNonNegativeInteger(r, 'r');
  if (r > n) {
    throw new MathValidationError('r cannot exceed n for combinations.');
  }

  const answer = combinationBigInt(n, r);
  const nFactorial = factorialBigInt(n);
  const rFactorial = factorialBigInt(r);
  const nMinusRFactorial = factorialBigInt(n - r);
  const denominator = rFactorial * nMinusRFactorial;

  const steps: CalculationStep[] = [
    {
      label: 'Compute n!',
      expression: `${n}!`,
      result: formatBigInt(nFactorial),
    },
    {
      label: 'Compute r!',
      expression: `${r}!`,
      result: formatBigInt(rFactorial),
    },
    {
      label: 'Compute (n−r)!',
      expression: `${n - r}!`,
      result: formatBigInt(nMinusRFactorial),
    },
    {
      label: 'Compute r! × (n−r)!',
      expression: `${formatBigInt(rFactorial)} \\times ${formatBigInt(nMinusRFactorial)}`,
      result: formatBigInt(denominator),
    },
    {
      label: 'Divide n! by r!(n−r)!',
      expression: `${formatBigInt(nFactorial)} \\div ${formatBigInt(denominator)}`,
      result: formatBigInt(answer),
    },
  ];

  if (r === 0 || r === n) {
    steps.unshift({
      label: r === 0 ? 'Special case r = 0' : 'Special case r = n',
      expression: r === 0 ? 'nC0 = 1' : 'nCn = 1',
      result: '1',
    });
  }

  return {
    problemType: 'combination',
    answer: formatBigInt(answer),
    formula: 'nC_r = \\frac{n!}{r!(n-r)!}',
    substitutedFormula: `${n}C_{${r}} = \\frac{${n}!}{${r}!(${n}-${r})!}`,
    steps,
    explanation:
      'Combination counts unordered selections of r objects from n distinct objects. Order does not matter, so {A,B,C} and {C,B,A} are the same combination.',
  };
}

export function validateCombinationInput(n: unknown, r: unknown): CombinationInput {
  if (typeof n !== 'number' || Number.isNaN(n)) {
    throw new MathValidationError('n must be a valid number.');
  }
  if (typeof r !== 'number' || Number.isNaN(r)) {
    throw new MathValidationError('r must be a valid number.');
  }
  assertNonNegativeInteger(n, 'n');
  assertNonNegativeInteger(r, 'r');
  if (r > n) {
    throw new MathValidationError('r cannot exceed n for combinations.');
  }
  return { n, r };
}
