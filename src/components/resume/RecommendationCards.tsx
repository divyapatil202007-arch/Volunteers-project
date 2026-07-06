import { motion } from 'framer-motion';
import { useResume } from '../../hooks/useResume';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import styles from '../../pages/resume/ResumeAnalyzer.module.css';

export function RecommendationCards() {
  const { resumeData } = useResume();
  if (!resumeData) return null;

  return (
    <div>
      <div className={styles.recHeader}>
        <h3 className={styles.recTitle}>Recommended Events based on your Profile</h3>
        <Button variant="ghost" size="sm">View All</Button>
      </div>
      
      <div className={styles.gridInsights}>
        {resumeData.recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 + index * 0.1 }}
            className={styles.recCard}
          >
            <div className={styles.recTop}>
              <div className={styles.recIcon}>
                <Calendar size={20} />
              </div>
              <span className={styles.recBadge}>
                {rec.matchScore}% Match
              </span>
            </div>
            <h4 className={styles.recEventTitle}>{rec.title}</h4>
            <p className={styles.recDesc}>
              {rec.reason}
            </p>
            <Button variant="outline" className={styles.recButton}>
              Apply Now
              <ArrowRight size={16} className={styles.recButtonIcon} />
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
