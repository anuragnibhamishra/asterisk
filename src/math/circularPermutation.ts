import type { CalculationStep, CircularPermutationInput, SolverResult } from '../types';
import { factorialBigInt, formatBigInt, MathValidationError } from './utils';

export function solveCircularPermutation(input: CircularPermutationInput): SolverResult {
  const { n } = input;

  if (!Number.isInteger(n) || Number.isNaN(n)) {
    throw new MathValidationError('n must be an integer.');
  }
  if (n < 1) {
    throw new MathValidationError('n must be at least 1 for circular permutations.');
  }

  const exponent = n - 1;
  const answer = factorialBigInt(exponent);

  const steps: CalculationStep[] = [
    {
      label: 'Apply circular permutation formula',
      expression: `(${n} - 1)! = ${exponent}!`,
    },
  ];

  if (exponent === 0) {
    steps.push({
      label: 'Base case',
      expression: '0! = 1',
      result: '1',
    });
  } else {
    let partial = 1n;
    const factors: string[] = [];
    for (let i = exponent; i >= 1; i--) {
      partial *= BigInt(i);
      factors.push(String(i));
      steps.push({
        label: i === exponent ? 'Expand factorial' : `Multiply by ${i}`,
        expression: factors.join(' \\times '),
        result: formatBigInt(partial),
      });
    }
  }

  return {
    problemType: 'circular-permutation',
    answer: formatBigInt(answer),
    formula: '(n-1)!',
    substitutedFormula: `(${n} - 1)! = ${exponent}!`,
    steps,
    explanation:
      'Circular permutation counts distinct arrangements of n distinct objects around a fixed circle. Rotations of the same arrangement are considered identical, fixing one object reduces the problem to arranging the remaining n−1 objects: (n−1)!.',
  };
}

export function validateCircularPermutationInput(n: unknown): CircularPermutationInput {
  if (typeof n !== 'number' || Number.isNaN(n)) {
    throw new MathValidationError('n must be a valid number.');
  }
  if (!Number.isInteger(n)) {
    throw new MathValidationError('n must be an integer.');
  }
  if (n < 1) {
    throw new MathValidationError('n must be at least 1 for circular permutations.');
  }
  return { n };
}
