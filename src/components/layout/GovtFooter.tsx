import React from 'react';
import { useApp } from '../../context/AppContext';
import { Emblem } from '../common/Emblem';
import { Phone, Mail, MapPin, Shield, ExternalLink, HelpCircle } from 'lucide-react';
import { ViewType } from '../../types';

export const GovtFooter: React.FC = () => {
  const { t, setCurrentView, toggleDemoController, showDemoController } = useApp();

  const handleLink = (view: ViewType) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-govt-navy-dark text-slate-300 text-xs border-t-4 border-govt-saffron mt-auto no-print">
      {/* Upper Footer: 4 Grid Columns */}
      <div className="govt-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: About KisanSetu */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Emblem size="sm" />
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">
                  {t('portalTitle')}
                </h3>
                <span className="text-[10px] text-slate-400 block">
                  e-Procurement & Queue Portal
                </span>
              </div>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">
              {t('footerAboutText')}
            </p>
            <div className="text-[11px] text-govt-saffron font-semibold flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              <span>GIGW & STQC Certified Guidelines Compliant</span>
            </div>
          </div>

          {/* Col 2: Citizen Quick Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-govt-saffron rounded-xs"></span>
              {t('footerQuickLinks')}
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => handleLink('book-slot')} className="hover:text-govt-saffron transition-colors flex items-center gap-1">
                  › {t('navSlotBooking')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('track-queue')} className="hover:text-govt-saffron transition-colors flex items-center gap-1">
                  › {t('navTrackQueue')} (A-127)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('procurement-status')} className="hover:text-govt-saffron transition-colors flex items-center gap-1">
                  › {t('navProcurementStatus')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('payment-status')} className="hover:text-govt-saffron transition-colors flex items-center gap-1">
                  › {t('navPaymentStatus')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('register')} className="hover:text-govt-saffron transition-colors flex items-center gap-1">
                  › {t('register')}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('notifications')} className="hover:text-govt-saffron transition-colors flex items-center gap-1">
                  › {t('navNotifications')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Helpdesk & Grievance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-govt-green rounded-xs"></span>
              {t('footerHelpDesk')}
            </h4>
            <div className="space-y-2.5 text-[11px]">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-govt-saffron flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Toll-Free Helpline (24x7)</span>
                  <span className="font-bold text-white font-mono">1800-233-0244</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px]">{t('kisanCallCenter')}</span>
                  <span className="font-bold text-white font-mono">1551 (All Telecom Networks)</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Official Support Email</span>
                  <span className="text-slate-200 font-mono">helpdesk.procure@maharashtra.gov.in</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-200 text-[10px]">
                    MSCMF Head Office, New Administrative Bldg, 14th Floor, Mantralaya, Mumbai - 400032
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Official Prototype Disclaimer */}
          <div className="space-y-3 bg-slate-900/60 p-3.5 rounded border border-slate-700">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Important Prototype Notice</span>
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-300">
              {t('footerDisclaimerText')}
            </p>
            <div className="pt-2 border-t border-slate-700 text-[10px] text-slate-400 space-y-1">
              <div>Portal Engine: <span className="font-mono text-slate-200">v2.4-SIH-Prototype</span></div>
              <div>State Nodal Server: <span className="font-mono text-slate-200">MH-MANDI-DC01</span></div>
              <div>Compliance: <span className="text-green-400 font-semibold">NIC GIGW v3.0</span></div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal Strip */}
      <div className="bg-slate-950 py-3 border-t border-slate-800">
        <div className="govt-container flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-slate-400">
          <div>
            {t('copyright')} • Designed & Maintained for Agricultural Citizen Services.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => handleLink('help')} className="hover:text-white underline underline-offset-2">Privacy Policy</button>
            <button onClick={() => handleLink('help')} className="hover:text-white underline underline-offset-2">Terms of Use</button>
            <button onClick={() => handleLink('help')} className="hover:text-white underline underline-offset-2">Accessibility Statement</button>
            <button onClick={() => handleLink('help')} className="hover:text-white underline underline-offset-2">Sitemap</button>
            <button 
              onClick={toggleDemoController} 
              className="text-govt-saffron hover:underline font-mono border border-slate-700 px-1.5 py-0.5 rounded text-[9px]"
              title="Toggle Demo Evaluation Controls for Presentation"
            >
              🛠️ {showDemoController ? 'Hide Demo Bar' : 'Demo Controller'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
