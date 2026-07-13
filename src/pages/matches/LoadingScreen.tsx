import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

const messages = [
  "🤖 Initializing AI Matching Engine...",
  "✓ Reading Event Requirements...",
  "✓ Scanning Volunteer Database...",
  "✓ Comparing Skills...",
  "✓ Calculating Distance...",
  "✓ Checking Availability...",
  "✓ Predicting Attendance...",
  "✓ Ranking Volunteers...",
  "✓ Optimizing Team Composition..."
];

export function LoadingScreen() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 350); // Speed of message cycling
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-slate-900">
      
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-30 mix-blend-screen"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.4) 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating particles (Mock implementation using absolute divs) */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full z-0"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [null, 0]
          }}
          transition={{
            duration: Math.random() * 2 + 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Large Glowing AI Orb */}
      <div className="relative z-10 flex items-center justify-center mb-12">
        <motion.div
          className="absolute w-48 h-48 rounded-full blur-3xl opacity-50 bg-blue-600"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="relative w-32 h-32 rounded-full shadow-[0_0_40px_rgba(37,99,235,0.8)] border border-blue-400/30 overflow-hidden"
          style={{
            background: "radial-gradient(circle at center, #1e3a8a 0%, #0f172a 100%)"
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          {/* Inner animated core */}
          <motion.div 
            className="absolute inset-0 border-t-2 border-r-2 border-blue-400 rounded-full"
            animate={{ rotate: -720 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-4 border-b-2 border-l-2 border-emerald-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* Messages */}
      <div className="z-10 flex flex-col items-center w-full max-w-md h-64 overflow-hidden mask-image-b">
        <AnimatePresence>
          {messages.slice(0, currentMessageIndex + 1).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-3 w-full p-3 rounded-lg mb-2 font-medium ${
                i === currentMessageIndex ? "bg-white/10 text-white shadow-lg backdrop-blur-sm border border-white/10" : "text-slate-400"
              }`}
            >
              {i > 0 && <Check className="w-5 h-5 text-emerald-400" />}
              {msg.replace('✓ ', '')}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Progress Circle Bottom */}
      <motion.div 
        className="absolute bottom-10 w-12 h-12 border-4 border-blue-900 border-t-blue-500 rounded-full z-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
