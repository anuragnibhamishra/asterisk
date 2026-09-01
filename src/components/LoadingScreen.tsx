export function LoadingScreen() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-surface"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-3">
        <span
          className="h-8 w-8 animate-spin rounded-full border-2 border-surface-border border-t-primary"
          aria-hidden="true"
        />
        <p className="text-sm text-text-muted">Loading...</p>
      </div>
    </div>
  );
}
