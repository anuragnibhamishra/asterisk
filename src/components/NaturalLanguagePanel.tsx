import { useState } from 'react';
import type { ParsedProblem } from '../types';
import { parseNaturalLanguage } from '../utils/naturalLanguage';
import { Button } from './Button';
import { Card } from './Card';

interface NaturalLanguagePanelProps {
  onParsed: (problem: ParsedProblem) => void;
}

export function NaturalLanguagePanel({ onParsed }: NaturalLanguagePanelProps) {
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = parseNaturalLanguage({ text });
    if (response.type === 'unknown') {
      setFeedback('I could not identify a supported permutation, combination, or factorial problem.');
      return;
    }
    onParsed(response);
    setFeedback(`Parsed as ${response.operation}: n = ${response.n}${response.r === undefined ? '' : `, r = ${response.r}`}`);
  }

  return (
    <Card
      title="Natural language input"
      description="Describe a permutation, combination, or factorial problem in plain English."
      className="border-dashed border-surface-border/80"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nl-input" className="sr-only">
            Describe your combinatorics problem
          </label>
          <textarea
            id="nl-input"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setFeedback(null);
            }}
            placeholder='e.g. "How many ways can I arrange 5 books on a shelf?"'
            rows={3}
            className="w-full resize-y rounded-lg border border-surface-border bg-surface px-3 py-2.5 text-sm text-text placeholder:text-text-muted/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            aria-describedby="nl-input-note"
          />
          <p id="nl-input-note" className="mt-1.5 text-xs text-text-muted">
            Your input is parsed locally and sent to the existing solver.
          </p>
        </div>

        <Button type="submit" variant="secondary" disabled={!text.trim()}>
          Parse problem
        </Button>

        {feedback && (
          <p className="rounded-lg border border-surface-border bg-surface px-4 py-3 text-sm text-text-muted" role="status">
            {feedback}
          </p>
        )}
      </form>
    </Card>
  );
}
