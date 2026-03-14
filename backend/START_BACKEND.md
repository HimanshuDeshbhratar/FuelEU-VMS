# How to Start the Backend

## ✅ For Development (Recommended)

Use `npm run dev` - this runs TypeScript directly without needing to build:

```powershell
cd backend
$env:DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/fueleu?schema=public"
npm run dev
```

This will:
- Watch for file changes
- Auto-restart on changes
- Show TypeScript errors immediately
- No build step needed

## 🏗️ For Production

If you want to use `npm start`, you need to build first:

```powershell
cd backend
npm run build    # Compiles TypeScript to JavaScript
npm start        # Runs the compiled code
```

Or use the updated script (now builds automatically):
```powershell
cd backend
npm start        # Now builds AND runs
```

## 🚀 Quick Start (All-in-One)

Use the automated script:
```powershell
cd backend
.\start-backend.ps1
```

Or manually:
```powershell
cd backend
$env:DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/fueleu?schema=public"
npm run dev
```

## 📝 Important Notes

- **Development**: Always use `npm run dev` (no build needed)
- **Production**: Use `npm run build` then `npm start`
- **Database**: Make sure DATABASE_URL is set before starting

