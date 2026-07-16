import { prisma } from '../config/db.js';
import { logger } from '../config/logger.js';

export const getApplications = async (req, res) => {
  try {
    const userRole = req.user.role;
    let applications;

    if (userRole === 'ngo' || userRole === 'admin') {
      const ngo = await prisma.nGO.findUnique({ where: { userId: req.user.id } });
      if (!ngo) {
        return res.status(404).json({ message: 'NGO profile not found' });
      }

      applications = await prisma.application.findMany({
        where: { event: { ngoId: ngo.id } },
        include: {
          event: true,
          volunteer: {
            select: { id: true, name: true, email: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
    } else {
      applications = await prisma.application.findMany({
        where: { volunteerId: req.user.id },
        include: {
          event: { include: { ngo: true } }
        },
        orderBy: { createdAt: 'desc' }
      });
    }

    res.json(applications);
  } catch (error) {
    logger.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createApplication = async (req, res) => {
  try {
    const { eventId, notes } = req.body;
    
    const existing = await prisma.application.findFirst({
      where: { eventId, volunteerId: req.user.id }
    });

    if (existing) {
      return res.status(400).json({ message: 'Already applied to this event' });
    }

    const application = await prisma.application.create({
      data: {
        eventId,
        volunteerId: req.user.id,
        notes,
        status: 'Pending'
      },
      include: {
        event: true
      }
    });

    res.status(201).json(application);
  } catch (error) {
    logger.error('Error creating application:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await prisma.application.update({
      where: { id },
      data: { status }
    });

    res.json(application);
  } catch (error) {
    logger.error('Error updating application:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
