import { MathDisplay } from '../components/MathDisplay';
import { PROBLEM_TYPES } from '../utils/problemTypes';

const FORMULA_LATEX: Record<string, string> = {
  factorial: 'n! = n \\times (n-1) \\times \\cdots \\times 1, \\quad 0! = 1',
  permutation: 'nP_r = \\frac{n!}{(n-r)!}',
  combination: 'nC_r = \\frac{n!}{r!(n-r)!}',
  'permutation-with-repetition': 'n^r',
  'combination-with-repetition':
    '\\binom{n+r-1}{r} = \\frac{(n+r-1)!}{r!(n-1)!}',
  'circular-permutation': '(n-1)!',
  'permutation-identical-objects':
    '\\frac{n!}{n_1! \\times n_2! \\times \\cdots \\times n_k!}',
  derangement: '!n = n! \\sum_{k=0}^{n} \\frac{(-1)^k}{k!}',
};

export function FormulasPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-text">Formulas</h1>
        <p className="mt-2 max-w-2xl text-text-muted">
          Reference for every combinatorial formula supported by Asterisk.
        </p>
      </header>

      <div className="space-y-4">
        {PROBLEM_TYPES.map((type) => (
          <article
            key={type.id}
            className="rounded-xl border border-surface-border bg-surface-raised p-5 sm:p-6"
          >
            <h2 className="text-lg font-semibold text-text">{type.label}</h2>
            <p className="mt-1 text-sm text-text-muted">{type.description}</p>
            <div className="mt-4 rounded-lg border border-surface-border bg-surface p-4">
              <MathDisplay expression={FORMULA_LATEX[type.id] ?? ''} block />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
