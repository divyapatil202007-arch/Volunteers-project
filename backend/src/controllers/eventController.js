// In-memory data for hackathon
export const events = [];
export const ngos = [];

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res, next) => {
  try {
    // Populate ngo
    const populatedEvents = events.map(e => ({
      ...e,
      ngo: ngos.find(n => n.id === e.ngoId) || null
    }));
    
    res.status(200).json({
      success: true,
      count: populatedEvents.length,
      data: populatedEvents
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
    const event = events.find(e => e.id === req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    
    event.ngo = ngos.find(n => n.id === event.ngoId) || null;

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
    let ngo = ngos.find(n => n.userId === req.user.id);

    // Auto-create an NGO profile if one doesn't exist for the hackathon demo
    if (!ngo && req.user.role === 'ngo') {
      ngo = { id: Math.random().toString(36).substring(7), userId: req.user.id, name: req.user.name };
      ngos.push(ngo);
    }

    if (!ngo) {
      return res.status(403).json({ success: false, message: 'You must have an NGO profile to create an event' });
    }

    const { title, description, category, requiredSkills, location, startDate, endDate, maxVolunteers } = req.body;

    const event = {
      id: Math.random().toString(36).substring(7),
      ngoId: ngo.id,
      title,
      description,
      category,
      requiredSkills: requiredSkills || [],
      location,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      maxVolunteers: Number(maxVolunteers)
    };
    
    events.push(event);

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
    const index = events.findIndex(e => e.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    let event = events[index];
    const ngo = ngos.find(n => n.id === event.ngoId);

    if (ngo?.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this event' });
    }

    events[index] = { ...event, ...req.body };

    res.status(200).json({
      success: true,
      data: events[index]
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
    const index = events.findIndex(e => e.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const event = events[index];
    const ngo = ngos.find(n => n.id === event.ngoId);

    if (ngo?.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this event' });
    }

    events.splice(index, 1);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
