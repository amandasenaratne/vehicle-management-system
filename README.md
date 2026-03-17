# Axis AutoCare - Vehicle Management System

Full-stack vehicle service booking and operations platform with:
- public marketing landing page
- customer authentication and portal
- admin operations console
- booking lifecycle tracking

This repository is a monorepo with separate `frontend` and `backend` apps.

## Scope

### Customer scope
- Create account (name, email, password)
- Sign in and access portal
- Book service appointments
- View booking history
- Cancel own booking when status is `Pending` or `Approved`
- Track booking status publicly with booking ID or vehicle number + phone number

### Admin scope
- Secure admin login
- Dashboard with booking stats
- Booking register with filters, status updates, and delete
- Service category management (create/delete)

## Tech Stack

- Frontend: React, Vite, React Router, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB Atlas
- ORM: Prisma (MongoDB provider)
- Auth: JWT

## Project Structure

```text
vehicle-management-system/
  backend/
    config/
    controllers/
    middleware/
    prisma/
    routes/
    server.js
    seed.js
  frontend/
    public/
    src/
    index.html
    vercel.json
```

## Access Flow

### Customer flow
1. Open landing page `/`
2. Sign up or sign in at `/customer/auth`
3. Go to `/customer/portal`
4. Create booking and monitor status/history
5. Optional public tracking at `/track-booking`

### Admin flow
1. Open `/admin`
2. Continue to `/admin/login`
3. Sign in with seeded admin credentials
4. Access:
   - `/admin/dashboard`
   - `/admin/bookings`
   - `/admin/services`

```

## Local Setup

### 1. Install dependencies

From repository root:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Generate Prisma client and push schema

```bash
cd backend
npm run prisma:generate
npm run prisma:push
```

### 3. Seed admin user

```bash
cd backend
npm run seed
```

### 4. Run backend

```bash
cd backend
npm run dev
```

API should be available at:
- `http://localhost:5000/`
- `http://localhost:5000/api`
- `http://localhost:5000/api/health`

### 5. Run frontend

In another terminal:

```bash
cd frontend
npm run dev
```

App should be available at:
- `http://localhost:3000`

## NPM Scripts

### Backend (`backend/package.json`)
- `npm run dev` - start backend with nodemon
- `npm start` - start backend (production mode command)
- `npm run seed` - seed admin account
- `npm run prisma:generate` - generate Prisma client
- `npm run prisma:push` - push schema to MongoDB

### Frontend (`frontend/package.json`)
- `npm run dev` - start Vite dev server
- `npm run build` - build production bundle
- `npm run preview` - preview production build locally
