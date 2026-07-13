import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MapSection() {
  return (
    <Card className="bg-slate-900/50 border-white/10 backdrop-blur-md overflow-hidden">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-red-400" /> Event Radius
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative w-full h-64 bg-slate-800 flex items-center justify-center overflow-hidden">
          
          {/* Mock Map Background grid */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />
          
          {/* Animated Radius */}
          <div className="absolute w-48 h-48 rounded-full border border-blue-500/50 bg-blue-500/10 animate-pulse-glow" />
          <div className="absolute w-32 h-32 rounded-full border border-blue-400/50 bg-blue-400/20" />
          
          {/* Event Center */}
          <div className="absolute w-4 h-4 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,1)] z-10" />

          {/* Nearby Volunteers (Mock Pins) */}
          <VolunteerPin top="30%" left="40%" />
          <VolunteerPin top="60%" left="55%" />
          <VolunteerPin top="45%" left="70%" />
          <VolunteerPin top="20%" left="60%" />
          <VolunteerPin top="70%" left="35%" />
          
        </div>
      </CardContent>
    </Card>
  );
}

function VolunteerPin({ top, left }: { top: string, left: string }) {
  return (
    <div 
      className="absolute w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)] border border-white/50"
      style={{ top, left }}
    />
  );
}
