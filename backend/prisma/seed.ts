/**
 * Prisma Seed File
 * Seeds the database with initial route data
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create ship compliance records first (required for foreign key)
  await prisma.shipCompliance.upsert({
    where: { ship_id: 'SHIP001' },
    update: {},
    create: {
      ship_id: 'SHIP001',
      year: 2024,
      cb_gco2eq: null,
    },
  });

  await prisma.shipCompliance.upsert({
    where: { ship_id: 'SHIP002' },
    update: {},
    create: {
      ship_id: 'SHIP002',
      year: 2024,
      cb_gco2eq: null,
    },
  });

  await prisma.shipCompliance.upsert({
    where: { ship_id: 'SHIP003' },
    update: {},
    create: {
      ship_id: 'SHIP003',
      year: 2024,
      cb_gco2eq: null,
    },
  });

  await prisma.shipCompliance.upsert({
    where: { ship_id: 'SHIP004' },
    update: {},
    create: {
      ship_id: 'SHIP004',
      year: 2025,
      cb_gco2eq: null,
    },
  });

  await prisma.shipCompliance.upsert({
    where: { ship_id: 'SHIP005' },
    update: {},
    create: {
      ship_id: 'SHIP005',
      year: 2025,
      cb_gco2eq: null,
    },
  });

  // Seed routes
  const routes = [
    {
      route_id: 'R001',
      ship_id: 'SHIP001',
      vessel_type: 'Container',
      fuel_type: 'HFO',
      year: 2024,
      ghg_intensity: 91.0,
      fuel_consumption: 5000,
      distance: 12000,
      total_emissions: 4500,
      is_baseline: true,
    },
    {
      route_id: 'R002',
      ship_id: 'SHIP002',
      vessel_type: 'BulkCarrier',
      fuel_type: 'LNG',
      year: 2024,
      ghg_intensity: 88.0,
      fuel_consumption: 4800,
      distance: 11500,
      total_emissions: 4200,
      is_baseline: false,
    },
    {
      route_id: 'R003',
      ship_id: 'SHIP003',
      vessel_type: 'Tanker',
      fuel_type: 'MGO',
      year: 2024,
      ghg_intensity: 93.5,
      fuel_consumption: 5100,
      distance: 12500,
      total_emissions: 4700,
      is_baseline: false,
    },
    {
      route_id: 'R004',
      ship_id: 'SHIP004',
      vessel_type: 'RoRo',
      fuel_type: 'HFO',
      year: 2025,
      ghg_intensity: 89.2,
      fuel_consumption: 4900,
      distance: 11800,
      total_emissions: 4300,
      is_baseline: false,
    },
    {
      route_id: 'R005',
      ship_id: 'SHIP005',
      vessel_type: 'Container',
      fuel_type: 'LNG',
      year: 2025,
      ghg_intensity: 90.5,
      fuel_consumption: 4950,
      distance: 11900,
      total_emissions: 4400,
      is_baseline: false,
    },
  ];

  for (const route of routes) {
    await prisma.routes.upsert({
      where: { route_id: route.route_id },
      update: route,
      create: route,
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

