import express from 'express';
import { getEvents, getEvent, createEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getEvents)
  .post(protect, authorizeRoles('ngo', 'admin'), createEvent);

router
  .route('/:id')
  .get(getEvent)
  .put(protect, authorizeRoles('ngo', 'admin'), updateEvent)
  .delete(protect, authorizeRoles('ngo', 'admin'), deleteEvent);

export default router;
