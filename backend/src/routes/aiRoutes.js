import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

// Helper to get AI instance safely
const getAI = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in your .env file. Please add it to enable AI features.');
  }
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

// 1. AI Chatbot Endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    const ai = getAI();
    
    // Construct prompt from history if needed, but for now we'll do a simple generateContent
    const prompt = `You are a helpful AI Assistant for VolunteerAI, a platform connecting volunteers with NGOs. 
    Be concise, friendly, and helpful. 
    User says: ${message}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });
    
    res.status(200).json({
      success: true,
      data: { response: response.text }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to process AI chat request'
    });
  }
});

// 2. AI Resume & Certificate Analyzer Endpoint
router.post('/analyze-resume', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ success: false, message: 'No text provided for analysis.' });
    }
    
    const ai = getAI();
    const prompt = `You are an expert AI Resume Analyzer for a volunteering platform. 
    Analyze the following resume text and extract the applicant's skills, interests, and years of experience.
    Return ONLY a raw JSON object (no markdown formatting) with the following structure:
    {
      "skills": ["string"],
      "interests": ["string"],
      "experienceSummary": "string",
      "yearsOfExperience": number
    }
    
    Resume Text:
    ${text}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });
    
    let rawText = response.text.trim();
    if (rawText.startsWith('\`\`\`json')) {
      rawText = rawText.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
    }
    
    const parsedData = JSON.parse(rawText);
    
    res.status(200).json({
      success: true,
      data: parsedData
    });
  } catch (error) {
    console.error('AI Analysis Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze resume text.'
    });
  }
});

router.post('/match-volunteers', protect, authorizeRoles('ngo', 'admin'), async (req, res) => {
  // TODO: Use Prisma to fetch actual volunteers and rank them
  res.status(200).json({
    success: true,
    message: 'AI Matching Endpoint Placeholder',
    data: []
  });
});

export default router;
