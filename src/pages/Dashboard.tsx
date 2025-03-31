
import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  FileVideo, 
  BarChart3, 
  Settings, 
  Upload
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { toast } from 'sonner';
import { API_CONFIG } from '@/config/api';
import UploadTab from '@/components/dashboard/UploadTab';
import DashboardTab from '@/components/dashboard/DashboardTab';
import AnalyticsTab from '@/components/dashboard/AnalyticsTab';
import SettingsTab from '@/components/dashboard/SettingsTab';

// Define the prediction results interface based on your Flask model output
interface PredictionResults {
  raw?: string;
  detections?: {
    persons: number;
    resolution: string;
    inferenceTime: number;
  };
  players: Array<{
    id: string;
    name: string;
    position: string;
    distanceCovered: number;
    sprints: number;
    fatigueIndex: number;
    riskScore: number;
  }>;
  performanceData?: any;
  // Add other fields based on your Flask model response
}

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [processingVideo, setProcessingVideo] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [predictionResults, setPredictionResults] = useState<PredictionResults | null>(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [videoLength, setVideoLength] = useState<number>(90); // Default 90 seconds
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success('Dashboard loaded', {
        description: 'Welcome to AthleteGuard AI dashboard',
      });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleVideoUpload = (results: PredictionResults) => {
    setVideoUploaded(true);
    setProcessingVideo(true);
    
    // Show processing toast
    toast.info('Processing video data', {
      description: 'Interpreting AI analysis results from your model',
    });
    
    // Save the prediction results from your Flask model
    setPredictionResults(results);
    
    // Generate a random video length between 30 and 180 seconds
    // In a real app, this would come from the actual video metadata
    const randomLength = Math.floor(Math.random() * 150) + 30; // 30-180 seconds
    setVideoLength(randomLength);
    
    // Simulate a small delay to process the results
    setTimeout(() => {
      setProcessingVideo(false);
      setAnalysisComplete(true);
      toast.success('Video analysis complete', {
        description: 'AI has successfully analyzed player performance using your model',
      });
      
      // Switch to dashboard tab after processing is complete
      setActiveTab('dashboard');
      const dashboardTab = document.querySelector('button[value="dashboard"]');
      if (dashboardTab && dashboardTab instanceof HTMLElement) {
        dashboardTab.click();
      }
    }, 1000);
  };

  // Function to navigate to upload tab
  const navigateToUpload = () => {
    setActiveTab('upload');
    // Find the upload tab trigger and cast it to HTMLElement before using click()
    const uploadTabTrigger = document.querySelector('button[value="upload"]');
    if (uploadTabTrigger && uploadTabTrigger instanceof HTMLElement) {
      uploadTabTrigger.click();
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col gap-6 mt-6">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-1">Dashboard</h1>
                <p className="text-muted-foreground">
                  Upload and analyze sports footage using your Flask model.
                </p>
              </div>
              
              <div className="flex items-center gap-2 py-1 px-3 rounded-full bg-white/5 text-sm text-white/70">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                AI System Connected
              </div>
            </header>
            
            <Tabs 
              defaultValue="upload" 
              className="w-full" 
              value={activeTab}
              onValueChange={handleTabChange}
            >
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="upload" className="gap-2 data-[state=active]:bg-athlete-blue">
                  <Upload size={16} />
                  <span className="hidden sm:inline">Upload</span>
                </TabsTrigger>
                <TabsTrigger value="dashboard" className="gap-2">
                  <LayoutDashboard size={16} />
                  <span className="hidden sm:inline">Dashboard</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="gap-2">
                  <BarChart3 size={16} />
                  <span className="hidden sm:inline">Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2">
                  <Settings size={16} />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="animate-fade-in">
                <UploadTab 
                  videoUploaded={videoUploaded}
                  processingVideo={processingVideo}
                  predictionResults={predictionResults}
                  onVideoUploaded={handleVideoUpload}
                />
              </TabsContent>
              
              <TabsContent value="dashboard" className="animate-fade-in">
                <DashboardTab 
                  videoUploaded={videoUploaded}
                  processingVideo={processingVideo}
                  predictionResults={predictionResults}
                  navigateToUpload={navigateToUpload}
                />
              </TabsContent>
              
              <TabsContent value="analytics" className="animate-fade-in">
                <AnalyticsTab 
                  predictionResults={predictionResults} 
                  videoLength={videoLength}
                />
              </TabsContent>
              
              <TabsContent value="settings" className="animate-fade-in">
                <SettingsTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
