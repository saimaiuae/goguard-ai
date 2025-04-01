
import React, { useState, useEffect } from 'react';
import { API_CONFIG } from '@/config/api';
import { AlertTriangle, CheckCircle, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SettingsTab = () => {
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const baseApiUrl = API_CONFIG.modelApiUrl;
  const completeApiUrl = API_CONFIG.getCompleteApiUrl('/predict');

  // Check API connection on component mount
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        // Just try a simple OPTIONS request to check if the API is reachable
        const response = await fetch(baseApiUrl, {
          method: 'OPTIONS',
          mode: 'cors',
        });
        setApiStatus('connected');
      } catch (error) {
        console.error('API connection check failed:', error);
        setApiStatus('error');
      }
    };

    checkApiConnection();
  }, [baseApiUrl]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="glass-panel rounded-lg p-6">
      <h2 className="text-xl font-medium mb-6">Model Configuration</h2>
      <div className="space-y-6">
        <div className="neo-panel p-4 rounded-lg">
          <h3 className="font-medium">Flask API Configuration</h3>
          
          <div className="mt-4 space-y-3">
            <div>
              <div className="text-sm text-white/70 mb-1">Base API URL:</div>
              <div className="flex items-center gap-2">
                <code className="bg-black/30 px-3 py-1.5 rounded text-sm flex-1 overflow-x-auto whitespace-nowrap">
                  {baseApiUrl}
                </code>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => copyToClipboard(baseApiUrl)}
                  className="h-8 w-8"
                >
                  <Copy size={14} />
                </Button>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-white/70 mb-1">Complete Predict Endpoint:</div>
              <div className="flex items-center gap-2">
                <code className="bg-black/30 px-3 py-1.5 rounded text-sm flex-1 overflow-x-auto whitespace-nowrap">
                  {completeApiUrl}
                </code>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => copyToClipboard(completeApiUrl)}
                  className="h-8 w-8"
                >
                  <Copy size={14} />
                </Button>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-white/50 mt-4">
            To change these URLs, set the VITE_MODEL_API_URL environment variable.
          </p>
        </div>
        
        <div className="neo-panel p-4 rounded-lg">
          <h3 className="font-medium">Model Connection Status</h3>
          <div className="flex items-center gap-2 mt-3">
            {apiStatus === 'checking' && (
              <>
                <div className="w-3 h-3 rounded-full bg-white/50 animate-pulse"></div>
                <span className="text-sm">Checking connection...</span>
              </>
            )}
            {apiStatus === 'connected' && (
              <>
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-sm">Connected to Flask model</span>
              </>
            )}
            {apiStatus === 'error' && (
              <>
                <AlertTriangle size={16} className="text-athlete-orange" />
                <span className="text-sm">Cannot connect to Flask API</span>
              </>
            )}
          </div>
          
          {apiStatus === 'error' && (
            <div className="mt-4 bg-athlete-orange/10 p-3 rounded-md border border-athlete-orange/20">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                <AlertTriangle size={14} className="text-athlete-orange" />
                Troubleshooting Tips
              </h4>
              <ul className="text-xs space-y-2 text-white/70 list-disc pl-4">
                <li>Ensure your Flask server is running at <code className="bg-black/20 px-1 rounded">{baseApiUrl}</code></li>
                <li>Check that CORS is enabled in your Flask application</li>
                <li>If running locally, make sure port 5000 is not blocked by a firewall</li>
                <li>Verify that your Flask app has a POST endpoint at <code className="bg-black/20 px-1 rounded">/predict</code></li>
              </ul>
              
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-7 gap-1.5"
                  onClick={() => window.open('https://flask-cors.readthedocs.io/en/latest/', '_blank')}
                >
                  <ExternalLink size={12} />
                  Flask CORS Documentation
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="neo-panel p-4 rounded-lg">
          <h3 className="font-medium">Flask Code Example</h3>
          <p className="text-sm text-white/70 mt-2 mb-3">
            Copy this code to start your Flask API server with CORS enabled:
          </p>
          
          <pre className="bg-black/30 p-3 rounded-md text-xs overflow-x-auto">
{`from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/predict', methods=['POST'])
def predict():
    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided'}), 400
        
    video_file = request.files['video']
    
    # Your video processing and prediction logic here
    # ...
    
    # Return detection results
    results = {
        'raw': '1: 384x640 2 persons, 159.1ms',
        'detections': {
            'persons': 2,
            'resolution': '384x640',
            'inferenceTime': 159.1
        },
        'players': [
            {
                'id': 'P1',
                'name': 'Player 1',
                'position': 'Forward',
                'distanceCovered': 8.4,
                'sprints': 24,
                'fatigueIndex': 65,
                'riskScore': 35
            },
            {
                'id': 'P2',
                'name': 'Player 2',
                'position': 'Midfielder',
                'distanceCovered': 10.2,
                'sprints': 32,
                'fatigueIndex': 78,
                'riskScore': 62
            }
        ]
    }
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)`}
          </pre>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-3 text-xs h-7"
            onClick={() => copyToClipboard(`from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/predict', methods=['POST'])
def predict():
    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided'}), 400
        
    video_file = request.files['video']
    
    # Your video processing and prediction logic here
    # ...
    
    # Return detection results
    results = {
        'raw': '1: 384x640 2 persons, 159.1ms',
        'detections': {
            'persons': 2,
            'resolution': '384x640',
            'inferenceTime': 159.1
        },
        'players': [
            {
                'id': 'P1',
                'name': 'Player 1',
                'position': 'Forward',
                'distanceCovered': 8.4,
                'sprints': 24,
                'fatigueIndex': 65,
                'riskScore': 35
            },
            {
                'id': 'P2',
                'name': 'Player 2',
                'position': 'Midfielder',
                'distanceCovered': 10.2,
                'sprints': 32,
                'fatigueIndex': 78,
                'riskScore': 62
            }
        ]
    }
    
    return jsonify(results)`)}
          >
            Copy Code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
