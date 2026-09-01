import type { ProblemType, SolverResponse } from '../types';
import { MathValidationError } from './utils';
import { solveFactorial, validateFactorialInput } from './factorial';
import { solvePermutation, validatePermutationInput } from './permutation';
import { solveCombination, validateCombinationInput } from './combination';
import {
  solvePermutationWithRepetition,
  validatePermutationWithRepetitionInput,
} from './permutationWithRepetition';
import {
  solveCombinationWithRepetition,
  validateCombinationWithRepetitionInput,
} from './combinationWithRepetition';
import {
  solveCircularPermutation,
  validateCircularPermutationInput,
} from './circularPermutation';
import {
  parseFrequenciesString,
  solvePermutationIdenticalObjects,
  validatePermutationIdenticalObjectsInput,
} from './permutationIdenticalObjects';
import { solveDerangement, validateDerangementInput } from './derangement';

export { MathValidationError } from './utils';
export { solveFactorial } from './factorial';
export { solvePermutation } from './permutation';
export { solveCombination } from './combination';
export { solvePermutationWithRepetition } from './permutationWithRepetition';
export { solveCombinationWithRepetition } from './combinationWithRepetition';
export { solveCircularPermutation } from './circularPermutation';
export { solvePermutationIdenticalObjects } from './permutationIdenticalObjects';
export { solveDerangement } from './derangement';

export interface SolverFieldValues {
  n?: string;
  r?: string;
  frequencies?: string;
}

export function solve(problemType: ProblemType, values: SolverFieldValues): SolverResponse {
  try {
    switch (problemType) {
      case 'factorial': {
        const input = validateFactorialInput(parseIntField(values.n, 'n'));
        return solveFactorial(input);
      }
      case 'permutation': {
        const input = validatePermutationInput(
          parseIntField(values.n, 'n'),
          parseIntField(values.r, 'r'),
        );
        return solvePermutation(input);
      }
      case 'combination': {
        const input = validateCombinationInput(
          parseIntField(values.n, 'n'),
          parseIntField(values.r, 'r'),
        );
        return solveCombination(input);
      }
      case 'permutation-with-repetition': {
        const input = validatePermutationWithRepetitionInput(
          parseIntField(values.n, 'n'),
          parseIntField(values.r, 'r'),
        );
        return solvePermutationWithRepetition(input);
      }
      case 'combination-with-repetition': {
        const input = validateCombinationWithRepetitionInput(
          parseIntField(values.n, 'n'),
          parseIntField(values.r, 'r'),
        );
        return solveCombinationWithRepetition(input);
      }
      case 'circular-permutation': {
        const input = validateCircularPermutationInput(parseIntField(values.n, 'n'));
        return solveCircularPermutation(input);
      }
      case 'permutation-identical-objects': {
        const frequencies = parseFrequenciesString(values.frequencies ?? '');
        const input = validatePermutationIdenticalObjectsInput(frequencies);
        return solvePermutationIdenticalObjects(input);
      }
      case 'derangement': {
        const input = validateDerangementInput(parseIntField(values.n, 'n'));
        return solveDerangement(input);
      }
      default: {
        const _exhaustive: never = problemType;
        return { message: `Unknown problem type: ${_exhaustive}` };
      }
    }
  } catch (error) {
    if (error instanceof MathValidationError) {
      return { message: error.message };
    }
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: 'An unexpected error occurred.' };
  }
}

function parseIntField(value: string | undefined, name: string): number {
  if (value === undefined || value.trim() === '') {
    throw new MathValidationError(`${name} is required.`);
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new MathValidationError(`${name} must be a valid number.`);
  }
  return parsed;
}
