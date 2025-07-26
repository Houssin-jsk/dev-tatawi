import React from 'react';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';

const MainLayout: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        <main>
          <Outlet />
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default MainLayout;