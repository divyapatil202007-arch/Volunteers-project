import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Star, Award, Shield, CheckCircle, Mail, Phone, Calendar, Clock, BookOpen, Send, MessageCircle, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

interface CandidateProfileModalProps {
  volunteer: any;
  onClose: () => void;
}

export function CandidateProfileModal({ volunteer, onClose }: CandidateProfileModalProps) {
  const navigate = useNavigate();
  const [isInviting, setIsInviting] = useState(false);
  const [isInvited, setIsInvited] = useState(false);
  const [isMessaging, setIsMessaging] = useState(false);
  const [isMessaged] = useState(false);

  if (!volunteer) return null;

  const handleInvite = () => {
    setIsInviting(true);
    setTimeout(() => {
      setIsInviting(false);
      setIsInvited(true);
      setTimeout(() => setIsInvited(false), 3000);
    }, 1000);
  };

  const handleMessage = () => {
    setIsMessaging(true);
    setTimeout(() => {
      onClose();
      navigate('/messages', { 
        state: { 
          contactId: volunteer.id.toString(), 
          contactName: volunteer.name, 
          avatar: volunteer.avatar 
        } 
      });
    }, 500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl custom-scrollbar"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* Header Banner */}
          <div className="h-32 w-full bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          </div>

          <div className="px-8 pb-8">
            {/* Profile Header Info */}
            <div className="relative flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-16 mb-8">
              <div className="w-32 h-32 rounded-2xl ring-4 ring-slate-900 overflow-hidden bg-slate-800 shadow-xl shrink-0">
                <img src={volunteer.avatar} alt={volunteer.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-3xl font-bold text-white">{volunteer.name}</h2>
                  <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${volunteer.rankColor} bg-slate-800/50 border border-white/5 flex items-center gap-1`}>
                    {volunteer.rank}
                  </div>
                </div>
                <div className="text-slate-400 font-medium flex items-center gap-4 text-sm">
                  <span>{volunteer.role}</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> {volunteer.distance} away</span>
                </div>
              </div>

              <div className="flex gap-3 pb-2 w-full sm:w-auto">
                <Button 
                  onClick={handleInvite}
                  disabled={isInviting || isInvited}
                  className={`flex-1 sm:flex-none transition-colors ${isInvited ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                >
                  {isInviting ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Inviting...</>
                  ) : isInvited ? (
                    <><Check className="w-4 h-4 mr-2" /> Invited!</>
                  ) : (
                    <><Send size={16} className="mr-2" /> Invite</>
                  )}
                </Button>
                <Button 
                  onClick={handleMessage}
                  disabled={isMessaging || isMessaged}
                  variant="outline" 
                  className={`flex-1 sm:flex-none transition-colors ${isMessaged ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20' : 'border-slate-700 hover:bg-slate-800'}`}
                >
                  {isMessaging ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Opening...</>
                  ) : isMessaged ? (
                    <><Check className="w-4 h-4 mr-2" /> Sent!</>
                  ) : (
                    <><MessageCircle size={16} className="mr-2" /> Message</>
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column (Stats & AI) */}
              <div className="space-y-6">
                
                {/* AI Match Overview */}
                <Card className="border-blue-500/20 bg-blue-500/5 shadow-lg shadow-blue-500/5">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-xl font-bold text-blue-400">{volunteer.matchScore}%</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white">AI Match Score</h4>
                        <p className="text-xs text-blue-300">Highly Recommended</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-slate-300">
                      {volunteer.aiReason.split('✔').filter(Boolean).map((reason: string, i: number) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                          <span>{reason.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="border-slate-800 bg-slate-900/50">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                      <div className="flex items-center gap-3 text-slate-400">
                        <Star size={18} className="text-yellow-500" /> 
                        <span>Rating</span>
                      </div>
                      <span className="font-bold text-white">4.9 / 5.0</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                      <div className="flex items-center gap-3 text-slate-400">
                        <Clock size={18} className="text-blue-400" /> 
                        <span>Total Hours</span>
                      </div>
                      <span className="font-bold text-white">{volunteer.hours} hrs</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3 text-slate-400">
                        <Shield size={18} className="text-emerald-500" /> 
                        <span>Reliability</span>
                      </div>
                      <span className="font-bold text-emerald-400">{volunteer.reliability}%</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card className="border-slate-800 bg-slate-900/50">
                  <CardContent className="p-5 space-y-4">
                    <h4 className="font-semibold text-white mb-2">Contact Details</h4>
                    <div className="flex items-center gap-3 text-slate-300 text-sm">
                      <Mail size={16} className="text-slate-500" />
                      {volunteer.name.split(' ')[0].toLowerCase()}@example.com
                    </div>
                    <div className="flex items-center gap-3 text-slate-300 text-sm">
                      <Phone size={16} className="text-slate-500" />
                      +1 (555) 123-4567
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column (Details) */}
              <div className="lg:col-span-2 space-y-8">
                
                <section>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-indigo-400" /> About
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    {volunteer.name} is a dedicated volunteer with extensive experience in {volunteer.skills[0].toLowerCase()} and {volunteer.skills[1].toLowerCase()}. 
                    They have consistently shown up for complex projects and possess a high degree of reliability. With {volunteer.hours} hours logged on the platform, they are a trusted community member.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Award size={20} className="text-emerald-400" /> Top Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {volunteer.skills.map((skill: string) => (
                      <span key={skill} className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-slate-800 border border-slate-700 text-slate-200">
                        {skill}
                      </span>
                    ))}
                    <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-slate-800 border border-slate-700 text-slate-200">
                      Teamwork
                    </span>
                    <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-slate-800 border border-slate-700 text-slate-200">
                      Problem Solving
                    </span>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Calendar size={20} className="text-purple-400" /> Recent Activity
                  </h3>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                    
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-slate-900 bg-emerald-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-white text-sm">River Cleanup Drive</h4>
                          <span className="text-xs text-emerald-400 font-bold">Completed</span>
                        </div>
                        <p className="text-xs text-slate-400">2 weeks ago • 5 hours</p>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-slate-900 bg-emerald-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-white text-sm">Downtown Food Kitchen</h4>
                          <span className="text-xs text-emerald-400 font-bold">Completed</span>
                        </div>
                        <p className="text-xs text-slate-400">1 month ago • 8 hours</p>
                      </div>
                    </div>

                  </div>
                </section>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
