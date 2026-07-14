import { Calendar, MapPin, Users } from 'lucide-react';
import styles from './AIChat.module.css';
import { Button } from '@/components/ui/Button';

export function AIEventCard({ data }: { data: any }) {
  return (
    <div className={styles.cardResponse}>
      <h4 className="font-bold text-white mb-2">{data.title}</h4>
      <div className="flex flex-col gap-2 text-sm text-slate-300 mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={14} /> {data.date}
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} /> {data.location}
        </div>
        <div className="flex items-center gap-2">
          <Users size={14} /> {data.volunteers} Volunteers
        </div>
      </div>
      <Button variant="primary" size="sm" className="w-full">View Details</Button>
    </div>
  );
}
