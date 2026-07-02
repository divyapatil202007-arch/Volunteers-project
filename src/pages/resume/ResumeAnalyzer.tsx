import { motion } from 'framer-motion';
import { useResume } from '../../hooks/useResume';
import { UploadArea } from '../../components/resume/UploadArea';
import { UploadProgress } from '../../components/resume/UploadProgress';
import { ResumeScore } from '../../components/resume/ResumeScore';
import { SkillCards } from '../../components/resume/SkillCards';
import { SkillRadarChart } from '../../components/resume/SkillRadarChart';
import { AIInsights } from '../../components/resume/AIInsights';
import { RecommendationCards } from '../../components/resume/RecommendationCards';

export function ResumeAnalyzer() {
  const { isUploading, resumeData, resetAnalyzer } = useResume();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Resume & Certificate Analyzer</h1>
          <p className="text-slate-400">Upload your documents and let AI build your perfect volunteer profile automatically.</p>
        </div>
        {resumeData && (
          <button 
            onClick={resetAnalyzer}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors border border-slate-700"
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
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Top Row: Score, Skills, Radar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
