import { FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { UploadArea } from '../../components/resume/UploadArea';
import { SkillRadarChart } from '../../components/resume/SkillRadarChart';
import { useResume } from '../../hooks/useResume';
import { Button } from '@/components/ui/Button';

export function ResumeAnalyzer() {
  const { isUploading, resumeData, resetAnalyzer } = useResume();

  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto py-8 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-800 pb-10">
        <div>
          <h1 className="text-3xl font-semibold mb-2 text-slate-100 tracking-tight">
            AI Resume & Certificate Analyzer
          </h1>
          <p className="text-[15px] text-slate-400 max-w-xl">
            Upload your documents. Our system will extract the data and match you with ideal volunteer opportunities.
          </p>
        </div>
        {resumeData && (
          <button 
            onClick={resetAnalyzer}
            className="px-5 py-2.5 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg hover:bg-slate-800 transition-colors font-medium text-sm whitespace-nowrap active:scale-95 shadow-sm"
          >
            Upload New Document
          </button>
        )}
      </div>

      {!resumeData ? (
        <div className="flex flex-col items-center justify-center py-12">
          {isUploading ? (
            <div className="flex flex-col items-center gap-6 animate-pulse">
              <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin shadow-[0_0_20px_rgba(99,102,241,0.2)]" />
              <p className="text-slate-400 font-medium tracking-wide">Processing Document with AI...</p>
            </div>
          ) : (
            <UploadArea />
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-sm">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-100 mb-2">{localStorage.getItem('userName') || 'Anonymous User'}</h2>
                  <p className="text-slate-400 flex items-center gap-2">
                    <FileText size={16} /> Data extracted successfully
                  </p>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/30 border border-emerald-900/50 px-3 py-1.5 rounded-md text-sm font-semibold shadow-inner">
                  <CheckCircle2 size={16} /> High Confidence
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Key Skills Found</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill: any) => (
                      <span key={skill.name} className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md text-xs font-mono shadow-sm">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Suggested Roles</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.recommendations.map((role: any) => (
                      <span key={role.id} className="px-2.5 py-1 bg-indigo-950/30 border border-indigo-900/50 text-indigo-300 rounded-md text-xs font-semibold shadow-sm">
                        {role.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-100 mb-6">Generated Profile Summary</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Based on the uploaded document, this candidate shows strong aptitude in community organization and technical assistance. The presence of event coordination skills suggests they would be an excellent fit for leadership roles in local drives. 
              </p>
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-100 mb-6 text-center">Skill Distribution</h3>
              <div className="h-64">
                <SkillRadarChart />
              </div>
            </div>

            <Button 
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-2"
              onClick={() => {}}
            >
              View Recommended Matches <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
