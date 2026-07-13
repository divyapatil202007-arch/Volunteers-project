import { motion } from 'framer-motion';
import { HeroSection } from './components/HeroSection';
import { StatHeader } from './components/StatHeader';
import { FiltersBar } from './components/FiltersBar';
import { TopRecommendation } from './components/TopRecommendation';
import { VolunteerList } from './components/VolunteerList';
import { TeamBuilder } from './components/TeamBuilder';
import { AnalyticsSection } from './components/AnalyticsSection';
import { MapSection } from './components/MapSection';
import { AIInsights } from './components/AIInsights';
import { FloatingCopilot } from './components/FloatingCopilot';

export function MatchDashboard() {
  return (
    <motion.div 
      className="relative min-h-screen bg-slate-900 text-slate-50 font-sans p-6 md:p-10 pb-32"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 1. Header with Stats */}
        <StatHeader />

        {/* 2. AI Hero Banner */}
        <HeroSection />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Left Column (Matches & Team) */}
          <div className="lg:col-span-2 space-y-8">
            <FiltersBar />
            <TopRecommendation />
            <VolunteerList />
            <TeamBuilder />
          </div>

          {/* Right Column (Insights, Map, Charts) */}
          <div className="space-y-8">
            <AIInsights />
            <MapSection />
            <AnalyticsSection />
          </div>

        </div>

      </div>

      <FloatingCopilot />
    </motion.div>
  );
}
