import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useResume } from '../../hooks/useResume';

export function SkillRadarChart() {
  const { resumeData } = useResume();
  const skills = resumeData?.skills || [];

  // Transform data for recharts
  const data = skills.map(s => ({
    subject: s.name,
    A: s.confidence,
    fullMark: 100,
  }));

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 backdrop-blur-sm h-[320px] flex flex-col">
      <h3 className="text-lg font-medium text-slate-300 mb-2">Skill Radar</h3>
      <motion.div 
        className="flex-1 w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Skills"
              dataKey="A"
              stroke="#2563EB"
              fill="#2563EB"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
