# FuelEU Maritime Compliance Platform

A full-stack application for managing FuelEU Maritime compliance, including route management, compliance balance calculation, banking, and pooling operations.

## Architecture

This project follows **Hexagonal Architecture (Ports & Adapters)** pattern:

- **Core Domain**: Business logic and entities
- **Application Layer**: Use cases and DTOs
- **Adapters (Inbound)**: HTTP controllers and routes
- **Adapters (Outbound)**: Database repositories (Prisma)

## Tech Stack

### Backend
- Node.js + TypeScript
- Express.js
- PostgreSQL
- Prisma ORM
- Jest (testing)

### Frontend
- React 18 + TypeScript
- TailwindCSS
- Axios
- Recharts
- React Router

## Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/fueleu?schema=public"
PORT=3000
NODE_ENV=development
```

4. Setup database:
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database
npx prisma db seed
```

5. Start development server:
```bash
npm run dev
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
VITE_API_URL=http://localhost:3000/api
```

4. Start development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or similar Vite port)

## API Endpoints

### Routes
- `GET /api/routes` - Get all routes (with optional filters: vesselType, fuelType, year)
- `GET /api/routes/:routeId` - Get route by ID
- `POST /api/routes/:routeId/baseline` - Set route as baseline
- `GET /api/routes/comparison` - Get route comparison (baseline vs comparison)

### Compliance
- `GET /api/compliance/cb?year=2024` - Get compliance balances for a year
- `GET /api/compliance/balance?shipId=SHIP001&year=2024` - Get compliance balance for a ship
- `GET /api/compliance/adjusted-cb?year=2024` - Get adjusted compliance balances (after pooling)

### Banking
- `POST /api/banking/bank` - Bank surplus compliance balance
  ```json
  {
    "shipId": "SHIP001",
    "year": 2024
  }
  ```
- `POST /api/banking/apply` - Apply banked amount
  ```json
  {
    "shipId": "SHIP001",
    "year": 2024,
    "amount": 1000000
  }
  ```
- `GET /api/banking/balance?shipId=SHIP001&year=2024` - Get banking balance

### Pooling
- `POST /api/pools` - Create a pool
  ```json
  {
    "year": 2024,
    "shipIds": ["SHIP001", "SHIP002", "SHIP003"]
  }
  ```
- `GET /api/pools/:poolId` - Get pool by ID
- `GET /api/pools/adjusted-cb?year=2024` - Get adjusted compliance balances

## Features

### Routes Tab
- View all routes in a table
- Filter by vessel type, fuel type, and year
- Set a route as baseline for comparison

### Compare Tab
- Compare baseline route with comparison routes
- View percent difference
- Check compliance status (target: 89.3368 gCO2e/MJ)
- Visualize with Recharts bar chart

### Banking Tab
- View compliance balances for all ships
- Bank surplus compliance balance (positive CB only)
- Apply banked amount to offset deficit
- View banking balance

### Pooling Tab
- View adjusted compliance balances
- Create pools with multiple ships
- Greedy allocation algorithm distributes surplus to deficits
- Validation: Sum(adjustedCB) ≥ 0

## Compliance Balance Formula

```
CB = (Target - Actual) × (fuelConsumption × 41000)
```

Where:
- Target = 89.3368 gCO2e/MJ
- Actual = Route GHG intensity
- fuelConsumption = Fuel consumption in tons
- 41000 = Energy content (MJ per ton of fuel)

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Integration Tests
```bash
cd backend
npm run test:integration
```

## Database Schema

See `backend/prisma/schema.prisma` for the complete database schema.

Key models:
- `Routes` - Route information
- `ShipCompliance` - Compliance balances per ship
- `BankEntries` - Banking transactions
- `Pools` - Pooling agreements
- `PoolMembers` - Ships in pools

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── core/
│   │   ├── domain/          # Domain entities
│   │   ├── application/     # Use cases
│   │   └── ports/           # Interfaces
│   ├── adapters/
│   │   ├── inbound/         # HTTP controllers
│   │   └── outbound/        # Database repositories
│   └── infrastructure/      # Server setup
└── tests/

frontend/
├── src/
│   ├── core/                # Domain models & hooks
│   ├── adapters/
│   │   ├── ui/              # React components
│   │   └── infrastructure/  # API client
│   └── App.tsx
└── tailwind.config.js
```

## License

This project is for educational purposes.

