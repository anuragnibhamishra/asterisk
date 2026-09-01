export function AboutPage() {
  return (
    <div className="mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-text">About Asterisk</h1>
        <p className="mt-2 text-text-muted">
          A production-grade combinatorics calculator built for mathematical correctness.
        </p>
      </header>

      <section className="space-y-4 text-text-muted leading-relaxed">
        <p>
          Asterisk solves permutation and combination problems with exact integer arithmetic.
          Every calculation runs in an isolated math engine using JavaScript{' '}
          <code className="font-math rounded bg-surface-raised px-1.5 py-0.5 text-sm text-text">
            BigInt
          </code>
          , so large factorials and binomial coefficients never lose precision to
          floating-point limits.
        </p>

        <p>
          Results include the general formula, a substituted instance with your values,
          step-by-step working, and a concise explanation of why that formula applies.
          The UI contains no mathematical logic — all computation lives in{' '}
          <code className="font-math rounded bg-surface-raised px-1.5 py-0.5 text-sm text-text">
            src/math/
          </code>
          .
        </p>
      </section>

      <section aria-labelledby="tech-heading">
        <h2 id="tech-heading" className="text-xl font-semibold text-text">
          Technology
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-text-muted">
          <li>React + TypeScript + Vite</li>
          <li>Tailwind CSS with Space Grotesk and JetBrains Mono</li>
          <li>KaTeX for mathematical notation</li>
          <li>Vitest for unit tests covering edge cases and large values</li>
        </ul>
      </section>

      <section aria-labelledby="design-heading">
        <h2 id="design-heading" className="text-xl font-semibold text-text">
          Design principles
        </h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-text-muted">
          <li>Mathematical correctness over shortcuts</li>
          <li>Strict separation between engine and presentation</li>
          <li>Accessible, keyboard-navigable interface</li>
          <li>Responsive layout from mobile to desktop</li>
          <li>No simulated or placeholder AI features in V1</li>
        </ul>
      </section>

      <section aria-labelledby="future-heading">
        <h2 id="future-heading" className="text-xl font-semibold text-text">
          Roadmap
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          The Solver page includes a natural-language input area structured for future
          NLP/LLM integration. A parser module can be added at{' '}
          <code className="font-math rounded bg-surface-raised px-1.5 py-0.5 text-text">
            src/utils/naturalLanguage.ts
          </code>{' '}
          without modifying the math engine.
        </p>
      </section>
    </div>
  );
}
