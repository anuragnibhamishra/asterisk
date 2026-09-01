import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, description, children, className = '' }: CardProps) {
  return (
    <section
      className={[
        'rounded-xl border border-surface-border bg-surface-raised p-5 sm:p-6',
        className,
      ].join(' ')}
    >
      {(title || description) && (
        <header className="mb-4">
          {title && <h2 className="text-lg font-semibold text-text">{title}</h2>}
          {description && (
            <p className="mt-1 text-sm text-text-muted">{description}</p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
