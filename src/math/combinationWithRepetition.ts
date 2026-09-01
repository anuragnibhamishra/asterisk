import type { CalculationStep, CombinationWithRepetitionInput, SolverResult } from '../types';
import {
  assertNonNegativeInteger,
  combinationBigInt,
  factorialBigInt,
  formatBigInt,
  MathValidationError,
} from './utils';

export function solveCombinationWithRepetition(
  input: CombinationWithRepetitionInput,
): SolverResult {
  const { n, r } = input;
  assertNonNegativeInteger(n, 'n');
  assertNonNegativeInteger(r, 'r');

  if (n === 0 && r > 0) {
    throw new MathValidationError(
      'When n = 0, r must be 0 (cannot select items from zero types).',
    );
  }

  if (r === 0) {
    return {
      problemType: 'combination-with-repetition',
      answer: '1',
      formula: '\\binom{n+r-1}{r} = \\frac{(n+r-1)!}{r!(n-1)!}',
      substitutedFormula: `\\binom{${n}+${r}-1}{${r}} = 1`,
      steps: [
        {
          label: 'Special case r = 0',
          expression: 'Selecting 0 items: exactly 1 way (the empty selection)',
          result: '1',
        },
      ],
      explanation:
        'Combination with repetition counts unordered selections of r items from n types when items of the same type are indistinguishable and unlimited copies are available. Selecting nothing (r = 0) yields exactly one outcome.',
    };
  }

  if (n === 0) {
    throw new MathValidationError(
      'When n = 0, r must be 0 (cannot select items from zero types).',
    );
  }

  const top = n + r - 1;
  const answer = combinationBigInt(top, r);
  const topFactorial = factorialBigInt(top);
  const rFactorial = factorialBigInt(r);
  const nMinus1Factorial = factorialBigInt(n - 1);
  const denominator = rFactorial * nMinus1Factorial;

  const steps: CalculationStep[] = [
    {
      label: 'Apply stars-and-bars: compute n + r − 1',
      expression: `${n} + ${r} - 1 = ${top}`,
      result: String(top),
    },
    {
      label: 'Compute (n+r−1)!',
      expression: `${top}!`,
      result: formatBigInt(topFactorial),
    },
    {
      label: 'Compute r!',
      expression: `${r}!`,
      result: formatBigInt(rFactorial),
    },
    {
      label: 'Compute (n−1)!',
      expression: `${n - 1}!`,
      result: formatBigInt(nMinus1Factorial),
    },
    {
      label: 'Divide (n+r−1)! by r!(n−1)!',
      expression: `${formatBigInt(topFactorial)} \\div ${formatBigInt(denominator)}`,
      result: formatBigInt(answer),
    },
  ];

  return {
    problemType: 'combination-with-repetition',
    answer: formatBigInt(answer),
    formula: '\\binom{n+r-1}{r} = \\frac{(n+r-1)!}{r!(n-1)!}',
    substitutedFormula: `\\binom{${n}+${r}-1}{${r}} = \\frac{${top}!}{${r}!(${n}-1)!}`,
    steps,
    explanation:
      'Combination with repetition (multiset coefficient) counts ways to choose r items from n types when order does not matter and unlimited copies exist. The stars-and-bars formula maps this to a standard combination: C(n+r−1, r).',
  };
}

export function validateCombinationWithRepetitionInput(
  n: unknown,
  r: unknown,
): CombinationWithRepetitionInput {
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
      'When n = 0, r must be 0 (cannot select items from zero types).',
    );
  }
  return { n, r };
}
