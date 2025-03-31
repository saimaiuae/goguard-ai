
import React from 'react';
import { BarChart3, AlertTriangle, Server, Clock, Users } from 'lucide-react';
import { API_CONFIG } from '@/config/api';
import { Button } from '@/components/ui/button';

interface AnalyticsTabProps {
  predictionResults?: any;
  videoLength?: number;
}

const AnalyticsTab = ({ predictionResults, videoLength = 0 }: AnalyticsTabProps) => {
  const hasResults = predictionResults && predictionResults.detections;
  
  // Format time in mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="glass-panel rounded-lg p-6">
      {hasResults ? (
        <div className="space-y-6">
          <header className="flex justify-between items-center">
            <h2 className="text-xl font-medium">Detection Results</h2>
            <div className="flex items-center gap-2 py-1 px-3 rounded-full bg-athlete-blue/10 text-sm text-athlete-blue">
              <div className="w-2 h-2 rounded-full bg-athlete-blue"></div>
              From Most Recent Analysis
            </div>
          </header>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="glass-panel p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Users size={14} className="text-athlete-blue" />
                <div className="text-white/60 text-sm">Persons Detected</div>
              </div>
              <div className="text-2xl font-medium">{predictionResults.detections.persons}</div>
            </div>
            <div className="glass-panel p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={14} className="text-athlete-purple" />
                <div className="text-white/60 text-sm">Analysis Duration</div>
              </div>
              <div className="text-2xl font-medium">{formatTime(videoLength)}</div>
            </div>
            <div className="glass-panel p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 size={14} className="text-athlete-orange" />
                <div className="text-white/60 text-sm">Resolution</div>
              </div>
              <div className="text-2xl font-medium">{predictionResults.detections.resolution}</div>
            </div>
            <div className="glass-panel p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Server size={14} className="text-athlete-cyan" />
                <div className="text-white/60 text-sm">Inference Time</div>
              </div>
              <div className="text-2xl font-medium">{predictionResults.detections.inferenceTime} ms</div>
            </div>
          </div>
          
          <div className="neo-panel p-4 rounded-lg">
            <h3 className="font-medium mb-3">Raw Model Output</h3>
            <pre className="bg-black/30 p-3 rounded-md text-xs overflow-x-auto whitespace-pre-wrap">
              {predictionResults.raw || 'No raw output available'}
            </pre>
          </div>
          
          <div className="neo-panel p-4 rounded-lg">
            <h3 className="font-medium mb-3">Players Detected</h3>
            <div className="bg-black/30 p-3 rounded-md text-xs overflow-x-auto">
              <p className="mb-2">Total Players: {predictionResults.players?.length || 0}</p>
              {predictionResults.players && predictionResults.players.length > 0 ? (
                <ul className="space-y-1">
                  {predictionResults.players.map((player: any, index: number) => (
                    <li key={index}>
                      ID: {player.id} | Position: {player.position} | 
                      Sprints: {player.sprints} | Fatigue: {player.fatigueIndex}%
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No player data available</p>
              )}
            </div>
          </div>
          
          <div className="neo-panel p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Server size={18} className="text-athlete-purple" />
              <h3 className="font-medium">API Connection</h3>
            </div>
            <p className="text-sm text-white/70 mb-4">
              You're currently connected to your model API at:
            </p>
            <code className="bg-black/30 px-3 py-2 rounded text-sm block overflow-x-auto">
              {API_CONFIG.getCompleteApiUrl('/predict')}
            </code>
          </div>
        </div>
      ) : (
        <div className="text-center max-w-md mx-auto py-16">
          <BarChart3 size={48} className="text-athlete-blue/50 mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">No Analysis Data Available</h3>
          <p className="text-muted-foreground mb-6">
            Upload a video from the Upload tab to view your model's performance analytics
            and detection results.
          </p>
          <div className="flex justify-center">
            <Button variant="outline" className="gap-2" onClick={() => {
              // Find the upload tab trigger and click it
              const uploadTabTrigger = document.querySelector('button[value="upload"]');
              if (uploadTabTrigger && uploadTabTrigger instanceof HTMLElement) {
                uploadTabTrigger.click();
              }
            }}>
              <AlertTriangle size={16} className="text-athlete-orange" />
              Go to Upload
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsTab;
