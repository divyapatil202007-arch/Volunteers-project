import { motion } from 'framer-motion';
import { useResume } from '../../hooks/useResume';
import { CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';
import styles from '../../pages/resume/ResumeAnalyzer.module.css';

export function AIInsights() {
  const { resumeData } = useResume();
  if (!resumeData) return null;

  return (
    <div className={styles.glassCard}>
      <h3 className={styles.cardTitle}>AI Insights & Suggestions</h3>
      
      <div className={styles.gridInsights}>
        {/* Strengths */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className={`${styles.insightBox} ${styles.insightSuccess}`}
        >
          <div className={styles.insightHeader}>
            <CheckCircle2 size={18} />
            <span>Key Strengths</span>
          </div>
          <ul className={styles.insightList}>
            {resumeData.strengths.map((s, i) => (
              <li key={i} className={styles.insightItem}>
                <span className={styles.insightDot}>•</span> {s}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Weaknesses */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className={`${styles.insightBox} ${styles.insightDanger}`}
        >
          <div className={styles.insightHeader}>
            <AlertCircle size={18} />
            <span>Areas for Growth</span>
          </div>
          <ul className={styles.insightList}>
            {resumeData.weaknesses.map((w, i) => (
              <li key={i} className={styles.insightItem}>
                <span className={styles.insightDot}>•</span> {w}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Suggestions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className={`${styles.insightBox} ${styles.insightWarning}`}
        >
          <div className={styles.insightHeader}>
            <Lightbulb size={18} />
            <span>Career Suggestions</span>
          </div>
          <ul className={styles.insightList}>
            {resumeData.careerSuggestions.map((s, i) => (
              <li key={i} className={styles.insightItem}>
                <span className={styles.insightDot}>•</span> {s}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
