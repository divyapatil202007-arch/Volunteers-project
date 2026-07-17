import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/landing/LandingPage';
import { Dashboard } from './pages/dashboard/Dashboard';
import { NGODashboard } from './pages/ngo-dashboard/NGODashboard';
import { NGOEvents } from './pages/ngo-dashboard/NGOEvents';
import { ApplicationsPage } from './pages/ngo-dashboard/ApplicationsPage';
import { LiveActivityPage } from './pages/ngo-dashboard/LiveActivityPage';
import { Events } from './pages/events/Events';
import { CreateEvent } from './pages/events/CreateEvent';
import { EventDetails } from './pages/events/EventDetails';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { Certificates } from './pages/certificates/Certificates';
import { Settings } from './pages/settings/Settings';
import { AIProvider } from './context/AIContext';
import { ResumeProvider } from './context/ResumeContext';
import { ResumeAnalyzer } from './pages/resume/ResumeAnalyzer';
import { Messages } from './pages/messages/Messages';
import { MatchFlow } from './pages/matches/MatchFlow';
import { VolunteerHours } from './pages/hours/VolunteerHours';
import { AIRecommendations } from './pages/dashboard/AIRecommendations';

function App() {
  return (
    <AIProvider>
      <ResumeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/matches" element={<MatchFlow />} />
          
          {/* Protected Routes inside Layout */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recommendations" element={<AIRecommendations />} />
            <Route path="/ngo-dashboard" element={<NGODashboard />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/live-activity" element={<LiveActivityPage />} />
            <Route path="/ngo-events" element={<NGOEvents />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/create" element={<CreateEvent />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/analyzer" element={<ResumeAnalyzer />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/hours" element={<VolunteerHours />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ResumeProvider>
  </AIProvider>
  );
}

export default App;
