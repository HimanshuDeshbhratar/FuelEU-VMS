-- Initial Database Schema
-- PostgreSQL migration for Fuel EU compliance system

-- Routes table
CREATE TABLE IF NOT EXISTS routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vessel_id UUID NOT NULL,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    distance DECIMAL(10, 2) NOT NULL,
    fuel_type VARCHAR(50) NOT NULL,
    ghg_intensity DECIMAL(10, 4) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Compliance balances table
CREATE TABLE IF NOT EXISTS compliance_balances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL,
    period VARCHAR(50) NOT NULL,
    compliance_balance DECIMAL(10, 4) NOT NULL,
    required_compliance DECIMAL(10, 4) NOT NULL,
    surplus DECIMAL(10, 4) DEFAULT 0,
    deficit DECIMAL(10, 4) DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(company_id, period)
);

-- Banking entries table
CREATE TABLE IF NOT EXISTS banking_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL,
    period VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 4) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('DEPOSIT', 'WITHDRAWAL')),
    balance DECIMAL(10, 4) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pooling agreements table
CREATE TABLE IF NOT EXISTS pooling_agreements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    period VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'DISSOLVED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pooling agreement participants table
CREATE TABLE IF NOT EXISTS pooling_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agreement_id UUID NOT NULL REFERENCES pooling_agreements(id) ON DELETE CASCADE,
    company_id UUID NOT NULL,
    allocation_percentage DECIMAL(5, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_routes_vessel_id ON routes(vessel_id);
CREATE INDEX IF NOT EXISTS idx_compliance_balances_company_id ON compliance_balances(company_id);
CREATE INDEX IF NOT EXISTS idx_compliance_balances_period ON compliance_balances(period);
CREATE INDEX IF NOT EXISTS idx_banking_entries_company_id ON banking_entries(company_id);
CREATE INDEX IF NOT EXISTS idx_banking_entries_period ON banking_entries(period);
CREATE INDEX IF NOT EXISTS idx_pooling_participants_agreement_id ON pooling_participants(agreement_id);
CREATE INDEX IF NOT EXISTS idx_pooling_participants_company_id ON pooling_participants(company_id);



