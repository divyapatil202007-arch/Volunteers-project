import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function FloatingCopilot() {
  return (
    <div className="fixed bottom-8 right-8 z-50 group">
      <Button 
        className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 shadow-[0_0_30px_rgba(139,92,246,0.5)] border border-white/20 hover:scale-110 transition-transform animate-float p-0 flex items-center justify-center relative"
      >
        <Bot className="w-8 h-8 text-white" />
      </Button>
      <div className="absolute bottom-full right-0 mb-4 w-80 bg-slate-900 border border-white/10 shadow-xl backdrop-blur-xl rounded-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-bottom-right">
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <Bot className="w-4 h-4 text-blue-400" /> AI Copilot
          </h4>
          <p className="text-xs text-slate-400">
            How can I help you manage this event team?
          </p>
          <div className="flex flex-col gap-2 mt-2">
            <CopilotSuggestion text="Find more photographers" />
            <CopilotSuggestion text="Generate attendance report" />
            <CopilotSuggestion text="Create WhatsApp invitation" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CopilotSuggestion({ text }: { text: string }) {
  return (
    <button className="text-left px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors border border-white/5">
      {text}
    </button>
  );
}
