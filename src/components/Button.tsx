import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'logOut';
  children: ReactNode;
}

const VARIANT_CLASSES = {
  primary:
    'bg-primary text-white hover:bg-primary-hover focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed',
  secondary:
    'border border-surface-border bg-surface-raised text-text hover:border-primary/50 hover:bg-primary/5',
  ghost: 'text-text-muted hover:bg-surface-raised hover:text-text',
  logOut: "block rounded-md px-3 py-2 text-sm font-medium transition-colors text-red-500 hover:bg-red-500/10 hover:text-red-500",
} as const;

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        VARIANT_CLASSES[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
