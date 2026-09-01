import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { PROBLEM_TYPES } from '../utils/problemTypes';
import asteriskLogo from '/src/assets/asteriskLogo.svg';

export function HomePage() {
  return (
    <div className="space-y-16">
      <section className="mx-auto max-w-3xl flex flex-col justify-center items-center  text-center">
        <img src={asteriskLogo} alt="" className='w-12' />
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-text sm:text-5xl">
          Asterisk
        </h1>
        <p className="mt-4 text-lg text-text-muted sm:text-xl">
          Advanced permutation &amp; combination solver with exact BigInt arithmetic and
          step-by-step explanations.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/solver">
            <Button>Open Solver</Button>
          </Link>
          <Link to="/formulas">
            <Button variant="secondary">View Formulas</Button>
          </Link>
        </div>
      </section>

      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">
          Features
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Exact precision',
              body: 'All calculations use BigInt — no floating-point rounding on large factorials.',
            },
            {
              title: 'Step-by-step',
              body: 'Every result includes formula, substitution, calculation steps, and explanation.',
            },
            {
              title: 'Eight problem types',
              body: 'From basic nCr and nPr to derangements, circular permutations, and identical objects.',
            },
          ].map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border border-surface-border bg-surface-raised p-5"
            >
              <h3 className="font-semibold text-text">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="supported-heading">
        <h2 id="supported-heading" className="mb-4 text-xl font-semibold text-text">
          Supported problem types
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {PROBLEM_TYPES.map((type) => (
            <li
              key={type.id}
              className="rounded-lg border border-surface-border bg-surface-raised px-4 py-3 text-sm"
            >
              <span className="font-medium text-text">{type.label}</span>
              <span className="mt-0.5 block text-text-muted">{type.description}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
