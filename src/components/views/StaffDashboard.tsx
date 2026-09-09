import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  UserCog, 
  Play, 
  Scale, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Users, 
  Truck, 
  FileText, 
  Search,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { QueueItem, QueueStage } from '../../types';

export const StaffDashboard: React.FC = () => {
  const { t, language, queueItems, currentServingToken, advanceQueue, staffCallNext, staffUpdateTokenStage, setCurrentView, showDemoController, toggleDemoController } = useApp();
  
  const [selectedTokenForAction, setSelectedTokenForAction] = useState<QueueItem | null>(null);
  const [actionModalType, setActionModalType] = useState<'QC' | 'WEIGH' | 'COMPLETE' | null>(null);
  const [moistureValue, setMoistureValue] = useState('10.4');
  const [grossWeightInput, setGrossWeightInput] = useState('6420');
  const [tareWeightInput, setTareWeightInput] = useState('1920');
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  const scheduledCount = queueItems.length;
  const arrivedCount = queueItems.filter(i => i.stage !== 'WAITING_ARRIVAL').length;
  const inProgressCount = queueItems.filter(i => i.status === 'Now Serving' || i.status === 'Under QC' || i.status === 'At Weighbridge').length;
  const completedCount = queueItems.filter(i => i.status === 'Completed').length;
  const pendingCount = scheduledCount - arrivedCount;

  const handleOpenAction = (item: QueueItem, type: 'QC' | 'WEIGH' | 'COMPLETE') => {
    setSelectedTokenForAction(item);
    setActionModalType(type);
    setActionSuccessMsg('');
  };

  const handleSaveAction = () => {
    if (!selectedTokenForAction) return;

    if (actionModalType === 'QC') {
      staffUpdateTokenStage(selectedTokenForAction.tokenNumber, 'QUALITY_ASSESSMENT', 'Under QC');
      setActionSuccessMsg(`Moisture ${moistureValue}% recorded for Token ${selectedTokenForAction.tokenNumber}. Quality Grade A Approved.`);
    } else if (actionModalType === 'WEIGH') {
      staffUpdateTokenStage(selectedTokenForAction.tokenNumber, 'WEIGHBRIDGE_GROSS', 'At Weighbridge');
      setActionSuccessMsg(`Weighbridge Gross ${grossWeightInput}kg and Tare ${tareWeightInput}kg recorded.`);
    } else if (actionModalType === 'COMPLETE') {
      staffUpdateTokenStage(selectedTokenForAction.tokenNumber, 'COMPLETED', 'Completed');
      setActionSuccessMsg(`Token ${selectedTokenForAction.tokenNumber} marked COMPLETED. J-Form generated & DBT file queued.`);
    }

    setTimeout(() => {
      setActionModalType(null);
      setSelectedTokenForAction(null);
      setActionSuccessMsg('');
    }, 1800);
  };

  return (
    <div className="govt-container py-8 space-y-6">
      
      {/* Top Staff Header */}
      <div className="bg-white p-5 rounded-lg border-2 border-govt-border shadow-govt flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
              OFFICER IN CHARGE PORTAL
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Staff ID: <strong>MH-STAFF-THN-412</strong>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-govt-navy font-govt mt-1 flex items-center gap-2">
            <UserCog className="w-6 h-6 text-amber-600" />
            <span>{t('staffTitle')}</span>
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            {t('staffSub')}
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleDemoController}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded text-xs border border-slate-300 transition-colors"
            title="Toggle Demo Mode Controller"
          >
            🛠️ {showDemoController ? 'Hide Demo Bar' : 'Show Demo Bar'}
          </button>

          <button
            onClick={staffCallNext}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded text-xs flex items-center gap-2 shadow-md transition-transform active:scale-98"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{t('callNextBtn')}</span>
          </button>
        </div>
      </div>

      {/* 5 KPI Metric Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-4 bg-white rounded-lg border border-govt-border shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">{t('scheduledToday')}</span>
          <span className="text-2xl font-bold font-mono text-govt-navy">{scheduledCount}</span>
        </div>

        <div className="p-4 bg-white rounded-lg border border-govt-border shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">{t('arrivedCount')}</span>
          <span className="text-2xl font-bold font-mono text-blue-700">{arrivedCount}</span>
        </div>

        <div className="p-4 bg-white rounded-lg border border-amber-300 bg-amber-50/40 shadow-xs">
          <span className="text-[10px] text-amber-900 uppercase font-bold block">{t('processingCount')}</span>
          <span className="text-2xl font-bold font-mono text-amber-700">{inProgressCount}</span>
        </div>

        <div className="p-4 bg-white rounded-lg border border-green-300 bg-green-50/40 shadow-xs">
          <span className="text-[10px] text-green-900 uppercase font-bold block">{t('completedToday')}</span>
          <span className="text-2xl font-bold font-mono text-green-800">{completedCount}</span>
        </div>

        <div className="p-4 bg-white rounded-lg border border-govt-border shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">{t('pendingCount')}</span>
          <span className="text-2xl font-bold font-mono text-slate-600">{pendingCount}</span>
        </div>
      </div>

      {/* Staff Live Queue Controls Table */}
      <div className="bg-white p-6 rounded-lg border-2 border-govt-border shadow-govt space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-sm font-bold text-govt-navy uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-govt-navy" />
              <span>Gate & Weighbridge Live Intake Manager</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Update farmer inspection progress, log moisture test percentages, and record weighbridge slips.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded border border-slate-300 font-mono">
              Active Serving: <strong className="text-slate-900">{currentServingToken}</strong>
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                <th className="py-2.5 px-3">Token</th>
                <th className="py-2.5 px-3">Farmer & Produce</th>
                <th className="py-2.5 px-3">Slot</th>
                <th className="py-2.5 px-3">Stage</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Officer Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {queueItems.map((item, idx) => {
                const isServing = item.tokenNumber === currentServingToken || item.status === 'Now Serving';
                return (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isServing ? 'bg-amber-50/70 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                      {item.tokenNumber}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-slate-900 block">{item.farmerName}</span>
                      <span className="text-[11px] text-slate-500">{item.cropName} ({item.quantityQuintals} Qtl)</span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">
                      {item.timeSlot}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700">
                      {item.stage}
                    </td>
                    <td className="py-2.5 px-3">
                      <StatusBadge status={item.status} size="sm" />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenAction(item, 'QC')}
                          className="px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold rounded text-[11px]"
                          title="Record Moisture & Quality Grade"
                        >
                          QC Test
                        </button>
                        <button
                          onClick={() => handleOpenAction(item, 'WEIGH')}
                          className="px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold rounded text-[11px]"
                          title="Record Weighbridge Slip"
                        >
                          Weigh
                        </button>
                        <button
                          onClick={() => handleOpenAction(item, 'COMPLETE')}
                          className="px-2 py-1 bg-green-700 hover:bg-green-800 text-white font-bold rounded text-[11px]"
                          title="Complete & Issue J-Form"
                        >
                          Complete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Staff Action Modal */}
      {actionModalType && selectedTokenForAction && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border-2 border-govt-navy shadow-2xl max-w-md w-full p-6 space-y-4">
            
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-govt-navy">
                  Officer Action: Token {selectedTokenForAction.tokenNumber}
                </h4>
                <p className="text-xs text-slate-600">{selectedTokenForAction.farmerName}</p>
              </div>
              <button
                onClick={() => setActionModalType(null)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            {actionSuccessMsg ? (
              <div className="p-4 bg-green-50 border border-green-300 rounded text-center text-xs text-green-900 space-y-1 font-bold">
                <CheckCircle2 className="w-5 h-5 mx-auto text-green-700 mb-1" />
                <span>{actionSuccessMsg}</span>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                {actionModalType === 'QC' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Moisture Content (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={moistureValue}
                        onChange={(e) => setMoistureValue(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded font-mono font-bold"
                      />
                      <span className="text-[10px] text-slate-500">Standard FAQ limit &lt; 12.0%</span>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Quality Grade</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded">
                        <option value="A">Grade A (FAQ Passed)</option>
                        <option value="B">Grade B (Marginal)</option>
                      </select>
                    </div>
                  </div>
                )}

                {actionModalType === 'WEIGH' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Gross Weighbridge Weight (kg)</label>
                      <input
                        type="number"
                        value={grossWeightInput}
                        onChange={(e) => setGrossWeightInput(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Tare Weighbridge Weight (kg)</label>
                      <input
                        type="number"
                        value={tareWeightInput}
                        onChange={(e) => setTareWeightInput(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded font-mono font-bold"
                      />
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded border border-slate-200 font-mono">
                      Net Produce Weight: <strong>{(Number(grossWeightInput) - Number(tareWeightInput)) / 100} Quintals</strong>
                    </div>
                  </div>
                )}

                {actionModalType === 'COMPLETE' && (
                  <div className="space-y-2">
                    <p className="text-slate-700">
                      Confirm procurement completion for <strong>{selectedTokenForAction.farmerName}</strong> ({selectedTokenForAction.cropName}).
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      This will automatically generate the official J-Form (Jins) receipt and transmit the payment advice to PFMS / DBT gateway.
                    </p>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActionModalType(null)}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveAction}
                    className="px-4 py-1.5 bg-govt-navy text-white rounded font-bold hover:bg-govt-navy-dark"
                  >
                    Save & Submit Record
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
