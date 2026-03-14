# Start Both Frontend and Backend Servers
# This script opens two separate PowerShell windows

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting FuelEU Platform Servers" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start Backend in new window
Write-Host "Starting Backend server..." -ForegroundColor Yellow
$backendScript = @"
cd '$scriptPath\backend'
`$env:DATABASE_URL='postgresql://postgres:himanshu99@localhost:5432/fueleu?schema=public'
Write-Host '🚀 Starting Backend on http://localhost:3000' -ForegroundColor Green
npm run dev
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendScript

# Wait a bit for backend to initialize
Write-Host "Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start Frontend in new window
Write-Host "Starting Frontend server..." -ForegroundColor Yellow
$frontendScript = @"
cd '$scriptPath\frontend'
Write-Host '🚀 Starting Frontend on http://localhost:5173' -ForegroundColor Green
npm run dev
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendScript

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Two PowerShell windows have opened:" -ForegroundColor Yellow
Write-Host "  - One for Backend" -ForegroundColor White
Write-Host "  - One for Frontend" -ForegroundColor White
Write-Host ""
Write-Host "Wait for both to show 'ready' messages, then:" -ForegroundColor Yellow
Write-Host "  Open http://localhost:5173 in your browser" -ForegroundColor White


