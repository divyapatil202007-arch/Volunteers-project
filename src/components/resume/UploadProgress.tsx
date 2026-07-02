import { motion } from 'framer-motion';
import { useResume } from '../../hooks/useResume';

export function UploadProgress() {
  const { uploadProgress, scanStatus } = useResume();

  return (
    <div className="w-full max-w-md mx-auto mt-8 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full relative h-3 bg-slate-800 rounded-full overflow-hidden mb-4"
      >
        <motion.div
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${uploadProgress}%` }}
          transition={{ ease: 'linear', duration: 0.5 }}
        />
        {/* Shimmer effect inside progress bar */}
        <motion.div
          className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
          animate={{ x: ['-200%', '300%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      <motion.p
        key={scanStatus}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-slate-300 font-medium tracking-wide animate-pulse"
      >
        {scanStatus}
      </motion.p>
    </div>
  );
}
