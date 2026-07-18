import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding mock data...');

  // 1. Create a mock NGO user
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  let ngoUser = await prisma.user.findUnique({ where: { email: 'ngo@example.com' } });
  if (!ngoUser) {
    ngoUser = await prisma.user.create({
      data: {
        name: 'Mock NGO Admin',
        email: 'ngo@example.com',
        password: hashedPassword,
        role: 'ngo',
        ngo: {
          create: {
            organizationName: 'Global Helpers Foundation',
            registrationNumber: 'NGO-12345-MOCK',
            description: 'A mock NGO for demonstration purposes.',
            website: 'https://example.com',
            phone: '555-0198',
            address: '123 Mock Street, NY',
            isVerified: true
          }
        }
      },
      include: { ngo: true }
    });
    console.log('Created Mock NGO User');
  } else {
    ngoUser = await prisma.user.findUnique({ where: { email: 'ngo@example.com' }, include: { ngo: true } });
  }

  const ngoId = ngoUser.ngo.id;

  // 2. Create mock events for this NGO
  const mockEvents = [
    {
      title: 'City Park Cleanup Drive',
      description: 'Join us to clean up the central city park. We will provide all necessary equipment.',
      category: 'Environment',
      requiredSkills: 'Environment, Teamwork, Physical Labor',
      location: 'Central City Park, NY',
      startDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
      endDate: new Date(Date.now() + 86400000 * 2 + 3600000 * 4), // 4 hours later
      maxVolunteers: 50,
      currentVolunteers: 24,
      status: 'Published',
      images: JSON.stringify(['https://images.unsplash.com/photo-1618477461853-cf6ed80fbea5?auto=format&fit=crop&q=80&w=600&h=400'])
    },
    {
      title: 'Tech Skills Workshop for Youth',
      description: 'Teach basic coding and tech skills to underprivileged youth.',
      category: 'Education',
      requiredSkills: 'Teaching, Code, Communication',
      location: 'Community Center Library, NY',
      startDate: new Date(Date.now() + 86400000 * 5),
      endDate: new Date(Date.now() + 86400000 * 5 + 3600000 * 3),
      maxVolunteers: 20,
      currentVolunteers: 12,
      status: 'Published',
      images: JSON.stringify(['https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600&h=400'])
    },
    {
      title: 'Senior Citizen Health Camp',
      description: 'Assist doctors and nurses in a free health camp for senior citizens.',
      category: 'Health',
      requiredSkills: 'Healthcare, Empathy, Organization',
      location: 'Mercy General Hospital, NY',
      startDate: new Date(Date.now() + 86400000 * 7),
      endDate: new Date(Date.now() + 86400000 * 7 + 3600000 * 8),
      maxVolunteers: 100,
      currentVolunteers: 45,
      status: 'Published',
      images: JSON.stringify(['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600&h=400'])
    }
  ];

  for (const eventData of mockEvents) {
    const existing = await prisma.event.findFirst({ where: { title: eventData.title } });
    if (!existing) {
      await prisma.event.create({
        data: {
          ...eventData,
          ngoId: ngoId
        }
      });
      console.log(`Created Event: ${eventData.title}`);
    }
  }

  console.log('Events seeding complete.');

  // 3. Create a mock volunteer user
  let volUser = await prisma.user.findUnique({ where: { email: 'volunteer@example.com' } });
  if (!volUser) {
    volUser = await prisma.user.create({
      data: {
        name: 'Sarah Jenkins',
        email: 'volunteer@example.com',
        password: hashedPassword,
        role: 'volunteer',
        volunteerProfile: {
          create: {
            bio: 'Passionate volunteer dedicated to making a positive impact.',
            skills: 'Community Outreach, First Aid, Event Planning',
            interests: 'Environment, Education',
            availability: 'Weekends',
            languages: 'English, Spanish',
            experience: '3+ years',
            location: 'San Francisco, CA',
            achievements: 'Gold Star Volunteer',
            badges: 'Top 100'
          }
        }
      }
    });
    console.log('Created Mock Volunteer User');
  }

  // 4. Create mock applications
  const events = await prisma.event.findMany({ where: { ngoId: ngoId } });
  if (events.length > 0) {
    for (const ev of events) {
      const existingApp = await prisma.application.findUnique({
        where: { eventId_volunteerId: { eventId: ev.id, volunteerId: volUser.id } }
      });
      if (!existingApp) {
        await prisma.application.create({
          data: {
            eventId: ev.id,
            volunteerId: volUser.id,
            status: 'Pending',
            notes: 'I am highly interested in this event and have relevant experience.'
          }
        });
        console.log(`Created Application for Event: ${ev.title}`);
      }
    }
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
