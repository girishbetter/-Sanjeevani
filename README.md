MEDICATION ADHERENCE TRACKER FOR THE ELDERLY

---

PROBLEM STATEMENT:
Elderly patients often forget to take their medications on time or accidentally take double doses. Most healthcare apps are too complex, making them difficult for seniors to use.

---

OBJECTIVE:
To develop a simple and accessible digital pillbox tracker that helps elderly users:

- Take medicines on time
- Avoid missed or duplicate doses
- Easily interact with the system

---

SOLUTION:
A minimal and user-friendly application designed with:

- Large buttons
- High contrast UI
- One-tap interaction
- Emergency caretaker alert system

---

FEATURES:

1. DAILY MEDICATION VIEW

- Displays today’s medicines only
- Shows medicine name, time, and status
- One-tap to mark medicine as taken

2. ONE-TAP INTERACTION

- No complex navigation
- Simple and easy for elderly users

3. STREAK COUNTER

- Tracks daily medication adherence
- Motivates users with streaks (e.g., 3 Day Streak)

4. ALERT CARETAKER

- Allows user to send alert if medicine is missed
- Simulates emergency notification to family

5. REMINDERS

- Sends alerts for medication timing
- Repeats reminders until action is taken

---

UI DESIGN PRINCIPLES:

- High contrast colors (Black / White / Yellow)
- Large fonts and buttons
- Minimal text
- Easy readability

---

TECH STACK:

Frontend:

- React.js / React Native
- Tailwind CSS

Backend:

- FastAPI

Database:

- Supabase / MySQL

Integrations:

- SMS Notifications (Twilio)
- Push Notifications (Firebase)

---

INSTALLATION:

1. Clone Repository:
   git clone https://github.com/your-username/medication-tracker.git
   cd medication-tracker

2. Backend Setup:
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload

3. Frontend Setup:
   cd frontend
   npm install
   npm run dev

---

ENVIRONMENT VARIABLES:

TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_number
FCM_SERVER_KEY=your_key

---

API ENDPOINTS:

GET    /medications/today   - Get today's medications
POST   /mark-taken          - Mark medicine as taken
POST   /alert-caretaker     - Send alert to caretaker

---

FUTURE ENHANCEMENTS:

- Voice assistant (Hindi/Marathi)
- Medicine recognition using camera
- AI-based reminders
- Offline SMS alerts

---

HACKATHON ADVANTAGE:

- Focused on elderly users
- Simple and impactful solution
- Real-world usability
- Emergency alert system

--
---

TAGLINE:
Simple Care. Better Health.

---
