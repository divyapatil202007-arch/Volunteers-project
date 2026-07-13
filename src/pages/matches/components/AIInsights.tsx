import { Lightbulb, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AIInsights() {
  return (
    <Card className="bg-slate-900/50 border-white/10 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" /> AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-1">
            <TrendingUp className="w-4 h-4" /> Strongest Skill Area
          </div>
          <div className="text-xl font-bold text-slate-200">Leadership & Medical</div>
          <p className="text-sm text-slate-400 mt-1">Your matched pool has an abundance of qualified leaders and first-aid certified volunteers.</p>
        </div>

        <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20">
          <div className="flex items-center gap-2 text-rose-400 font-semibold mb-1">
            <AlertCircle className="w-4 h-4" /> Weakest Area
          </div>
          <div className="text-xl font-bold text-slate-200">Logistics & Transport</div>
          <p className="text-sm text-slate-400 mt-1">Only 12% of matched volunteers have driving experience.</p>
        </div>

        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
            <Lightbulb className="w-4 h-4" /> AI Suggestion
          </div>
          <p className="text-sm text-slate-300">
            Broaden the search radius to 10km to recruit 3 additional Logistics volunteers. This will increase event success probability to 99%.
          </p>
        </div>

      </CardContent>
    </Card>
  );
}
