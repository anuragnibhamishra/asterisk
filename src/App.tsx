import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { SolverPage } from './pages/SolverPage';
import { FormulasPage } from './pages/FormulasPage';
import { ExamplesPage } from './pages/ExamplesPage';
// import { PascalTrianglePage } from './pages/PascalTrianglePage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="solver" element={<SolverPage />} />
        <Route path="formulas" element={<FormulasPage />} />
        <Route path="examples" element={<ExamplesPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}
