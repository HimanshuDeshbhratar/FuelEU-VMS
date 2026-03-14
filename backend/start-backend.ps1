# Backend Startup Script
# This script will help you set up and start the backend

param(
    [string]$PostgresPassword = "postgres"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "FuelEU Backend Setup & Startup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if PostgreSQL is installed
Write-Host "Checking PostgreSQL..." -ForegroundColor Yellow
try {
    $pgVersion = psql --version 2>&1
    Write-Host "✓ PostgreSQL found" -ForegroundColor Green
} catch {
    Write-Host "✗ PostgreSQL not found. Please install PostgreSQL first." -ForegroundColor Red
    Write-Host "Download from: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    exit 1
}

# Set DATABASE_URL
$DATABASE_URL = "postgresql://postgres:$PostgresPassword@localhost:5432/fueleu?schema=public"
$env:DATABASE_URL = $DATABASE_URL

Write-Host ""
Write-Host "Step 1: Creating database (if it doesn't exist)..." -ForegroundColor Yellow
try {
    $createDb = psql -U postgres -c "CREATE DATABASE fueleu;" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Database created" -ForegroundColor Green
    } else {
        Write-Host "ℹ Database might already exist (this is OK)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠ Could not create database. Make sure PostgreSQL is running and password is correct." -ForegroundColor Yellow
    Write-Host "You can create it manually: CREATE DATABASE fueleu;" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Step 2: Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Prisma Client generated" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to generate Prisma Client" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 3: Running database migrations..." -ForegroundColor Yellow
npx prisma migrate dev --name init
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Migrations completed" -ForegroundColor Green
} else {
    Write-Host "✗ Migrations failed. Check your database connection." -ForegroundColor Red
    Write-Host "Make sure:" -ForegroundColor Yellow
    Write-Host "  - PostgreSQL is running" -ForegroundColor Yellow
    Write-Host "  - Database 'fueleu' exists" -ForegroundColor Yellow
    Write-Host "  - Password is correct" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Step 4: Seeding database..." -ForegroundColor Yellow
npx prisma db seed
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database seeded" -ForegroundColor Green
} else {
    Write-Host "⚠ Seeding failed (might be OK if data already exists)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Step 5: Starting backend server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Backend will start on: http://localhost:3000" -ForegroundColor Green
Write-Host "Health check: http://localhost:3000/health" -ForegroundColor Green
Write-Host "API: http://localhost:3000/api" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$env:PORT = "3000"
npm run dev

