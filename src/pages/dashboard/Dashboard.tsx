import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, Zap, CheckSquare, Star, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { getDemoEvents } from '@/lib/demoData';
import { api } from '@/lib/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0F172A',
      titleColor: '#F1F5F9',
      bodyColor: '#94A3B8',
      padding: 12,
      cornerRadius: 6,
      displayColors: false,
      borderColor: '#1E293B',
      borderWidth: 1,
    }
  },
  scales: {
    y: { 
      beginAtZero: true, 
      grid: { color: '#1E293B' },
      ticks: { color: '#64748B', font: { size: 11, family: 'monospace' } },
      border: { display: false }
    },
    x: { 
      grid: { display: false },
      ticks: { color: '#64748B', font: { size: 11, family: 'monospace' } },
      border: { display: false }
    }
  }
};

const hoursData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Volunteer Hours',
      data: [12, 19, 15, 25, 22, 30],
      borderColor: '#6366F1',
      backgroundColor: 'transparent',
      fill: false,
      tension: 0,
      pointBackgroundColor: '#020617',
      pointBorderColor: '#6366F1',
      pointBorderWidth: 1.5,
      pointRadius: 4,
    },
  ],
};

const impactData = {
  labels: ['Edu', 'Env', 'Health', 'Comm'],
  datasets: [
    {
      label: 'Events Completed',
      data: [8, 5, 12, 4],
      backgroundColor: '#1E293B',
      hoverBackgroundColor: '#818CF8',
      borderRadius: 4,
      barThickness: 24,
    },
  ],
};

const INITIAL_AGENDA = [
  { id: 1, title: 'Check-in Desk Setup', event: 'City Park Cleanup', deadline: 'Today, 08:30 AM', status: 'Pending' },
  { id: 2, title: 'Sort Donations', event: 'Neighborhood Food Drive', deadline: 'Tomorrow, 10:00 AM', status: 'Pending' },
];

const IMPACT_METRICS = {
  reliabilityScore: 98,
  qualityRating: 4.8
};

export function Dashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Volunteer';
  
  const [agenda, setAgenda] = useState(INITIAL_AGENDA);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchEvents();

    // Listen for cross-tab realtime updates (e.g. from NGO Dashboard)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'demo_events_v3') {
        setEvents(getDemoEvents().slice(0, 3));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      if (res.data && res.data.length > 0) {
        setEvents(res.data.slice(0, 3));
      } else {
        throw new Error("Empty events");
      }
    } catch (error) {
      console.warn('Dashboard failed to fetch events, using fallback', error);
      setEvents(getDemoEvents().slice(0, 3));
    }
  };

  const toggleTask = (id: number) => {
    setAgenda(prev => prev.filter(task => task.id !== id));
  };

  const stats = [
    { label: 'Reliability Score', value: `${IMPACT_METRICS.reliabilityScore}%`, icon: ShieldCheck, accent: 'text-emerald-400 bg-emerald-950/30 border-emerald-900/50' },
    { label: 'Quality Rating', value: `${IMPACT_METRICS.qualityRating}/5`, icon: Star, accent: 'text-amber-400 bg-amber-950/30 border-amber-900/50' },
    { label: 'Verified Hours', value: '124', icon: Clock, accent: 'text-blue-400 bg-blue-950/30 border-blue-900/50' },
    { label: 'AI Match Score', value: '98%', icon: Zap, accent: 'text-purple-400 bg-purple-950/30 border-purple-900/50' },
  ];

  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto w-full pb-16 font-sans">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 border-b border-slate-800 pb-10">
        <div>
          <h1 className="text-3xl font-semibold text-slate-100 tracking-tight mb-2">
            Welcome back, {userName}.
          </h1>
          <p className="text-[15px] text-slate-400">
            Volunteer impact overview and real-time agenda.
          </p>
        </div>
        
        <button 
          className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors active:scale-95 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
          onClick={() => navigate('/recommendations')}
        >
          <Zap size={16} className="text-yellow-300" /> 
          AI Recommended Opportunities
        </button>
      </div>

      {/* Flat Bento Grid with Subtle Gradients */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* 4 Stat Cards */}
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800/80 transition-colors shadow-sm"
          >
            <div className="flex items-center justify-between mb-8">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${stat.accent}`}>
                <stat.icon size={16} strokeWidth={2} />
              </div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-slate-100 mb-1">{stat.value}</div>
              <div className="text-xs font-medium text-slate-500">{stat.label}</div>
            </div>
          </motion.div>
        ))}

        {/* Activity Overview Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-1 md:col-span-3 p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-sm"
        >
          <h3 className="text-sm font-semibold text-slate-100 mb-6">
            Activity Overview
          </h3>
          <div className="h-[240px] w-full">
            <Line data={hoursData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Impact Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-1 md:col-span-1 p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-sm"
        >
          <h3 className="text-sm font-semibold text-slate-100 mb-6">Impact Area</h3>
          <div className="h-[240px] w-full">
            <Bar data={impactData} options={chartOptions} />
          </div>
        </motion.div>

        {/* My Agenda List */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-1 md:col-span-2 p-0 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm"
        >
          <div className="p-5 border-b border-slate-800 bg-slate-900/50">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <CheckSquare size={16} className="text-slate-500" />
              My Agenda
            </h3>
          </div>
          <div className="divide-y divide-slate-800/50">
            {agenda.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 text-center text-slate-500 text-sm">
                You're all caught up! No pending agenda items.
              </motion.div>
            ) : (
              <AnimatePresence>
                {agenda.map((task) => (
                  <motion.div 
                    key={task.id} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, textDecoration: 'line-through' }}
                    transition={{ duration: 0.3 }}
                    className="p-5 hover:bg-slate-800/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="font-medium text-slate-200 text-sm mb-1">{task.title}</h4>
                      <p className="text-xs text-slate-500 mb-3">{task.event}</p>
                      <kbd className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-950 text-[10px] font-mono text-slate-400 border border-slate-800">
                        <Calendar size={12} />
                        {task.deadline}
                      </kbd>
                    </div>
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className="shrink-0 flex items-center gap-2 h-8 px-3 text-xs font-medium text-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-900/30 rounded-md transition-colors"
                    >
                      <CheckCircle2 size={14} /> Mark Done
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>

        {/* Top AI Matches Widget */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-1 md:col-span-2 p-6 bg-gradient-to-br from-primary/10 to-slate-900 border border-primary/20 rounded-xl flex flex-col shadow-sm cursor-pointer hover:border-primary/50 transition-all group"
          onClick={() => navigate('/recommendations')}
        >
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <Zap size={16} className="text-yellow-300" />
              Top AI Matches For You
            </h3>
            <span className="text-primary group-hover:translate-x-1 transition-transform">
              <ArrowRight size={16} />
            </span>
          </div>
          
          <div className="flex-1 flex flex-col justify-center gap-4">
            {events.length === 0 ? (
              <div className="text-slate-500 text-sm">No matches found.</div>
            ) : events.slice(0, 2).map((event: any, idx: number) => (
              <div key={event.id} className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-lg border border-slate-800/50 group-hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20 font-bold">
                  {98 - (idx * 5)}%
                </div>
                <div>
                  <h4 className="text-slate-200 font-medium text-sm line-clamp-1">{event.title}</h4>
                  <p className="text-slate-500 text-xs">{event.organizer}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
