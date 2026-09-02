import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { ProblemType, SolverResponse } from '../types';
import { isSolverError } from '../types';
import { solve } from '../math';
import { PROBLEM_TYPES, getProblemTypeConfig } from '../utils/problemTypes';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { NaturalLanguagePanel } from '../components/NaturalLanguagePanel';
import { SolverResult } from '../components/SolverResult';
import { saveHistoryEntry } from '@/lib/history';

export function SolverPage() {
  const location = useLocation();
  const [problemType, setProblemType] = useState<ProblemType>('factorial');
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SolverResponse | null>(null);
  const [saveToHistory, setSaveToHistory] = useState(true);

  const config = getProblemTypeConfig(problemType);

  const handleTypeChange = useCallback((type: ProblemType) => {
    setProblemType(type);
    setValues({});
    setResult(null);
  }, []);

  const handleFieldChange = useCallback((name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setResult(null);
  }, []);

  const handleCalculate = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const response = solve(problemType, values);
      setResult(response);
      if (saveToHistory && !isSolverError(response)) {
        void saveHistoryEntry(problemType, values, response);
      }
    },
    [problemType, saveToHistory, values],
  );

  const reopenedResult = location.state?.historyResult as SolverResponse | undefined;

  const errorMessage = result && isSolverError(result) ? result.message : null;
  const successResult = result && !isSolverError(result) ? result : null;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-text">Solver</h1>
        <p className="mt-2 max-w-2xl text-text-muted">
          Select a problem type, enter values, and get an exact answer with full working.
        </p>
      </header>

      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="space-y-6">
          <Card title="Problem type">
            <fieldset>
              <legend className="sr-only">Select problem type</legend>
              <div className="space-y-2">
                {PROBLEM_TYPES.map((type) => (
                  <label
                    key={type.id}
                    className={[
                      'flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors',
                      problemType === type.id
                        ? 'border-primary/50 bg-primary/5'
                        : 'border-surface-border hover:border-primary/30',
                    ].join(' ')}
                  >
                    <input
                      type="radio"
                      name="problemType"
                      value={type.id}
                      checked={problemType === type.id}
                      onChange={() => handleTypeChange(type.id)}
                      className="mt-1 accent-primary"
                    />
                    <span>
                      <span className="block text-sm font-medium text-text">{type.label}</span>
                      <span className="mt-0.5 block text-xs text-text-muted">
                        {type.description}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </Card>

          <Card title="Values">
            <form onSubmit={handleCalculate} className="space-y-4">
              {config?.fields.map((field) =>
                field.type === 'frequencies' ? (
                  <div key={field.name} className="flex flex-col gap-1.5">
                    <label htmlFor={field.name} className="text-sm font-medium text-text">
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      type="text"
                      inputMode="text"
                      value={values[field.name] ?? ''}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      className="font-math rounded-lg border border-surface-border bg-surface px-3 py-2.5 text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      aria-describedby={`${field.name}-hint`}
                    />
                    {field.hint && (
                      <p id={`${field.name}-hint`} className="text-xs text-text-muted">
                        {field.hint}
                      </p>
                    )}
                  </div>
                ) : (
                  <Input
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type="number"
                    min={field.min}
                    step={1}
                    inputMode="numeric"
                    placeholder={field.placeholder}
                    hint={field.hint}
                    value={values[field.name] ?? ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  />
                ),
              )}

              <Button type="submit" className="w-full sm:w-auto">
                Calculate
              </Button>
              <label className="flex items-center gap-2 text-sm text-text-muted">
                <input
                  type="checkbox"
                  checked={saveToHistory}
                  onChange={(event) => setSaveToHistory(event.target.checked)}
                  className="accent-primary"
                />
                Save this calculation to history
              </label>
            </form>
          </Card>

          <NaturalLanguagePanel />
        </div>

        <div className="min-w-0">
          <Card title="Result" description={successResult ? undefined : 'Results appear here after calculation.'} className="min-w-0 overflow-hidden">
            {errorMessage && (
              <div
                className="rounded-lg border border-error/30 bg-error/5 px-4 py-3 text-sm text-error"
                role="alert"
              >
                {errorMessage}
              </div>
            )}
            {!errorMessage && !successResult && (
              <p className="text-sm text-text-muted">
                Choose a problem type and enter valid parameters to see the solution.
              </p>
            )}
            {(successResult ?? (reopenedResult && !isSolverError(reopenedResult) ? reopenedResult : null)) && (
              <SolverResult
                result={successResult ?? (reopenedResult as Exclude<SolverResponse, { message: string }>)}
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
