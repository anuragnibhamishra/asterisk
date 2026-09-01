import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { Layout } from '../components/Layout';

const mockUseAuth = vi.fn();

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

describe('Layout mobile navigation', () => {
  it('shows a menu toggle and reveals the mobile navigation when clicked', () => {
    mockUseAuth.mockReturnValue({
      session: { user: { id: '1', email: 'test@example.com' } },
      loading: false,
      signOut: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );

    const toggleButton = screen.getByRole('button', { name: /toggle navigation/i });
    expect(toggleButton).toBeInTheDocument();

    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument();

    fireEvent.click(toggleButton);

    const mobileNav = screen.getByRole('navigation', { name: /mobile navigation/i });
    expect(mobileNav).toBeInTheDocument();
    expect(within(mobileNav).getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });
});
