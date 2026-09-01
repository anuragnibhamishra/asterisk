import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Layout } from '../components/Layout';

describe('Layout mobile navigation', () => {
  it('shows a menu toggle and reveals the mobile navigation when clicked', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
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
