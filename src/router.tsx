import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Main Pages
import Home from './pages/Home';
import About from './pages/About';
import Research from './pages/Research';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

// Research Article Pages
import ClimateChange from './pages/insights/ClimateChange';
import GlobalHealth from './pages/insights/GlobalHealth';
import EconomicSystems from './pages/insights/EconomicSystems';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // Main Pages
      { index: true, element: <Home /> },
      { path: 'research', element: <Research /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'privacy', element: <Privacy /> },

      // Redirect /insights to /research (legacy URL support)
      { path: 'insights', element: <Navigate to="/research" replace /> },

      // Research Article Pages
      { path: 'insights/climate-change', element: <ClimateChange /> },
      { path: 'insights/global-health', element: <GlobalHealth /> },
      { path: 'insights/economic-systems', element: <EconomicSystems /> },

      // 404 - Catch all
      { path: '*', element: <NotFound /> },
    ],
  },
]);

