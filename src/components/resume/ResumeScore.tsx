import { motion } from 'framer-motion';
import { useResume } from '../../hooks/useResume';
import styles from '../../pages/resume/ResumeAnalyzer.module.css';

export function ResumeScore() {
  const { resumeData } = useResume();
  const score = resumeData?.volunteerScore || 0;

  // Determine color based on score
  const color = score > 80 ? '#10B981' : score > 60 ? '#F59E0B' : '#EF4444';

  return (
    <div className={`${styles.glassCard} ${styles.scoreContainer}`}>
      <h3 className={styles.cardTitle}>Volunteer Readiness</h3>
      
      <div className={styles.scoreCircleWrapper}>
        {/* Background Circle */}
        <svg className={styles.scoreSvg}>
          <circle
            cx="80"
            cy="80"
            r="70"
            className={styles.scoreTrack}
          />
          {/* Animated Progress Circle */}
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            stroke={color}
            className={styles.scoreFill}
            initial={{ strokeDasharray: '0 1000' }}
            animate={{ strokeDasharray: `${(score / 100) * 440} 1000` }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        
        <div className={styles.scoreContent}>
          <motion.span 
            className={styles.scoreValue}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            {score}
          </motion.span>
          <span className={styles.scoreLabel}>Score</span>
        </div>
      </div>
    </div>
  );
}
