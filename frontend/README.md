# Sanjeevni (संजीवनी)

AI-powered medication companion for elderly India.

## Stack

- Frontend: React 18 + TypeScript + Vite + TailwindCSS + Zustand + Recharts
- Backend: FastAPI + Python + Supabase + Anthropic Claude
- Database/Auth/Realtime: Supabase

## Project Structure

- `frontend/`: mobile-first React app with voice, dashboard, alerts, rewards, settings
- `backend/`: FastAPI API under `/api/v1`
- `supabase/migrations/001_schema.sql`: full schema, RLS policies, realtime, streak function

## Setup

### 1) Supabase

1. Create a Supabase project.
2. Run SQL in `supabase/migrations/001_schema.sql`.
3. Enable Realtime for `dose_logs` and `alerts`.
4. Copy project keys into frontend and backend env files.

### 2) Backend

```bash
cd backend
python -m venv venv
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --port 8000
```

### 3) Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs at `http://localhost:5173`.

## API Endpoints

- `GET /api/v1/medicines`
- `POST /api/v1/medicines`
- `PUT /api/v1/medicines/{id}`
- `DELETE /api/v1/medicines/{id}`
- `GET /api/v1/doses/today`
- `POST /api/v1/doses/take`
- `GET /api/v1/adherence/summary`
- `GET /api/v1/adherence/heatmap?days=30`
- `GET /api/v1/adherence/weekly`
- `POST /api/v1/alerts/caretaker`
- `GET /api/v1/alerts/feed`
- `POST /api/v1/ai/insights`
- `POST /api/v1/auth/verify-token`

## Notes

- Voice support uses Web Speech API (`en-IN`, `hi-IN`, `mr-IN`).
- Supabase client uses singleton pattern in frontend and cached client in backend.
- API calls include basic error/loading handling in hooks.
