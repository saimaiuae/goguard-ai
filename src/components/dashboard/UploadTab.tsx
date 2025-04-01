
import React from 'react';
import VideoUploader from '@/components/VideoUploader';
import Step from './Step';
import RecentVideo from './RecentVideo';
import { API_CONFIG } from '@/config/api';

interface UploadTabProps {
  videoUploaded: boolean;
  processingVideo: boolean;
  predictionResults: any;
  onVideoUploaded: (results: any) => void;
}

const UploadTab = ({ 
  videoUploaded, 
  processingVideo, 
  predictionResults, 
  onVideoUploaded 
}: UploadTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="glass-panel rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4">Upload Video</h2>
          <VideoUploader 
            onVideoUploaded={onVideoUploaded} 
            modelApiUrl={API_CONFIG.modelApiUrl}
          />
        </div>
        
        <div className="glass-panel rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4">Recently Analyzed</h2>
          <div className="space-y-3">
            {videoUploaded && (
              <RecentVideo 
                title="Team Practice - Current Session" 
                duration={processingVideo ? "Processing..." : "Analyzed"} 
                date={new Date().toLocaleDateString()} 
                players={processingVideo ? "Analyzing..." : predictionResults?.players?.length.toString() || "0"}
                isNew
              />
            )}
            <RecentVideo 
              title="Team Practice - Jun 15" 
              duration="01:32:45" 
              date="Jun 15, 2023" 
              players={12} 
            />
            <RecentVideo 
              title="Championship Game" 
              duration="01:48:12" 
              date="May 28, 2023" 
              players={11} 
            />
            <RecentVideo 
              title="Training Session" 
              duration="00:45:30" 
              date="May 20, 2023" 
              players={9} 
            />
          </div>
        </div>
      </div>
      
      <div className="glass-panel rounded-lg p-6 h-fit">
        <h2 className="text-xl font-medium mb-6">How It Works</h2>
        <div className="space-y-6">
          <Step 
            number={1} 
            title="Upload Your Video" 
            description="Upload footage that will be sent to your Flask AI model for processing." 
          />
          <Step 
            number={2} 
            title="AI Processes the Video" 
            description="Your Flask backend analyzes the video using your trained AI models." 
          />
          <Step 
            number={3} 
            title="Review ML Insights" 
            description="View the analysis results returned by your Flask model in our dashboard." 
          />
          <Step 
            number={4} 
            title="Take Action Based on Analysis" 
            description="Use the ML-driven insights to make informed decisions about player performance." 
          />
        </div>
      </div>
    </div>
  );
};

export default UploadTab;
