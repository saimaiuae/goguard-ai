import os
import pickle
import numpy as np
from flask import Flask, request, jsonify, send_from_directory
from sklearn.preprocessing import StandardScaler
from flask_cors import CORS
import sys

# Ensure backend directory is in path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import process_video correctly
try:
    from video_processor import process_video
except ModuleNotFoundError:
    print("Error: video_processor module not found. Make sure video_processor.py is in the backend folder.")
    process_video = None

def create_app():
    # Set absolute path to the build folder
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    build_dir = os.path.join(root_dir, 'build')
    
    # Initialize Flask app
    app = Flask(__name__, static_folder=build_dir, static_url_path="")
    CORS(app)
    
    # Upload folder setup
    app.config["UPLOAD_FOLDER"] = "uploads"
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
    
    # Model and Scaler paths
    model_path = os.path.join("backend", "xgboost_injury_risk.pkl")
    scaler_path = os.path.join("backend", "scaler.pkl")
    
    # Ensure model and scaler exist
    if not os.path.exists(model_path) or not os.path.exists(scaler_path):
        raise FileNotFoundError("Error: Model or scaler file not found!")
    
    # Load model and scaler
    with open(model_path, "rb") as f:
        injury_model = pickle.load(f)
    
    with open(scaler_path, "rb") as f:
        scaler = pickle.load(f)
    
    if not isinstance(scaler, StandardScaler):
        raise TypeError("Error: scaler.pkl is not a valid StandardScaler object!")
    
    @app.route('/')
    def index():
        return app.send_static_file("index.html")
    
    @app.errorhandler(404)
    def not_found(e):
        file_to_serve = os.path.join(app.static_folder, request.path[1:])
        if os.path.exists(file_to_serve):
            return send_from_directory(app.static_folder, request.path[1:])
        return app.send_static_file("index.html")
    
    @app.route("/upload", methods=["POST"])
    def upload_video():
        if "video" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
    
        file = request.files["video"]
        if file.filename == "":
            return jsonify({"error": "No selected file"}), 400
    
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
        file.save(file_path)
    
        if not process_video:
            return jsonify({"error": "Video processing module not found"}), 500
    
        extracted_players = process_video(file_path)
        if not extracted_players:
            return jsonify({"error": "No players detected in the video"}), 500
    
        for player in extracted_players:
            try:
                input_features = np.array([[  
                    player.get("Minutes_Played", 0), 
                    player.get("Sprint_Count", 0),
                    player.get("Fatigue_Index", 0),
                    player.get("Sprint_Intensity", 0),
                    player.get("Composite_Load_Score", 0),
                    player.get("Injury_History", 0)
                ]])
    
                input_scaled = scaler.transform(input_features)
                risk_score = float(injury_model.predict_proba(input_scaled)[:, 1][0])
    
                player["Risk_Score"] = round(risk_score, 2)
                player["Predicted_Risk"] = "High" if risk_score > 0.8 else "Low"
                player["Playability"] = max(0, 100 - (risk_score * 100))
                player["Injury_Risk"] = round(risk_score * 100, 2)  
    
            except Exception as e:
                print(f"Error processing player {player.get('Player_ID', 'Unknown')}: {e}")
    
        highest_risk_player = max(extracted_players, key=lambda x: x["Risk_Score"], default=None)
        return jsonify({
            "players": extracted_players,
            "highest_risk": highest_risk_player
        })
    
    return app

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
