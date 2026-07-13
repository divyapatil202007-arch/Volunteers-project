import { prisma } from '../config/db.js';

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res, next) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        ngo: true
      }
    });
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
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
      include: {
        ngo: true
      }
    });
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
    // Add NGO id to req.body. In prisma, we must connect the NGO.
    // First find the NGO associated with this user.
    const ngo = await prisma.nGO.findUnique({
      where: { userId: req.user.id }
    });

    if (!ngo) {
      return res.status(403).json({ success: false, message: 'You must have an NGO profile to create an event' });
    }

    const { title, description, category, requiredSkills, location, startDate, endDate, maxVolunteers } = req.body;

    const event = await prisma.event.create({
      data: {
        ngoId: ngo.id,
        title,
        description,
        category,
        requiredSkills: requiredSkills || [],
        location,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        maxVolunteers: Number(maxVolunteers)
      }
    });

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
    let event = await prisma.event.findUnique({
      where: { id: req.params.id },
      include: { ngo: true }
    });

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Make sure user is event owner
    if (event.ngo.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this event' });
    }

    event = await prisma.event.update({
      where: { id: req.params.id },
      data: req.body
    });

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
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
      include: { ngo: true }
    });

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.ngo.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this event' });
    }

    await prisma.event.delete({
      where: { id: req.params.id }
    });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
