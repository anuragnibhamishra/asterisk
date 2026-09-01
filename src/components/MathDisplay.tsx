import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

interface MathDisplayProps {
  expression: string;
  block?: boolean;
  className?: string;
}

export function MathDisplay({ expression, block = false, className = '' }: MathDisplayProps) {
  const fallback = (
    <span className={`font-math text-text-muted ${className}`} aria-label="Mathematical expression">
      {expression}
    </span>
  );

  try {
    if (block) {
      return (
        <div className={`scroll-box ${className}`} role="math" aria-label={expression}>
          <BlockMath math={expression} errorColor="#f87171" renderError={() => fallback} />
        </div>
      );
    }
    return (
      <span className={className} role="math" aria-label={expression}>
        <InlineMath math={expression} errorColor="#f87171" renderError={() => fallback} />
      </span>
    );
  } catch {
    return fallback;
  }
}
