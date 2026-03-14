/**
 * Unit Tests for CompareRoutes Use Case
 */

import { CompareRoutes } from '../../src/core/application/use-cases/routes/CompareRoutes';
import { IRouteRepository } from '../../src/core/ports/outbound/IRouteRepository';
import { RouteDTO } from '../../src/core/application/dto/RouteDTO';

describe('CompareRoutes', () => {
  let compareRoutes: CompareRoutes;
  let mockRouteRepository: jest.Mocked<IRouteRepository>;

  beforeEach(() => {
    mockRouteRepository = {
      save: jest.fn(),
      findByRouteId: jest.fn(),
      findByShipId: jest.fn(),
      findByYear: jest.fn(),
      findByFilters: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      setBaseline: jest.fn(),
      getBaselineRoute: jest.fn(),
    };

    compareRoutes = new CompareRoutes(mockRouteRepository);
  });

  it('should compare routes correctly', async () => {
    const baseline: RouteDTO = {
      routeId: 'R001',
      shipId: 'SHIP001',
      vesselType: 'Container',
      fuelType: 'HFO',
      year: 2024,
      ghgIntensity: 91.0,
      fuelConsumption: 5000,
      distance: 12000,
      totalEmissions: 4500,
      isBaseline: true,
    };

    const comparison: RouteDTO = {
      routeId: 'R002',
      shipId: 'SHIP002',
      vesselType: 'BulkCarrier',
      fuelType: 'LNG',
      year: 2024,
      ghgIntensity: 88.0,
      fuelConsumption: 4800,
      distance: 11500,
      totalEmissions: 4200,
      isBaseline: false,
    };

    mockRouteRepository.getBaselineRoute.mockResolvedValue(baseline);
    mockRouteRepository.findByYear.mockResolvedValue([baseline, comparison]);

    const result = await compareRoutes.execute(2024);

    expect(result.baseline.routeId).toBe('R001');
    expect(result.comparison.routeId).toBe('R002');
    expect(result.percentDiff).toBeCloseTo(-3.2967, 2);
    expect(result.isCompliant).toBe(true); // 88.0 <= 89.3368
  });

  it('should throw error if no baseline route found', async () => {
    mockRouteRepository.getBaselineRoute.mockResolvedValue(null);

    await expect(compareRoutes.execute()).rejects.toThrow('No baseline route found');
  });
});

