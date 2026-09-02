
interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-transparent w-full px-4 text-text">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="mt-2 text-sm text-text-muted">{subtitle}</p>
        </div>

        <div className="rounded-2xl border border-surface-border bg-surface-raised p-6 sm:p-8">
          {children}
        </div>

        <div className="mt-6 text-center">{footer}</div>
      </div>
    </main>
  );
}

interface AuthMessageProps {
  type: 'error' | 'success';
  message: string;
}

export function AuthMessage({ type, message }: AuthMessageProps) {
  const styles =
    type === 'error'
      ? 'border-error/30 bg-error/10 text-error'
      : 'border-primary/30 bg-primary/10 text-primary';

  return (
    <div className={`mb-5 rounded-lg border px-4 py-3 text-sm ${styles}`} role="alert">
      {message}
    </div>
  );
}

export function GoogleAuthButton({
  onClick,
  label = 'Continue with Google',
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-surface-border bg-surface text-sm font-medium transition-colors hover:bg-surface-raised"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M21.35 12.23c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.95 2.94v2.45h3.15c1.85-1.7 2.91-4.2 2.91-7.42Z"
        />
        <path
          fill="#34A853"
          d="M12 21.96c2.64 0 4.86-.87 6.48-2.36l-3.15-2.45c-.87.58-1.98.92-3.33.92-2.56 0-4.73-1.73-5.51-4.05H3.23v2.53A9.79 9.79 0 0 0 12 21.96Z"
        />
        <path
          fill="#FBBC05"
          d="M6.49 14.02A5.88 5.88 0 0 1 6.18 12c0-.7.12-1.38.31-2.02V7.45H3.23A9.98 9.98 0 0 0 2 12c0 1.64.39 3.19 1.23 4.55l3.26-2.53Z"
        />
        <path
          fill="#EA4335"
          d="M12 5.93c1.44 0 2.73.5 3.75 1.49l2.81-2.81C16.85 2.98 14.64 2.04 12 2.04a9.79 9.79 0 0 0-8.77 5.41l3.26 2.53C7.27 7.66 9.44 5.93 12 5.93Z"
        />
      </svg>
      {label}
    </button>
  );
}

export function AuthDivider() {
  return (
    <div className="my-6 flex items-center gap-4">
      <div className="h-px flex-1 bg-surface-border" />
      <span className="text-xs text-text-muted">OR</span>
      <div className="h-px flex-1 bg-surface-border" />
    </div>
  );
}

export const authInputClassName =
  'h-11 w-full rounded-lg border border-surface-border bg-surface px-3 text-sm outline-none transition-colors placeholder:text-text-muted/60 focus:border-primary focus:ring-1 focus:ring-primary';

export const authLabelClassName = 'mb-2 block text-sm font-medium text-text';

export const authSubmitClassName =
  'h-11 w-full rounded-lg bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50';
