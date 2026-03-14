# 🚀 How to Start Frontend and Backend

## The Problem
Frontend shows "Network error" because the **backend server is not running**.

## ✅ Solution: Start Both Servers

### Option 1: Two Separate Terminals (Recommended)

#### Terminal 1 - Backend:
```powershell
cd backend
$env:DATABASE_URL="postgresql://postgres:himanshu99@localhost:5432/fueleu?schema=public"
npm run dev
```

Wait until you see:
```
🚀 Server running on port 3000
```

#### Terminal 2 - Frontend:
```powershell
cd frontend
npm run dev
```

Wait until you see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### Option 2: Automated Script

Create a file `start-all.ps1` in the root directory:

```powershell
# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; `$env:DATABASE_URL='postgresql://postgres:himanshu99@localhost:5432/fueleu?schema=public'; npm run dev"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev"

Write-Host "✅ Both servers starting in separate windows" -ForegroundColor Green
Write-Host "Backend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
```

Then run:
```powershell
.\start-all.ps1
```

## 📍 Direct Links

Once both are running:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api
- **Backend Health:** http://localhost:3000/health
- **API Routes:** http://localhost:3000/api/routes

## ✅ Verification Steps

1. **Check Backend:**
   - Open: http://localhost:3000/health
   - Should show: `{"status":"ok"}`

2. **Check API:**
   - Open: http://localhost:3000/api/routes
   - Should show array of routes

3. **Check Frontend:**
   - Open: http://localhost:5173
   - Should load without network errors
   - Should show routes in the table

## 🐛 Troubleshooting

### Frontend still shows network error:
- Make sure backend is running (check Terminal 1)
- Verify backend is on port 3000
- Check browser console for errors (F12)

### Backend won't start:
- Check PostgreSQL is running
- Verify DATABASE_URL is correct
- Check if port 3000 is available

### Frontend won't start:
- Check if port 5173 is available
- Make sure you're in the `frontend` directory
- Try: `npm install` again


