/**
 * Unit Tests for ComputeComplianceBalance Use Case
 */

import { ComputeComplianceBalance } from '../../src/core/application/use-cases/compliance/ComputeComplianceBalance';
import { IRouteRepository } from '../../src/core/ports/outbound/IRouteRepository';
import { IComplianceRepository } from '../../src/core/ports/outbound/IComplianceRepository';
import { RouteDTO } from '../../src/core/application/dto/RouteDTO';
import { ComplianceBalanceDTO } from '../../src/core/application/dto/ComplianceBalanceDTO';

describe('ComputeComplianceBalance', () => {
  let computeComplianceBalance: ComputeComplianceBalance;
  let mockRouteRepository: jest.Mocked<IRouteRepository>;
  let mockComplianceRepository: jest.Mocked<IComplianceRepository>;

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

    mockComplianceRepository = {
      save: jest.fn(),
      findByShipId: jest.fn(),
      findByShipIdAndYear: jest.fn(),
      update: jest.fn(),
      findAllByYear: jest.fn(),
    };

    computeComplianceBalance = new ComputeComplianceBalance(
      mockRouteRepository,
      mockComplianceRepository
    );
  });

  it('should calculate compliance balance correctly', async () => {
    const shipId = 'SHIP001';
    const year = 2024;

    const routes: RouteDTO[] = [
      {
        routeId: 'R001',
        shipId,
        vesselType: 'Container',
        fuelType: 'HFO',
        year,
        ghgIntensity: 91.0,
        fuelConsumption: 5000,
        distance: 12000,
        totalEmissions: 4500,
        isBaseline: true,
      },
    ];

    mockRouteRepository.findByFilters.mockResolvedValue(routes);
    mockComplianceRepository.findByShipIdAndYear.mockResolvedValue(null);
    mockComplianceRepository.save.mockResolvedValue({
      shipId,
      year,
      cbGco2eq: -410000000,
    });

    const result = await computeComplianceBalance.execute(shipId, year);

    expect(result.shipId).toBe(shipId);
    expect(result.year).toBe(year);
    expect(mockComplianceRepository.save).toHaveBeenCalled();
  });

  it('should throw error if no routes found', async () => {
    const shipId = 'SHIP001';
    const year = 2024;

    mockRouteRepository.findByFilters.mockResolvedValue([]);

    await expect(computeComplianceBalance.execute(shipId, year)).rejects.toThrow(
      'No routes found'
    );
  });
});

