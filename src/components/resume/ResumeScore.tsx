import { motion } from 'framer-motion';
import { useResume } from '../../hooks/useResume';

export function ResumeScore() {
  const { resumeData } = useResume();
  const score = resumeData?.volunteerScore || 0;

  // Determine color based on score
  const color = score > 80 ? '#10B981' : score > 60 ? '#F59E0B' : '#EF4444';

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm">
      <h3 className="text-lg font-medium text-slate-300 mb-6">Volunteer Readiness</h3>
      
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="12"
          />
          {/* Animated Progress Circle */}
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ strokeDasharray: '0 1000' }}
            animate={{ strokeDasharray: `${(score / 100) * 440} 1000` }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        
        <div className="flex flex-col items-center">
          <motion.span 
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-slate-400 uppercase tracking-wider">Score</span>
        </div>
      </div>
    </div>
  );
}
