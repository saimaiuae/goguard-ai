
// Configure your Flask model API endpoint here
export const API_CONFIG = {
  modelApiUrl: import.meta.env.VITE_MODEL_API_URL || 'https://www.goguard.ai/upload',
  
  // Helper function to ensure the API URL is properly formatted
  getCompleteApiUrl: (endpoint = '/predict') => {
    const baseUrl = import.meta.env.VITE_MODEL_API_URL || 'https://www.goguard.ai/upload';
    // Handle both cases where baseUrl might or might not have a trailing slash
    const hasTrailingSlash = baseUrl.endsWith('/');
    const hasLeadingSlash = endpoint.startsWith('/');
    
    if (hasTrailingSlash && hasLeadingSlash) {
      return `${baseUrl}${endpoint.substring(1)}`;
    } else if (!hasTrailingSlash && !hasLeadingSlash) {
      return `${baseUrl}/${endpoint}`;
    } else {
      return `${baseUrl}${endpoint}`;
    }
  }
};

// Flask CORS Setup Instructions:
/*
To enable CORS in your Flask API, add this to your Flask application:

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

# Your routes and endpoints here
@app.route('/predict', methods=['POST'])
def predict():
    # Your prediction logic
    pass

# Make sure your Flask server is running at port 5000
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

Don't forget to install flask-cors: pip install flask-cors
*/

// Common CORS error troubleshooting:
/*
If you're getting "Failed to fetch" errors when uploading to your Flask API:

1. Ensure your Flask API is running (python app.py)
2. Check that CORS is properly enabled as shown above
3. Make sure the port matches (default is 5000)
4. If running in a Docker container or VM, ensure the port is properly exposed
5. Check your browser console for specific CORS error messages
*/
