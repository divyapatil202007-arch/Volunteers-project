import { motion } from 'framer-motion';
import { useResume } from '../../hooks/useResume';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import styles from '../../pages/resume/ResumeAnalyzer.module.css';

export function RecommendationCards() {
  const { resumeData } = useResume();
  if (!resumeData) return null;

  return (
    <div>
      <div className={styles.recHeader}>
        <h3 className={styles.recTitle}>Assigned Event Based on Your Specialization</h3>
      </div>
      
      <div className={styles.gridInsights}>
        {resumeData.recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 + index * 0.1 }}
            className={styles.recCard}
            style={{ border: '2px solid var(--primary)', background: 'var(--primary-light, rgba(var(--primary-rgb), 0.05))' }}
          >
            <div className={styles.recTop}>
              <div className={styles.recIcon} style={{ background: 'var(--primary)', color: 'white' }}>
                <Calendar size={20} />
              </div>
              <span className={styles.recBadge} style={{ background: 'var(--primary)', color: 'white' }}>
                {rec.matchScore}% Match
              </span>
            </div>
            <h4 className={styles.recEventTitle}>{rec.title}</h4>
            <p className={styles.recDesc}>
              {rec.reason}
            </p>
            <Button className="w-full gap-2 mt-4 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
              Accept Assignment
              <ArrowRight size={16} />
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
