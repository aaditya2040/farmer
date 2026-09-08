import React from 'react';
import { useApp } from '../../context/AppContext';
import { Emblem } from '../common/Emblem';
import { QrCodePlaceholder } from '../common/QrCodePlaceholder';
import { 
  Printer, 
  Download, 
  Clock, 
  ArrowLeft, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Truck,
  CheckCircle2
} from 'lucide-react';

export const TokenReceipt: React.FC = () => {
  const { t, language, farmer, booking, setCurrentView } = useApp();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="govt-container py-8 space-y-6">
      
      {/* Top Action Bar (Hidden on print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-govt-border shadow-xs no-print">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="text-xs font-bold text-govt-navy hover:underline flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('track-queue')}
            className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white font-bold rounded text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Clock className="w-4 h-4" />
            <span>{t('trackLiveQueueBtn')}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-govt-navy hover:bg-govt-navy-dark text-white font-bold rounded text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>{t('printReceiptBtn')}</span>
          </button>
        </div>
      </div>

      {/* Official Government Gate Pass & Token Slip */}
      <div className="receipt-container max-w-2xl mx-auto bg-white border-2 border-slate-900 rounded-lg shadow-govt p-6 sm:p-8 space-y-6 relative overflow-hidden">
        
        {/* Security Watermark Background Pattern */}
        <div className="absolute inset-0 govt-watermark pointer-events-none opacity-40"></div>

        {/* Official Header */}
        <div className="relative border-b-2 border-slate-900 pb-4 text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <Emblem size="sm" />
            <div className="text-left">
              <h2 className="text-xs font-bold tracking-wider uppercase text-slate-900">
                Government of Maharashtra • Department of Agriculture
              </h2>
              <p className="text-[11px] font-semibold text-slate-700">
                Maharashtra State Co-operative Marketing Federation (MSCMF)
              </p>
            </div>
          </div>

          <div className="bg-slate-900 text-white py-1 px-4 text-xs font-bold tracking-widest uppercase inline-block rounded-xs">
            Official Procurement Gate Pass & E-Token Slip (टोकन पावती)
          </div>

          <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1">
            <span>Pass ID: <strong className="font-mono text-slate-800">{booking.bookingId}</strong></span>
            <span>Generated: <strong className="text-slate-800">08-Sep-2026, 09:15 AM</strong></span>
          </div>
        </div>

        {/* GIANT TOKEN DISPLAY BOX */}
        <div className="relative bg-slate-50 border-2 border-slate-900 rounded p-4 text-center space-y-1">
          <span className="text-xs font-bold tracking-wider text-slate-600 uppercase block">
            {t('tokenNumberLabel')}
          </span>
          <div className="text-4xl sm:text-5xl font-extrabold font-mono text-slate-900 tracking-wider">
            {booking.tokenNumber}
          </div>
          <div className="text-xs font-bold text-green-800 pt-1">
            ✓ AUTHORIZED FOR TODAY'S MSP INTAKE
          </div>
        </div>

        {/* 2-Column Details with QR Code */}
        <div className="relative grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          
          {/* Details Table */}
          <div className="sm:col-span-8 space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 border-b border-slate-200 pb-3">
              <div>
                <span className="text-slate-500 block text-[10px]">Farmer Name:</span>
                <strong className="text-slate-900 block text-xs">{booking.farmerName}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Farmer ID:</span>
                <strong className="font-mono text-slate-900 block text-xs">{booking.farmerId}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Aadhaar Masked:</span>
                <strong className="font-mono text-slate-900 block text-xs">{farmer.aadhaarMasked}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">7/12 Khata No.:</span>
                <strong className="font-mono text-slate-900 block text-xs">{farmer.landDetails.khataNumber}</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-1">
              <div className="col-span-2">
                <span className="text-slate-500 block text-[10px]">Procurement Centre:</span>
                <strong className="text-slate-900 block text-xs">{booking.centreName}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Slot Date & Time:</span>
                <strong className="text-slate-900 block text-xs font-mono">{booking.bookingDate} ({booking.timeSlot})</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Reporting Time:</span>
                <strong className="text-red-700 block text-xs font-mono font-bold">09:45 AM (Strict)</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Crop & Quantity:</span>
                <strong className="text-slate-900 block text-xs">{booking.cropName} ({booking.estimatedQuantityQuintals} Qtl)</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Allotted Bay & Gate:</span>
                <strong className="text-govt-navy block text-xs font-bold">{booking.allottedGate} / {booking.allottedBay}</strong>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[10px]">Vehicle / Tractor Number:</span>
                <strong className="font-mono text-slate-900 block text-xs">{booking.vehicleNumber || 'MH-04-EK-9412'}</strong>
              </div>
            </div>
          </div>

          {/* Right: Security QR Code + Barcode Mockup */}
          <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 bg-slate-50 border border-slate-300 rounded text-center space-y-2">
            <QrCodePlaceholder value={booking.tokenNumber} size={115} />
            <div className="text-[10px] text-slate-600 font-mono tracking-tighter">
              MH-TOKEN-HASH-8821
            </div>
            <div className="w-full h-8 bg-slate-900 flex items-center justify-center text-white text-[9px] font-mono tracking-widest px-1">
              ||| | |||| || ||| || |||
            </div>
            <span className="text-[9px] text-slate-500">Scan at Gate 2 Scanner</span>
          </div>

        </div>

        {/* Important Farmer Instructions Box */}
        <div className="relative p-3.5 bg-amber-50/80 border border-amber-300 rounded text-[11px] text-amber-950 space-y-1">
          <div className="font-bold flex items-center gap-1 text-amber-900">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
            <span>Important Guidelines for Gate Entry:</span>
          </div>
          <ul className="list-disc list-inside space-y-0.5 text-amber-900 pl-1 text-[10px]">
            <li>Please arrive at the procurement centre 15 minutes prior to your allotted slot.</li>
            <li>Produce moisture must be tested before weighbridge entry (Grade-A threshold &lt; 12%).</li>
            <li>Carry physical / digital 7/12 extract and Aadhaar card for gate verification.</li>
          </ul>
        </div>

        {/* Official Footer with Signatures */}
        <div className="relative pt-4 border-t-2 border-slate-900 flex justify-between items-end text-[10px] text-slate-600">
          <div className="space-y-1">
            <div>Authorized by: <strong className="text-slate-900">MSCMF Electronic Mandi System</strong></div>
            <div>Toll-Free Helpline: <strong className="font-mono text-slate-900">1800-233-0244</strong></div>
          </div>
          <div className="text-right space-y-1">
            <div className="w-28 h-6 border-b border-dashed border-slate-400 mx-auto"></div>
            <span className="block font-semibold text-slate-800">Mandi Superintendent Seal</span>
          </div>
        </div>

      </div>

    </div>
  );
};
