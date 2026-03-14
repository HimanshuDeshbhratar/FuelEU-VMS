/**
 * App Router
 * React Router configuration
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RoutesPage } from '../../ui/pages/RoutesPage';
import { CompliancePage } from '../../ui/pages/CompliancePage';
import { BankingPage } from '../../ui/pages/BankingPage';
import { PoolingPage } from '../../ui/pages/PoolingPage';
import { DashboardPage } from '../../ui/pages/DashboardPage';
import { APP_ROUTES } from '../../../shared/constants/routes';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={APP_ROUTES.ROUTES} element={<RoutesPage />} />
        <Route path={APP_ROUTES.COMPLIANCE} element={<CompliancePage />} />
        <Route path={APP_ROUTES.BANKING} element={<BankingPage />} />
        <Route path={APP_ROUTES.POOLING} element={<PoolingPage />} />
        <Route path="/" element={<Navigate to={APP_ROUTES.DASHBOARD} replace />} />
      </Routes>
    </BrowserRouter>
  );
};



