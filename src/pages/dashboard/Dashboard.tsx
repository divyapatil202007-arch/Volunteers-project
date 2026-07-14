import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Award, Calendar, Zap, Sparkles } from 'lucide-react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, MotionCard } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import styles from './Dashboard.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
    x: { grid: { display: false } }
  }
};

const hoursData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Volunteer Hours',
      data: [12, 19, 15, 25, 22, 30],
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const impactData = {
  labels: ['Education', 'Environment', 'Health', 'Community'],
  datasets: [
    {
      label: 'Events Completed',
      data: [8, 5, 12, 4],
      backgroundColor: '#10b981',
      borderRadius: 4,
    },
  ],
};

export function Dashboard() {
  const navigate = useNavigate();
  const [liveEvents, setLiveEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();
        if (data.success && data.data) {
          setLiveEvents(data.data);
        }
      } catch (err) {
        console.error('Failed to load dashboard stats', err);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: 'Total Hours', value: '124', icon: Clock, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Certificates', value: '12', icon: Award, color: 'text-secondary', bg: 'bg-secondary/10' },
    { label: 'Upcoming Events', value: liveEvents.length > 0 ? liveEvents.length.toString() : '3', icon: Calendar, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'AI Match Score', value: '98%', icon: Zap, color: 'text-warning', bg: 'bg-warning/10' },
  ];

  const recentActivities = liveEvents.length > 0 
    ? liveEvents.slice(0, 3).map(ev => ({
        title: `Matched with "${ev.title}"`,
        time: 'Recently',
        icon: Calendar
      }))
    : [
      { title: 'Completed "Tree Plantation Drive"', time: '2 hours ago', icon: Calendar },
      { title: 'Earned "Green Guardian" Badge', time: '1 day ago', icon: Award },
      { title: 'AI matched you with "Beach Cleanup"', time: '2 days ago', icon: Sparkles },
    ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome back, Divya! 👋</h1>
          <p className={styles.subtitle}>Here is your volunteer impact overview.</p>
        </div>
        <Button className="gap-2" onClick={() => navigate('/matches')}>
          <Sparkles size={16} /> Find Matches
        </Button>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <MotionCard 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            hoverable
          >
            <CardContent className="p-6">
              <div className={styles.statHeader}>
                <div className={`${styles.statIcon} ${stat.bg} ${stat.color}`} style={{ backgroundColor: 'var(--surface-hover)', color: 'var(--primary)' }}>
                  <stat.icon size={20} />
                </div>
              </div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </CardContent>
          </MotionCard>
        ))}
      </div>

      <div className={styles.mainGrid}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.chartContainer}>
                <Line data={hoursData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Impact Area</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.chartContainer}>
                <Bar data={impactData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.activityList}>
              {recentActivities.map((activity, i) => (
                <div key={i} className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <activity.icon size={16} />
                  </div>
                  <div className={styles.activityContent}>
                    <div className={styles.activityTitle}>{activity.title}</div>
                    <div className={styles.activityTime}>{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
