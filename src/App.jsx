import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProgressProvider } from './contexts/ProgressContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import WeekOverview from './pages/WeekOverview';
import ModuleViewer from './pages/ModuleViewer';
import Dashboard from './pages/Dashboard';
import Achievements from './pages/Achievements';

function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="week/:weekNumber" element={<WeekOverview />} />
            <Route path="week/:weekNumber/module/:moduleId" element={<ModuleViewer />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  );
}

export default App;
