import { motion } from 'framer-motion';
import { useResume } from '../../hooks/useResume';
import styles from '../../pages/resume/ResumeAnalyzer.module.css';

export function UploadProgress() {
  const { uploadProgress, scanStatus } = useResume();

  return (
    <div className={styles.progressWrapper}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={styles.progressBarContainer}
      >
        <motion.div
          className={styles.progressBarFill}
          initial={{ width: 0 }}
          animate={{ width: `${uploadProgress}%` }}
          transition={{ ease: 'linear', duration: 0.5 }}
        />
        {/* Shimmer effect inside progress bar */}
        <motion.div
          className={styles.progressShimmer}
          animate={{ x: ['-200%', '300%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      <motion.p
        key={scanStatus}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.progressStatus}
      >
        {scanStatus}
      </motion.p>
    </div>
  );
}
