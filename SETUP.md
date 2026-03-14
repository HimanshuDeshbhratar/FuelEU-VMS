# Quick Setup Guide

## ⚠️ IMPORTANT: Database Setup Required

Before the backend can run, you need to:

1. **Install PostgreSQL** (if not already installed)
   - Download from: https://www.postgresql.org/download/
   - Default port: 5432

2. **Create the database:**
   ```sql
   CREATE DATABASE fueleu;
   ```

3. **Update DATABASE_URL in backend/.env:**
   ```
   DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/fueleu?schema=public"
   ```

4. **Run database setup:**
   ```powershell
   cd backend
   .\setup-db.ps1
   ```
   
   Or manually:
   ```powershell
   cd backend
   $env:DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fueleu?schema=public"
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

## 🚀 Starting the Servers

### Backend (Terminal 1):
```powershell
cd backend
$env:DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fueleu?schema=public"
npm run dev
```

### Frontend (Terminal 2):
```powershell
cd frontend
npm run dev
```

## 📍 Direct Links

Once both servers are running:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api
- **Backend Health Check:** http://localhost:3000/health
- **Prisma Studio (Database GUI):** Run `npx prisma studio` in backend folder

## ✅ Verification

1. Check backend is running: Visit http://localhost:3000/health (should return `{"status":"ok"}`)
2. Check frontend is running: Visit http://localhost:5173 (should show the FuelEU platform)
3. Check API: Visit http://localhost:3000/api/routes (should return routes array)

## 🐛 Troubleshooting

### Backend won't start:
- Check PostgreSQL is running: `Get-Service postgresql*`
- Verify DATABASE_URL in .env file
- Check if port 3000 is available

### Frontend won't start:
- Check if port 5173 is available
- Verify VITE_API_URL in .env file (should be http://localhost:3000/api)

### Database connection errors:
- Verify PostgreSQL credentials
- Check database `fueleu` exists
- Run migrations: `npx prisma migrate dev`

