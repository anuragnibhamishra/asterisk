import type {
  CalculationStep,
  PermutationIdenticalObjectsInput,
  SolverResult,
} from '../types';
import {
  assertNonNegativeInteger,
  factorialBigInt,
  formatBigInt,
  MathValidationError,
  productOfFactorials,
  sum,
} from './utils';

export function solvePermutationIdenticalObjects(
  input: PermutationIdenticalObjectsInput,
): SolverResult {
  const { frequencies } = input;

  if (!Array.isArray(frequencies) || frequencies.length === 0) {
    throw new MathValidationError('At least one frequency value is required.');
  }

  for (let i = 0; i < frequencies.length; i++) {
    assertNonNegativeInteger(frequencies[i], `frequency[${i}]`);
  }

  const n = sum(frequencies);
  assertNonNegativeInteger(n, 'n (total objects)');

  const numerator = factorialBigInt(n);
  const denominator = productOfFactorials(frequencies);
  const answer = denominator === 0n ? 0n : numerator / denominator;

  const freqValues = frequencies.map((f) => `${f}!`).join(' \\times ');

  const steps: CalculationStep[] = [
    {
      label: 'Sum frequencies to get n',
      expression: frequencies.join(' + ') + ` = ${n}`,
      result: String(n),
    },
    {
      label: 'Compute n!',
      expression: `${n}!`,
      result: formatBigInt(numerator),
    },
  ];

  for (let i = 0; i < frequencies.length; i++) {
    if (frequencies[i] > 0) {
      steps.push({
        label: `Compute n_{${i + 1}}!`,
        expression: `${frequencies[i]}!`,
        result: formatBigInt(factorialBigInt(frequencies[i])),
      });
    }
  }

  steps.push({
    label: 'Divide by product of factorials',
    expression: `${formatBigInt(numerator)} \\div ${formatBigInt(denominator)}`,
    result: formatBigInt(answer),
  });

  return {
    problemType: 'permutation-identical-objects',
    answer: formatBigInt(answer),
    formula: '\\frac{n!}{n_1! \\times n_2! \\times \\cdots \\times n_k!}',
    substitutedFormula: `\\frac{${n}!}{${freqValues}}`,
    steps,
    explanation:
      'When some objects are identical, divide the total permutations n! by the factorial of each group size. Swapping identical objects does not produce a new distinct arrangement.',
  };
}

export function validatePermutationIdenticalObjectsInput(
  frequencies: unknown,
): PermutationIdenticalObjectsInput {
  if (!Array.isArray(frequencies) || frequencies.length === 0) {
    throw new MathValidationError('At least one frequency value is required.');
  }

  const parsed = frequencies.map((f, i) => {
    if (typeof f !== 'number' || Number.isNaN(f)) {
      throw new MathValidationError(`frequency[${i}] must be a valid number.`);
    }
    assertNonNegativeInteger(f, `frequency[${i}]`);
    return f;
  });

  return { frequencies: parsed };
}

export function parseFrequenciesString(value: string): number[] {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new MathValidationError('Enter at least one frequency (e.g. 2, 3, 1).');
  }

  const parts = trimmed.split(/[,;\s]+/).filter(Boolean);
  if (parts.length === 0) {
    throw new MathValidationError('Enter at least one frequency (e.g. 2, 3, 1).');
  }

  return parts.map((part, i) => {
    const num = Number(part);
    if (Number.isNaN(num)) {
      throw new MathValidationError(`Invalid frequency at position ${i + 1}: "${part}".`);
    }
    assertNonNegativeInteger(num, `frequency[${i}]`);
    return num;
  });
}
