export const getDemoEvents = () => {
  const stored = localStorage.getItem('demo_events_v3');
  if (stored) {
    return JSON.parse(stored);
  }
  
  const initial = [
    {
      id: 'mock-1',
      title: 'GreenTech Sustainability Hackathon',
      description: 'Join developers and environmentalists to build software solutions for climate change. We need mentors and coders!',
      category: 'Technology',
      requiredSkills: 'Code, Environment, Sustainability, Teamwork, Communication',
      location: 'Tech Hub, Brooklyn, NY',
      startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      maxVolunteers: 40,
      currentVolunteers: 12,
      images: ['/hackathon.png'],
      ngo: { organizationName: 'Tech for Good Foundation' },
      status: 'Published'
    },
    {
      id: 'mock-2',
      title: 'Urban Community Garden Setup',
      description: 'Help us transform an empty lot into a thriving community garden. Physical labor and teamwork required.',
      category: 'Environment',
      requiredSkills: 'Environment, Community, Physical Labor, Teamwork',
      location: 'Queens Community Center, NY',
      startDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      maxVolunteers: 25,
      currentVolunteers: 20,
      images: ['/garden.png'],
      ngo: { organizationName: 'EcoFuture Initiative' },
      status: 'Published'
    },
    {
      id: 'mock-3',
      title: 'Youth Coding Bootcamp Mentor',
      description: 'Teach basic HTML/CSS and Python to high school students in a weekend bootcamp.',
      category: 'Education',
      requiredSkills: 'Teaching, Code, Communication, Empathy',
      location: 'Bronx Library Center, NY',
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      maxVolunteers: 15,
      currentVolunteers: 5,
      images: ['/bootcamp.png'],
      ngo: { organizationName: 'Tech for Good Foundation' },
      status: 'Published'
    }
  ];
  
  localStorage.setItem('demo_events_v3', JSON.stringify(initial));
  return initial;
};

export const updateDemoEventStatus = (id: string, status: string) => {
  const events = getDemoEvents();
  const updated = events.map((e: any) => e.id === id ? { ...e, status } : e);
  localStorage.setItem('demo_events_v3', JSON.stringify(updated));
  return updated;
};

// --- Applications Mock Data ---

const MOCK_PROFILE = {
  skills: ['Community Outreach', 'First Aid', 'Event Planning'],
  bio: 'Passionate volunteer dedicated to making a positive impact in the community.',
  location: 'New York, NY',
  experience: '2 years',
  availability: 'Weekends',
  phone: '+1 (555) 000-1111',
  email: 'volunteer@demo.com'
};

const INITIAL_APPS = [
  { id: 1, name: 'Sarah Jenkins', event: 'GreenTech Sustainability Hackathon', date: '2 hours ago', matchScore: 94, ...MOCK_PROFILE },
  { id: 2, name: 'Michael Chen', event: 'Urban Community Garden Setup', date: '5 hours ago', matchScore: 88, ...MOCK_PROFILE },
];

export const getDemoApplications = () => {
  const stored = localStorage.getItem('demo_applications_v1');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('demo_applications_v1', JSON.stringify(INITIAL_APPS));
  return INITIAL_APPS;
};

export const addDemoApplication = (eventName: string) => {
  const apps = getDemoApplications();
  const userName = localStorage.getItem('userName') || 'Demo Volunteer';
  const newApp = {
    id: Date.now(),
    name: userName,
    event: eventName,
    date: 'Just now',
    matchScore: 99,
    ...MOCK_PROFILE,
    email: userName.toLowerCase().replace(/\s/g, '') + '@demo.com'
  };
  const updated = [newApp, ...apps];
  localStorage.setItem('demo_applications_v1', JSON.stringify(updated));
  return updated;
};
