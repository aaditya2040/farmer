import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  ClipboardCheck, 
  Clock, 
  CheckCircle2, 
  Scale, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight, 
  FileText,
  UserCheck,
  Building2,
  Calendar
} from 'lucide-react';

export const ProcurementStatus: React.FC = () => {
  const { t, language, booking, procurementTimeline, setCurrentView } = useApp();

  return (
    <div className="govt-container py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-lg border-2 border-govt-border shadow-govt flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-govt-navy uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
              Procurement Audit ID: PROC-MH-THN-2026-90412
            </span>
            <StatusBadge status="Under Inspection" size="sm" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-govt-navy font-govt mt-1">
            {t('procTimelineTitle')}
          </h2>
          <p className="text-xs text-slate-600">
            {t('procTimelineSub')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('payment-status')}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            <span>{t('cardPaymentTitle')}</span>
          </button>
        </div>
      </div>

      {/* Summary Highlights Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-lg border border-govt-border shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Token Pass</span>
          <span className="text-lg font-bold font-mono text-govt-navy">{booking.tokenNumber}</span>
        </div>
        <div className="p-4 bg-white rounded-lg border border-govt-border shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Crop & Standard</span>
          <span className="text-sm font-bold text-slate-900">{booking.cropName}</span>
        </div>
        <div className="p-4 bg-white rounded-lg border border-govt-border shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Net Accepted Weight</span>
          <span className="text-lg font-bold font-mono text-green-700">45.00 Quintals</span>
        </div>
        <div className="p-4 bg-white rounded-lg border border-govt-border shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Moisture Quality</span>
          <span className="text-sm font-bold text-emerald-800">10.4% (Grade-A FAQ)</span>
        </div>
      </div>

      {/* Timeline Audit Trail Container */}
      <div className="bg-white p-6 sm:p-8 rounded-lg border-2 border-govt-border shadow-govt space-y-6">
        <h3 className="text-sm font-bold text-govt-navy uppercase tracking-wider border-b border-slate-200 pb-3">
          Chronological Stage Verification Trail
        </h3>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-govt-navy/30 space-y-8">
          {procurementTimeline.map((stage, idx) => {
            const titleText = language === 'mr' ? stage.titleMr : (language === 'hi' ? stage.titleHi : stage.title);
            const descText = language === 'mr' ? stage.descriptionMr : (language === 'hi' ? stage.descriptionHi : stage.description);

            return (
              <div key={stage.id} className="relative group">
                
                {/* Node Bullet Icon */}
                <div className={`absolute -left-[31px] sm:-left-[39px] top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-transform group-hover:scale-110 ${
                  stage.completed
                    ? 'bg-green-700 border-green-600 text-white shadow-xs'
                    : stage.current
                    ? 'bg-amber-500 border-amber-400 text-slate-950 animate-pulse'
                    : 'bg-white border-slate-300 text-slate-400'
                }`}>
                  {stage.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>

                {/* Stage Body Card */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-2 hover:border-slate-300 transition-colors">
                  
                  {/* Stage Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-sm font-bold text-govt-navy flex items-center gap-2">
                      <span>{titleText}</span>
                      {stage.completed && (
                        <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.2 rounded border border-green-300">
                          VERIFIED
                        </span>
                      )}
                    </h4>
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {stage.timestamp}
                    </span>
                  </div>

                  {/* Stage Description */}
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {descText}
                  </p>

                  {/* Officer Sign-off Badge */}
                  {stage.officerName && (
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600 pt-1 border-t border-slate-200">
                      <UserCheck className="w-3.5 h-3.5 text-govt-navy" />
                      <span>Officer: <strong className="text-slate-800">{stage.officerName}</strong> ({stage.officerDesignation})</span>
                    </div>
                  )}

                  {/* Meta Data Parameters (e.g. Moisture / Weighbridge) */}
                  {stage.metaData && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs bg-white p-2.5 rounded border border-slate-200 font-mono">
                      {Object.entries(stage.metaData).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-slate-500 block text-[10px]">{key}</span>
                          <strong className="text-slate-900">{String(value)}</strong>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
