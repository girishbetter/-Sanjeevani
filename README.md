# Sanjeevani - Medication Adherence App

## Overview
**Sanjeevani** ("Aapki Sehat, Hamari Zimmedaari") is a medication adherence tracking application designed specifically for elderly patients and their caretakers. Built with a responsive, high-contrast UI, one-tap interactions, and a fully functional backend using Supabase, it provides robust real-time updates and emergency notifications.

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS v3
- **Backend & DB**: Supabase (PostgreSQL, Auth, Realtime, Edge Functions)
- **Deployment**: Vercel

## Setup Instructions

### 1. Supabase Project Setup
1. Create a new project in [Supabase](https://supabase.com).
2. Go to the SQL Editor and run the entire contents of `supabase/schema.sql` to create all tables, RLS policies, functions, and triggers.

### 2. Environment Variables
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Update `.env.local` with your Supabase project URL and anon key from the project settings.

### 3. MSG91 Setup for Edge Function (Alerts)
1. Create an account on [MSG91](https://msg91.com/).
2. Obtain your `AUTH_KEY`.
3. Create two flow templates in MSG91 for SMS/WhatsApp and note their Template IDs:
   - One for missed doses.
   - One for emergency alerts.

### 4. Deploying Edge Function
1. Install the Supabase CLI: `npm install -g supabase` (or via brew/scoop).
2. Login to Supabase CLI: `supabase login`.
3. Link your project: `supabase link --project-ref your-project-ref`.
4. Set the secrets for the Edge Function:
   ```bash
   supabase secrets set MSG91_AUTH_KEY=your-msg91-key
   supabase secrets set MSG91_TEMPLATE_ID_MISSED=your-template-id
   supabase secrets set MSG91_TEMPLATE_ID_EMERGENCY=your-template-id
   supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
5. Deploy the function: `supabase functions deploy send-alert`

### 5. Running Locally
1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`

### 6. Deployment on Vercel
1. Import the repository into [Vercel](https://vercel.com).
2. Set the Environment Variables (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) in the Vercel dashboard.
3. Deploy! The `vercel.json` ensures that client-side routing and PWA features work seamlessly.

## Usage Guide
### Adding Your First Users
- **Patient**: Click 'Sign Up', select 'Patient', and fill in the details. Once registered, a profile and patient record are automatically generated in the DB.
- **Caretaker**: Click 'Sign Up', select 'Caretaker', and sign up.

### Linking Caretaker to Patient
- Once logged in as a Caretaker, if you have no linked patients, you will see a prompt to link a patient.
- Enter the Patient's registered phone number and your relationship.
- You will now be able to add medicines and view real-time adherence logs for that patient.

## Developer Notes
- PWA manifests are fully set up in `public/manifest.json`.
- State transitions are strictly managed via React Hooks (`useMedicines`, `useCaretakerPatients`, etc.) over Supabase Realtime channels.
