import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/landing/LandingPage';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Events } from './pages/events/Events';
import { CreateEvent } from './pages/events/CreateEvent';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { Certificates } from './pages/certificates/Certificates';
import { Settings } from './pages/settings/Settings';
import { AIProvider } from './context/AIContext';
import { ResumeProvider } from './context/ResumeContext';
import { ResumeAnalyzer } from './pages/resume/ResumeAnalyzer';

function App() {
  return (
    <AIProvider>
      <ResumeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes inside Layout */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/create" element={<CreateEvent />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/analyzer" element={<ResumeAnalyzer />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/hours" element={<div className="p-8">Volunteer Hours Page</div>} />
            <Route path="/messages" element={<div className="p-8">Messages Page</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ResumeProvider>
  </AIProvider>
  );
}

export default App;
