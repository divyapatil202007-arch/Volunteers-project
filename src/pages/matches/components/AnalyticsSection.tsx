import { PieChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Medical', 'Logistics', 'Teaching', 'Other'],
  datasets: [
    {
      data: [35, 25, 20, 20],
      backgroundColor: [
        'rgba(37, 99, 235, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(71, 85, 105, 0.8)',
      ],
      borderColor: [
        'rgba(37, 99, 235, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(139, 92, 246, 1)',
        'rgba(71, 85, 105, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: '#cbd5e1',
        padding: 20,
      }
    }
  },
  cutout: '70%',
};

export function AnalyticsSection() {
  return (
    <Card className="bg-slate-900/50 border-white/10 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <PieChart className="w-5 h-5 text-violet-400" /> Skill Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center">
          <Doughnut data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
