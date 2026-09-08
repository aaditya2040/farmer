import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  CreditCard, 
  CheckCircle2, 
  Download, 
  Printer, 
  ShieldCheck, 
  Building, 
  FileText, 
  Clock, 
  ExternalLink,
  ArrowLeft
} from 'lucide-react';

export const PaymentStatus: React.FC = () => {
  const { t, language, farmer, paymentDetails, setCurrentView } = useApp();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="govt-container py-8 space-y-6">
      
      {/* Top Action Header */}
      <div className="bg-white p-5 rounded-lg border-2 border-govt-border shadow-govt flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-green-800 bg-green-50 px-2.5 py-0.5 rounded border border-green-200">
              DBT Gateway Active
            </span>
            <StatusBadge status={paymentDetails.paymentStatus} size="sm" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-govt-navy font-govt mt-1 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-govt-green" />
            <span>{t('paymentTitle')}</span>
          </h2>
          <p className="text-xs text-slate-600">
            {t('paymentSub')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-govt-navy hover:bg-govt-navy-dark text-white font-bold rounded text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Payment Voucher</span>
          </button>
        </div>
      </div>

      {/* Main Payment Status Card & Calculation Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Amount Disbursed & Bank Verification */}
        <div className="lg:col-span-7 bg-white p-6 rounded-lg border-2 border-govt-border shadow-govt space-y-6">
          <div className="bg-gradient-to-br from-emerald-900 to-green-950 text-white p-6 rounded-lg shadow-md space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-200 uppercase font-bold tracking-wider">
                Direct Benefit Transfer (DBT) Payout
              </span>
              <span className="text-xs bg-emerald-400 text-slate-950 font-bold px-2 py-0.5 rounded font-mono">
                CLEARED
              </span>
            </div>

            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-wide">
              ₹{paymentDetails.netDisbursedAmount.toLocaleString('en-IN')}.00
            </div>

            <div className="text-xs text-emerald-100 flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Transferred to <strong>{paymentDetails.bankName} (A/c {paymentDetails.maskedAccountNumber})</strong></span>
            </div>
          </div>

          {/* Banking & Transaction Audit Trail */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-govt-navy uppercase tracking-wider border-b border-slate-200 pb-2">
              Electronic Banking & PFMS Reference Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">PFMS Reference Number</span>
                <span className="font-mono font-bold text-slate-900">{paymentDetails.pfmsReferenceNumber}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Bank UTR Transaction ID</span>
                <span className="font-mono font-bold text-slate-900">{paymentDetails.utrNumber}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Aadhaar Seeding Status</span>
                <span className="font-bold text-green-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Active (NPCI Mapper Verified)
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Disbursal Value Date</span>
                <span className="font-bold text-slate-900">{paymentDetails.paymentDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Official MSP Invoice / J-Form Statement */}
        <div className="lg:col-span-5 bg-white p-6 rounded-lg border-2 border-govt-border shadow-govt space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="text-xs font-bold text-govt-navy uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-govt-navy" />
              <span>{t('mspBreakdownTitle')}</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              J-Form #{paymentDetails.jFormNumber}
            </span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">{t('commodity')}:</span>
              <strong className="text-slate-900">{paymentDetails.cropName}</strong>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Net Quantity Accepted:</span>
              <strong className="font-mono text-slate-900">{paymentDetails.netQuantityQuintals} Quintals</strong>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">{t('mspRatePerQtl')}:</span>
              <strong className="font-mono text-slate-900">₹{paymentDetails.mspRatePerQuintal.toLocaleString()} / Qtl</strong>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">{t('grossValue')}:</span>
              <span className="font-mono font-bold text-slate-900">₹{paymentDetails.totalGrossAmount.toLocaleString()}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100 text-green-700">
              <span>{t('stateBonus')} (₹100/Qtl):</span>
              <span className="font-mono font-bold">+₹{paymentDetails.stateIncentiveBonus.toLocaleString()}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100 text-slate-500">
              <span>Mandi / Weighbridge Fee:</span>
              <span className="font-mono text-green-700 font-bold">₹0.00 (Exempted)</span>
            </div>

            <div className="flex justify-between py-2 border-t-2 border-slate-800 text-sm font-bold text-govt-navy bg-slate-50 px-2 rounded">
              <span>{t('netPayable')}:</span>
              <span className="font-mono text-green-800 font-extrabold">₹{paymentDetails.netDisbursedAmount.toLocaleString()}.00</span>
            </div>
          </div>

          <div className="pt-3">
            <button
              onClick={handlePrint}
              className="w-full py-2.5 bg-govt-navy hover:bg-govt-navy-dark text-white font-bold rounded text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>{t('downloadJFormBtn')}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
