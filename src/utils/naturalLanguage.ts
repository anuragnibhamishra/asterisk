import type { NaturalLanguageInput, ParsedProblem } from '../types';

const NUMBER = '(\\d+)';
const NUMBER_PATTERN = /\d+/g;

function normalize(text: string) {
  return text.toLowerCase().replace(/[?,.;:]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function unknown(originalInput: string): ParsedProblem {
  return { type: 'unknown', originalInput, confidence: 0 };
}

/** Deterministically maps common combinatorics wording to the existing solver contract. */
export function parseNaturalLanguage(input: NaturalLanguageInput | string): ParsedProblem {
  const originalInput = typeof input === 'string' ? input : input?.text ?? '';
  const normalized = normalize(originalInput);
  if (!normalized) return unknown(originalInput);

  const values = normalized.match(NUMBER_PATTERN)?.map(Number) ?? [];
  const notation = normalized.match(new RegExp(`\\b${NUMBER}\\s*(pr|p|cr|c)\\s*${NUMBER}\\b`));
  if (notation) {
    const n = Number(notation[1]);
    const r = Number(notation[3]);
    const isPermutation = notation[2] === 'pr' || notation[2] === 'p';
    return { type: isPermutation ? 'permutation' : 'combination', n, r, operation: isPermutation ? 'nPr' : 'nCr', originalInput, confidence: 1 };
  }

  const factorial = normalized.match(new RegExp(`\\b${NUMBER}\\s*(?:factorial|!)`));
  if (factorial) {
    return { type: 'factorial', n: Number(factorial[1]), operation: 'factorial', originalInput, confidence: 1 };
  }

  const hasPermutationIntent = /\b(permutation|permutations|arrange|arrangement|arrangements|order|ordering)\b/.test(normalized);
  const hasCombinationIntent = /\b(combination|combinations|choose|select|selection|selections|committee)\b/.test(normalized);
  if (hasPermutationIntent && !hasCombinationIntent && values.length > 0) {
    const taking = normalized.match(new RegExp(`(?:taking|taken)\\s+${NUMBER}`));
    const n = values[0];
    const r = taking ? Number(taking[1]) : n;
    return { type: 'permutation', n, r, operation: 'nPr', originalInput, confidence: taking ? 0.98 : 0.95 };
  }
  if (hasCombinationIntent && values.length >= 2) {
    const selected = normalized.match(new RegExp(`(?:choose|select|selecting|pick)\\s+${NUMBER}`));
    const r = selected ? Number(selected[1]) : values[0];
    const n = values.find((value) => value !== r) ?? values[1];
    return { type: 'combination', n, r, operation: 'nCr', originalInput, confidence: 0.96 };
  }

  if (/\bfactorial\b/.test(normalized) && values.length === 1) {
    return { type: 'factorial', n: values[0], operation: 'factorial', originalInput, confidence: 0.98 };
  }
  return unknown(originalInput);
}
