export interface MockEvent {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  currentVolunteers: number;
  maxVolunteers: number;
  images: string[];
  relatedImages?: string[];
  description: string;
  requirements: string[];
  organizer: string;
  organizerAvatar: string;
  skills: string[];
}

export const MOCK_EVENTS: MockEvent[] = [
  {
    id: '1',
    title: 'City Park Cleanup Drive',
    category: 'Environment',
    startDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 2 + 14400000).toISOString(),
    location: 'Central City Park, NY',
    currentVolunteers: 24,
    maxVolunteers: 50,
    images: ['/city_park_cleanup.png'],
    relatedImages: ['/cleanup_related_1.png', '/cleanup_related_2.png', '/cleanup_related_3.png'],
    description: 'Join us for our monthly City Park Cleanup Drive! We will be focusing on the main trails and the lake area. All supplies including gloves, bags, and grabbers will be provided. This is a great opportunity to get some fresh air and keep our community beautiful.',
    requirements: ['Must be 16 or older', 'Comfortable walking for 2 hours', 'Wear closed-toe shoes'],
    organizer: 'Green Earth NGO',
    organizerAvatar: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=150&h=150',
    skills: ['Teamwork', 'Physical Stamina']
  },
  {
    id: '2',
    title: 'Tech Skills Workshop for Youth',
    category: 'Education',
    startDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 5 + 10800000).toISOString(),
    location: 'Community Center Library',
    currentVolunteers: 12,
    maxVolunteers: 20,
    images: ['https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200&h=600'],
    relatedImages: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600&h=400',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600&h=400',
      'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=600&h=400'
    ],
    description: 'Help teach basic coding and computer skills to underprivileged youth. We are looking for volunteers with knowledge of HTML, CSS, and basic JavaScript. We will provide the curriculum and laptops.',
    requirements: ['Basic programming knowledge', 'Patience and good communication', 'Prior tutoring experience is a plus'],
    organizer: 'Code for Good',
    organizerAvatar: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=150&h=150',
    skills: ['Teaching', 'JavaScript', 'HTML/CSS']
  },
  {
    id: '3',
    title: 'Senior Citizen Health Camp',
    category: 'Health',
    startDate: new Date(Date.now() + 86400000 * 7).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 7 + 14400000).toISOString(),
    location: 'Mercy General Hospital',
    currentVolunteers: 45,
    maxVolunteers: 100,
    images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200&h=600'],
    relatedImages: [
      'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=600&h=400',
      'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=600&h=400',
      'https://images.unsplash.com/photo-1551076805-e1869043e560?auto=format&fit=crop&q=80&w=600&h=400'
    ],
    description: 'Assist doctors and nurses at our free health camp for senior citizens. Volunteers will help with registration, guiding patients, and distributing prescribed medications and nutrition kits.',
    requirements: ['Compassionate and patient', 'Good communication skills', 'Medical background is a plus but not required'],
    organizer: 'HealthFirst Foundation',
    organizerAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150&h=150',
    skills: ['Communication', 'Empathy']
  },
  {
    id: '4',
    title: 'Neighborhood Food Drive',
    category: 'Community',
    startDate: new Date(Date.now() + 86400000 * 3).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 3 + 18000000).toISOString(),
    location: 'Downtown Square',
    currentVolunteers: 8,
    maxVolunteers: 30,
    images: ['https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&q=80&w=1200&h=600'],
    relatedImages: [
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=600&h=400',
      'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=600&h=400',
      'https://images.unsplash.com/photo-1618477461853-cf6ed80fbea5?auto=format&fit=crop&q=80&w=600&h=400'
    ],
    description: 'Help us sort, pack, and distribute food packages to families in need. Your efforts will directly help combat food insecurity in our local neighborhood.',
    requirements: ['Ability to lift up to 20 lbs', 'Friendly attitude'],
    organizer: 'Community Cares',
    organizerAvatar: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=150&h=150',
    skills: ['Organization', 'Physical Stamina']
  },
  {
    id: '5',
    title: 'Stray Animal Rescue & Care',
    category: 'Animal Welfare',
    startDate: new Date(Date.now() + 86400000 * 10).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 10 + 14400000).toISOString(),
    location: 'Safe Paws Shelter',
    currentVolunteers: 15,
    maxVolunteers: 25,
    images: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1200&h=600'],
    relatedImages: [
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=600&h=400',
      'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&q=80&w=600&h=400',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600&h=400'
    ],
    description: 'Spend your day helping out at the Safe Paws Shelter! Volunteers will assist with feeding, walking dogs, cleaning enclosures, and socializing with rescued cats and dogs.',
    requirements: ['Comfortable around animals', 'Not allergic to cats/dogs'],
    organizer: 'Safe Paws Animal Rescue',
    organizerAvatar: 'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=150&h=150',
    skills: ['Animal Care', 'Compassion']
  },
  {
    id: '6',
    title: 'Open Source Coding Bootcamp',
    category: 'Technology',
    startDate: new Date(Date.now() + 86400000 * 14).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 14 + 28800000).toISOString(),
    location: 'Virtual / Online',
    currentVolunteers: 120,
    maxVolunteers: 500,
    images: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200&h=600'],
    relatedImages: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&h=400',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=400',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600&h=400'
    ],
    description: 'Join our massive online coding bootcamp! We need volunteer mentors to help guide participants through open-source contributions, review pull requests, and answer questions on Discord.',
    requirements: ['Experience with Git and GitHub', 'Proficiency in at least one programming language'],
    organizer: 'Global Tech Initiative',
    organizerAvatar: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=150&h=150',
    skills: ['Programming', 'Mentoring']
  }
];
