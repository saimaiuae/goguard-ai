
import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import PlayerStats from '@/components/PlayerStats';
import PerformanceChart from '@/components/PerformanceChart';
import PlayerList from '@/components/PlayerList';
import RiskFactor from './RiskFactor';

interface DashboardTabProps {
  videoUploaded: boolean;
  processingVideo: boolean;
  predictionResults: any;
  navigateToUpload: () => void;
}

const DashboardTab = ({ 
  videoUploaded, 
  processingVideo, 
  predictionResults, 
  navigateToUpload 
}: DashboardTabProps) => {
  const [videoLength, setVideoLength] = useState<number>(90); // Default 90 seconds

  // Set video length when predictions change
  useEffect(() => {
    // Generate a random video length between 30 and 180 seconds
    // In a real app, this would come from the actual video duration
    if (predictionResults) {
      const randomLength = Math.floor(Math.random() * 150) + 30; // 30-180 seconds
      setVideoLength(randomLength);
    }
  }, [predictionResults]);

  if (!videoUploaded) {
    return (
      <div className="glass-panel rounded-lg p-10 flex items-center justify-center">
        <div className="text-center max-w-lg">
          <AlertTriangle size={40} className="text-athlete-orange mx-auto mb-4" />
          <h2 className="text-xl font-medium mb-2">No Video Analyzed Yet</h2>
          <p className="text-muted-foreground mb-4">
            To view real-time player analysis, please upload a video from the Upload tab.
          </p>
          <button 
            onClick={navigateToUpload}
            className="bg-athlete-blue hover:bg-athlete-blue/80 text-white px-4 py-2 rounded-md transition-colors"
          >
            Go to Upload
          </button>
        </div>
      </div>
    );
  }

  if (processingVideo) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-t-athlete-blue border-r-athlete-blue/30 border-b-athlete-blue/10 border-l-athlete-blue/50 rounded-full animate-spin"></div>
          <div className="text-muted-foreground">Processing video data from your Flask model...</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Performance Summary</h2>
        <div className="flex items-center gap-2 py-1 px-3 rounded-full bg-athlete-blue/10 text-sm text-athlete-blue">
          <div className="w-2 h-2 rounded-full bg-athlete-blue animate-pulse"></div>
          Your Model Analysis
        </div>
      </div>
      
      <PlayerStats 
        videoLength={videoLength} 
        predictionResults={predictionResults} 
      />
      
      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4">Performance Trends</h2>
        <PerformanceChart videoLength={videoLength} />
      </div>
      
      <div className="mt-8">
        <PlayerList 
          players={predictionResults?.players || []} 
          videoLength={videoLength}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="glass-panel p-6 rounded-lg col-span-1">
          <h3 className="font-medium text-lg mb-4">Injury Risk Factors</h3>
          <div className="space-y-4">
            <RiskFactor 
              label="Running Form" 
              value={75} 
              description="Minor asymmetry in stride pattern" 
            />
            <RiskFactor 
              label="Landing Mechanics" 
              value={60} 
              description="Occasional heavy landings" 
            />
            <RiskFactor 
              label="Movement Range" 
              value={82} 
              description="Good overall range of motion" 
            />
            <RiskFactor 
              label="Fatigue Response" 
              value={45} 
              description="Form deteriorates when fatigued" 
              warning
            />
          </div>
        </div>
        
        <div className="glass-panel p-6 rounded-lg col-span-1 md:col-span-2">
          <h3 className="font-medium text-lg mb-4">AI Recommendations</h3>
          <div className="space-y-4">
            <div className="neo-panel p-4 rounded-lg border-l-4 border-l-athlete-blue">
              <h4 className="font-medium">Consider Substitution at 70-80 Minutes</h4>
              <p className="text-white/70 text-sm mt-1">
                Performance metrics show significant fatigue after 70 minutes of play, increasing injury risk. Consider a substitution in this window.
              </p>
            </div>
            <div className="neo-panel p-4 rounded-lg border-l-4 border-l-athlete-orange">
              <h4 className="font-medium">Modify Sprint Training</h4>
              <p className="text-white/70 text-sm mt-1">
                Sprint performance decreases by 35% in second half. Recommend focused sprint endurance training to maintain performance longer.
              </p>
            </div>
            <div className="neo-panel p-4 rounded-lg border-l-4 border-l-athlete-purple">
              <h4 className="font-medium">Recovery Protocol</h4>
              <p className="text-white/70 text-sm mt-1">
                Based on fatigue patterns, implement enhanced recovery protocol with focus on lower limb muscle groups.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
