import { motion } from 'framer-motion';
import { Activity, CheckCircle2, FileText, Bell, UserPlus, TrendingUp, DollarSign, MessageSquare, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const ACTIVITIES = [
  { id: 1, message: 'AI matched 18 volunteers for Beach Cleanup', time: '2 mins ago', icon: Brain, color: 'text-indigo-400', bg: 'bg-indigo-500/20', border: 'border-indigo-500/30' },
  { id: 2, message: 'Certificates generated for 120 volunteers', time: '15 mins ago', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30' },
  { id: 3, message: 'Q3 Impact Reports created automatically', time: '1 hour ago', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/30' },
  { id: 4, message: 'Shift Reminders sent to 45 volunteers', time: '3 hours ago', icon: Bell, color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/30' },
  { id: 5, message: 'New volunteer registered (94% AI Match)', time: '5 hours ago', icon: UserPlus, color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/30' },
  { id: 6, message: 'Attendance predicted for next Sunday', time: 'Yesterday', icon: TrendingUp, color: 'text-rose-400', bg: 'bg-rose-500/20', border: 'border-rose-500/30' },
  { id: 7, message: 'Funding metrics updated via Bank API', time: 'Yesterday', icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30' },
  { id: 8, message: '1,200 WhatsApp Messages delivered', time: '2 days ago', icon: MessageSquare, color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30' },
];

export function LiveActivity() {
  return (
    <Card className="border-slate-700/50 bg-slate-900/60 backdrop-blur-xl shadow-2xl h-full flex flex-col rounded-3xl overflow-hidden relative">
      <CardHeader className="border-b border-slate-800/80 pb-5 pt-6 bg-slate-900/40 relative z-10 shrink-0">
        <CardTitle className="text-lg font-bold text-white flex items-center gap-3 tracking-wide">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40">
            <Activity size={18} className="text-blue-400" />
            {/* Pulsing indicator */}
            <div className="absolute inset-0 rounded-full border border-blue-400/50 animate-ping opacity-20"></div>
          </div>
          Live Event Stream
          <span className="ml-auto flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar relative">
        {/* Animated timeline energy beam */}
        <div className="absolute left-[39px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent rounded-full opacity-50 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
        
        <div className="p-6 space-y-7 relative z-10">
          {ACTIVITIES.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div 
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                className="flex items-start gap-5 relative group"
              >
                {/* Glow behind icon on hover */}
                <div className="absolute left-1 top-1 w-10 h-10 rounded-full bg-current opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none" style={{ color: activity.color.replace('text-', '') }} />
                
                <div className={`w-12 h-12 rounded-xl ${activity.bg} ${activity.color} ${activity.border} border flex items-center justify-center shrink-0 ring-4 ring-slate-900 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)] z-10 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                  <Icon size={20} />
                </div>
                
                <div className="pt-2 flex-1 min-w-0 transition-transform duration-300 group-hover:translate-x-1">
                  <p className="text-[15px] font-semibold text-slate-200 truncate group-hover:text-white transition-colors">{activity.message}</p>
                  <p className="text-xs font-medium text-slate-400 mt-1.5 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
