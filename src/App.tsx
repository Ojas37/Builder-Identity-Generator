import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import { GeneratorProvider } from './context/GeneratorContext';
import { GlobalLayout } from './components/layout/GlobalLayout';
import { Home } from './pages/Home';
import { FramePage } from './pages/FramePage';
import { BuilderPage } from './pages/BuilderPage';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <GeneratorProvider>
      <Router>
        <GlobalLayout>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.FRAME} element={<FramePage />} />
            <Route path={ROUTES.BUILDER} element={<BuilderPage />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          </Routes>
        </GlobalLayout>
      </Router>
    </GeneratorProvider>
  );
}

export default App;
