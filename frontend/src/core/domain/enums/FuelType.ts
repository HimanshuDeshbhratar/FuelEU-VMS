/**
 * Fuel Type Enum
 * Available fuel types
 */

export enum FuelType {
  MARINE_GAS_OIL = 'MARINE_GAS_OIL',
  MARINE_DIESEL_OIL = 'MARINE_DIESEL_OIL',
  HEAVY_FUEL_OIL = 'HEAVY_FUEL_OIL',
  LIQUEFIED_NATURAL_GAS = 'LIQUEFIED_NATURAL_GAS',
  BIOFUEL = 'BIOFUEL',
  HYDROGEN = 'HYDROGEN',
  AMMONIA = 'AMMONIA',
  METHANOL = 'METHANOL',
  ELECTRIC = 'ELECTRIC',
}

export const FuelTypeLabels: Record<FuelType, string> = {
  [FuelType.MARINE_GAS_OIL]: 'Marine Gas Oil',
  [FuelType.MARINE_DIESEL_OIL]: 'Marine Diesel Oil',
  [FuelType.HEAVY_FUEL_OIL]: 'Heavy Fuel Oil',
  [FuelType.LIQUEFIED_NATURAL_GAS]: 'Liquefied Natural Gas',
  [FuelType.BIOFUEL]: 'Biofuel',
  [FuelType.HYDROGEN]: 'Hydrogen',
  [FuelType.AMMONIA]: 'Ammonia',
  [FuelType.METHANOL]: 'Methanol',
  [FuelType.ELECTRIC]: 'Electric',
};

export const FuelTypeCategories: Record<FuelType, 'FOSSIL' | 'RENEWABLE' | 'BIOFUEL' | 'ELECTRIC'> = {
  [FuelType.MARINE_GAS_OIL]: 'FOSSIL',
  [FuelType.MARINE_DIESEL_OIL]: 'FOSSIL',
  [FuelType.HEAVY_FUEL_OIL]: 'FOSSIL',
  [FuelType.LIQUEFIED_NATURAL_GAS]: 'FOSSIL',
  [FuelType.BIOFUEL]: 'BIOFUEL',
  [FuelType.HYDROGEN]: 'RENEWABLE',
  [FuelType.AMMONIA]: 'RENEWABLE',
  [FuelType.METHANOL]: 'RENEWABLE',
  [FuelType.ELECTRIC]: 'ELECTRIC',
};



