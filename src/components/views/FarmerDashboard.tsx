import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { mockMspRates } from '../../data/mockData';
import { 
  Calendar, 
  Clock, 
  FileText, 
  ClipboardCheck, 
  CreditCard, 
  Bell, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  MapPin, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { ViewType } from '../../types';

export const FarmerDashboard: React.FC = () => {
  const { t, language, farmer, booking, setCurrentView, tokensAhead, yourQueuePosition } = useApp();

  const handleCardClick = (view: ViewType) => {
    setCurrentView(view);
  };

  return (
    <div className="govt-container py-8 space-y-6">
      
      {/* Farmer Welcome Profile Banner */}
      <div className="bg-white border-2 border-govt-border rounded-lg shadow-govt p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-govt-navy text-white flex items-center justify-center font-bold text-xl shadow-xs border-2 border-govt-navy-light flex-shrink-0">
            {farmer.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t('welcomeFarmer')}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded border border-green-300">
                <ShieldCheck className="w-3 h-3 text-green-700" /> Aadhaar Verified
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-govt-navy font-govt">
              {language === 'mr' && farmer.fullNameMr ? farmer.fullNameMr : (language === 'hi' && farmer.fullNameHi ? farmer.fullNameHi : farmer.fullName)}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-1">
              <span>{t('farmerIdLabel')}: <strong className="font-mono text-slate-900">{farmer.farmerId}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                {farmer.landDetails.village}, {farmer.landDetails.taluka} ({farmer.landDetails.district})
              </span>
              <span>•</span>
              <span>7/12 Khata: <strong className="font-mono text-slate-900">{farmer.landDetails.khataNumber}</strong></span>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setCurrentView('book-slot')}
            className="px-4 py-2 bg-govt-navy hover:bg-govt-navy-dark text-white font-bold rounded text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-govt-saffron" />
            <span>{t('cardBookSlotTitle')}</span>
          </button>
        </div>
      </div>

      {/* Active Token / Booking Highlight Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-govt-navy text-white rounded-lg shadow-md p-5 border-l-6 border-govt-saffron">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-govt-saffron text-slate-950 font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                TODAY'S ACTIVE TOKEN PASS
              </span>
              <StatusBadge status={booking.status} size="sm" />
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-wide">
                {booking.tokenNumber}
              </span>
              <span className="text-sm text-slate-200">
                • {booking.centreName}
              </span>
            </div>

            <div className="text-xs text-slate-300 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>Time Slot: <strong className="text-white">{booking.bookingDate} ({booking.timeSlot})</strong></span>
              <span>•</span>
              <span>Crop: <strong className="text-white">{booking.cropName} ({booking.estimatedQuantityQuintals} Qtl)</strong></span>
              <span>•</span>
              <span>Gate Entry: <strong className="text-govt-saffron font-bold">{booking.allottedGate}</strong></span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setCurrentView('track-queue')}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Clock className="w-4 h-4" />
              <span>{t('trackLiveQueueBtn')} ({tokensAhead} Ahead)</span>
            </button>

            <button
              onClick={() => setCurrentView('token-receipt')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded text-xs border border-white/30 flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>{t('viewReceiptBtn')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Main Citizen Service Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-govt-navy uppercase tracking-wider">
          Citizen Services & Procurement Modules (नागरी सेवा)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Card 1: Slot Booking */}
          <div 
            onClick={() => handleCardClick('book-slot')}
            className="p-5 bg-white rounded-lg border border-govt-border hover:border-govt-navy hover:shadow-govt transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-govt-navy flex items-center justify-center group-hover:bg-govt-navy group-hover:text-white transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-govt-navy">{t('cardBookSlotTitle')}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{t('cardBookSlotDesc')}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-govt-navy">
              <span>Book New Slot</span>
              <ChevronRight className="w-4 h-4 text-govt-saffron group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: My Token */}
          <div 
            onClick={() => handleCardClick('token-receipt')}
            className="p-5 bg-white rounded-lg border border-govt-border hover:border-govt-navy hover:shadow-govt transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-govt-navy">{t('cardMyTokenTitle')}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{t('cardMyTokenDesc')}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-govt-navy">
              <span>View Pass & QR Code</span>
              <ChevronRight className="w-4 h-4 text-govt-saffron group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Live Queue Tracking */}
          <div 
            onClick={() => handleCardClick('track-queue')}
            className="p-5 bg-white rounded-lg border-2 border-green-300 hover:border-green-600 hover:shadow-govt transition-all cursor-pointer flex flex-col justify-between space-y-3 group bg-green-50/20"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-green-100 text-green-800 flex items-center justify-center group-hover:bg-green-700 group-hover:text-white transition-colors">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-govt-navy">{t('cardTrackQueueTitle')}</h4>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{t('cardTrackQueueDesc')}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-green-800">
              <span>Position #{yourQueuePosition} Live</span>
              <ChevronRight className="w-4 h-4 text-green-700 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Procurement Status */}
          <div 
            onClick={() => handleCardClick('procurement-status')}
            className="p-5 bg-white rounded-lg border border-govt-border hover:border-govt-navy hover:shadow-govt transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-900 flex items-center justify-center group-hover:bg-purple-700 group-hover:text-white transition-colors">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-govt-navy">{t('cardProcStatusTitle')}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{t('cardProcStatusDesc')}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-govt-navy">
              <span>View Audit Timeline</span>
              <ChevronRight className="w-4 h-4 text-govt-saffron group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Payment Status (DBT) */}
          <div 
            onClick={() => handleCardClick('payment-status')}
            className="p-5 bg-white rounded-lg border border-govt-border hover:border-govt-navy hover:shadow-govt transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <CreditCard className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-govt-navy">{t('cardPaymentTitle')}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{t('cardPaymentDesc')}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>₹2,24,640 (Credit Confirmed)</span>
              <ChevronRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Notifications & Alerts */}
          <div 
            onClick={() => handleCardClick('notifications')}
            className="p-5 bg-white rounded-lg border border-govt-border hover:border-govt-navy hover:shadow-govt transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-red-100 text-red-900 flex items-center justify-center group-hover:bg-red-700 group-hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-govt-navy">{t('cardNotifTitle')}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{t('cardNotifDesc')}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-govt-navy">
              <span>View 4 Official Alerts</span>
              <ChevronRight className="w-4 h-4 text-govt-saffron group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* Current MSP Rates Widget */}
      <div className="bg-white p-5 rounded-lg border border-govt-border shadow-govt space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h4 className="text-xs font-bold text-govt-navy uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-govt-green" />
            <span>Today's Official MSP Benchmark Rates</span>
          </h4>
          <span className="text-[11px] text-slate-500 font-mono">Kharif Season 2026-27</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {mockMspRates.map((rate, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded border border-slate-200 text-center space-y-1">
              <span className="text-xs font-bold text-slate-900 block truncate">
                {language === 'mr' ? rate.cropNameMr : (language === 'hi' ? rate.cropNameHi : rate.cropName)}
              </span>
              <span className="text-sm font-mono font-bold text-govt-navy block">
                ₹{rate.msp2025_26.toLocaleString()}
              </span>
              <span className="text-[10px] text-green-700 block font-medium">
                +₹{rate.stateBonus} State Bonus
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
