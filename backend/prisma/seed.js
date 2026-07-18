import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding comprehensive mock data...');

  // Reset database (optional but good for a fresh seed)
  await prisma.application.deleteMany();
  await prisma.event.deleteMany();
  await prisma.nGO.deleteMany();
  await prisma.volunteerProfile.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  // ==========================================
  // 1. Create 3 Sample NGOs
  // ==========================================
  const ngoData = [
    {
      name: 'EcoFuture Initiative',
      email: 'admin@ecofuture.org',
      organizationName: 'EcoFuture Initiative',
      registrationNumber: 'NGO-ECO-001',
      description: 'Dedicated to urban sustainability, community gardens, and reducing carbon footprints through grassroots efforts.',
      category: 'Environment'
    },
    {
      name: 'Tech for Good Foundation',
      email: 'contact@techforgood.org',
      organizationName: 'Tech for Good Foundation',
      registrationNumber: 'NGO-TECH-002',
      description: 'Bridging the digital divide by teaching coding skills and providing tech resources to underprivileged communities.',
      category: 'Education'
    },
    {
      name: 'Hearts of Care Network',
      email: 'hello@heartsofcare.org',
      organizationName: 'Hearts of Care Network',
      registrationNumber: 'NGO-CARE-003',
      description: 'Providing crucial health services, medical camps, and wellness education to vulnerable populations.',
      category: 'Health'
    }
  ];

  const ngos = [];
  for (const data of ngoData) {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: 'ngo',
        ngo: {
          create: {
            organizationName: data.organizationName,
            registrationNumber: data.registrationNumber,
            description: data.description,
            website: `https://${data.organizationName.toLowerCase().replace(/ /g, '')}.org`,
            phone: '555-019' + Math.floor(Math.random() * 9),
            address: 'New York, NY',
            isVerified: true
          }
        }
      },
      include: { ngo: true }
    });
    ngos.push(user);
    console.log(`Created NGO: ${data.organizationName}`);
  }

  // ==========================================
  // 2. Create 6-8 Sample Events linked to NGOs
  // ==========================================
  
  // Base date for realistic scheduling
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

  const eventData = [
    // Tailored for the default AI resume: ['environment', 'community', 'teamwork', 'communication', 'sustainability', 'teaching', 'code']
    {
      ngoId: ngos[1].ngo.id, // Tech for Good
      title: 'GreenTech Sustainability Hackathon',
      description: 'Join developers and environmentalists to build software solutions for climate change. We need mentors and coders!',
      category: 'Technology',
      requiredSkills: 'Code, Environment, Sustainability, Teamwork, Communication',
      location: 'Tech Hub, Brooklyn, NY',
      startDate: new Date(nextWeek.getTime() + 2 * 24 * 60 * 60 * 1000),
      endDate: new Date(nextWeek.getTime() + 4 * 24 * 60 * 60 * 1000),
      maxVolunteers: 40,
      currentVolunteers: 12,
      status: 'Published',
      images: JSON.stringify(['https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800'])
    },
    {
      ngoId: ngos[0].ngo.id, // EcoFuture
      title: 'Urban Community Garden Setup',
      description: 'Help us transform an empty lot into a thriving community garden. Physical labor and teamwork required.',
      category: 'Environment',
      requiredSkills: 'Environment, Community, Physical Labor, Teamwork',
      location: 'Queens Community Center, NY',
      startDate: new Date(nextWeek.getTime() + 1 * 24 * 60 * 60 * 1000),
      endDate: new Date(nextWeek.getTime() + 1 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000),
      maxVolunteers: 25,
      currentVolunteers: 20,
      status: 'Published',
      images: JSON.stringify(['https://images.unsplash.com/photo-1416879598553-568393e1a067?auto=format&fit=crop&q=80&w=800'])
    },
    {
      ngoId: ngos[1].ngo.id, // Tech for Good
      title: 'Youth Coding Bootcamp Mentor',
      description: 'Teach basic HTML/CSS and Python to high school students in a weekend bootcamp.',
      category: 'Education',
      requiredSkills: 'Teaching, Code, Communication, Empathy',
      location: 'Bronx Library Center, NY',
      startDate: new Date(nextMonth.getTime()),
      endDate: new Date(nextMonth.getTime() + 2 * 24 * 60 * 60 * 1000),
      maxVolunteers: 15,
      currentVolunteers: 5,
      status: 'Published',
      images: JSON.stringify(['https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800'])
    },
    {
      ngoId: ngos[2].ngo.id, // Hearts of Care
      title: 'Senior Citizen Free Health Clinic',
      description: 'Assist medical professionals with patient intake, crowd management, and record keeping at our pop-up clinic.',
      category: 'Health',
      requiredSkills: 'Healthcare, Organization, Communication, Empathy',
      location: 'Manhattan Medical Hall, NY',
      startDate: new Date(nextWeek.getTime() + 5 * 24 * 60 * 60 * 1000),
      endDate: new Date(nextWeek.getTime() + 5 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000),
      maxVolunteers: 50,
      currentVolunteers: 45,
      status: 'Published',
      images: JSON.stringify(['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800'])
    },
    {
      ngoId: ngos[0].ngo.id, // EcoFuture
      title: 'Beach Cleanup & Marine Awareness',
      description: 'Join a massive weekend beach cleanup drive. We will also distribute sustainability pamphlets.',
      category: 'Environment',
      requiredSkills: 'Environment, Sustainability, Community, Physical Labor',
      location: 'Coney Island Beach, NY',
      startDate: new Date(nextMonth.getTime() + 10 * 24 * 60 * 60 * 1000),
      endDate: new Date(nextMonth.getTime() + 10 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000),
      maxVolunteers: 100,
      currentVolunteers: 30,
      status: 'Published',
      images: JSON.stringify(['https://images.unsplash.com/photo-1618477461853-cf6ed80fbea5?auto=format&fit=crop&q=80&w=800'])
    },
    {
      ngoId: ngos[2].ngo.id, // Hearts of Care
      title: 'Winter Coat Drive Distribution',
      description: 'Sort and distribute warm winter coats to the homeless community.',
      category: 'Community',
      requiredSkills: 'Organization, Teamwork, Empathy, Physical Labor',
      location: 'Downtown Shelter, NY',
      startDate: new Date(nextMonth.getTime() + 15 * 24 * 60 * 60 * 1000),
      endDate: new Date(nextMonth.getTime() + 15 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000),
      maxVolunteers: 30,
      currentVolunteers: 30, // Full event
      status: 'Full',
      images: JSON.stringify(['https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800'])
    }
  ];

  const createdEvents = [];
  for (const event of eventData) {
    const ev = await prisma.event.create({ data: event });
    createdEvents.push(ev);
    console.log(`Created Event: ${ev.title}`);
  }

  // ==========================================
  // 3. Create a Volunteer User
  // ==========================================
  const volunteerUser = await prisma.user.create({
    data: {
      name: 'Sarah Jenkins',
      email: 'volunteer@example.com',
      password: hashedPassword,
      role: 'volunteer',
      volunteerProfile: {
        create: {
          bio: 'Passionate tech professional dedicated to using software for environmental sustainability.',
          skills: 'Code, Environment, Sustainability, Teamwork',
          interests: 'Technology, Environment',
          availability: 'Weekends',
          languages: 'English',
          experience: '5+ years software engineering',
          location: 'New York, NY',
          achievements: 'GreenTech Award 2023',
          badges: 'Code Master, Earth Saver'
        }
      }
    }
  });
  console.log('Created Mock Volunteer: Sarah Jenkins');

  // ==========================================
  // 4. Create an Application from Volunteer to the Tech Hackathon
  // ==========================================
  const targetEvent = createdEvents.find(e => e.title === 'GreenTech Sustainability Hackathon');
  if (targetEvent) {
    await prisma.application.create({
      data: {
        eventId: targetEvent.id,
        volunteerId: volunteerUser.id,
        status: 'Pending',
        notes: 'I have extensive experience in building carbon-tracking APIs and would love to mentor teams!'
      }
    });
    console.log(`Created application for ${targetEvent.title}`);
  }

  console.log('Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
