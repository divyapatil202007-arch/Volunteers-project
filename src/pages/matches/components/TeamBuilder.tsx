import { Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function TeamBuilder() {
  return (
    <Card className="bg-slate-900/50 border-white/10 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-400" /> AI Assembled Team
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative py-8 flex justify-center">
          
          {/* Connector Line */}
          <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-800 -translate-y-1/2 rounded-full hidden md:block" />
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 relative z-10 w-full justify-between items-center">
            
            {/* Leader Node */}
            <TeamNode 
              role="Event Manager"
              name="Marcus J."
              color="border-amber-500/50 bg-amber-500/10 text-amber-400"
            />
            
            {/* Core Team Nodes */}
            <div className="flex gap-4 md:gap-12">
              <TeamNode 
                role="Medical Lead"
                name="Sarah C."
                color="border-rose-500/50 bg-rose-500/10 text-rose-400"
              />
              <TeamNode 
                role="Logistics"
                name="David W."
                color="border-blue-500/50 bg-blue-500/10 text-blue-400"
              />
              <TeamNode 
                role="Coordinator"
                name="Elena R."
                color="border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
              />
            </div>
            
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TeamNode({ role, name, color }: { role: string, name: string, color: string }) {
  return (
    <div className={`flex flex-col items-center justify-center p-4 rounded-xl border ${color} shadow-lg backdrop-blur-sm w-32 h-32 transition-transform hover:scale-105`}>
      <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-current mb-2 flex items-center justify-center font-bold text-sm">
        {name.charAt(0)}
      </div>
      <div className="text-xs font-semibold text-center uppercase tracking-wider mb-1">{role}</div>
      <div className="text-sm font-medium text-slate-200">{name}</div>
    </div>
  );
}
