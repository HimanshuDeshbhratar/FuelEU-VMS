/**
 * Comparison Data Transfer Object
 * Data transfer object for route comparison
 */

export interface ComparisonDTO {
  baseline: {
    routeId: string;
    ghgIntensity: number;
  };
  comparison: {
    routeId: string;
    ghgIntensity: number;
  };
  percentDiff: number;
  isCompliant: boolean;
  target: number; // Target GHG intensity (89.3368 gCO2e/MJ)
}

