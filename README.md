# Luxury on Wheels

A production-ready MERN luxury used-car marketplace for **Luxury on Wheels**, a Delhi-based premium car middleman business.

## Stack

- React + Vite
- Tailwind CSS
- Framer Motion + GSAP
- Redux Toolkit
- Node.js + Express
- MongoDB + Mongoose
- JWT auth + bcrypt password hashing
- Multer-ready image upload endpoint with local placeholder support

## Quick Start

```bash
npm install
cp backend/.env.example backend/.env
npm run seed
npm run dev
```

Frontend: `http://localhost:5173`  
Backend API: `http://localhost:5000/api`

If MongoDB is not running, the API still serves the seeded sample inventory from an in-memory fallback so the website remains browsable for demos.

## Default Admin

```text
Email: admin@luxuryonwheels.in
Password: Admin@12345
```

Change these values in `backend/.env` before production.

## Environment

Create `backend/.env` from `.env.example`.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/luxury_on_wheels
JWT_SECRET=replace-with-a-long-secret
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@luxuryonwheels.in
ADMIN_PASSWORD=Admin@12345
CLIENT_URL=http://localhost:5173
SEED_ON_EMPTY=false
```

## Production Notes

- Replace the demo admin password.
- Configure a managed MongoDB URI.
- Set `SEED_ON_EMPTY=true` only when you want an empty production database to auto-load the sample inventory on backend startup.
- Swap local/remote placeholder images with Cloudinary URLs when real inventory images are available.
- Put the real uploaded brand logo at `frontend/public/logo.svg` if you want to replace the included wheel mark.
- Deploy frontend and backend separately, setting `VITE_API_URL` for the frontend.

## Features

- Luxury cinematic homepage
- Inventory search, filters, sorting, sold and featured states
- Car detail gallery with WhatsApp/call CTAs
- Contact lead submission API
- Admin login with JWT
- Admin dashboard stats and inventory table
- Add/edit/delete cars, mark sold, toggle featured
- Responsive matte-black, purple-neon, metallic-silver UI
