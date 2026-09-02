import { describe, expect, it } from 'vitest';
import { parseNaturalLanguage } from '../utils/naturalLanguage';

describe('parseNaturalLanguage', () => {
  it.each([
    ['Arrange 5 people in a row', { type: 'permutation', n: 5, r: 5, operation: 'nPr' }],
    ['How many ways can I arrange 7 objects taking 3 at a time?', { type: 'permutation', n: 7, r: 3, operation: 'nPr' }],
    ['How many permutations of 10 things taken 4 at a time?', { type: 'permutation', n: 10, r: 4, operation: 'nPr' }],
    ['Choose 4 students from 10', { type: 'combination', n: 10, r: 4, operation: 'nCr' }],
    ['How many ways can I select 3 people from 8?', { type: 'combination', n: 8, r: 3, operation: 'nCr' }],
    ['What is 6 factorial?', { type: 'factorial', n: 6, operation: 'factorial' }],
    ['6!', { type: 'factorial', n: 6, operation: 'factorial' }],
  ])('parses %s', (input, expected) => {
    expect(parseNaturalLanguage(input)).toMatchObject(expected);
    expect(parseNaturalLanguage(input).originalInput).toBe(input);
  });

  it.each(['', 'Explain prime numbers', 'Arrange people', 'Choose 3 people'])('returns unknown for unsupported input: %s', (input) => {
    expect(parseNaturalLanguage(input).type).toBe('unknown');
  });
});