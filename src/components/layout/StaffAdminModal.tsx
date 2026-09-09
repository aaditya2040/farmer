import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserCog, ShieldAlert, X, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';

interface StaffAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StaffAdminModal: React.FC<StaffAdminModalProps> = ({ isOpen, onClose }) => {
  const { setCurrentView, t } = useApp();

  if (!isOpen) return null;

  const handleSelect = (view: 'staff-dashboard' | 'admin-dashboard') => {
    setCurrentView(view);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border-2 border-govt-navy shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-govt-navy text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-govt-saffron" />
            <h3 className="text-sm font-bold tracking-wide">
              Official Staff & Administration Access
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded hover:bg-white/10"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600">
            Select your administrative authority role to proceed to the designated management portal:
          </p>

          <div className="space-y-3">
            {/* Option 1: APMC Staff Portal */}
            <div
              onClick={() => handleSelect('staff-dashboard')}
              className="p-4 rounded-lg border-2 border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 cursor-pointer transition-all flex items-start justify-between gap-3 group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <UserCog className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-950">
                    APMC Procurement Centre Staff
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Gate intake, moisture testing, weighbridge gross/tare recordings, and live queue controls.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 flex-shrink-0 mt-2 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Option 2: State Nodal Admin Dashboard */}
            <div
              onClick={() => handleSelect('admin-dashboard')}
              className="p-4 rounded-lg border-2 border-slate-200 hover:border-green-600 hover:bg-green-50/40 cursor-pointer transition-all flex items-start justify-between gap-3 group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 text-green-900 flex items-center justify-center flex-shrink-0 group-hover:bg-green-700 group-hover:text-white transition-colors">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-green-950">
                    State Nodal Officer / Admin
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Statewide procurement analytics, centre quotas, DBT clearance monitoring, and farmer advisories.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-green-700 flex-shrink-0 mt-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            <span>Authorized MSCMF & Department of Agriculture personnel only</span>
          </div>
        </div>

      </div>
    </div>
  );
};
