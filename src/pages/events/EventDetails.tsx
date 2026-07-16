import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowLeft, Info, CheckCircle2, Share2, Heart, Award, Shield, Settings, Download, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const MOCK_EVENTS = [
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

export function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);
  const userRole = localStorage.getItem('userRole') || 'volunteer';
  const [showRosterModal, setShowRosterModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [eventStatus, setEventStatus] = useState('Active');

  const handleExportRoster = () => {
    setIsExporting(true);
    const csvContent = "Name,Email,Role,Match Score,Status\nSarah Jenkins,sarah@example.com,Volunteer,94%,Confirmed\nMichael Chen,michael@example.com,Team Lead,88%,Confirmed\nEmma Watson,emma@example.com,Volunteer,76%,Pending";
    setTimeout(() => {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `Roster_${event?.title.replace(/\s+/g, '_')}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExporting(false);
    }, 800);
  };

  useEffect(() => {
    // Simulate API fetch
    const fetchEvent = async () => {
      setLoading(true);
      try {
        // Real implementation would fetch from /api/events/:id
        const found = MOCK_EVENTS.find(e => e.id === id) || {
          ...MOCK_EVENTS[0], 
          id: id,
          title: 'Sample Event Title',
          description: 'This is a dynamically loaded event description. In a real application, this data would be fetched from your database using the event ID from the URL.'
        };
        setTimeout(() => {
          setEvent(found);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error('Failed to fetch event details', err);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Event Not Found</h2>
        <Button className="mt-4" onClick={() => navigate('/events')}>Back to Events</Button>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'environment': return 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-400/10 border-emerald-200 dark:border-emerald-800/50';
      case 'education': return 'text-blue-700 bg-blue-50 dark:text-blue-400 dark:bg-blue-400/10 border-blue-200 dark:border-blue-800/50';
      case 'health': return 'text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-400/10 border-rose-200 dark:border-rose-800/50';
      case 'community': return 'text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-400/10 border-amber-200 dark:border-amber-800/50';
      case 'animal welfare': return 'text-purple-700 bg-purple-50 dark:text-purple-400 dark:bg-purple-400/10 border-purple-200 dark:border-purple-800/50';
      case 'technology': return 'text-indigo-700 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-400/10 border-indigo-200 dark:border-indigo-800/50';
      default: return 'text-slate-700 bg-slate-50 dark:text-slate-400 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
    }
  };

  const progress = Math.round((event.currentVolunteers / event.maxVolunteers) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto pb-12"
    >
      <Button 
        variant="ghost" 
        onClick={() => navigate('/events')}
        className="mb-6 -ml-2 text-slate-500 hover:text-slate-800 dark:hover:text-white"
      >
        <ArrowLeft size={18} className="mr-2" /> Back to Events
      </Button>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
        {/* Banner Image */}
        <div className="relative h-64 md:h-80 w-full bg-slate-200 dark:bg-slate-800">
          <img 
            src={event.title === 'City Park Cleanup Drive' ? '/city_park_cleanup.png' : event.images?.[0] || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200&h=600'} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="outline" size="sm" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20">
              <Share2 size={16} className="mr-2" /> Share
            </Button>
            <Button variant="outline" size="sm" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20">
              <Heart size={16} />
            </Button>
          </div>

          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 right-6">
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border shadow-sm backdrop-blur-md ${getCategoryColor(event.category)}`}>
                {event.category}
              </span>
              {eventStatus === 'Cancelled' && (
                <span className="inline-block text-xs font-bold px-3 py-1 rounded-full border border-rose-500/50 bg-rose-500/20 text-rose-100 shadow-sm backdrop-blur-md">
                  CANCELLED
                </span>
              )}
            </div>
            <h1 className={`text-3xl md:text-5xl font-bold text-white leading-tight mb-2 ${eventStatus === 'Cancelled' ? 'line-through opacity-70' : ''}`}>
              {event.title}
            </h1>
            <p className="text-slate-200 flex items-center gap-2">
              <MapPin size={18} /> {event.location}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <Info size={20} className="text-primary" /> About This Event
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                {event.description}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-primary" /> Requirements
              </h2>
              <ul className="space-y-3">
                {(event.requirements || ['Enthusiasm and a positive attitude!']).map((req: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {event.skills && (
              <section>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                  <Award size={20} className="text-primary" /> Skills You'll Use
                </h2>
                <div className="flex flex-wrap gap-2">
                  {event.skills.map((skill: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary font-medium rounded-lg border border-primary/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {event.relatedImages && (
              <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                  <Heart size={20} className="text-primary" /> Related Images
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(event.title === 'City Park Cleanup Drive' ? ['/cleanup_related_1.png', '/cleanup_related_2.png', '/cleanup_related_3.png'] : event.relatedImages).map((img: string, i: number) => (
                    <div key={i} className="relative h-40 rounded-xl overflow-hidden shadow-sm group">
                      <img 
                        src={img} 
                        alt={`Related event image ${i + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-slate-700 dark:text-slate-200">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <p className="font-bold">{new Date(event.startDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      <p className="text-sm text-slate-500">
                        {new Date(event.startDate).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} 
                        {event.endDate && ` - ${new Date(event.endDate).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-slate-700 dark:text-slate-200">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="font-bold">Location</p>
                      <p className="text-sm text-slate-500">{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Users size={18} /> Volunteers
                      </span>
                      <span className="text-sm font-semibold text-primary">{progress}% Filled</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-2">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-1000" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 text-center font-medium">
                      {event.currentVolunteers} {userRole === 'ngo' ? 'registered' : 'joined'} out of {event.maxVolunteers} needed
                    </p>
                  </div>

                  {userRole === 'ngo' ? (
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="w-full font-bold shadow-sm"
                        onClick={() => navigate(`/events/create`)}
                      >
                        Edit Details
                      </Button>
                      <Button 
                        size="lg" 
                        onClick={() => setShowRosterModal(true)}
                        className="w-full font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/30"
                      >
                        <Users size={18} className="mr-2" /> View List
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      size="lg" 
                      className={`w-full font-bold text-lg shadow-lg ${joined ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30' : 'bg-primary hover:bg-primary/90 text-white shadow-primary/30'}`}
                      onClick={() => setJoined(!joined)}
                    >
                      {joined ? (
                        <>
                          <CheckCircle2 size={20} className="mr-2" /> You're Going!
                        </>
                      ) : (
                        'Join Event'
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800">
              <CardContent className="p-6">
                {userRole === 'ngo' ? (
                  <>
                    <h3 className="font-bold text-slate-800 dark:text-white mb-4 uppercase text-xs tracking-wider flex items-center gap-2">
                      <Settings size={14} /> Management Tools
                    </h3>
                    <div className="space-y-3">
                      <Button onClick={handleExportRoster} disabled={isExporting} variant="outline" className="w-full justify-start text-slate-600 dark:text-slate-300">
                        {isExporting ? <div className="w-4 h-4 mr-3 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" /> : <Download size={16} className="mr-3 text-slate-400" />} 
                        {isExporting ? 'Exporting...' : 'Export CSV Roster'}
                      </Button>
                      <Button onClick={() => navigate('/messages')} variant="outline" className="w-full justify-start text-slate-600 dark:text-slate-300">
                        <MessageSquare size={16} className="mr-3 text-slate-400" /> Message Volunteers
                      </Button>
                      <Button 
                        disabled={eventStatus === 'Cancelled'}
                        onClick={() => setShowCancelModal(true)} 
                        variant="outline" 
                        className="w-full justify-start text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-500/10 border-rose-200 dark:border-rose-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {eventStatus === 'Cancelled' ? 'Event Cancelled' : 'Cancel Event'}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="font-bold text-slate-800 dark:text-white mb-4 uppercase text-xs tracking-wider">Organized By</h3>
                    <div className="flex items-center gap-4">
                      <img 
                        src={event.organizerAvatar || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=150&h=150'} 
                        alt={event.organizer}
                        className="w-14 h-14 rounded-full border-2 border-slate-100 dark:border-slate-800"
                      />
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">{event.organizer || 'Local Community NGO'}</p>
                        <p className="text-sm text-primary hover:underline cursor-pointer">View Profile</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Volunteer Roster Modal */}
      {showRosterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowRosterModal(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Registered Volunteers</h2>
              <button onClick={() => setShowRosterModal(false)} className="text-slate-400 hover:text-slate-600"><CheckCircle2 size={24} /></button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                {['Sarah Jenkins', 'Michael Chen', 'Emma Watson'].map((name, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">{name[0]}</div>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">{name}</p>
                        <p className="text-xs text-slate-500">9{4-i}% AI Match</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Message</Button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowCancelModal(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden text-center p-8">
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-500/20 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Cancel Event?</h2>
            <p className="text-slate-500 mb-6">Are you sure you want to cancel this event? All registered volunteers will be notified immediately.</p>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => setShowCancelModal(false)}>Keep Event</Button>
              <Button className="bg-rose-600 hover:bg-rose-700 text-white" onClick={() => { setEventStatus('Cancelled'); setShowCancelModal(false); }}>Yes, Cancel It</Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
