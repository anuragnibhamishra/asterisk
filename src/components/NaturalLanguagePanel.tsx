import { useState } from 'react';
import { parseNaturalLanguage } from '../utils/naturalLanguage';
import { Button } from './Button';
import { Card } from './Card';

/**
 * Foundation UI for future NLP/LLM integration.
 * Does not perform parsing in V1 — delegates to a stub interface.
 */
export function NaturalLanguagePanel() {
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = parseNaturalLanguage({ text });
    setFeedback(response.message);
  }

  return (
    <Card
      title="Natural language input"
      description="Describe a problem in plain English. Structured parsing will be available in a future release."
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
            Coming soon — input is saved locally only and not sent anywhere.
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
