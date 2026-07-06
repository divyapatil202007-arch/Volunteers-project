import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText } from 'lucide-react';
import { useResume } from '../../hooks/useResume';
import styles from '../../pages/resume/ResumeAnalyzer.module.css';

export function UploadArea() {
  const { handleFileUpload } = useResume();
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className={styles.uploadWrapper}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`${styles.uploadBox} ${isDragOver ? styles.dragOver : ''}`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileSelect}
          className={styles.fileInput} 
          accept=".pdf,.docx,.png,.jpg,.jpeg"
        />
        
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className={styles.uploadIconWrapper}
        >
          <UploadCloud size={48} />
        </motion.div>
        
        <h3 className={styles.uploadTitle}>Upload Resume or Certificate</h3>
        <p className={styles.uploadDesc}>
          Drag and drop your document here, or click to browse. We support PDF, DOCX, and images.
        </p>

        <div className={styles.supportedFormats}>
          <div className={styles.formatTag}>
            <FileText size={16} /> PDF
          </div>
          <div className={styles.formatTag}>
            <FileText size={16} /> DOCX
          </div>
          <div className={styles.formatTag}>
            <FileText size={16} /> Images
          </div>
        </div>
      </motion.div>
    </div>
  );
}
