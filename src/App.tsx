import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import { GeneratorProvider } from './context/GeneratorContext';
import { GlobalLayout } from './components/layout/GlobalLayout';
import { Home } from './pages/Home';
import { LoadingSkeleton } from './components/ui/LoadingSkeleton';

const FramePage = lazy(() => import('./pages/FramePage').then(module => ({ default: module.FramePage })));
const BuilderPage = lazy(() => import('./pages/BuilderPage').then(module => ({ default: module.BuilderPage })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));

function App() {
  return (
    <GeneratorProvider>
      <Router>
        <GlobalLayout>
          <Suspense
            fallback={
              <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 gap-4 max-w-md mx-auto">
                <LoadingSkeleton className="w-16 h-16 rounded-full" />
                <LoadingSkeleton className="h-4 w-32 rounded-lg" />
                <LoadingSkeleton className="h-3 w-48 rounded-lg" />
              </div>
            }
          >
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.FRAME} element={<FramePage />} />
              <Route path={ROUTES.BUILDER} element={<BuilderPage />} />
              <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            </Routes>
          </Suspense>
        </GlobalLayout>
      </Router>
    </GeneratorProvider>
  );
}

export default App;
