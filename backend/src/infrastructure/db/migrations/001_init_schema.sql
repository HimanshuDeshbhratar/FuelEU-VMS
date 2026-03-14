-- ======================================================
-- 001_init_schema.sql
-- FuelEU Maritime — Initial Database Schema
-- ======================================================

-- ==========================================
-- 1. SHIP COMPLIANCE TABLE
-- ==========================================
CREATE TABLE ship_compliance (
  id SERIAL PRIMARY KEY,
  ship_id VARCHAR(20) UNIQUE NOT NULL,
  year INT NOT NULL,
  cb_gco2eq FLOAT DEFAULT 0
);

-- ==========================================
-- 2. ROUTES TABLE
-- ==========================================
CREATE TABLE routes (
  id SERIAL PRIMARY KEY,
  route_id VARCHAR(20) NOT NULL,
  ship_id VARCHAR(20) NOT NULL,
  vessel_type VARCHAR(50),
  fuel_type VARCHAR(50),
  year INT NOT NULL,
  ghg_intensity FLOAT,
  fuel_consumption FLOAT,
  distance FLOAT,
  total_emissions FLOAT,
  is_baseline BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (ship_id) REFERENCES ship_compliance(ship_id)
);

-- ==========================================
-- 3. BANK ENTRIES TABLE
-- ==========================================
CREATE TABLE bank_entries (
  id SERIAL PRIMARY KEY,
  ship_id VARCHAR(20) NOT NULL,
  year INT NOT NULL,
  amount_gco2eq FLOAT DEFAULT 0,
  FOREIGN KEY (ship_id) REFERENCES ship_compliance(ship_id)
);

-- ==========================================
-- 4. POOLS TABLE
-- ==========================================
CREATE TABLE pools (
  id SERIAL PRIMARY KEY,
  year INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 5. POOL MEMBERS TABLE
-- ==========================================
CREATE TABLE pool_members (
  id SERIAL PRIMARY KEY,
  pool_id INT NOT NULL,
  ship_id VARCHAR(20) NOT NULL,
  cb_before FLOAT DEFAULT 0,
  cb_after FLOAT DEFAULT 0,
  FOREIGN KEY (pool_id) REFERENCES pools(id),
  FOREIGN KEY (ship_id) REFERENCES ship_compliance(ship_id)
);

-- ======================================================
-- Optional: Seed some initial ship_compliance entries
-- ======================================================
INSERT INTO ship_compliance (ship_id, year, cb_gco2eq) VALUES
('S001', 2024, 0),
('S002', 2024, 0),
('S003', 2024, 0),
('S004', 2025, 0),
('S005', 2025, 0);
