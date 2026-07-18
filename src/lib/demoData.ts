export const getDemoEvents = () => {
  const stored = localStorage.getItem('demo_events');
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
      images: ['https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800'],
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
      images: ['https://images.unsplash.com/photo-1416879598553-568393e1a067?auto=format&fit=crop&q=80&w=800'],
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
      images: ['https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800'],
      ngo: { organizationName: 'Tech for Good Foundation' },
      status: 'Published'
    }
  ];
  
  localStorage.setItem('demo_events', JSON.stringify(initial));
  return initial;
};

export const updateDemoEventStatus = (id: string, status: string) => {
  const events = getDemoEvents();
  const updated = events.map((e: any) => e.id === id ? { ...e, status } : e);
  localStorage.setItem('demo_events', JSON.stringify(updated));
  return updated;
};
