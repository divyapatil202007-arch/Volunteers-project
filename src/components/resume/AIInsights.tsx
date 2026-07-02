import { motion } from 'framer-motion';
import { useResume } from '../../hooks/useResume';
import { CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';

export function AIInsights() {
  const { resumeData } = useResume();
  if (!resumeData) return null;

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 backdrop-blur-sm">
      <h3 className="text-lg font-medium text-slate-300 mb-4">AI Insights & Suggestions</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Strengths */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 text-emerald-400 mb-3">
            <CheckCircle2 size={18} />
            <span className="font-semibold">Key Strengths</span>
          </div>
          <ul className="space-y-2">
            {resumeData.strengths.map((s, i) => (
              <li key={i} className="text-sm text-slate-300 flex gap-2">
                <span className="text-emerald-500">•</span> {s}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Weaknesses */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <AlertCircle size={18} />
            <span className="font-semibold">Areas for Growth</span>
          </div>
          <ul className="space-y-2">
            {resumeData.weaknesses.map((w, i) => (
              <li key={i} className="text-sm text-slate-300 flex gap-2">
                <span className="text-rose-500">•</span> {w}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Suggestions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <Lightbulb size={18} />
            <span className="font-semibold">Career Suggestions</span>
          </div>
          <ul className="space-y-2">
            {resumeData.careerSuggestions.map((s, i) => (
              <li key={i} className="text-sm text-slate-300 flex gap-2">
                <span className="text-amber-500">•</span> {s}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
