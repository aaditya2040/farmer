import React from 'react';
import { useApp } from './context/AppContext';
import { GovtTopStrip } from './components/layout/GovtTopStrip';
import { GovtHeader } from './components/layout/GovtHeader';
import { GovtNavbar } from './components/layout/GovtNavbar';
import { GovtFooter } from './components/layout/GovtFooter';
import { DemoQuickSwitcher } from './components/layout/DemoQuickSwitcher';
import { LiveSmsToast } from './components/common/LiveSmsToast';

// Views
import { LandingPage } from './components/views/LandingPage';
import { FarmerLogin } from './components/views/FarmerLogin';
import { FarmerRegistration } from './components/views/FarmerRegistration';
import { FarmerDashboard } from './components/views/FarmerDashboard';
import { SlotBooking } from './components/views/SlotBooking';
import { TokenReceipt } from './components/views/TokenReceipt';
import { LiveQueueTracker } from './components/views/LiveQueueTracker';
import { ProcurementStatus } from './components/views/ProcurementStatus';
import { PaymentStatus } from './components/views/PaymentStatus';
import { NotificationCenter } from './components/views/NotificationCenter';
import { HelpSupport } from './components/views/HelpSupport';
import { StaffDashboard } from './components/views/StaffDashboard';
import { AdminDashboard } from './components/views/AdminDashboard';

export const AppContent: React.FC = () => {
  const { currentView } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <LandingPage />;
      case 'login':
        return <FarmerLogin />;
      case 'register':
        return <FarmerRegistration />;
      case 'dashboard':
        return <FarmerDashboard />;
      case 'book-slot':
        return <SlotBooking />;
      case 'token-receipt':
        return <TokenReceipt />;
      case 'track-queue':
        return <LiveQueueTracker />;
      case 'procurement-status':
        return <ProcurementStatus />;
      case 'payment-status':
        return <PaymentStatus />;
      case 'notifications':
        return <NotificationCenter />;
      case 'help':
        return <HelpSupport />;
      case 'staff-dashboard':
        return <StaffDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Demo Evaluation Quick Switcher Bar */}
      <DemoQuickSwitcher />

      {/* Official Government Top Strip */}
      <GovtTopStrip />

      {/* Main Government Header */}
      <GovtHeader />

      {/* Navigation Bar */}
      <GovtNavbar />

      {/* Main Content Area with Skip Target */}
      <main id="main-content" className="flex-1 focus:outline-hidden">
        {renderCurrentView()}
      </main>

      {/* Live SMS Alert Toast */}
      <LiveSmsToast />

      {/* Government Footer */}
      <GovtFooter />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
