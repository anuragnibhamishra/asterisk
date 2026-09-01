import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './Button';

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/solver', label: 'Solver', end: false },
  { to: '/formulas', label: 'Formulas', end: false },
  { to: '/examples', label: 'Examples', end: false },
  { to: '/about', label: 'About', end: false },
] as const;

export function Layout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    [
      'rounded-md px-3 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'bg-primary/15 text-primary'
        : 'text-text-muted hover:bg-surface-raised hover:text-text',
    ].join(' ');

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    navigate('/login', { replace: true });
    setSigningOut(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-surface-border bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold tracking-tight text-text transition-colors hover:text-primary"
            aria-label="Asterisk home"
          >
            Asterisk
          </Link>

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-md border border-surface-border bg-surface-raised p-2 text-text-muted transition-colors hover:text-text sm:hidden"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="flex h-6 w-6 flex-col items-center justify-center gap-1">
              <span className="block h-[1.6px] w-5 rounded-full bg-current" />
              <span className="block h-[1.6px] w-5 rounded-full bg-current" />
              <span className="block h-[1.6px] w-5 rounded-full bg-current" />
            </span>
          </button>

          <nav aria-label="Main navigation" className="hidden sm:block">
            <ul className="flex flex-wrap items-center gap-1 sm:gap-2">
              {NAV_ITEMS.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink to={to} end={end} className={navLinkClassName}>
                    {label}
                  </NavLink>
                </li>
              ))}
              <li className="ml-2 border-l border-surface-border pl-2">
                <div className="flex items-center gap-3">
                  {user?.email && (
                    <span className="max-w-[160px] truncate text-xs text-text-muted" title={user.email}>
                      {user.email}
                    </span>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    className="px-3 py-2 text-sm"
                    disabled={signingOut}
                    onClick={handleSignOut}
                  >
                    {signingOut ? 'Signing out...' : 'Sign out'}
                  </Button>
                </div>
              </li>
            </ul>
          </nav>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden">
            <nav aria-label="Mobile navigation">
              <ul className="absolute left-0 top-18 flex w-full flex-col items-end gap-2 bg-surface/95 px-6">
                {NAV_ITEMS.map(({ to, label, end }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={end}
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full text-sm font-medium text-text-muted"
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
                <li className="w-full border-t border-surface-border pt-2">
                  {user?.email && (
                    <p className="mb-2 truncate text-right text-xs text-text-muted">{user.email}</p>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full justify-end px-0 py-2 text-sm"
                    disabled={signingOut}
                    onClick={async () => {
                      setIsMenuOpen(false);
                      await handleSignOut();
                    }}
                  >
                    {signingOut ? 'Signing out...' : 'Sign out'}
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <Outlet />
      </main>

      <footer className="border-t border-surface-border py-6">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-text-muted sm:px-6">
          Asterisk — exact combinatorial computation with BigInt precision.
        </div>
      </footer>
    </div>
  );
}
