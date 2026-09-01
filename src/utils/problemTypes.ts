import type { ProblemTypeConfig } from '../types';

export const PROBLEM_TYPES: ProblemTypeConfig[] = [
  {
    id: 'factorial',
    label: 'Factorial',
    description: 'Compute n! — the number of ways to arrange n distinct objects.',
    fields: [
      { name: 'n', label: 'n', type: 'number', min: 0, placeholder: '5', hint: 'Non-negative integer' },
    ],
  },
  {
    id: 'permutation',
    label: 'Permutation (nPr)',
    description: 'Ordered arrangements of r objects from n distinct objects.',
    fields: [
      { name: 'n', label: 'n', type: 'number', min: 0, placeholder: '10', hint: 'Total objects' },
      { name: 'r', label: 'r', type: 'number', min: 0, placeholder: '3', hint: 'Objects to arrange (r ≤ n)' },
    ],
  },
  {
    id: 'combination',
    label: 'Combination (nCr)',
    description: 'Unordered selections of r objects from n distinct objects.',
    fields: [
      { name: 'n', label: 'n', type: 'number', min: 0, placeholder: '10', hint: 'Total objects' },
      { name: 'r', label: 'r', type: 'number', min: 0, placeholder: '3', hint: 'Objects to select (r ≤ n)' },
    ],
  },
  {
    id: 'permutation-with-repetition',
    label: 'Permutation with Repetition',
    description: 'Ordered arrangements of length r using n types with unlimited reuse.',
    fields: [
      { name: 'n', label: 'n', type: 'number', min: 0, placeholder: '4', hint: 'Number of types/choices' },
      { name: 'r', label: 'r', type: 'number', min: 0, placeholder: '3', hint: 'Length of arrangement' },
    ],
  },
  {
    id: 'combination-with-repetition',
    label: 'Combination with Repetition',
    description: 'Unordered selections of r items from n types with unlimited copies.',
    fields: [
      { name: 'n', label: 'n', type: 'number', min: 0, placeholder: '4', hint: 'Number of types' },
      { name: 'r', label: 'r', type: 'number', min: 0, placeholder: '3', hint: 'Items to select' },
    ],
  },
  {
    id: 'circular-permutation',
    label: 'Circular Permutation',
    description: 'Distinct arrangements of n objects around a circle (rotations equivalent).',
    fields: [
      { name: 'n', label: 'n', type: 'number', min: 1, placeholder: '5', hint: 'Positive integer (n ≥ 1)' },
    ],
  },
  {
    id: 'permutation-identical-objects',
    label: 'Permutation with Identical Objects',
    description: 'Arrangements of n objects where some groups are identical.',
    fields: [
      {
        name: 'frequencies',
        label: 'Group frequencies',
        type: 'frequencies',
        placeholder: '2, 3, 1',
        hint: 'Comma-separated counts (e.g. 2, 3, 1 for n = 6)',
      },
    ],
  },
  {
    id: 'derangement',
    label: 'Derangement',
    description: 'Permutations where no element stays in its original position.',
    fields: [
      { name: 'n', label: 'n', type: 'number', min: 0, placeholder: '5', hint: 'Non-negative integer' },
    ],
  },
];

export function getProblemTypeConfig(id: string): ProblemTypeConfig | undefined {
  return PROBLEM_TYPES.find((p) => p.id === id);
}
