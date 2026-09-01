import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import {
  AuthMessage,
  AuthShell,
  authInputClassName,
  authLabelClassName,
  authSubmitClassName,
} from '@/components/AuthShell';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setSuccess('Password reset link sent. Check your email to continue.');
    setLoading(false);
  };

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your email and we will send you a reset link"
      footer={
        <Link to="/login" className="text-sm text-text-muted transition-colors hover:text-primary">
          ← Back to sign in
        </Link>
      }
    >
      {error && <AuthMessage type="error" message={error} />}
      {success && <AuthMessage type="success" message={success} />}

      <form onSubmit={handleReset} className="space-y-5">
        <div>
          <label htmlFor="reset-email" className={authLabelClassName}>
            Email
          </label>
          <input
            id="reset-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={authInputClassName}
          />
        </div>

        <button type="submit" disabled={loading} className={authSubmitClassName}>
          {loading ? 'Sending link...' : 'Send reset link'}
        </button>
      </form>
    </AuthShell>
  );
}
