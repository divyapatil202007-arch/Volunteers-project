import { motion } from 'framer-motion';
import { useResume } from '../../hooks/useResume';
import styles from '../../pages/resume/ResumeAnalyzer.module.css';

export function SkillCards() {
  const { resumeData } = useResume();
  const skills = resumeData?.skills || [];

  return (
    <div className={styles.glassCard}>
      <h3 className={styles.cardTitle}>Extracted Skills</h3>
      <div className={styles.skillsList}>
        {skills.map((skill, index) => (
          <motion.div 
            key={skill.name}
            className={styles.skillItem}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div className={styles.skillHeader}>
              <span className={styles.skillName}>{skill.name}</span>
              <span className={styles.skillPercent}>{skill.confidence}%</span>
            </div>
            <div className={styles.skillTrack}>
              <motion.div
                className={`${styles.skillFill} ${
                  skill.category === 'technical' ? styles.skillTech :
                  skill.category === 'soft' ? styles.skillSoft : styles.skillDomain
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
