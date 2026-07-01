import { motion } from 'framer-motion';
import { Plus, Search, MapPin, Users, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: 'City Park Cleanup',
    category: 'Environment',
    date: 'Jul 15, 2026',
    time: '09:00 AM - 12:00 PM',
    location: 'Central City Park',
    volunteers: '24/50',
    image: 'https://images.unsplash.com/photo-1595274456578-8314e3650f96?auto=format&fit=crop&q=80&w=400&h=200'
  },
  {
    id: 2,
    title: 'Food Drive Weekend',
    category: 'Community',
    date: 'Jul 18, 2026',
    time: '10:00 AM - 04:00 PM',
    location: 'Community Center',
    volunteers: '89/100',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=400&h=200'
  }
];

export function Events() {
  const navigate = useNavigate();

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {UPCOMING_EVENTS.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card hoverable className="h-full flex flex-col">
              <div 
                className="w-full h-48 bg-cover bg-center rounded-t-lg"
                style={{ backgroundImage: `url(${event.image})` }}
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
                    <CalendarIcon size={16} /> {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} /> {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} /> {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} /> {event.volunteers} Volunteers
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
    </div>
  );
}
