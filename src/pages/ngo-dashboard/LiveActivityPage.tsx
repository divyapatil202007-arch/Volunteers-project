import { Zap, Sparkles } from 'lucide-react';
import { LiveActivity } from '@/components/dashboard/LiveActivity';
import { motion } from 'framer-motion';

export function LiveActivityPage() {
  return (
    <div className="relative min-h-[calc(100vh-100px)] -m-6 p-8 overflow-hidden rounded-3xl bg-slate-900/40 border border-slate-800/50 shadow-2xl backdrop-blur-xl">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse duration-10000" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse duration-7000" />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-indigo-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="space-y-10 relative z-10 max-w-4xl mx-auto mt-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <Zap size={32} className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 tracking-tight mb-4 flex items-center gap-3">
            Live AI Activity Stream
            <Sparkles className="text-purple-400 animate-pulse" size={28} />
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Monitor the real-time heartbeat of your autonomous AI agents. Watch as they match volunteers, generate reports, and optimize operations in the background.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* Subtle glow behind the card */}
          <div className="absolute -inset-1 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-[2.5rem] blur-xl opacity-50" />
          <div className="relative">
            <LiveActivity />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
