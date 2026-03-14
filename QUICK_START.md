# 🚀 Quick Start Guide

## The Problem
You're seeing "Network error" because the **backend server is not running**. The frontend is trying to connect to `http://localhost:3000/api` but nothing is there.

## ✅ Solution: Set Up PostgreSQL & Start Backend

### Option 1: Automated Setup (Recommended)

1. **Make sure PostgreSQL is installed and running**
   - Check: `Get-Service postgresql*`
   - If not installed: Download from https://www.postgresql.org/download/windows/

2. **Run the setup script:**
   ```powershell
   cd backend
   .\start-backend.ps1
   ```
   
   Or if your PostgreSQL password is different:
   ```powershell
   cd backend
   .\start-backend.ps1 -PostgresPassword "your_password"
   ```

### Option 2: Manual Setup

#### Step 1: Create PostgreSQL Database

```powershell
# Connect to PostgreSQL (enter your password when prompted)
psql -U postgres

# In psql, run:
CREATE DATABASE fueleu;

# Exit psql
\q
```

#### Step 2: Set Up Backend

```powershell
cd backend

# Set your PostgreSQL password (replace "postgres" with your actual password)
$env:DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/fueleu?schema=public"

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database
npx prisma db seed

# Start server
$env:PORT="3000"
npm run dev
```

## 📍 Verify Everything Works

### 1. Check Backend is Running
Open in browser: **http://localhost:3000/health**
- Should show: `{"status":"ok"}`

### 2. Check API
Open in browser: **http://localhost:3000/api/routes**
- Should show array of routes

### 3. Check Frontend
Open in browser: **http://localhost:5173**
- Should load without network errors
- Should show routes in the table

## 🔧 Troubleshooting

### "Authentication failed"
- Your PostgreSQL password is wrong
- Update the password in the DATABASE_URL

### "Database does not exist"
- Run: `CREATE DATABASE fueleu;` in psql

### "Connection refused"
- PostgreSQL service is not running
- Start it: `Start-Service postgresql-x64-XX` (replace XX with version)

### "Port 3000 already in use"
- Another process is using port 3000
- Change PORT in .env to 3001
- Or stop the other process

## 📝 What You Need

1. ✅ **PostgreSQL installed** (https://www.postgresql.org/download/)
2. ✅ **PostgreSQL password** (the one you set during installation)
3. ✅ **Node.js installed** (you already have this)

## 🎯 Expected Result

After setup, you should have:
- ✅ Backend running on http://localhost:3000
- ✅ Frontend running on http://localhost:5173
- ✅ Database with 5 sample routes
- ✅ No network errors in frontend

## 📚 More Details

See `POSTGRESQL_SETUP.md` for detailed PostgreSQL setup instructions.

