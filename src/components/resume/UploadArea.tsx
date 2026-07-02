import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText } from 'lucide-react';
import { useResume } from '../../hooks/useResume';

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
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative overflow-hidden cursor-pointer rounded-2xl border-2 border-dashed
          transition-all duration-300 flex flex-col items-center justify-center p-12
          ${isDragOver 
            ? 'border-primary bg-primary/10 shadow-[0_0_30px_rgba(37,99,235,0.2)]' 
            : 'border-slate-600 bg-slate-800/50 hover:bg-slate-800/80 hover:border-slate-500'}
        `}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileSelect}
          className="hidden" 
          accept=".pdf,.docx,.png,.jpg,.jpeg"
        />
        
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-gradient-to-br from-primary/20 to-accent/20 p-6 rounded-full mb-6"
        >
          <UploadCloud size={48} className="text-primary" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-white mb-2">Upload Resume or Certificate</h3>
        <p className="text-slate-400 text-center mb-6 max-w-md">
          Drag and drop your document here, or click to browse. We support PDF, DOCX, and images.
        </p>

        <div className="flex gap-4 opacity-70">
          <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700">
            <FileText size={16} /> PDF
          </div>
          <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700">
            <FileText size={16} /> DOCX
          </div>
          <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700">
            <FileText size={16} /> Images
          </div>
        </div>
      </motion.div>
    </div>
  );
}
