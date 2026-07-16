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
    <div className="w-full max-w-2xl mx-auto mt-4 font-sans">
      <motion.div
        whileHover={{ scale: 0.995 }}
        whileTap={{ scale: 0.99 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center p-12 text-center cursor-pointer rounded-xl transition-colors duration-200 shadow-sm
          ${isDragOver 
            ? 'bg-slate-800 border-2 border-dashed border-indigo-400' 
            : 'bg-slate-900 border border-slate-800 hover:bg-slate-900/80 hover:border-indigo-500/50 hover:shadow-md'
          }
        `}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileSelect}
          className="hidden" 
          accept=".pdf,.docx,.png,.jpg,.jpeg"
        />
        
        <div className="mb-6 flex justify-center">
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 shadow-inner group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors">
            <UploadCloud size={32} strokeWidth={2} />
          </div>
        </div>
        
        <h3 className="text-xl font-medium text-slate-200 mb-2">Upload Document</h3>
        <p className="text-slate-500 text-sm mb-8">
          Drag and drop your file here, or <span className="text-indigo-400 font-medium">browse</span>.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300 text-[11px] font-mono tracking-wider uppercase shadow-sm">
            <FileText size={14} className="text-slate-500" /> PDF
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300 text-[11px] font-mono tracking-wider uppercase shadow-sm">
            <FileText size={14} className="text-slate-500" /> DOCX
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300 text-[11px] font-mono tracking-wider uppercase shadow-sm">
            <FileText size={14} className="text-slate-500" /> Images
          </div>
        </div>
      </motion.div>
    </div>
  );
}
