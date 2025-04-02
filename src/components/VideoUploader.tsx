
import { useState, useRef } from 'react';
import { Upload, X, FileVideo, Play, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { API_CONFIG } from '@/config/api';

interface VideoUploaderProps {
  onVideoUploaded?: (predictions: any) => void;
  modelApiUrl?: string;
}

const VideoUploader = ({ 
  onVideoUploaded, 
  modelApiUrl 
}: VideoUploaderProps) => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [apiStatus, setApiStatus] = useState<'unknown' | 'connected' | 'error'>('unknown');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFile = (file: File) => {
    // Check if file is a video
    if (!file.type.includes('video/')) {
      toast.error('Please upload a video file', {
        description: 'Only video files are accepted.',
      });
      return false;
    }

    // Check file size (limit to 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast.error('File too large', {
        description: 'Maximum file size is 100MB.',
      });
      return false;
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length) {
      const file = droppedFiles[0];
      if (validateFile(file)) {
        processFile(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        processFile(file);
      }
    }
  };

  const processFile = (file: File) => {
    setFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const removeFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
    setUploading(false);
    setUploadProgress(0);
  };

  // Parse API response - handle both JSON and plain text responses
  const parseApiResponse = async (response: Response) => {
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
        // Parse JSON response from the backend
        const data = await response.json();

        return {
            raw: data,  // Store raw response for debugging if needed
            detections: {
                persons: data.players.length,
                resolution: "N/A",
                inferenceTime: "N/A",
            },
            players: data.players.map((player: any, index: number) => ({
                id: `P${index + 1}`,
                name: player.Name || `Player ${index + 1}`, // Assuming 'Name' field exists
                position: player.Position || 'Unknown',
                minutesPlayed: player.Minutes_Played || 0,
                sprints: player.Sprint_Count || 0,
                fatigueIndex: player.Fatigue_Index || 0,
                sprintIntensity: player.Sprint_Intensity || 0,
                compositeLoadScore: player.Composite_Load_Score || 0,
                injuryHistory: player.Injury_History || 0,
                riskScore: player.Risk_Score || 0,
                predictedRisk: player.Predicted_Risk || "Low",
                playability: player.Playability || 100,
                injuryRisk: player.Injury_Risk || 0,
            })),
            highestRiskPlayer: data.highest_risk ? {
                id: `P_Highest`,
                name: data.highest_risk.Name || "Unknown",
                position: data.highest_risk.Position || "Unknown",
                riskScore: data.highest_risk.Risk_Score || 0,
                predictedRisk: data.highest_risk.Predicted_Risk || "Low",
                playability: data.highest_risk.Playability || 100,
                injuryRisk: data.highest_risk.Injury_Risk || 0,
            } : null
        };
    } else {
        // Handle non-JSON response (e.g., raw text output)
        const text = await response.text();

        console.warn("Received non-JSON response:", text);
        throw new Error("Invalid response format");
    }
};


  const uploadFile = async () => {
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    setApiStatus('unknown');

    try {
      // Prepare form data to send to Flask API
      const formData = new FormData();
      formData.append('video', file);

      // Use the helper function to get properly formatted API URL
      const apiUrl = modelApiUrl || API_CONFIG.getCompleteApiUrl('/upload');
      console.log(`Uploading video to: ${apiUrl}`);

      // Start progress simulation
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + Math.random() * 5;
        });
      }, 300);

      // Make actual API call to your Flask model
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        // Add CORS mode to handle cross-origin requests properly
        mode: 'cors',
      });
      console.log('response running')

      // Stop progress simulation
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      // Parse prediction results from your Flask model
      const predictionResults = await parseApiResponse(response);
      console.log('Prediction results:', predictionResults);
      
      setApiStatus('connected');

      // Complete the upload process
      setTimeout(() => {
        setUploading(false);
        toast.success('Video analysis complete', {
          description: 'Your video has been processed by the AI model successfully',
        });
        
        // Notify parent component with prediction results
        if (onVideoUploaded) {
          onVideoUploaded(predictionResults);
        }
      }, 500);
    } catch (error) {
      console.error('Error uploading video to API:', error);
      setUploading(false);
      setApiStatus('error');
      
      // Provide more helpful error messages for common issues
      let errorMessage = error instanceof Error ? error.message : 'Failed to connect to AI model';
      let errorDescription = '';
      
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        errorMessage = 'Cannot connect to Flask API';
        errorDescription = 'Make sure your Flask server is running locally and has CORS enabled. See the Settings tab for configuration details.';
      }
      
      toast.error(errorMessage, {
        description: errorDescription,
      });
      
      // Show mock data if API fails (for development purposes)
      if (onVideoUploaded) {
        const mockData = generateMockPredictionData();
        onVideoUploaded(mockData);
        toast.info('Using mock data for preview', {
          description: 'Since the API connection failed, we\'re showing example data',
        });
      }
    }
  };

  // Generate mock data for development when API is unavailable
  const generateMockPredictionData = () => {
    const numPlayers = 12; // Generate exactly 12 players for better demo
    
    const mockPlayers = Array(numPlayers).fill(0).map((_, i) => {
      // Generate a variety of positions
      const positions = ['Forward', 'Midfielder', 'Defender', 'Goalkeeper', 'Winger', 'Striker', 'Center Back'];
      const position = positions[i % positions.length];
      
      // Generate varied statistics for each player
      return {
        id: `P${i+1}`,
        name: `Player ${i+1}`,
        position: position,
        distanceCovered: parseFloat((Math.random() * 5 + 5).toFixed(1)),
        sprints: Math.floor(Math.random() * 20 + 10),
        fatigueIndex: Math.floor(Math.random() * 40 + 40),
        riskScore: Math.floor(Math.random() * 50 + 20)
      };
    });
    
    return {
      raw: "Example data: 384x640 12 persons, 159.1ms\nSpeed: 2.5ms preprocess, 159.1ms inference, 1.1ms postprocess",
      detections: {
        persons: numPlayers,
        resolution: "384x640",
        inferenceTime: 159.1,
      },
      players: mockPlayers
    };
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="video/*"
        className="hidden"
      />

      {!file ? (
        <div
          className={`border-2 border-dashed transition-colors rounded-lg h-64 flex flex-col items-center justify-center p-6 ${
            dragging ? 'border-athlete-blue bg-athlete-blue/5' : 'border-border bg-black/20'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <div className="w-16 h-16 mb-4 rounded-full bg-black/30 flex-center">
            <Upload size={24} className="text-athlete-blue" />
          </div>
          <h3 className="text-lg font-medium mb-2">Drag and drop your video here</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Supported formats: MP4, MOV, AVI, MKV (max 100MB)
          </p>
          <Button type="button" className="bg-athlete-blue hover:bg-athlete-blue-dark text-white">
            Select Video
          </Button>
        </div>
      ) : (
        <div className="bg-black/30 border border-border rounded-lg overflow-hidden">
          {previewUrl && (
            <div className="relative aspect-video bg-black">
              <video 
                src={previewUrl} 
                className="w-full h-full object-contain" 
                controls
              />
              {/* Overlay while uploading */}
              {uploading && (
                <div className="absolute inset-0 bg-black/70 flex-center flex-col gap-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-t-athlete-blue border-r-athlete-blue/50 border-b-athlete-blue/20 border-l-athlete-blue/20 rounded-full animate-spin"></div>
                    <span>Uploading & analyzing video...</span>
                  </div>
                  <div className="w-full max-w-xs bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-athlete-blue rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-white/60">{Math.round(uploadProgress)}%</div>
                </div>
              )}
            </div>
          )}
          
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-athlete-darker rounded-md">
                  <FileVideo size={18} className="text-athlete-blue" />
                </div>
                <div>
                  <div className="font-medium truncate max-w-[280px]">{file.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </div>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="p-2 hover:bg-white/5 rounded-full transition"
                aria-label="Remove file"
              >
                <X size={18} className="text-white/70" />
              </button>
            </div>
            
            {!uploading && (
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={uploadFile} 
                  className="flex-1 bg-athlete-blue hover:bg-athlete-blue-dark text-white gap-2"
                >
                  <Upload size={16} />
                  Upload & Analyze
                </Button>
                <Button variant="outline" className="gap-2">
                  <Play size={16} />
                  Preview
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-2 mt-4 p-3 rounded-md bg-athlete-orange/10 border border-athlete-orange/20">
        <AlertTriangle size={16} className="text-athlete-orange shrink-0" />
        <p className="text-xs text-white/70">
          {apiStatus === 'error' ? (
            "Connection to Flask API failed. Check the Settings tab for troubleshooting tips."
          ) : (
            "Your video will be sent to your Flask model for AI processing. Make sure your model API endpoint is correctly configured."
          )}
        </p>
      </div>
    </div>
  );
};

export default VideoUploader;
