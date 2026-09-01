import { Link } from 'react-router-dom';
import { MathDisplay } from '../components/MathDisplay';

interface Example {
  title: string;
  problem: string;
  type: string;
  values: string;
  formula: string;
  answer: string;
  explanation: string;
}

const EXAMPLES: Example[] = [
  {
    title: 'Arranging books',
    problem: 'In how many ways can 5 distinct books be arranged on a shelf?',
    type: 'Factorial',
    values: 'n = 5',
    formula: '5! = 5 \\times 4 \\times 3 \\times 2 \\times 1',
    answer: '120',
    explanation: 'Every distinct ordering of 5 unique books is counted by 5!.',
  },
  {
    title: 'Podium finish',
    problem: 'From 10 runners, how many ways can gold, silver, and bronze be awarded?',
    type: 'Permutation (nPr)',
    values: 'n = 10, r = 3',
    formula: '10P_3 = \\frac{10!}{7!} = 10 \\times 9 \\times 8',
    answer: '720',
    explanation: 'Medal positions are ordered — 1st, 2nd, and 3rd are distinct.',
  },
  {
    title: 'Committee selection',
    problem: 'How many 3-person committees can be formed from 10 people?',
    type: 'Combination (nCr)',
    values: 'n = 10, r = 3',
    formula: '10C_3 = \\frac{10!}{3! \\times 7!}',
    answer: '120',
    explanation: 'Committee members are unordered — {A,B,C} equals {C,B,A}.',
  },
  {
    title: 'PIN codes',
    problem: 'How many 4-digit PINs using digits 0–9 (repetition allowed)?',
    type: 'Permutation with Repetition',
    values: 'n = 10, r = 4',
    formula: '10^4',
    answer: '10,000',
    explanation: 'Each of 4 positions has 10 independent choices.',
  },
  {
    title: 'Choosing donuts',
    problem: 'Pick 3 donuts from 5 flavors (unlimited of each). How many selections?',
    type: 'Combination with Repetition',
    values: 'n = 5, r = 3',
    formula: '\\binom{5+3-1}{3} = \\binom{7}{3}',
    answer: '35',
    explanation: 'Stars-and-bars: unordered selection with unlimited copies per type.',
  },
  {
    title: 'Round table seating',
    problem: 'Six people sit around a circular table. How many distinct seatings?',
    type: 'Circular Permutation',
    values: 'n = 6',
    formula: '(6-1)! = 5!',
    answer: '120',
    explanation: 'Fix one person to break rotational symmetry; arrange the rest.',
  },
  {
    title: 'MISSISSIPPI',
    problem: 'How many distinct arrangements of the letters in MISSISSIPPI?',
    type: 'Permutation with Identical Objects',
    values: 'frequencies: 1, 4, 4, 2 (M, I, S, P)',
    formula: '\\frac{11!}{1! \\times 4! \\times 4! \\times 2!}',
    answer: '34,650',
    explanation: 'Divide total permutations by factorials of identical letter counts.',
  },
  {
    title: 'Secret Santa mismatch',
    problem: 'Four people swap gifts so nobody gets their own. How many valid assignments?',
    type: 'Derangement',
    values: 'n = 4',
    formula: '!4 = 4! \\left(1 - 1 + \\frac{1}{2!} - \\frac{1}{3!} + \\frac{1}{4!}\\right)',
    answer: '9',
    explanation: 'Inclusion-exclusion removes permutations with fixed points.',
  },
];

export function ExamplesPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-text">Examples</h1>
        <p className="mt-2 max-w-2xl text-text-muted">
          Worked problems showing when each formula applies. Try them in the{' '}
          <Link to="/solver" className="text-primary hover:underline">
            Solver
          </Link>
          .
        </p>
      </header>

      <div className="space-y-6">
        {EXAMPLES.map((example) => (
          <article
            key={example.title}
            className="rounded-xl border border-surface-border bg-surface-raised p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h2 className="text-lg font-semibold text-text">{example.title}</h2>
              <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                {example.type}
              </span>
            </div>

            <p className="mt-3 text-text-muted">{example.problem}</p>

            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Values
                </dt>
                <dd className="mt-1 font-math text-sm text-text">{example.values}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Answer
                </dt>
                <dd className="mt-1 font-math text-lg font-semibold text-primary">
                  {example.answer}
                </dd>
              </div>
            </dl>

            <div className="mt-4 rounded-lg border border-surface-border bg-surface p-4">
              <MathDisplay expression={example.formula} block />
            </div>

            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              {example.explanation}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
