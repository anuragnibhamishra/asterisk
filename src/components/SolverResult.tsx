import { useEffect, useState } from 'react';
import type { CalculationStep, SolverResult as SolverResultType } from '../types';
import { Button } from './Button';
import { MathDisplay } from './MathDisplay';

const INITIAL_VISIBLE_STEPS = 5;

interface SolverResultProps {
  result: SolverResultType;
}

function StepItem({ step, index }: { step: CalculationStep; index: number }) {
  return (
    <li className="overflow-hidden rounded-lg border border-surface-border bg-surface p-4">
      <div className="flex min-w-0 items-start gap-3">
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 font-math text-xs font-semibold text-primary"
          aria-hidden="true"
        >
          {index + 1}
        </span>
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-sm font-medium text-text">{step.label}</p>
          <MathDisplay expression={step.expression} block />
          {step.result && (
            <div className="scroll-box font-math text-sm text-text-muted">
              <p className="whitespace-nowrap">
                = <span className="text-text">{step.result}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export function SolverResult({ result }: SolverResultProps) {
  const [showAllSteps, setShowAllSteps] = useState(false);
  const totalSteps = result.steps.length;
  const hasMoreSteps = totalSteps > INITIAL_VISIBLE_STEPS;
  const visibleSteps = showAllSteps
    ? result.steps
    : result.steps.slice(0, INITIAL_VISIBLE_STEPS);
  const hiddenCount = totalSteps - INITIAL_VISIBLE_STEPS;

  useEffect(() => {
    setShowAllSteps(false);
  }, [result.problemType, result.answer]);

  return (
    <div className="min-w-0 max-w-full space-y-6" aria-live="polite" aria-atomic="true">
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
        <p className="text-sm font-medium uppercase tracking-wide text-primary">Answer</p>
        <p className="mt-2 break-all font-math text-3xl font-semibold text-text sm:text-4xl">
          {result.answer}
        </p>
      </div>

      <section aria-labelledby="formula-heading" className="min-w-0">
        <h3 id="formula-heading" className="mb-2 text-sm font-medium text-text-muted">
          Formula
        </h3>
        <div className="scroll-box rounded-lg border border-surface-border bg-surface p-4">
          <MathDisplay expression={result.formula} block />
        </div>
      </section>

      <section aria-labelledby="substitution-heading" className="min-w-0">
        <h3 id="substitution-heading" className="mb-2 text-sm font-medium text-text-muted">
          Substitution
        </h3>
        <div className="scroll-box rounded-lg border border-surface-border bg-surface p-4">
          <MathDisplay expression={result.substitutedFormula} block />
        </div>
      </section>

      <section aria-labelledby="steps-heading" className="min-w-0">
        <h3 id="steps-heading" className="mb-3 text-sm font-medium text-text-muted">
          Step-by-step calculation
        </h3>
        <ol className="space-y-3">
          {visibleSteps.map((step, index) => (
            <StepItem key={`${step.label}-${index}`} step={step} index={index} />
          ))}
        </ol>

        {hasMoreSteps && (
          <div className="mt-3">
            <Button
              type="button"
              variant="secondary"
              className="w-full sm:w-auto"
              aria-expanded={showAllSteps}
              onClick={() => setShowAllSteps((prev) => !prev)}
            >
              {showAllSteps
                ? 'Show less'
                : `See more (${hiddenCount} more step${hiddenCount === 1 ? '' : 's'})`}
            </Button>
          </div>
        )}
      </section>

      <section aria-labelledby="explanation-heading">
        <h3 id="explanation-heading" className="mb-2 text-sm font-medium text-text-muted">
          Explanation
        </h3>
        <p className="leading-relaxed text-text-muted">{result.explanation}</p>
      </section>
    </div>
  );
}
