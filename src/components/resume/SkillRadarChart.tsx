import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useResume } from '../../hooks/useResume';
import styles from '../../pages/resume/ResumeAnalyzer.module.css';

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
    <div className={`${styles.glassCard} ${styles.chartContainer}`}>
      <h3 className={styles.cardTitle}>Skill Radar</h3>
      <motion.div 
        className={styles.chartWrapper}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="var(--border-color)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
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
