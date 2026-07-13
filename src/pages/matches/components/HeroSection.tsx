import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, AlertTriangle } from 'lucide-react';

export function HeroSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/40 via-slate-900/40 to-violet-900/40 border border-white/10 p-8 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(37,99,235,0.15)]"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-violet-500" />
      
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Left: AI Recommendation */}
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-500/30">
            <SparklesIcon /> AI Recommendation
          </div>
          <p className="text-xl md:text-2xl font-light text-slate-200 leading-relaxed">
            "Based on volunteer skills, availability and location, this event has a <strong className="font-semibold text-white">very high probability of success.</strong>"
          </p>
        </div>

        {/* Right: Key Metrics */}
        <div className="flex gap-6 w-full lg:w-auto">
          <MetricItem 
            icon={<ShieldCheck className="w-6 h-6 text-emerald-400" />} 
            label="Confidence" 
            value="98%" 
          />
          <div className="w-px bg-white/10" />
          <MetricItem 
            icon={<TrendingUp className="w-6 h-6 text-blue-400" />} 
            label="Success Rate" 
            value="96%" 
          />
          <div className="w-px bg-white/10" />
          <MetricItem 
            icon={<AlertTriangle className="w-6 h-6 text-amber-400" />} 
            label="Risk Level" 
            value="LOW" 
            valueColor="text-emerald-400"
          />
        </div>

      </div>
    </motion.div>
  );
}

function MetricItem({ icon, label, value, valueColor = "text-white" }: { icon: React.ReactNode, label: string, value: string, valueColor?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="p-3 rounded-full bg-white/5 border border-white/10">
        {icon}
      </div>
      <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
      <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
