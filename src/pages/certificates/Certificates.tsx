import { motion } from 'framer-motion';
import { Download, Share2, Award } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import styles from './Certificates.module.css';

const CERTIFICATES = [
  {
    id: 1,
    title: 'Outstanding Volunteer',
    event: 'City Park Cleanup 2026',
    hours: 12,
    date: 'Jul 15, 2026',
  },
  {
    id: 2,
    title: 'Community Champion',
    event: 'Food Drive Weekend',
    hours: 24,
    date: 'Jun 20, 2026',
  },
  {
    id: 3,
    title: 'Green Guardian',
    event: 'Tree Plantation Drive',
    hours: 8,
    date: 'May 05, 2026',
  }
];

export function Certificates() {
  return (
    <div className={styles.certificatesContainer}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Your Certificates</h1>
          <p className={styles.subtitle}>View, download, and share your volunteer achievements.</p>
        </div>
      </div>

      <div className={styles.grid}>
        {CERTIFICATES.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={styles.certificateCard}>
              <div className={styles.certificatePreview}>
                <Award size={48} className={styles.certificateRibbon} />
                <div className={styles.certificateTitle}>{cert.title}</div>
                <div className={styles.certificateDate}>Issued on {cert.date}</div>
              </div>
              <div className={styles.certificateContent}>
                <div className={styles.certificateName}>{cert.event}</div>
                <div className={styles.certificateDetails}>{cert.hours} Hours Volunteered</div>
                
                <div className={styles.certificateActions}>
                  <Button className="flex-1 gap-2" variant="outline">
                    <Download size={16} /> Download
                  </Button>
                  <Button className="flex-1 gap-2" variant="outline">
                    <Share2 size={16} /> Share
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
