import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import {
  AuthDivider,
  AuthMessage,
  AuthShell,
  GoogleAuthButton,
  authInputClassName,
  authLabelClassName,
  authSubmitClassName,
} from '@/components/AuthShell';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    navigate(from, { replace: true });
  };

  const handleGoogleLogin = async () => {
    setError('');

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (oauthError) {
      setError(oauthError.message);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue to Asterisk"
      footer={
        <p className="text-sm text-text-muted">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-medium text-text transition-colors hover:text-primary">
            Create account
          </Link>
        </p>
      }
    >
      <GoogleAuthButton onClick={handleGoogleLogin} />

      <AuthDivider />

      {error && <AuthMessage type="error" message={error} />}

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label htmlFor="email" className={authLabelClassName}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={authInputClassName}
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-text">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-text-muted transition-colors hover:text-primary"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={authInputClassName}
          />
        </div>

        <button type="submit" disabled={loading} className={authSubmitClassName}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </AuthShell>
  );
}
