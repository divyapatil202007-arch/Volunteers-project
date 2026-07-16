import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useResume } from '../../hooks/useResume';

export function SkillRadarChart() {
  const { resumeData } = useResume();
  const skills = resumeData?.skills || [];

  // Default fallback data if empty
  const dataToUse = skills.length > 0 
    ? skills.map((s: string | any) => ({
        subject: typeof s === 'string' ? s : s.name,
        A: typeof s === 'string' ? 85 : (s.confidence || 85),
        fullMark: 100,
      }))
    : [
        { subject: 'Leadership', A: 80, fullMark: 100 },
        { subject: 'Communication', A: 90, fullMark: 100 },
        { subject: 'Problem Solving', A: 75, fullMark: 100 },
        { subject: 'Teamwork', A: 95, fullMark: 100 },
        { subject: 'Technical', A: 70, fullMark: 100 },
      ];

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <motion.div 
        className="w-full h-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dataToUse}>
            <PolarGrid stroke="#1E293B" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 10, fontFamily: 'monospace' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Skills"
              dataKey="A"
              stroke="#6366F1"
              strokeWidth={1.5}
              fill="#4F46E5"
              fillOpacity={0.2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
