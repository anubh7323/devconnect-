# DevConnect — Full MERN + TypeScript Project

This folder contains two apps:
- `devconnect-backend` (Node+Express+TS+Mongoose)
- `devconnect-frontend` (React+Vite+TS+Tailwind)

## Quick start
1) Start MongoDB locally or use MongoDB Atlas.
2) Backend:
   - Copy `devconnect-backend/.env.example` to `.env` and set values.
   - `cd devconnect-backend && npm install && npm run dev` (runs on :4000)
3) Frontend:
   - Create `devconnect-frontend/.env` with `VITE_API_URL=http://localhost:4000/api`
   - `cd devconnect-frontend && npm install && npm run dev` (runs on :3000)
