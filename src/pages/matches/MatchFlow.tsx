import { useState, useEffect } from 'react';
import { LoadingScreen } from './LoadingScreen';
import { MatchDashboard } from './MatchDashboard';

export function MatchFlow() {
  const [loading, setLoading] = useState(true);

  // After 3.5 seconds, transition to the dashboard
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans dark">
      {loading ? <LoadingScreen /> : <MatchDashboard />}
    </div>
  );
}
