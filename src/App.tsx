import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { GuestRoute } from './components/GuestRoute';
import { RootRedirect } from './components/RootRedirect';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { SolverPage } from './pages/SolverPage';
import { FormulasPage } from './pages/FormulasPage';
import { ExamplesPage } from './pages/ExamplesPage';
import { AboutPage } from './pages/AboutPage';
import { PascalTrianglePage } from './pages/PascalTrianglePage';
import { HistoryPage } from './pages/HistoryPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

export default function App() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="solver" element={<SolverPage />} />
          <Route path="formulas" element={<FormulasPage />} />
          <Route path="examples" element={<ExamplesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="pascal-triangle" element={<PascalTrianglePage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>
      </Route>

      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
}
