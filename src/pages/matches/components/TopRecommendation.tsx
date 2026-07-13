import { Star } from 'lucide-react';

export function TopRecommendation() {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-emerald-900/40 to-transparent border border-emerald-500/20">
      <div className="p-2 bg-emerald-500/20 rounded-full">
        <Star className="w-5 h-5 text-emerald-400" fill="currentColor" />
      </div>
      <p className="text-emerald-50 text-sm font-medium">
        <strong className="text-emerald-400">AI recommends</strong> inviting these volunteers first for maximum event success.
      </p>
    </div>
  );
}
