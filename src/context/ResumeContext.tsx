import { createContext, useState, useCallback, useContext, type ReactNode } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

import { api } from '@/lib/api';

export interface ExtractedSkill {
  name: string;
  confidence: number;
  category: 'technical' | 'soft' | 'domain';
}

export interface Recommendation {
  id: string;
  title: string;
  matchScore: number;
  reason: string;
}

export interface ResumeData {
  skills: ExtractedSkill[];
  recommendations: Recommendation[];
  volunteerScore: number;
  strengths: string[];
  weaknesses: string[];
  careerSuggestions: string[];
}

interface ResumeContextType {
  isUploading: boolean;
  uploadProgress: number;
  scanStatus: string;
  resumeData: ResumeData | null;
  handleFileUpload: (file: File) => Promise<void>;
  resetAnalyzer: () => void;
}

export const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Set up PDF.js worker
if (typeof window !== 'undefined' && 'Worker' in window) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState('');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  const resetAnalyzer = useCallback(() => {
    setResumeData(null);
    setUploadProgress(0);
    setScanStatus('');
    setIsUploading(false);
  }, []);

  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) as any }).promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item: any) => item.str);
        fullText += strings.join(' ') + ' ';
      }
      return fullText;
    } catch (err) {
      console.warn("PDF extraction failed, falling back to raw text", err);
      // Fallback: raw text extraction (messy but catches keywords)
      return await file.text();
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(20);
    try {
      const fullText = await extractTextFromPDF(file);
      
      setUploadProgress(40);
      setScanStatus('Analyzing with AI...');
      
      const res = await api.post('/ai/analyze-resume', { text: fullText });
      
      setUploadProgress(80);
      setScanStatus('Generating Smart Recommendations...');
      
      const aiData = res.data;
      
      // The backend returns { skills: [], interests: [], experienceSummary: "", yearsOfExperience: number }
      // We need to map this to our ResumeData shape for the UI
      
      const mappedSkills = (aiData.skills || []).map((skill: string) => ({
        name: skill,
        confidence: Math.floor(Math.random() * 20) + 80, // Random confidence 80-99
        category: 'technical' as const
      }));
      
      const mappedInterests = (aiData.interests || []).map((interest: string) => ({
        name: interest,
        confidence: Math.floor(Math.random() * 20) + 80,
        category: 'domain' as const
      }));

      setResumeData({
        volunteerScore: Math.min(100, 70 + (aiData.yearsOfExperience || 0) * 5),
        skills: [...mappedSkills, ...mappedInterests],
        recommendations: [], // We will compute these dynamically in the UI now
        strengths: [`${aiData.yearsOfExperience || 0} years of experience`, ...(aiData.skills || []).slice(0, 2)],
        weaknesses: ['Seeking more diverse volunteer opportunities'],
        careerSuggestions: [aiData.experienceSummary || 'Continue building your leadership skills through volunteering.']
      });

      setUploadProgress(100);
      setScanStatus('Analysis Complete!');
    } catch (error) {
      console.error('Failed to parse resume:', error);
      setScanStatus('Analysis Failed');
    } finally {
      setTimeout(() => setIsUploading(false), 1000);
    }
  };

  return (
    <ResumeContext.Provider value={{ 
      isUploading, 
      uploadProgress, 
      scanStatus, 
      resumeData, 
      handleFileUpload, 
      resetAnalyzer 
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
