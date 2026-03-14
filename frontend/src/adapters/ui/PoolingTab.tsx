/**
 * Pooling Tab Component
 * Displays pooling operations and adjusted compliance balances
 */

import React, { useState, useEffect } from 'react';
import { usePooling, AdjustedCB } from '../../core/application/usePooling';
import { useBanking } from '../../core/application/useBanking';

const PoolingTab: React.FC = () => {
  const { loading, error, getAdjustedCB, createPool } = usePooling();
  const { getAllComplianceBalances } = useBanking();

  const [year, setYear] = useState<number>(2024);
  const [adjustedCBs, setAdjustedCBs] = useState<AdjustedCB[]>([]);
  const [selectedShips, setSelectedShips] = useState<string[]>([]);
  const [complianceBalances, setComplianceBalances] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, [year]);

  const loadData = async () => {
    try {
      const adjusted = await getAdjustedCB(year);
      setAdjustedCBs(adjusted);

      const balances = await getAllComplianceBalances(year);
      setComplianceBalances(balances);
    } catch (err) {
      console.error('Failed to load data:', err);
    }
  };

  const handleShipToggle = (shipId: string) => {
    setSelectedShips((prev) =>
      prev.includes(shipId)
        ? prev.filter((id) => id !== shipId)
        : [...prev, shipId]
    );
  };

  const handleCreatePool = async () => {
    if (selectedShips.length < 2) {
      alert('Please select at least 2 ships');
      return;
    }

    if (window.confirm(`Create pool with ${selectedShips.length} ships?`)) {
      try {
        await createPool(year, selectedShips);
        alert('Pool created successfully');
        setSelectedShips([]);
        await loadData();
      } catch (err: any) {
        alert(err.error || 'Failed to create pool');
      }
    }
  };

  const canCreatePool = () => {
    if (selectedShips.length < 2) return false;

    // Check if sum of adjusted CB is >= 0
    const selectedCBs = adjustedCBs.filter((cb) => selectedShips.includes(cb.shipId));
    const totalCB = selectedCBs.reduce((sum, cb) => sum + cb.adjustedCB, 0);

    return totalCB >= 0;
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Pooling</h2>
      </div>

      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-4">
          <label className="block text-sm font-medium text-gray-700">Year:</label>
          <input
            type="number"
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value, 10) || 2024)}
          />
          <button
            onClick={loadData}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="px-6 py-4 bg-red-50 border-b border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="px-6 py-4">
        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Create Pool</h3>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              Selected ships: {selectedShips.length} / {adjustedCBs.length}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {adjustedCBs.map((cb) => (
                <button
                  key={cb.shipId}
                  onClick={() => handleShipToggle(cb.shipId)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    selectedShips.includes(cb.shipId)
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {cb.shipId} ({cb.adjustedCB.toFixed(2)})
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleCreatePool}
            disabled={!canCreatePool()}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Create Pool
          </button>
          {selectedShips.length >= 2 && !canCreatePool() && (
            <p className="mt-2 text-sm text-red-600">
              Cannot create pool: total compliance balance must be &gt;= 0
            </p>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ship ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Adjusted CB (gCO2eq)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : adjustedCBs.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                    No adjusted compliance balances found
                  </td>
                </tr>
              ) : (
                adjustedCBs.map((cb) => {
                  const isSurplus = cb.adjustedCB > 0;
                  const isDeficit = cb.adjustedCB < 0;

                  return (
                    <tr key={cb.shipId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {cb.shipId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={isSurplus ? 'text-green-600' : isDeficit ? 'text-red-600' : 'text-gray-600'}>
                          {cb.adjustedCB.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isSurplus ? (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Surplus
                          </span>
                        ) : isDeficit ? (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            Deficit
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                            Neutral
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PoolingTab;

