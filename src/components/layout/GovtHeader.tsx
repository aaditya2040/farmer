import React from 'react';
import { useApp } from '../../context/AppContext';
import { Emblem } from '../common/Emblem';
import { Phone, HelpCircle, User, LogOut, ShieldCheck, AlertTriangle } from 'lucide-react';

export const GovtHeader: React.FC = () => {
  const { t, language, farmer, isLoggedIn, setIsLoggedIn, setCurrentView, currentView } = useApp();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('home');
  };

  return (
    <header className="bg-white border-b border-govt-border no-print">
      {/* Tiranga Indian Tri-color Strip */}
      <div className="tiranga-strip"></div>

      {/* Demo Disclaimer Watermark Bar */}
      <div className="bg-amber-50 border-b border-amber-200 px-3 py-1 text-center text-[11px] font-semibold text-amber-950 flex items-center justify-center gap-1.5">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
        <span>{t('demoDisclaimer')}</span>
      </div>

      {/* Main Header Container */}
      <div className="govt-container py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Left Side: Emblem + System Title */}
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setCurrentView('home')}>
            <Emblem size="md" />
            <div>
              <div className="flex items-baseline gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-govt-navy font-govt">
                  {t('portalTitle')}
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-govt-saffron-light text-govt-saffron-dark border border-govt-saffron/30">
                  e-Procure
                </span>
              </div>
              <p className="text-sm font-semibold text-govt-navy-light tracking-tight">
                {t('portalSubTitle')}
              </p>
              <p className="text-xs text-govt-text-muted hidden sm:block">
                {t('portalTagline')}
              </p>
            </div>
          </div>

          {/* Right Side: Citizen Helpline & Citizen Auth State */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-between md:justify-end">
            
            {/* Helpline Badge */}
            <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-left">
              <div className="w-8 h-8 rounded-full bg-govt-navy text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-medium block uppercase tracking-wider">
                  {t('tollFree')} (24x7)
                </span>
                <span className="text-xs font-bold text-govt-navy font-mono">
                  1800-233-0244 / 1551
                </span>
              </div>
            </div>

            {/* User Session Profile / Auth Controls */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <div 
                  onClick={() => setCurrentView('dashboard')}
                  className="flex items-center gap-2.5 px-3 py-1.5 bg-blue-50/80 border border-blue-200 rounded cursor-pointer hover:bg-blue-100/80 transition-colors"
                  title="Go to Farmer Dashboard"
                >
                  <div className="w-8 h-8 rounded-full bg-govt-navy text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {farmer.fullName.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-govt-navy truncate max-w-[140px]">
                        {language === 'mr' && farmer.fullNameMr ? farmer.fullNameMr : (language === 'hi' && farmer.fullNameHi ? farmer.fullNameHi : farmer.fullName)}
                      </span>
                      <span title="Aadhaar Verified"><ShieldCheck className="w-3.5 h-3.5 text-green-600" /></span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-600 block">
                      {farmer.farmerId}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-600 hover:text-red-700 hover:bg-red-50 rounded border border-slate-200 transition-colors"
                  title={t('logout')}
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('login')}
                  className="px-3.5 py-1.5 text-xs font-bold bg-govt-navy text-white rounded hover:bg-govt-navy-dark shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  {t('login')}
                </button>
                <button
                  onClick={() => setCurrentView('register')}
                  className="px-3.5 py-1.5 text-xs font-bold bg-white text-govt-navy border border-govt-navy rounded hover:bg-slate-50 transition-colors hidden sm:inline-block"
                >
                  {t('register')}
                </button>
              </div>
            )}

            {/* Helpdesk Button */}
            <button
              onClick={() => setCurrentView('help')}
              className={`p-2 rounded border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs flex items-center gap-1 transition-colors ${currentView === 'help' ? 'bg-slate-100 font-bold text-govt-navy' : ''}`}
              title={t('help')}
            >
              <HelpCircle className="w-4 h-4 text-govt-navy" />
              <span className="hidden md:inline">{t('help')}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
