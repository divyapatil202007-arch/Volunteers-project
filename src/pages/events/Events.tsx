import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, MapPin, Users, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();
        if (data.success && data.data) {
          setEvents(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Fallback to mock if database is empty or connection fails
  const displayEvents = events.length > 0 ? events : [
    {
      id: 1,
      title: 'City Park Cleanup (Mock)',
      category: 'Environment',
      startDate: new Date().toISOString(),
      location: 'Central City Park',
      currentVolunteers: 24,
      maxVolunteers: 50,
      images: ['https://images.unsplash.com/photo-1595274456578-8314e3650f96?auto=format&fit=crop&q=80&w=400&h=200']
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1 text-slate-800 dark:text-white">Events</h1>
          <p className="text-slate-500">Discover and manage volunteer opportunities.</p>
        </div>
        <Button onClick={() => navigate('/events/create')} className="gap-2">
          <Plus size={18} /> Create Event
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Input icon={<Search size={18} />} placeholder="Search events by name, location, or category..." />
        </div>
        <Button variant="outline">Filters</Button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading events...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayEvents.map((event: any, i: number) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card hoverable className="h-full flex flex-col">
                <div 
                  className="w-full h-48 bg-cover bg-center rounded-t-lg"
                  style={{ backgroundImage: `url(${event.images?.[0] || event.image || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=400&h=200'})` }}
                />
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">{event.title}</h3>
                  
                  <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
                    <div className="flex items-center gap-2">
                      <CalendarIcon size={16} /> {new Date(event.startDate || event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} /> {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} /> {event.currentVolunteers ?? event.volunteers}/{event.maxVolunteers ?? 50} Volunteers
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Button className="w-full" variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
