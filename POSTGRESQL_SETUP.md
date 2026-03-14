# PostgreSQL Database Setup Guide

## Step 1: Install PostgreSQL (if not installed)

### Windows:
1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Run the installer
3. During installation:
   - Remember the password you set for the `postgres` user
   - Default port: 5432
   - Default user: postgres

### Verify Installation:
```powershell
# Check if PostgreSQL service is running
Get-Service postgresql*

# Or check if it's installed
psql --version
```

## Step 2: Create the Database

### Option A: Using psql Command Line
```powershell
# Connect to PostgreSQL (you'll be prompted for password)
psql -U postgres

# Once connected, run:
CREATE DATABASE fueleu;

# Exit psql
\q
```

### Option B: Using pgAdmin (GUI)
1. Open pgAdmin (installed with PostgreSQL)
2. Connect to your PostgreSQL server
3. Right-click on "Databases" → "Create" → "Database"
4. Name: `fueleu`
5. Click "Save"

### Option C: Using SQL Command Directly
```powershell
# Run this command (replace 'your_password' with your postgres password)
psql -U postgres -c "CREATE DATABASE fueleu;"
```

## Step 3: Update Backend Configuration

### Create/Update `.env` file in `backend/` folder:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/fueleu?schema=public"
PORT=3000
NODE_ENV=development
```

**Important:** Replace `YOUR_PASSWORD` with your actual PostgreSQL password!

### Example (if password is "mypassword123"):
```env
DATABASE_URL="postgresql://postgres:mypassword123@localhost:5432/fuel_eu?schema=public"
```

## Step 4: Run Database Migrations

```powershell
cd backend

# Set environment variable (replace with your password)
$env:DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/fueleu?schema=public"

# Generate Prisma Client
npx prisma generate

# Run migrations (creates tables)
npx prisma migrate dev --name init

# Seed database (adds sample data)
npx prisma db seed
```

## Step 5: Start Backend Server

```powershell
cd backend

# Set environment variable
$env:DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/fueleu?schema=public"
$env:PORT="3000"

# Start server
npm run dev
```

You should see:
```
🚀 Server running on port 3000
📊 Health check: http://localhost:3000/health
```

## Step 6: Verify Everything Works

1. **Check Backend Health:**
   - Open browser: http://localhost:3000/health
   - Should show: `{"status":"ok"}`

2. **Check API:**
   - Open browser: http://localhost:3000/api/routes
   - Should show array of routes

3. **Check Frontend:**
   - Open browser: http://localhost:5173
   - Should load without network errors

## Troubleshooting

### "Authentication failed" error:
- Check your PostgreSQL password is correct
- Make sure you're using the right username (usually `postgres`)

### "Database does not exist" error:
- Make sure you created the `fuel_eu` database (Step 2)

### "Connection refused" error:
- Make sure PostgreSQL service is running:
  ```powershell
  Get-Service postgresql*
  Start-Service postgresql-x64-XX  # Replace XX with your version
  ```

### "Port 3000 already in use":
- Change PORT in .env to another port (e.g., 3001)
- Or stop the process using port 3000

## Quick Setup Script

Save this as `setup-backend.ps1` in the backend folder:

```powershell
# PostgreSQL Setup Script
param(
    [Parameter(Mandatory=$true)]
    [string]$PostgresPassword
)

Write-Host "Setting up FuelEU Backend..." -ForegroundColor Green

# Set DATABASE_URL
$env:DATABASE_URL = "postgresql://postgres:$PostgresPassword@localhost:5432/fuel_eu?schema=public"

# Create database (if it doesn't exist)
Write-Host "Creating database..." -ForegroundColor Yellow
psql -U postgres -c "CREATE DATABASE fueleu;" 2>&1 | Out-Null

# Generate Prisma Client
Write-Host "Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate

# Run migrations
Write-Host "Running migrations..." -ForegroundColor Yellow
npx prisma migrate dev --name init

# Seed database
Write-Host "Seeding database..." -ForegroundColor Yellow
npx prisma db seed

Write-Host "Setup complete! Starting server..." -ForegroundColor Green
npm run dev
```

Usage:
```powershell
cd backend
.\setup-backend.ps1 -PostgresPassword "your_password"
```

