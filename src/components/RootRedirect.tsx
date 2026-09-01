import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingScreen } from './LoadingScreen';

export function RootRedirect() {
  const { session, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return <Navigate to={session ? '/' : '/login'} replace />;
}
