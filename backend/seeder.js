import dotenv from 'dotenv';
import { User } from './src/models/User.js';
import { NGO } from './src/models/NGO.js';
import { Event } from './src/models/Event.js';
import { connectDB } from './src/config/db.js';
import { logger } from './src/config/logger.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await NGO.deleteMany();
    await Event.deleteMany();

    const createdUsers = await User.create([
      {
        name: 'Admin User',
        email: 'admin@volunteerai.com',
        password: 'password123',
        role: 'admin',
        isEmailVerified: true
      },
      {
        name: 'Green Earth NGO',
        email: 'contact@greenearth.org',
        password: 'password123',
        role: 'ngo',
        isEmailVerified: true
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'volunteer',
        isEmailVerified: true
      }
    ]);

    const ngoUser = createdUsers[1];

    await NGO.create({
      user: ngoUser._id,
      organizationName: 'Green Earth',
      registrationNumber: 'REG-12345',
      description: 'We plant trees and clean oceans.',
      address: '123 Earth Street',
      isVerified: true
    });

    await Event.create({
      ngo: ngoUser._id,
      title: 'City Park Cleanup',
      description: 'Help us clean the central park.',
      category: 'Environment',
      location: 'Central Park',
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // Next week + 4 hours
      maxVolunteers: 50,
      status: 'Published'
    });

    logger.info('Data Imported...');
    process.exit();
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await NGO.deleteMany();
    await Event.deleteMany();

    logger.info('Data Destroyed...');
    process.exit();
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
