import { createContext, useState, useCallback, type ReactNode } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Define the events we can recommend (from Events.tsx)
const MOCK_EVENTS = [
  { id: '1', title: 'City Park Cleanup Drive', category: 'Environment', reqSkills: ['environment', 'nature', 'sustainability', 'clean', 'outdoors', 'biology', 'ecology'] },
  { id: '2', title: 'Tech Skills Workshop for Youth', category: 'Education', reqSkills: ['education', 'teach', 'mentor', 'tutor', 'youth', 'students', 'learning', 'tech', 'software', 'code'] },
  { id: '3', title: 'Senior Citizen Health Camp', category: 'Health', reqSkills: ['health', 'medical', 'nurse', 'care', 'doctor', 'first aid', 'clinical', 'hospital'] },
  { id: '4', title: 'Neighborhood Food Drive', category: 'Community', reqSkills: ['community', 'organize', 'food', 'logistics', 'social', 'management', 'planning'] },
  { id: '5', title: 'Stray Animal Rescue & Care', category: 'Animal Welfare', reqSkills: ['animal', 'pet', 'veterinary', 'dog', 'cat', 'wildlife', 'rescue'] },
  { id: '6', title: 'Open Source Coding Bootcamp', category: 'Technology', reqSkills: ['react', 'python', 'javascript', 'java', 'c++', 'code', 'developer', 'software', 'tech', 'programming'] }
];

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
    setUploadProgress(10);
    setScanStatus('Reading Document Content...');
    
    // 1. Actually Read the Resume!
    let resumeText = '';
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      resumeText = await extractTextFromPDF(file);
    } else {
      resumeText = await file.text();
    }

    // Fallback if empty
    if (!resumeText || resumeText.length < 10) {
      resumeText = 'General volunteer background with communication skills.';
    }

    setUploadProgress(40);
    setScanStatus('Analyzing Specializations...');

    // 2. Intelligent Keyword Matching
    const textLower = resumeText.toLowerCase();
    
    // Calculate matches for each event
    const matchedEvents = MOCK_EVENTS.map(event => {
      let matches = 0;
      let matchedKeywords: string[] = [];
      
      event.reqSkills.forEach(skill => {
        if (textLower.includes(skill)) {
          matches++;
          matchedKeywords.push(skill);
        }
      });

      return {
        ...event,
        matches,
        matchedKeywords,
        score: Math.min(100, (matches / 3) * 100) // Score based on keyword density
      };
    }).filter(e => e.matches > 0).sort((a, b) => b.matches - a.matches);

    // Default event if no matches
    if (matchedEvents.length === 0) {
      matchedEvents.push({
        ...MOCK_EVENTS[3], // Neighborhood Food Drive
        matches: 1,
        matchedKeywords: ['community'],
        score: 75
      });
    }

    const topMatch = matchedEvents[0];
    
    // Extract generic skills based on found keywords
    const extractedSkills: ExtractedSkill[] = [];
    const allFoundKeywords = new Set<string>();
    matchedEvents.forEach(e => e.matchedKeywords.forEach(k => allFoundKeywords.add(k)));
    
    Array.from(allFoundKeywords).slice(0, 5).forEach((kw, index) => {
      extractedSkills.push({
        name: kw.charAt(0).toUpperCase() + kw.slice(1),
        confidence: 90 - (index * 2),
        category: index % 2 === 0 ? 'technical' : 'soft'
      });
    });

    if (extractedSkills.length === 0) {
      extractedSkills.push({ name: 'Communication', confidence: 85, category: 'soft' });
      extractedSkills.push({ name: 'Organization', confidence: 80, category: 'soft' });
    }

    setUploadProgress(80);
    setScanStatus('Generating Smart Recommendations...');

    // Simulate slight API delay for UX
    await new Promise(r => setTimeout(r, 1500));

    // 3. Update the UI State dynamically based on the exact PDF uploaded!
    setResumeData({
      volunteerScore: Math.floor(topMatch.score),
      skills: extractedSkills,
      recommendations: [
        {
          id: topMatch.id,
          title: topMatch.title,
          matchScore: Math.floor(topMatch.score),
          reason: `Based on your background in ${topMatch.matchedKeywords.slice(0, 2).join(' and ')}, this ${topMatch.category} event is a perfect fit.`
        }
      ],
      strengths: [`Strong alignment with ${topMatch.category} initiatives`, `Demonstrated ${extractedSkills[0]?.name || 'dedication'}`],
      weaknesses: ['Could benefit from cross-domain volunteering'],
      careerSuggestions: [
        `Consider taking leadership roles in ${topMatch.category} events to build upon your existing specialization.`
      ]
    });

    setUploadProgress(100);
    setScanStatus('Analysis Complete!');
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
