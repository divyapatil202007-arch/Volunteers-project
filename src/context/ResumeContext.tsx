import { createContext, useState, useCallback, type ReactNode } from 'react';

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

  const handleFileUpload = async (_file: File) => {
    setIsUploading(true);
    setUploadProgress(10);
    setScanStatus('Uploading Document...');
    
    // Simulate multi-step AI Extraction process
    await new Promise(r => setTimeout(r, 1000));
    setUploadProgress(35);
    setScanStatus('Running OCR Text Extraction...');

    await new Promise(r => setTimeout(r, 1500));
    setUploadProgress(60);
    setScanStatus('Analyzing Semantic Meaning via LLM...');

    await new Promise(r => setTimeout(r, 1500));
    setUploadProgress(85);
    setScanStatus('Generating Volunteer Profile & Recommendations...');

    await new Promise(r => setTimeout(r, 1000));
    setUploadProgress(100);
    setScanStatus('Analysis Complete!');
    
    // Mock highly detailed returned data
    setResumeData({
      volunteerScore: 84,
      skills: [
        { name: 'Python', confidence: 98, category: 'technical' },
        { name: 'JavaScript', confidence: 92, category: 'technical' },
        { name: 'React', confidence: 88, category: 'technical' },
        { name: 'Leadership', confidence: 90, category: 'soft' },
        { name: 'Communication', confidence: 85, category: 'soft' },
        { name: 'Event Management', confidence: 78, category: 'domain' },
        { name: 'NGO Management', confidence: 65, category: 'domain' },
      ],
      recommendations: [
        {
          id: 'evt-1',
          title: 'Teaching Program for Underprivileged Youth',
          matchScore: 95,
          reason: 'Matches your strong Communication and Leadership skills.'
        },
        {
          id: 'evt-2',
          title: 'Open Source Code Contribution',
          matchScore: 92,
          reason: 'Perfect fit for your Python and React expertise.'
        },
        {
          id: 'evt-3',
          title: 'Tree Plantation Drive Coordinator',
          matchScore: 88,
          reason: 'Your Event Management skills make you an ideal candidate.'
        }
      ],
      strengths: ['Strong Technical Foundations', 'Proven Leadership in teams'],
      weaknesses: ['Limited direct NGO experience', 'No Medical/First-Aid certifications'],
      careerSuggestions: [
        'Consider taking a First-Aid certification to broaden your volunteering scope.',
        'Use your coding skills to help NGOs build digital infrastructure.',
      ]
    });

    setIsUploading(false);
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
