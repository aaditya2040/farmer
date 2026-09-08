import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  Calendar, 
  Clock, 
  ClipboardCheck, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LayoutDashboard,
  Menu,
  X,
  ShieldAlert,
  UserCog
} from 'lucide-react';
import { ViewType } from '../../types';

export const GovtNavbar: React.FC = () => {
  const { currentView, setCurrentView, t, notifications, isLoggedIn } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navItems: { id: ViewType; label: string; icon: React.ReactNode; badge?: React.ReactNode }[] = [
    { id: 'home', label: t('navHome'), icon: <Home className="w-4 h-4" /> },
    { 
      id: 'dashboard', 
      label: isLoggedIn ? t('navDashboard') : t('navServices'), 
      icon: <LayoutDashboard className="w-4 h-4" /> 
    },
    { id: 'book-slot', label: t('navSlotBooking'), icon: <Calendar className="w-4 h-4" /> },
    { 
      id: 'track-queue', 
      label: t('navTrackQueue'), 
      icon: <Clock className="w-4 h-4" />,
      badge: (
        <span className="flex h-2 w-2 relative ml-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
      )
    },
    { id: 'procurement-status', label: t('navProcurementStatus'), icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'payment-status', label: t('navPaymentStatus'), icon: <CreditCard className="w-4 h-4" /> },
    { 
      id: 'notifications', 
      label: t('navNotifications'), 
      icon: <Bell className="w-4 h-4" />,
      badge: unreadCount > 0 ? (
        <span className="ml-1.5 px-1.5 py-0.2 bg-red-600 text-white text-[10px] font-bold rounded-full">
          {unreadCount}
        </span>
      ) : null
    },
    { id: 'help', label: t('navHelp'), icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const handleNavClick = (view: ViewType) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-govt-navy text-white shadow-md sticky top-0 z-40 no-print border-b border-govt-navy-dark">
      <div className="govt-container">
        
        {/* Desktop Navbar */}
        <div className="flex items-center justify-between">
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-3 text-xs font-semibold tracking-wide transition-all border-b-3 ${
                    isActive
                      ? 'bg-govt-navy-dark text-govt-saffron border-govt-saffron font-bold'
                      : 'border-transparent text-slate-100 hover:bg-govt-navy-light/60 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge}
                </button>
              );
            })}
          </div>

          {/* Right Side Portals: Staff & Admin */}
          <div className="hidden lg:flex items-center gap-1.5 py-2">
            <button
              onClick={() => handleNavClick('staff-dashboard')}
              className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded border transition-colors ${
                currentView === 'staff-dashboard'
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-govt-navy-light text-slate-200 border-slate-600 hover:bg-slate-700 hover:text-white'
              }`}
              title="Centre Officer Queue Management"
            >
              <UserCog className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('officerPortal')}</span>
            </button>

            <button
              onClick={() => handleNavClick('admin-dashboard')}
              className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded border transition-colors ${
                currentView === 'admin-dashboard'
                  ? 'bg-green-500 text-slate-950 border-green-400'
                  : 'bg-govt-navy-light text-slate-200 border-slate-600 hover:bg-slate-700 hover:text-white'
              }`}
              title="State Nodal Officer Analytics"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-green-400" />
              <span>{t('adminPortal')}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center justify-between w-full py-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-govt-saffron flex items-center gap-1">
              Menu (नागरी सेवा)
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded bg-govt-navy-dark text-white hover:bg-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-govt-navy-light py-2 px-1 bg-govt-navy-dark space-y-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded transition-colors ${
                    isActive
                      ? 'bg-govt-navy text-govt-saffron font-bold'
                      : 'text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge}
                </button>
              );
            })}

            <div className="pt-2 border-t border-slate-700 grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => handleNavClick('staff-dashboard')}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded bg-slate-800 text-amber-400 border border-slate-600"
              >
                <UserCog className="w-3.5 h-3.5" />
                {t('officerPortal')}
              </button>
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded bg-slate-800 text-green-400 border border-slate-600"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                {t('adminPortal')}
              </button>
            </div>
          </div>
        )}

      </div>
    </nav>
  );
};
