
import { motion } from 'framer-motion';
import { Clock, Calendar, Zap, Sparkles, CheckSquare, Wallet, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
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

const MY_AGENDA = [
  { id: 1, title: 'Check-in Desk Setup', event: 'City Park Cleanup', deadline: 'Today, 08:30 AM', status: 'Pending' },
  { id: 2, title: 'Sort Donations', event: 'Neighborhood Food Drive', deadline: 'Tomorrow, 10:00 AM', status: 'Pending' },
];

const IMPACT_WALLET = {
  reliabilityScore: 98,
  qualityRating: 4.8,
  approvedReimbursements: 120.50,
  pendingReimbursements: 45.00
};

export function Dashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Divya';

  const stats = [
    { label: 'Reliability Score', value: `${IMPACT_WALLET.reliabilityScore}%`, icon: ShieldCheck, accent: 'text-emerald-400 bg-emerald-950/30 border-emerald-900/50' },
    { label: 'Quality Rating', value: `${IMPACT_WALLET.qualityRating}/5`, icon: Star, accent: 'text-amber-400 bg-amber-950/30 border-amber-900/50' },
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
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-indigo-500 transition-colors active:scale-95 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
          onClick={() => navigate('/matches')}
        >
          <Sparkles size={16} /> 
          Find Matches
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
            {MY_AGENDA.map((task) => (
              <div key={task.id} className="p-5 hover:bg-slate-800/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-medium text-slate-200 text-sm mb-1">{task.title}</h4>
                  <p className="text-xs text-slate-500 mb-3">{task.event}</p>
                  <kbd className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-950 text-[10px] font-mono text-slate-400 border border-slate-800">
                    <Calendar size={12} />
                    {task.deadline}
                  </kbd>
                </div>
                <button className="shrink-0 flex items-center gap-2 h-8 px-3 text-xs font-medium text-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-900/30 rounded-md transition-colors">
                  <CheckCircle2 size={14} /> Mark Done
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Impact Wallet Section (Deep Indigo Accent) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-1 md:col-span-2 p-6 bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-900/40 rounded-xl flex flex-col shadow-sm"
        >
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2 mb-6">
            <Wallet size={16} className="text-indigo-400" />
            Impact Wallet
          </h3>
          
          <div className="flex-1 flex flex-col justify-center mb-6">
            <p className="text-[10px] font-medium text-indigo-300/70 mb-2 uppercase tracking-wider">Approved Reimbursements</p>
            <div className="flex items-end gap-3 mb-2">
              <h3 className="text-4xl font-semibold text-white tracking-tight">
                ₹{IMPACT_WALLET.approvedReimbursements.toFixed(2)}
              </h3>
            </div>
            <div className="inline-flex items-center gap-1.5 w-max px-2 py-1 rounded-md bg-amber-950/30 text-amber-400 text-[10px] font-mono border border-amber-900/50">
              + ₹{IMPACT_WALLET.pendingReimbursements.toFixed(2)} Pending
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-indigo-900/30 pt-6">
            <div>
              <div className="text-2xl font-medium text-slate-100 mb-1">{IMPACT_WALLET.reliabilityScore}%</div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Reliability Score</p>
            </div>
            <div>
              <div className="text-2xl font-medium text-slate-100 mb-1">{IMPACT_WALLET.qualityRating} <span className="text-slate-500 text-sm">/ 5</span></div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Quality Rating</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
