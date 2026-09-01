import type { CalculationStep, FactorialInput, SolverResult } from '../types';
import {
  assertNonNegativeInteger,
  factorialBigInt,
  formatBigInt,
  MathValidationError,
} from './utils';

export function solveFactorial(input: FactorialInput): SolverResult {
  const { n } = input;
  assertNonNegativeInteger(n, 'n');

  const answer = factorialBigInt(n);
  const steps: CalculationStep[] = [];

  if (n === 0 || n === 1) {
    steps.push({
      label: 'Base case',
      expression: `${n}! = 1`,
      result: '1',
    });
  } else {
    const factors: string[] = [];
    let partial = 1n;
    for (let i = n; i >= 1; i--) {
      partial *= BigInt(i);
      factors.push(String(i));
      steps.push({
        label: i === n ? 'Expand factorial' : `Multiply by ${i}`,
        expression: factors.join(' \\times '),
        result: formatBigInt(partial),
      });
    }
  }

  return {
    problemType: 'factorial',
    answer: formatBigInt(answer),
    formula: 'n! = n \\times (n-1) \\times \\cdots \\times 1, \\quad 0! = 1',
    substitutedFormula: `${n}!`,
    steps,
    explanation:
      'Factorial counts the number of ways to arrange n distinct objects in a sequence. By convention, 0! is defined as 1 (the empty arrangement).',
  };
}

export function validateFactorialInput(n: unknown): FactorialInput {
  if (typeof n !== 'number' || Number.isNaN(n)) {
    throw new MathValidationError('n must be a valid number.');
  }
  assertNonNegativeInteger(n, 'n');
  return { n };
}
