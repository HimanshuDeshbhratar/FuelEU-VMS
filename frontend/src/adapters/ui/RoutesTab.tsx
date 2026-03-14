/**
 * Routes Tab Component
 * Displays routes table with filters and baseline setting
 */

import React, { useState } from 'react';
import { useRoutes, RouteFilters } from '../../core/application/useRoutes';

const RoutesTab: React.FC = () => {
  const { routes, loading, error, fetchRoutes, setBaseline } = useRoutes();
  const [filters, setFilters] = useState<RouteFilters>({});
  const [selectedYear, setSelectedYear] = useState<number | ''>('');

  const handleFilterChange = (key: keyof RouteFilters, value: string) => {
    const newFilters = { ...filters };
    if (value === '') {
      delete newFilters[key];
    } else {
      (newFilters as any)[key] = key === 'year' ? parseInt(value, 10) : value;
    }
    setFilters(newFilters);
    fetchRoutes(newFilters);
  };

  const handleSetBaseline = async (routeId: string) => {
    if (window.confirm(`Set route ${routeId} as baseline?`)) {
      try {
        await setBaseline(routeId);
        alert('Baseline route set successfully');
      } catch (err) {
        alert('Failed to set baseline route');
      }
    }
  };

  const uniqueYears = [...new Set(routes.map((r) => r.year))].sort();
  const uniqueVesselTypes = [...new Set(routes.map((r) => r.vesselType))];
  const uniqueFuelTypes = [...new Set(routes.map((r) => r.fuelType))];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Routes</h2>
      </div>

      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vessel Type</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filters.vesselType || ''}
              onChange={(e) => handleFilterChange('vesselType', e.target.value)}
            >
              <option value="">All</option>
              {uniqueVesselTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filters.fuelType || ''}
              onChange={(e) => handleFilterChange('fuelType', e.target.value)}
            >
              <option value="">All</option>
              {uniqueFuelTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filters.year || ''}
              onChange={(e) => handleFilterChange('year', e.target.value)}
            >
              <option value="">All</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="px-6 py-4 bg-red-50 border-b border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Route ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ship ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vessel Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fuel Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                GHG Intensity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Baseline
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : routes.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  No routes found
                </td>
              </tr>
            ) : (
              routes.map((route) => (
                <tr key={route.routeId} className={route.isBaseline ? 'bg-blue-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {route.routeId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {route.shipId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {route.vesselType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {route.fuelType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {route.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {route.ghgIntensity.toFixed(2)} gCO2e/MJ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {route.isBaseline ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Baseline
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {!route.isBaseline && (
                      <button
                        onClick={() => handleSetBaseline(route.routeId)}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        Set Baseline
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoutesTab;

