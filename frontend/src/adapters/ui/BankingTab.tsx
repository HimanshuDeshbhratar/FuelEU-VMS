/**
 * Banking Tab Component
 * Displays banking operations and compliance balances
 */

import React, { useState, useEffect } from 'react';
import { useBanking, ComplianceBalance } from '../../core/application/useBanking';

const BankingTab: React.FC = () => {
  const {
    loading,
    error,
    getAllComplianceBalances,
    getBankingBalance,
    bankSurplus,
    applyBanked,
  } = useBanking();

  const [year, setYear] = useState<number>(2024);
  const [complianceBalances, setComplianceBalances] = useState<ComplianceBalance[]>([]);
  const [bankingBalances, setBankingBalances] = useState<Record<string, number>>({});
  const [selectedShip, setSelectedShip] = useState<string>('');
  const [applyAmount, setApplyAmount] = useState<string>('');

  useEffect(() => {
    loadData();
  }, [year]);

  const loadData = async () => {
    try {
      const balances = await getAllComplianceBalances(year);
      setComplianceBalances(balances);

      // Load banking balances for all ships
      const bankBalances: Record<string, number> = {};
      for (const balance of balances) {
        try {
          const bankBalance = await getBankingBalance(balance.shipId, year);
          bankBalances[balance.shipId] = bankBalance.totalBanked;
        } catch (err) {
          bankBalances[balance.shipId] = 0;
        }
      }
      setBankingBalances(bankBalances);
    } catch (err) {
      console.error('Failed to load data:', err);
    }
  };

  const handleBank = async (shipId: string) => {
    if (window.confirm(`Bank surplus for ship ${shipId}?`)) {
      try {
        await bankSurplus(shipId, year);
        alert('Surplus banked successfully');
        await loadData();
      } catch (err: any) {
        alert(err.error || 'Failed to bank surplus');
      }
    }
  };

  const handleApply = async () => {
    if (!selectedShip || !applyAmount) {
      alert('Please select a ship and enter an amount');
      return;
    }

    const amount = parseFloat(applyAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid positive amount');
      return;
    }

    if (window.confirm(`Apply ${amount} gCO2eq from banked amount?`)) {
      try {
        await applyBanked(selectedShip, year, amount);
        alert('Banked amount applied successfully');
        setApplyAmount('');
        setSelectedShip('');
        await loadData();
      } catch (err: any) {
        alert(err.error || 'Failed to apply banked amount');
      }
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Banking</h2>
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
          <h3 className="text-sm font-medium text-gray-700 mb-4">Apply Banked Amount</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ship ID</label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedShip}
                onChange={(e) => setSelectedShip(e.target.value)}
              >
                <option value="">Select a ship</option>
                {complianceBalances.map((cb) => (
                  <option key={cb.shipId} value={cb.shipId}>
                    {cb.shipId}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (gCO2eq)</label>
              <input
                type="number"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={applyAmount}
                onChange={(e) => setApplyAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleApply}
                disabled={!selectedShip || !applyAmount}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ship ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compliance Balance (gCO2eq)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Banked Amount (gCO2eq)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : complianceBalances.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No compliance balances found
                  </td>
                </tr>
              ) : (
                complianceBalances.map((cb) => {
                  const banked = bankingBalances[cb.shipId] || 0;
                  const isSurplus = cb.cbGco2eq > 0;

                  return (
                    <tr key={cb.shipId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {cb.shipId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={isSurplus ? 'text-green-600' : 'text-red-600'}>
                          {cb.cbGco2eq.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {banked.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isSurplus ? (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Surplus
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            Deficit
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {isSurplus ? (
                          <button
                            onClick={() => handleBank(cb.shipId)}
                            className="text-blue-600 hover:text-blue-900 font-medium"
                          >
                            Bank Surplus
                          </button>
                        ) : (
                          <span className="text-gray-400">-</span>
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

export default BankingTab;

