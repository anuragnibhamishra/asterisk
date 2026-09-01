export type ProblemType =
  | 'factorial'
  | 'permutation'
  | 'combination'
  | 'permutation-with-repetition'
  | 'combination-with-repetition'
  | 'circular-permutation'
  | 'permutation-identical-objects'
  | 'derangement';

export interface CalculationStep {
  label: string;
  expression: string;
  result?: string;
}

export interface SolverResult {
  problemType: ProblemType;
  answer: string;
  formula: string;
  substitutedFormula: string;
  steps: CalculationStep[];
  explanation: string;
}

export interface SolverError {
  message: string;
  field?: string;
}

export type SolverResponse = SolverResult | SolverError;

export function isSolverError(response: SolverResponse): response is SolverError {
  return 'message' in response && !('answer' in response);
}

export interface FactorialInput {
  n: number;
}

export interface PermutationInput {
  n: number;
  r: number;
}

export interface CombinationInput {
  n: number;
  r: number;
}

export interface PermutationWithRepetitionInput {
  n: number;
  r: number;
}

export interface CombinationWithRepetitionInput {
  n: number;
  r: number;
}

export interface CircularPermutationInput {
  n: number;
}

export interface PermutationIdenticalObjectsInput {
  frequencies: number[];
}

export interface DerangementInput {
  n: number;
}

export interface ProblemTypeConfig {
  id: ProblemType;
  label: string;
  description: string;
  fields: ProblemField[];
}

export interface ProblemField {
  name: string;
  label: string;
  type: 'number' | 'frequencies';
  min?: number;
  placeholder?: string;
  hint?: string;
}

export interface NaturalLanguageInput {
  text: string;
}

export interface ParsedProblemPlaceholder {
  status: 'not-implemented';
  message: string;
}
