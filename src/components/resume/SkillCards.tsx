import { motion } from 'framer-motion';
import { useResume } from '../../hooks/useResume';

export function SkillCards() {
  const { resumeData } = useResume();
  const skills = resumeData?.skills || [];

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 backdrop-blur-sm h-full">
      <h3 className="text-lg font-medium text-slate-300 mb-4">Extracted Skills</h3>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <motion.div 
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white font-medium">{skill.name}</span>
              <span className="text-slate-400">{skill.confidence}%</span>
            </div>
            <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  skill.category === 'technical' ? 'bg-primary' :
                  skill.category === 'soft' ? 'bg-accent' : 'bg-emerald-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${skill.confidence}%` }}
                transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
