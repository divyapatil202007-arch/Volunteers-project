import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// These routes would act as proxies to the Python FastAPI Server

router.post('/match-volunteers', protect, authorizeRoles('ngo', 'admin'), async (req, res) => {
  // TODO: Call Python AI Server at process.env.AI_SERVER_URL + /match
  res.status(200).json({
    success: true,
    message: 'AI Matching Endpoint Placeholder',
    data: []
  });
});

router.post('/chat', protect, async (req, res) => {
  // TODO: Call Python AI Server at process.env.AI_SERVER_URL + /chat
  res.status(200).json({
    success: true,
    message: 'AI Chat Endpoint Placeholder',
    data: { response: 'Hello, how can I help you today?' }
  });
});

router.post('/report', protect, authorizeRoles('ngo', 'admin'), async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AI Report Endpoint Placeholder',
    data: { reportUrl: '' }
  });
});

router.post('/predict-attendance', protect, authorizeRoles('ngo', 'admin'), async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AI Predict Attendance Endpoint Placeholder',
    data: { predictedRate: 0.85 }
  });
});

export default router;
