# 🛡️ GoGuard AI

**GoGuard AI** is an AI-powered video analytics system that predicts player injury risk and playability percentage from match footage — all without using any wearable devices.

---

## 🎯 Key Features

- Frame-by-frame video analysis using object/human detection
- Jersey number-based OCR to identify and map players
- Predict injury risk & playability %
- OCR data stored in a database
- GPU-ready for scalable long-video processing

---

## 📦 Folder Structure
```
GoGuardAI/
│
├── backend/           # 🧠 Python backend (e.g., app.py, AI logic)
├── build/             # 🚀 Production-ready frontend build
├── public/            # 🌐 Static assets (images, videos, etc.)
├── src/               # 🧩 React/TypeScript source code
│
├── requirements.txt   # 📦 Python dependencies
├── index.html         # 🖥️ Frontend HTML entry point
├── README.md          # 📘 Project overview and usage
└── ...other config files (tsconfig, eslint, tailwind, etc.)
```
---
## DATA SET
📚 **Dataset Reference**  
Explore the complete player statistics dataset here:  
🔗 [FBRef - Big 5 European Leagues Player Stats](https://fbref.com/en/comps/Big5/players/Big-5-European-Leagues-Stats)


### Math Calculation

If your **composite load and injury risk** logic is as follows, we can format it like this:

## Fatigue Index

Fatigue Index is calculated based on the player's recent match workload: 
  ![image](https://github.com/user-attachments/assets/07dd3bc0-e4f2-499f-8480-94f5b3c5e360)

•	= Total minutes played in the last matches

•	= Number of recent matches considered (e.g., 5 matches) 

## 🧮 Composite Load & Injury Risk Formula

### 📌 Composite Load Calculation

We calculate the **Composite Load (CL)** for each player as:

![image](https://github.com/user-attachments/assets/ce9a82ec-6d79-426d-9bd6-c0e0ff67c857)

A weight of 1.5 is assigned to Sprint Count as it heavily influences injury risk. 

A weight of 0.8 is assigned to Fatigue Index as fatigue contributes but not as much as sprint frequency. 

## Sprint Intensity

Sprint Intensity measures the frequency of sprints per minute: 

  ![image](https://github.com/user-attachments/assets/1ff98d59-afca-4022-81b2-739947b1a831)

 • 	Sprint Count = Total number of high-intensity sprints.
 
 • 	Minutes Played = Time spent on the field. 

## Speed Calculation for Sprint Detection 

Player speed is calculated using Euclidean distance across frames: 

  ![image](https://github.com/user-attachments/assets/2be63e0e-909d-4842-9cb1-0b63329e4785)

•	and are player positions in consecutive frames. 

•	is the time difference between frames. 

## XGBoost Loss Function (Log Loss) 

XGBoost uses Log Loss for classification tasks: 

  ![image](https://github.com/user-attachments/assets/fdcf7662-e227-4da0-90fa-e3646c04b86d)

•	is the actual injury risk label. 

•	is the predicted probability of injury risk. 

## Injury Risk Score Calculation 

Injury risk score is predicted using the model's probability output: 

  ![image](https://github.com/user-attachments/assets/b9649bca-db53-42b9-a855-631b4e3f6bc1)
  
Then, playability is calculated as: 

  ![image](https://github.com/user-attachments/assets/eb7ea474-84dc-40cd-8ed7-523c3afc3e92)
  
•	A higher Risk Score means the player is more likely to get injured.

•	Playability is the remaining percentage after accounting for risk. 

---

## 🧠 How It Works

1. Analyze input video frame by frame.
2. Detect humans using object detection.
3. Extract jersey numbers using OCR.
4. Map jersey to player.
5. Predict injury risk & playability.

---

## 🧪 Sample Video

🎥 **Download & Test with Sample Video**  
👉 [Click here to download sample.mp4](https://drive.google.com/drive/folders/1kSuCdvD6frsnjat9jIANVlZm5jwWrDE7?usp=drive_link)

---

## ▶️ How to Run

```bash
# Clone the repo
git clone https://github.com/saimaiuae/GoGuardAI.git

# Navigate into folder
cd GoGuardAI

-----Frontend----------
npm install
#run in localhost
npm run dev 

-----Backend------------
# Install dependencies
pip install -r requirements.txt

# Run app script - Flask script
python app.py 
```

---

## 🙏 Final Note

GoGuard AI is built with the vision to transform sports science using AI — making injury risk prediction accessible, non-intrusive, and data-driven.

Whether you're a developer, sports analyst, or AI enthusiast — feel free to explore, test, and contribute to this journey.

Together, let’s make sports safer and smarter! 💡⚽🏃‍♂️

---




