import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { GuestRoute } from '../components/GuestRoute';

const mockUseAuth = vi.fn();

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

function ProtectedPage() {
  return <div>Protected content</div>;
}

function LoginPageStub() {
  return <div>Login page</div>;
}

describe('ProtectedRoute', () => {
  it('redirects unauthenticated users to login', () => {
    mockUseAuth.mockReturnValue({ session: null, loading: false });

    render(
      <MemoryRouter initialEntries={['/solver']}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/solver" element={<ProtectedPage />} />
          </Route>
          <Route path="/login" element={<LoginPageStub />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Login page')).toBeInTheDocument();
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument();
  });

  it('renders protected content for authenticated users', () => {
    mockUseAuth.mockReturnValue({
      session: { user: { id: '1', email: 'test@example.com' } },
      loading: false,
    });

    render(
      <MemoryRouter initialEntries={['/solver']}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/solver" element={<ProtectedPage />} />
          </Route>
          <Route path="/login" element={<LoginPageStub />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Protected content')).toBeInTheDocument();
  });
});

describe('GuestRoute', () => {
  it('redirects authenticated users away from login', () => {
    mockUseAuth.mockReturnValue({
      session: { user: { id: '1', email: 'test@example.com' } },
      loading: false,
    });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<LoginPageStub />} />
          </Route>
          <Route path="/" element={<div>Home page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Home page')).toBeInTheDocument();
    expect(screen.queryByText('Login page')).not.toBeInTheDocument();
  });
});
