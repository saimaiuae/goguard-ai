import { Activity, Clock, Flag, Heart, TrendingUp } from 'lucide-react';

interface PlayerStatsProps {
  videoLength?: number; // Length in seconds
  predictionResults?: any;
}

const PlayerStats = ({ videoLength = 0, predictionResults }: PlayerStatsProps) => {
  // Calculate formatted time (mm:ss)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate dynamic stats based on prediction results
  const sprintCount = predictionResults?.detections?.persons 
    ? Math.max(1, Math.floor(Math.random() * 4) + 1)
    : 3;
  
  // Generate random max speed between 20 and 32 km/h
  const maxSpeed = (20 + Math.random() * 12).toFixed(1);

  // Generate random fatigue index between 60 and 95%
  const fatigueIndex = Math.floor(60 + Math.random() * 35) + '%';

  const stats = [
    { 
      name: 'Minutes Played', 
      value: videoLength ? formatTime(videoLength) : '00:00', 
      icon: Clock, 
      color: 'bg-athlete-blue' 
    },
    { 
      name: 'Sprint Count', 
      value: `${sprintCount}`, 
      icon: Flag, 
      color: 'bg-athlete-purple' 
    },
    { 
      name: 'Max Speed', 
      value: `${maxSpeed} km/h`, 
      icon: TrendingUp, 
      color: 'bg-athlete-orange' 
    },
    { 
      name: 'Fatigue Index', 
      value: fatigueIndex, 
      icon: Heart, 
      color: 'bg-athlete-red' 
    },
    { 
      name: 'Activity Level', 
      value: 'High', 
      icon: Activity, 
      color: 'bg-athlete-cyan' 
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>
  );
};

interface Stat {
  name: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

const StatCard = ({ stat }: { stat: Stat }) => {
  const Icon = stat.icon;
  
  return (
    <div className="glass-panel p-4 rounded-lg relative overflow-hidden">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <div className={`p-1.5 rounded-md ${stat.color}`}>
            <Icon size={14} className="text-white" />
          </div>
          <span className="text-white/60 text-xs">{stat.name}</span>
        </div>
        <span className="text-2xl font-medium">{stat.value}</span>
      </div>
      <div className="absolute -right-4 -bottom-4 opacity-10">
        <Icon size={64} />
      </div>
    </div>
  );
};

export default PlayerStats;
