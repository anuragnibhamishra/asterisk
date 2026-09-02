import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { AuthLeft } from '@/components/AuthLeft';

export function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      navigate('/', { replace: true });
      return;
    }

    setSuccess('Account created. Check your email to confirm your account, then sign in.');
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setError('');
    setSuccess('');

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
    <div className='w-screen min-h-screen bg-surface flex'>
      <AuthLeft />
      <div className='w-full lg:w-1/2 flex items-center justify-center h-full'>
        <AuthShell
          title="Create your account"
          subtitle="Sign up to start using Asterisk"
          footer={
            <p className="text-sm text-text-muted">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-text transition-colors hover:text-primary">
                Sign in
              </Link>
            </p>
          }
        >
          <GoogleAuthButton onClick={handleGoogleSignup} label="Sign up with Google" />

          <AuthDivider />

          {error && <AuthMessage type="error" message={error} />}
          {success && <AuthMessage type="success" message={success} />}

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label htmlFor="signup-email" className={authLabelClassName}>
                Email
              </label>
              <input
                id="signup-email"
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
              <label htmlFor="signup-password" className={authLabelClassName}>
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className={authInputClassName}
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className={authLabelClassName}>
                Confirm password
              </label>
              <input
                id="confirm-password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat your password"
                className={authInputClassName}
              />
            </div>

            <button type="submit" disabled={loading} className={authSubmitClassName}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </AuthShell>
      </div>
    </div>
  );
}
