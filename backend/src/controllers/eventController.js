import { Event } from '../models/Event.js';
import { BaseRepository } from '../repositories/BaseRepository.js';

const eventRepository = new BaseRepository(Event);

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res, next) => {
  try {
    const events = await eventRepository.find(req.query, { populate: ['ngo'] });
    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
export const getEvent = async (req, res, next) => {
  try {
    const event = await eventRepository.findById(req.params.id, '', ['ngo']);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({
      success: true,
      data: event
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private/NGO
export const createEvent = async (req, res, next) => {
  try {
    // Add NGO id to req.body
    req.body.ngo = req.user.id; // Assuming NGO model has same ID as User, or we lookup NGO first

    const event = await eventRepository.create(req.body);
    res.status(201).json({
      success: true,
      data: event
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/NGO
export const updateEvent = async (req, res, next) => {
  try {
    let event = await eventRepository.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Make sure user is event owner
    if (event.ngo.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this event' });
    }

    event = await eventRepository.updateById(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: event
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/NGO
export const deleteEvent = async (req, res, next) => {
  try {
    const event = await eventRepository.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.ngo.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this event' });
    }

    await eventRepository.deleteById(req.params.id);
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
