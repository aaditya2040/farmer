import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockCentres, mockMspRates } from '../../data/mockData';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  FileText, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  TrendingUp, 
  Users, 
  Building2, 
  CreditCard,
  Search,
  ChevronRight,
  Info,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t, language, setCurrentView, isLoggedIn } = useApp();
  const [centreSearch, setCentreSearch] = useState('');

  const filteredCentres = mockCentres.filter(c => 
    c.name.toLowerCase().includes(centreSearch.toLowerCase()) ||
    c.district.toLowerCase().includes(centreSearch.toLowerCase()) ||
    c.taluka.toLowerCase().includes(centreSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      
      {/* Notice Board Flash Ticker */}
      <div className="bg-amber-500/15 border-y border-amber-300 py-2">
        <div className="govt-container flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-amber-950 font-medium">
          <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-900 flex-shrink-0 bg-amber-400/50 px-2 py-0.5 rounded">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{t('noticeBoardTitle')}:</span>
          </div>
          <div className="marquee-container overflow-hidden whitespace-nowrap flex-1">
            <span className="inline-block font-medium">
              📢 Kharif 2026-27 Minimum Support Price (MSP) registration active across all 48 Maharashtra APMC centres • Soyabean standard MSP: ₹4,892/Qtl + ₹100 State Bonus • Please ensure produce moisture is below 12% before reporting • Bring 7/12 & Aadhaar.
            </span>
          </div>
          <button 
            onClick={() => setCurrentView('notifications')}
            className="text-govt-navy font-bold hover:underline flex items-center gap-0.5 text-[11px] self-end sm:self-auto"
          >
            {t('viewAllNotices')} <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="govt-container">
        <div className="bg-white border-2 border-govt-border rounded-lg shadow-govt overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-8 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-govt-navy/10 text-govt-navy text-xs font-bold uppercase tracking-wide border border-govt-navy/20">
                  <ShieldCheck className="w-4 h-4 text-govt-navy" />
                  <span>State Agricultural Procurement & Queue Portal</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold text-govt-navy font-govt leading-tight">
                  {t('heroTitle')}
                </h2>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl font-normal">
                  {t('heroSubtitle')}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setCurrentView(isLoggedIn ? 'book-slot' : 'login')}
                  className="px-6 py-3 bg-govt-navy hover:bg-govt-navy-dark text-white font-bold rounded shadow-md text-sm flex items-center gap-2 transition-transform active:scale-98 border-2 border-govt-navy"
                >
                  <Calendar className="w-4 h-4 text-govt-saffron" />
                  <span>{t('heroPrimaryCta')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentView('track-queue')}
                  className="px-5 py-3 bg-white hover:bg-slate-50 text-govt-navy font-bold rounded shadow-xs text-sm flex items-center gap-2 border-2 border-govt-navy transition-colors"
                >
                  <Clock className="w-4 h-4 text-govt-saffron-dark" />
                  <span>{t('heroSecondaryCta')}</span>
                </button>

                <button
                  onClick={() => setCurrentView('staff-dashboard')}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded text-xs flex items-center gap-1.5 border border-slate-300 transition-colors"
                >
                  <span>{t('heroTertiaryCta')}</span>
                </button>
              </div>

              {/* Last Updated Timestamp */}
              <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
                <span>{t('lastUpdated')}</span>
                <span className="text-green-700 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
                  48 Procurement Centres Online & Accepting Tokens Today
                </span>
              </div>
            </div>

            {/* Hero Right: Official Citizen Notice Card */}
            <div className="lg:col-span-4 bg-slate-50 border-t lg:border-t-0 lg:border-l border-govt-border p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="text-xs font-bold text-govt-navy uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-govt-saffron-dark" />
                    <span>Citizen Advisory (शेतकरी सूचना)</span>
                  </h3>
                  <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">NEW</span>
                </div>

                <div className="space-y-3 text-xs text-slate-700">
                  <div className="bg-white p-3 rounded border border-slate-200 space-y-1">
                    <div className="font-bold text-govt-navy">1. Strict Time-Slot Adherence</div>
                    <p className="text-slate-600 text-[11px]">
                      Farmers must arrive 15 minutes before the allotted 1-hour slot. Early or late arrivals may need re-tokening.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded border border-slate-200 space-y-1">
                    <div className="font-bold text-govt-navy">2. Mandatory 7/12 & Aadhaar</div>
                    <p className="text-slate-600 text-[11px]">
                      Carry original/digital 7/12 land extract with matching name and active Aadhaar-linked bank account.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded border border-slate-200 space-y-1">
                    <div className="font-bold text-govt-navy">3. Live SMS & Gate Pass</div>
                    <p className="text-slate-600 text-[11px]">
                      Show your digital QR token receipt or official SMS gate pass at Gate 2 security entrance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-950 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                <span>
                  Facing issues booking slots? Contact your local Taluka Agriculture Officer or call Toll-Free <strong>1800-233-0244</strong>.
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* State Key Procurement Metrics KPI Strip */}
      <section className="govt-container">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-lg border border-govt-border shadow-govt flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 text-govt-navy flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-govt-navy font-mono">{t('statFarmers')}</div>
              <div className="text-xs text-slate-600 font-medium">{t('statFarmersLabel')}</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-govt-border shadow-govt flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 font-mono">{t('statCentres')}</div>
              <div className="text-xs text-slate-600 font-medium">{t('statCentresLabel')}</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-govt-border shadow-govt flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-900 font-mono">{t('statProcured')}</div>
              <div className="text-xs text-slate-600 font-medium">{t('statProcuredLabel')}</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-govt-border shadow-govt flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-900 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-900 font-mono">{t('statDbt')}</div>
              <div className="text-xs text-slate-600 font-medium">{t('statDbtLabel')}</div>
            </div>
          </div>

        </div>
      </section>

      {/* How KisanSetu Works — 4 Easy Steps */}
      <section className="govt-container">
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-govt-border shadow-govt space-y-6">
          <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-govt-navy font-govt">
                {t('howItWorksTitle')}
              </h3>
              <p className="text-xs text-slate-600">
                Transparent and zero-middlemen procurement process powered by Government of Maharashtra
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-800 rounded-full border border-green-300 self-start sm:self-auto">
              ✓ Direct Farmer-to-Govt Gateway
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-4 bg-slate-50 rounded border border-slate-200 relative group hover:border-govt-navy transition-colors">
              <div className="w-10 h-10 rounded-full bg-govt-navy text-white font-bold flex items-center justify-center text-sm mb-3">
                1
              </div>
              <h4 className="text-sm font-bold text-govt-navy mb-1">{t('step1Title')}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{t('step1Desc')}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded border border-slate-200 relative group hover:border-govt-navy transition-colors">
              <div className="w-10 h-10 rounded-full bg-govt-navy text-white font-bold flex items-center justify-center text-sm mb-3">
                2
              </div>
              <h4 className="text-sm font-bold text-govt-navy mb-1">{t('step2Title')}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{t('step2Desc')}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded border border-slate-200 relative group hover:border-govt-navy transition-colors">
              <div className="w-10 h-10 rounded-full bg-govt-navy text-white font-bold flex items-center justify-center text-sm mb-3">
                3
              </div>
              <h4 className="text-sm font-bold text-govt-navy mb-1">{t('step3Title')}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{t('step3Desc')}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded border border-slate-200 relative group hover:border-govt-navy transition-colors">
              <div className="w-10 h-10 rounded-full bg-govt-green-dark text-white font-bold flex items-center justify-center text-sm mb-3">
                4
              </div>
              <h4 className="text-sm font-bold text-green-900 mb-1">{t('step4Title')}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{t('step4Desc')}</p>
            </div>

          </div>
        </div>
      </section>

      {/* 2-Column Section: Documents Required & Current MSP Rates */}
      <section className="govt-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Col 1: Documents Required */}
          <div className="lg:col-span-5 bg-white p-6 rounded-lg border border-govt-border shadow-govt space-y-4">
            <h3 className="text-base font-bold text-govt-navy border-b border-slate-200 pb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-govt-saffron-dark" />
              <span>{t('docsRequiredTitle')}</span>
            </h3>

            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2.5 p-2 rounded bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">{t('doc1')}</strong>
                  <span className="text-[11px] text-slate-500">Must reflect current kharif/rabi crop entry in Mahabhulekh.</span>
                </div>
              </li>

              <li className="flex items-start gap-2.5 p-2 rounded bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">{t('doc2')}</strong>
                  <span className="text-[11px] text-slate-500">Biometric or OTP authentication at center gate.</span>
                </div>
              </li>

              <li className="flex items-start gap-2.5 p-2 rounded bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">{t('doc3')}</strong>
                  <span className="text-[11px] text-slate-500">DBT payment directly transferred to Aadhaar-seeded account.</span>
                </div>
              </li>

              <li className="flex items-start gap-2.5 p-2 rounded bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">{t('doc4')}</strong>
                  <span className="text-[11px] text-slate-500">Show printed PDF receipt or official SMS gate message.</span>
                </div>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => setCurrentView('register')}
                className="w-full py-2 bg-govt-navy hover:bg-govt-navy-dark text-white font-bold rounded text-xs transition-colors"
              >
                {t('registerNowBtn')} ›
              </button>
            </div>
          </div>

          {/* Col 2: Official MSP Rates Ticker Table */}
          <div className="lg:col-span-7 bg-white p-6 rounded-lg border border-govt-border shadow-govt space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-base font-bold text-govt-navy flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-govt-green" />
                <span>Maharashtra Government Minimum Support Prices (MSP 2026-27)</span>
              </h3>
              <span className="text-[11px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded">
                Official Rates
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                    <th className="py-2.5 px-3">Crop / Commodity</th>
                    <th className="py-2.5 px-3">Govt MSP Rate</th>
                    <th className="py-2.5 px-3">State Bonus</th>
                    <th className="py-2.5 px-3">Total Guaranteed</th>
                    <th className="py-2.5 px-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {mockMspRates.map((rate, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        {language === 'mr' ? rate.cropNameMr : (language === 'hi' ? rate.cropNameHi : rate.cropName)}
                        <span className="block text-[10px] text-slate-500 font-normal">{rate.category}</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                        ₹{rate.msp2025_26.toLocaleString()} / Qtl
                      </td>
                      <td className="py-2.5 px-3 font-mono text-emerald-700 font-semibold">
                        +₹{rate.stateBonus}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-govt-navy">
                        ₹{(rate.msp2025_26 + rate.stateBonus).toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3">
                        <button
                          onClick={() => setCurrentView('book-slot')}
                          className="px-2 py-1 bg-govt-navy text-white text-[11px] rounded hover:bg-govt-navy-dark font-semibold"
                        >
                          Book Slot
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              * Payment is released directly via PFMS Direct Benefit Transfer within 24 to 48 hours of weighment acceptance.
            </p>
          </div>

        </div>
      </section>

      {/* Live Procurement Centre Search & Slot Availability Locator */}
      <section className="govt-container">
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-govt-border shadow-govt space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-lg font-bold text-govt-navy font-govt flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                <span>Live APMC Procurement Centre Directory & Slot Availability</span>
              </h3>
              <p className="text-xs text-slate-600">
                Check today's real-time queue congestion, remaining slots, and operating hours across districts.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={centreSearch}
                onChange={(e) => setCentreSearch(e.target.value)}
                placeholder={t('searchCentrePlaceholder')}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCentres.map((centre) => (
              <div 
                key={centre.id}
                className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-govt-navy hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-govt-navy leading-tight">
                      {language === 'mr' ? centre.nameMr : (language === 'hi' ? centre.nameHi : centre.name)}
                    </h4>
                    <StatusBadge status={centre.activeStatus} size="sm" />
                  </div>

                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    {centre.address}
                  </p>

                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span>District: <strong className="text-slate-800">{centre.district}</strong></span>
                    <span>•</span>
                    <span>Distance: <strong className="text-slate-800">{centre.distanceKm} km</strong></span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">{t('availableSlotsBadge')}:</span>
                    <span className="font-mono font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                      {centre.availableSlotsToday} Slots
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">{t('todayQueueBadge')}:</span>
                    <span className="font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {centre.currentQueueCount} Farmers in line
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{t('timingLabel')}:</span>
                    <span className="font-semibold text-slate-700">{centre.operatingHours}</span>
                  </div>

                  <button
                    onClick={() => setCurrentView('book-slot')}
                    className="w-full py-2 bg-govt-navy hover:bg-govt-navy-dark text-white font-bold rounded text-xs transition-colors flex items-center justify-center gap-1.5 mt-2"
                  >
                    <span>{t('selectCenterBtn')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
