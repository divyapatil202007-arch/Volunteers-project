import { motion } from 'framer-motion';
import { useResume } from '../../hooks/useResume';
import { UploadArea } from '../../components/resume/UploadArea';
import { UploadProgress } from '../../components/resume/UploadProgress';
import { ResumeScore } from '../../components/resume/ResumeScore';
import { SkillCards } from '../../components/resume/SkillCards';
import { SkillRadarChart } from '../../components/resume/SkillRadarChart';
import { AIInsights } from '../../components/resume/AIInsights';
import { RecommendationCards } from '../../components/resume/RecommendationCards';
import styles from './ResumeAnalyzer.module.css';

export function ResumeAnalyzer() {
  const { isUploading, resumeData, resetAnalyzer } = useResume();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>AI Resume & Certificate Analyzer</h1>
          <p className={styles.subtitle}>Upload your documents and let AI build your perfect volunteer profile automatically.</p>
        </div>
        {resumeData && (
          <button 
            onClick={resetAnalyzer}
            className="px-4 py-2 bg-[var(--surface)] text-[var(--text-main)] rounded-lg hover:bg-[var(--surface-hover)] transition-colors border border-[var(--border)]"
          >
            Upload New Document
          </button>
        )}
      </div>

      {!resumeData && !isUploading && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <UploadArea />
        </motion.div>
      )}

      {isUploading && (
        <UploadProgress />
      )}

      {resumeData && !isUploading && (
        <motion.div 
          className={styles.gridTop}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Top Row: Score, Skills, Radar */}
          <div className={styles.gridTop}>
            <ResumeScore />
            <SkillCards />
            <SkillRadarChart />
          </div>

          {/* Middle Row: AI Insights */}
          <AIInsights />

          {/* Bottom Row: Recommended Events */}
          <RecommendationCards />
        </motion.div>
      )}
    </div>
  );
}
