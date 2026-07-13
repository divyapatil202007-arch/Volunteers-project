import { motion } from 'framer-motion';
import { Sparkles, Users, Activity, CheckCircle, Plus } from 'lucide-react';

const stats = [
  { label: 'Volunteers Analyzed', value: '156', icon: Users, color: 'text-blue-400' },
  { label: 'Best Matches Found', value: '28', icon: Sparkles, color: 'text-violet-400' },
  { label: 'Average Match Score', value: '94%', icon: Activity, color: 'text-emerald-400' },
  { label: 'Predicted Attendance', value: '93%', icon: CheckCircle, color: 'text-amber-400' },
  { label: 'Recommended Team Size', value: '25', icon: Plus, color: 'text-slate-300' },
];

export function StatHeader() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3 text-2xl font-semibold mb-4 text-white">
        <Sparkles className="w-6 h-6 text-blue-500" />
        <h2>AI Matching Complete</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-start p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-glass"
          >
            <stat.icon className={`w-5 h-5 mb-2 ${stat.color}`} />
            <div className="text-3xl font-bold tracking-tight text-white mb-1">{stat.value}</div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
