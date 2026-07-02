import { motion } from 'framer-motion';
import { useResume } from '../../hooks/useResume';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function RecommendationCards() {
  const { resumeData } = useResume();
  if (!resumeData) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Recommended Events based on your Profile</h3>
        <Button variant="ghost" size="sm">View All</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resumeData.recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 + index * 0.1 }}
            className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 hover:border-primary/50 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-primary/20 rounded-lg text-primary">
                <Calendar size={20} />
              </div>
              <span className="text-xs font-bold px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">
                {rec.matchScore}% Match
              </span>
            </div>
            <h4 className="text-white font-semibold mb-2">{rec.title}</h4>
            <p className="text-sm text-slate-400 mb-4 h-10 line-clamp-2">
              {rec.reason}
            </p>
            <Button variant="outline" className="w-full justify-between group">
              Apply Now
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
