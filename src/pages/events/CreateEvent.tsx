import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '../../components/ui/Input';
import styles from './CreateEvent.module.css';
import { useNavigate } from 'react-router-dom';

const STEPS = [
  'Event Information',
  'Requirements',
  'Schedule & Location',
  'Preview'
];

export function CreateEvent() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      triggerConfetti();
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
    <div className={styles.createEventContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Create New Event</h1>
        <p className={styles.subtitle}>Fill out the details below to publish a new volunteer opportunity.</p>
      </div>

      <Card>
        <CardHeader>
          <div className={styles.stepper}>
            {STEPS.map((step, i) => (
              <div 
                key={i} 
                className={`
                  ${styles.step} 
                  ${i === currentStep ? styles.active : ''} 
                  ${i < currentStep ? styles.completed : ''}
                `}
              >
                <div className={styles.stepIcon}>
                  {i < currentStep ? <Check size={16} /> : i + 1}
                </div>
                <div className={styles.stepLabel}>{step}</div>
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className={styles.stepContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && (
                  <div className={styles.formGrid}>
                    <div className={styles.fullWidth}>
                      <Input label="Event Title" placeholder="e.g. Beach Cleanup Drive" />
                    </div>
                    <div className={styles.fullWidth}>
                      <Input label="Description" placeholder="Detailed description of the event..." />
                    </div>
                    <Input label="Category" placeholder="Environment" />
                    <Input label="Maximum Volunteers" type="number" placeholder="50" />
                  </div>
                )}
                
                {currentStep === 1 && (
                  <div className={styles.formGrid}>
                    <div className={styles.fullWidth}>
                      <Input label="Skills Required (comma separated)" placeholder="Physical work, Teamwork" />
                    </div>
                    <div className={styles.fullWidth}>
                      <Input label="Age Requirement" placeholder="18+" />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className={styles.formGrid}>
                    <Input label="Date" type="date" />
                    <Input label="Time" type="time" />
                    <div className={styles.fullWidth}>
                      <Input label="Location Name" placeholder="Central Park" />
                    </div>
                    <div className={styles.fullWidth}>
                      <div className="h-48 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex-center text-slate-400">
                        Google Map Placeholder
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-success/20 text-success rounded-full flex-center mx-auto mb-4">
                      <Check size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Ready to Publish!</h3>
                    <p className="text-slate-500">Review your event details. Once published, volunteers will be able to discover and apply to your event.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.footer}>
            <Button 
              variant="outline" 
              onClick={handlePrev} 
              disabled={currentStep === 0}
            >
              <ArrowLeft size={16} className="mr-2" /> Back
            </Button>
            <Button onClick={handleNext}>
              {currentStep === STEPS.length - 1 ? 'Publish Event' : 'Next Step'} 
              {currentStep !== STEPS.length - 1 && <ArrowRight size={16} className="ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
