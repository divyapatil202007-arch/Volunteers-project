import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, MapPin, Calendar, Clock, Image as ImageIcon, Users, Type, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { NGO_EVENTS } from '../ngo-dashboard/NGOEvents';

const STEPS = [
  'Basic Info',
  'Requirements',
  'Location',
  'Publish'
];

export function CreateEvent() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: ''
  });

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      setIsSubmitting(true);
      triggerConfetti();
      
      const newEvent = {
        id: Date.now(),
        title: eventData.title || 'Awesome Community Event',
        date: eventData.date || 'TBD',
        time: eventData.time || 'TBD',
        location: 'TBD',
        volunteers: 0,
        capacity: 50,
        status: 'Recruiting'
      };
      
      const saved = localStorage.getItem('ngo_events');
      const existing = saved ? JSON.parse(saved) : NGO_EVENTS;
      localStorage.setItem('ngo_events', JSON.stringify([newEvent, ...existing]));

      setTimeout(() => {
        navigate('/events');
      }, 3000);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 pb-24">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
          <Sparkles className="text-white w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create New Event</h1>
        <p className="text-slate-500 max-w-lg mx-auto">Design a compelling volunteer opportunity. Attract the right people to help your community thrive.</p>
      </div>

      <Card className="border-0 shadow-2xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden flex flex-col min-h-[600px]">
        {/* Stepper Header */}
        <div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 p-8">
          <div className="relative flex justify-between max-w-3xl mx-auto">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 z-0 rounded-full" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
            />
            
            {STEPS.map((step, i) => {
              const isActive = i === currentStep;
              const isCompleted = i < currentStep;
              
              return (
                <div key={i} className="relative z-10 flex flex-col items-center gap-3">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base transition-all duration-300 shadow-sm
                      ${isActive ? 'bg-primary text-white scale-110 shadow-primary/30 ring-4 ring-primary/20' : 
                        isCompleted ? 'bg-primary text-white' : 
                        'bg-white dark:bg-slate-900 text-slate-400 border-2 border-slate-200 dark:border-slate-700'
                      }`}
                  >
                    {isCompleted ? <Check size={20} /> : i + 1}
                  </div>
                  <span className={`text-sm font-bold ${isActive ? 'text-primary' : isCompleted ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400'}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <CardContent className="p-8 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Event Title</label>
                    <Input 
                      icon={<Type size={18} />} 
                      placeholder="e.g. Weekend Beach Cleanup Drive" 
                      className="py-3" 
                      value={eventData.title}
                      onChange={(e) => setEventData({...eventData, title: e.target.value})}
                    />
                  </div>
                  
                  <div className="col-span-1 space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Category</label>
                    <select className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-3 px-4 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow">
                      <option>Environment</option>
                      <option>Education</option>
                      <option>Health</option>
                      <option>Community</option>
                      <option>Animal Welfare</option>
                    </select>
                  </div>

                  <div className="col-span-1 space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Maximum Volunteers</label>
                    <Input icon={<Users size={18} />} type="number" placeholder="50" className="py-3" />
                  </div>

                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Description</label>
                    <textarea 
                      rows={5}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-3 px-4 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-shadow"
                      placeholder="Describe the activities, goals, and what volunteers should expect..."
                    />
                  </div>
                </div>
              )}
              
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Required Skills (Comma separated)</label>
                    <Input placeholder="e.g. Heavy lifting, First Aid, Teaching" className="py-3" />
                    <p className="text-xs text-slate-500 ml-1 mt-1">Our AI will match these skills with volunteer profiles.</p>
                  </div>

                  <div className="col-span-1 space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Minimum Age</label>
                    <Input type="number" placeholder="18" className="py-3" />
                  </div>
                  <div className="col-span-1 space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Provided Equipment</label>
                    <Input placeholder="e.g. Gloves, Trash Bags, Water" className="py-3" />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  <div className="col-span-1 space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Date</label>
                    <Input 
                      icon={<Calendar size={18} />} 
                      type="date" 
                      className="py-3" 
                      value={eventData.date}
                      onChange={(e) => setEventData({...eventData, date: e.target.value})}
                    />
                  </div>
                  <div className="col-span-1 space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Time</label>
                    <Input 
                      icon={<Clock size={18} />} 
                      type="time" 
                      className="py-3" 
                      value={eventData.time}
                      onChange={(e) => setEventData({...eventData, time: e.target.value})}
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Location Address</label>
                    <Input icon={<MapPin size={18} />} placeholder="123 Central Park West, NY" className="py-3" />
                  </div>

                  <div className="col-span-1 md:col-span-2 mt-2 p-10 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group">
                    <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                      <ImageIcon size={28} className="text-primary" />
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 text-lg mb-1">Upload Cover Image</span>
                    <span className="text-sm text-slate-500">Drag and drop, or click to browse (PNG, JPG up to 5MB)</span>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="text-center py-16 flex flex-col items-center">
                  <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6 ring-8 ring-emerald-500/20">
                    <Check size={48} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Ready to Publish!</h3>
                  <p className="text-slate-500 max-w-md text-lg">Your event looks perfect. Once published, it will instantly be visible to our community of volunteers and our AI will begin matching candidates.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        {/* Footer Actions - Always visible and pinned to bottom of card */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center rounded-b-xl">
          <Button 
            variant="outline" 
            onClick={handlePrev} 
            disabled={currentStep === 0}
            className={`px-8 py-6 text-lg font-bold border-slate-300 dark:border-slate-600 ${currentStep === 0 ? 'opacity-0 cursor-default' : 'opacity-100'}`}
          >
            <ArrowLeft size={20} className="mr-2" /> Back
          </Button>
          <Button 
            onClick={handleNext}
            disabled={isSubmitting}
            className={`px-10 py-6 text-lg font-bold shadow-xl transition-all hover:-translate-y-1 ${
              currentStep === STEPS.length - 1 
                ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30' 
                : 'bg-primary hover:bg-primary/90 shadow-primary/30'
            }`}
          >
            {currentStep === STEPS.length - 1 ? (
              isSubmitting ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="animate-pulse" /> Publishing...
                </span>
              ) : (
                'Publish Event'
              )
            ) : (
              <span className="flex items-center">
                Continue to {STEPS[currentStep + 1]} <ArrowRight size={20} className="ml-2" />
              </span>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
