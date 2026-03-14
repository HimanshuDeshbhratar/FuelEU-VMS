/**
 * Compare Tab Component
 * Displays route comparison with charts
 */

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import apiClient from '../infrastructure/api/apiClient';

interface ComparisonData {
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
  target: number;
}

const CompareTab: React.FC = () => {
  const [comparison, setComparison] = useState<ComparisonData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState<number | ''>('');

  const fetchComparison = async (selectedYear?: number) => {
    setLoading(true);
    setError(null);
    try {
      const params = selectedYear ? { year: selectedYear.toString() } : {};
      const response = await apiClient.get('/routes/comparison', { params });
      setComparison(response.data);
    } catch (err: any) {
      setError(err.error || 'Failed to fetch comparison');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComparison();
  }, []);

  const chartData = comparison
    ? [
        {
          name: 'Baseline',
          'GHG Intensity (gCO2e/MJ)': comparison.baseline.ghgIntensity,
        },
        {
          name: 'Comparison',
          'GHG Intensity (gCO2e/MJ)': comparison.comparison.ghgIntensity,
        },
        {
          name: 'Target',
          'GHG Intensity (gCO2e/MJ)': comparison.target,
        },
      ]
    : [];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Route Comparison</h2>
      </div>

      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-4">
          <label className="block text-sm font-medium text-gray-700">Year:</label>
          <input
            type="number"
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={year}
            onChange={(e) => setYear(e.target.value ? parseInt(e.target.value, 10) : '')}
            placeholder="Filter by year (optional)"
          />
          <button
            onClick={() => fetchComparison(year || undefined)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Compare
          </button>
        </div>
      </div>

      {error && (
        <div className="px-6 py-4 bg-red-50 border-b border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="px-6 py-8 text-center text-gray-500">Loading...</div>
      ) : comparison ? (
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Baseline Route</h3>
              <p className="text-2xl font-bold text-gray-900">{comparison.baseline.routeId}</p>
              <p className="text-sm text-gray-500 mt-1">
                GHG Intensity: {comparison.baseline.ghgIntensity.toFixed(2)} gCO2e/MJ
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Comparison Route</h3>
              <p className="text-2xl font-bold text-gray-900">{comparison.comparison.routeId}</p>
              <p className="text-sm text-gray-500 mt-1">
                GHG Intensity: {comparison.comparison.ghgIntensity.toFixed(2)} gCO2e/MJ
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Percent Difference</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {comparison.percentDiff > 0 ? '+' : ''}
                    {comparison.percentDiff.toFixed(2)}%
                  </p>
                </div>
                <div>
                  {comparison.isCompliant ? (
                    <span className="px-4 py-2 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                      ✅ Compliant
                    </span>
                  ) : (
                    <span className="px-4 py-2 text-sm font-semibold rounded-full bg-red-100 text-red-800">
                      ❌ Non-Compliant
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="GHG Intensity (gCO2e/MJ)" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="px-6 py-8 text-center text-gray-500">No comparison data available</div>
      )}
    </div>
  );
};

export default CompareTab;

