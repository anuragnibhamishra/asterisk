import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/solver', label: 'Solver', end: false },
  { to: '/formulas', label: 'Formulas', end: false },
  { to: '/examples', label: 'Examples', end: false },
  { to: '/about', label: 'About', end: false },
] as const;

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    [
      'rounded-md px-3 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'bg-primary/15 text-primary'
        : 'text-text-muted hover:bg-surface-raised hover:text-text',
    ].join(' ');

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
            <span className="flex flex-col items-center gap-1 w-6 h-6 justify-center">
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
            </ul>
          </nav>
        </div>

        {isMenuOpen && (
          <div className=" sm:hidden">
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col bg-surface/95 w-full absolute left-0 top-18 px-6 items-end gap-2">
                {NAV_ITEMS.map(({ to, label, end }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={end}
                      onClick={() => setIsMenuOpen(false)}
                      className="font-medium w-full text-sm text-text-muted"
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
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
