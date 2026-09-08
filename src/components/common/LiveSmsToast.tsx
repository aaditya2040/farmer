import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, X, Smartphone } from 'lucide-react';

export const LiveSmsToast: React.FC = () => {
  const { liveSmsToast, dismissLiveSms } = useApp();

  if (!liveSmsToast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-bounce-short no-print">
      <div className="bg-slate-900 text-white rounded-lg shadow-2xl border-2 border-govt-saffron p-4 relative flex flex-col gap-2">
        {/* SMS Header */}
        <div className="flex items-center justify-between border-b border-slate-700 pb-2">
          <div className="flex items-center gap-2 text-govt-saffron text-xs font-bold font-mono">
            <Smartphone className="w-4 h-4" />
            <span>SMS GATEWAY: VM-GOVMHD</span>
            <span className="bg-slate-800 text-[10px] text-slate-300 px-1.5 py-0.5 rounded">SIMULATED SMS</span>
          </div>
          <button
            onClick={dismissLiveSms}
            className="text-slate-400 hover:text-white p-0.5 rounded"
            aria-label="Close SMS notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* SMS Body */}
        <div className="text-xs text-slate-100 font-mono leading-relaxed pl-1 border-l-2 border-green-500">
          {liveSmsToast}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
          <span>Sent to registered mobile: +91 9876543210</span>
          <span className="text-govt-saffron font-medium">Just now</span>
        </div>
      </div>
    </div>
  );
};
