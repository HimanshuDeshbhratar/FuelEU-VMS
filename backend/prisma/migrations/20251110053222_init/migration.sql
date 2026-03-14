-- CreateTable
CREATE TABLE "Routes" (
    "id" SERIAL NOT NULL,
    "route_id" TEXT NOT NULL,
    "ship_id" TEXT NOT NULL,
    "vessel_type" TEXT NOT NULL,
    "fuel_type" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "ghg_intensity" DOUBLE PRECISION NOT NULL,
    "fuel_consumption" DOUBLE PRECISION NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "total_emissions" DOUBLE PRECISION NOT NULL,
    "is_baseline" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShipCompliance" (
    "id" SERIAL NOT NULL,
    "ship_id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "cb_gco2eq" DOUBLE PRECISION,

    CONSTRAINT "ShipCompliance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankEntries" (
    "id" SERIAL NOT NULL,
    "ship_id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "amount_gco2eq" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BankEntries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pools" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PoolMembers" (
    "id" SERIAL NOT NULL,
    "pool_id" INTEGER NOT NULL,
    "ship_id" TEXT NOT NULL,
    "cb_before" DOUBLE PRECISION NOT NULL,
    "cb_after" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PoolMembers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Routes_route_id_key" ON "Routes"("route_id");

-- CreateIndex
CREATE INDEX "Routes_ship_id_idx" ON "Routes"("ship_id");

-- CreateIndex
CREATE INDEX "Routes_year_idx" ON "Routes"("year");

-- CreateIndex
CREATE INDEX "Routes_is_baseline_idx" ON "Routes"("is_baseline");

-- CreateIndex
CREATE UNIQUE INDEX "ShipCompliance_ship_id_key" ON "ShipCompliance"("ship_id");

-- CreateIndex
CREATE INDEX "ShipCompliance_year_idx" ON "ShipCompliance"("year");

-- CreateIndex
CREATE INDEX "BankEntries_ship_id_idx" ON "BankEntries"("ship_id");

-- CreateIndex
CREATE INDEX "BankEntries_year_idx" ON "BankEntries"("year");

-- CreateIndex
CREATE INDEX "Pools_year_idx" ON "Pools"("year");

-- CreateIndex
CREATE INDEX "PoolMembers_pool_id_idx" ON "PoolMembers"("pool_id");

-- CreateIndex
CREATE INDEX "PoolMembers_ship_id_idx" ON "PoolMembers"("ship_id");

-- AddForeignKey
ALTER TABLE "Routes" ADD CONSTRAINT "Routes_ship_id_fkey" FOREIGN KEY ("ship_id") REFERENCES "ShipCompliance"("ship_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankEntries" ADD CONSTRAINT "BankEntries_ship_id_fkey" FOREIGN KEY ("ship_id") REFERENCES "ShipCompliance"("ship_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoolMembers" ADD CONSTRAINT "PoolMembers_pool_id_fkey" FOREIGN KEY ("pool_id") REFERENCES "Pools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoolMembers" ADD CONSTRAINT "PoolMembers_ship_id_fkey" FOREIGN KEY ("ship_id") REFERENCES "ShipCompliance"("ship_id") ON DELETE RESTRICT ON UPDATE CASCADE;
