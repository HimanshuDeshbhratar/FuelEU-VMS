# Database Setup Script for FuelEU Backend
# Make sure PostgreSQL is running and update DATABASE_URL if needed

Write-Host "Setting up database..." -ForegroundColor Green

# Set DATABASE_URL (update with your PostgreSQL credentials)
$env:DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/fueleu?schema=public"

Write-Host "Running Prisma migrations..." -ForegroundColor Yellow
npx prisma migrate dev --name init

Write-Host "Seeding database..." -ForegroundColor Yellow
npx prisma db seed

Write-Host "Database setup complete!" -ForegroundColor Green

