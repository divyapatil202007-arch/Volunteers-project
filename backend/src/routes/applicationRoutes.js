import express from 'express';
import { getApplications, createApplication, updateApplicationStatus } from '../controllers/applicationController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getApplications)
  .post(authorizeRoles('volunteer'), createApplication);

router.route('/:id/status')
  .put(authorizeRoles('ngo', 'admin'), updateApplicationStatus);

export default router;
