import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '../../components/ui/Input';
import styles from './Settings.module.css';

export function Settings() {
  return (
    <div className={styles.settingsContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Manage your account preferences and settings.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className={styles.sectionTitle}>Profile Information</h2>
            <div className={styles.formGrid}>
              <Input label="First Name" defaultValue="Divya" />
              <Input label="Last Name" defaultValue="Patil" />
              <div className={styles.fullWidth}>
                <Input label="Email Address" type="email" defaultValue="divya@example.com" />
              </div>
              <div className={styles.fullWidth}>
                <Input label="Bio" placeholder="Tell us about yourself..." />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className={styles.sectionTitle}>Preferences</h2>
            <div className={styles.toggleRow}>
              <div className={styles.toggleInfo}>
                <span className={styles.toggleTitle}>Email Notifications</span>
                <span className={styles.toggleDesc}>Receive updates about new events and matches</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary" />
            </div>
            <div className={styles.toggleRow}>
              <div className={styles.toggleInfo}>
                <span className={styles.toggleTitle}>Public Profile</span>
                <span className={styles.toggleDesc}>Allow NGOs to find and invite you</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary" />
            </div>
            <div className={styles.toggleRow}>
              <div className={styles.toggleInfo}>
                <span className={styles.toggleTitle}>Dark Mode</span>
                <span className={styles.toggleDesc}>Toggle application appearance</span>
              </div>
              <input type="checkbox" className="w-4 h-4 text-primary" />
            </div>
          </CardContent>
        </Card>

        <div className={styles.saveBtn}>
          <Button size="lg">Save Changes</Button>
        </div>
      </motion.div>
    </div>
  );
}
