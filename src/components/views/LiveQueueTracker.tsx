import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Clock, 
  RefreshCw, 
  Play, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Truck, 
  Search, 
  ChevronRight, 
  MessageSquare, 
  Scale, 
  ShieldCheck, 
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { QueueStage } from '../../types';

export const LiveQueueTracker: React.FC = () => {
  const { 
    t, 
    language, 
    booking, 
    queueItems, 
    currentServingToken, 
    tokensAhead, 
    yourQueuePosition, 
    estimatedWaitMinutes, 
    lastUpdatedTimestamp, 
    advanceQueue, 
    resetQueue, 
    autoRefresh, 
    setAutoRefresh,
    setCurrentView
  } = useApp();

  const [filterSearch, setFilterSearch] = useState('');

  const filteredQueue = queueItems.filter(item =>
    item.tokenNumber.toLowerCase().includes(filterSearch.toLowerCase()) ||
    item.farmerName.toLowerCase().includes(filterSearch.toLowerCase()) ||
    item.cropName.toLowerCase().includes(filterSearch.toLowerCase())
  );

  const pipelineStages: { id: QueueStage; label: string; icon: string }[] = [
    { id: 'GATE_ENTRY', label: '1. Gate Entry & QR Scan', icon: '🚪' },
    { id: 'DOC_VERIFICATION', label: '2. 7/12 & Aadhaar Match', icon: '📑' },
    { id: 'QUALITY_ASSESSMENT', label: '3. Moisture & QC Test', icon: '🧪' },
    { id: 'WEIGHBRIDGE_GROSS', label: '4. Gross Weighment (Loaded)', icon: '⚖️' },
    { id: 'UNLOADING', label: '5. Godown Unloading', icon: '📦' },
    { id: 'WEIGHBRIDGE_TARE', label: '6. Tare Weigh & Token Close', icon: '✅' },
  ];

  return (
    <div className="govt-container py-8 space-y-6">
      
      {/* Top Banner with Centre Info & Last Updated */}
      <div className="bg-white p-5 rounded-lg border-2 border-govt-border shadow-govt flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold text-green-800 uppercase tracking-wider bg-green-50 px-2 py-0.5 rounded border border-green-200">
              Live Mandi Feed Active
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Last Updated: <strong className="text-slate-800">{lastUpdatedTimestamp}</strong>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-govt-navy font-govt mt-1 flex items-center gap-2">
            <Clock className="w-6 h-6 text-govt-saffron" />
            <span>{t('liveQueueTitle')}</span>
          </h2>
          <p className="text-xs text-slate-600">
            {booking.centreName} • Gate No. 2 Weighbridge
          </p>
        </div>

        {/* Live Simulation Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={advanceQueue}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            title="Simulate advancing queue by 1 token"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{t('simulateAdvance')}</span>
          </button>

          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-2 rounded text-xs font-bold border transition-colors flex items-center gap-1.5 ${
              autoRefresh 
                ? 'bg-green-700 text-white border-green-600 animate-pulse' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${autoRefresh ? 'animate-spin' : ''}`} />
            <span>{autoRefresh ? 'Live Auto-Polling ON' : t('refreshQueue')}</span>
          </button>

          <button
            onClick={resetQueue}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300"
            title="Reset Queue"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 KPI CARDS: Token, Position, Ahead, Wait Time */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Your Token */}
        <div className="bg-gradient-to-br from-govt-navy to-govt-navy-dark text-white p-5 rounded-lg border border-govt-navy shadow-govt flex flex-col justify-between space-y-2">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            {t('yourToken')}
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-govt-saffron tracking-wider">
            {booking.tokenNumber}
          </div>
          <div className="text-[11px] text-slate-200">
            Bay 03 • 10:00 – 11:00 AM
          </div>
        </div>

        {/* KPI 2: Queue Position */}
        <div className="bg-white p-5 rounded-lg border-2 border-slate-300 shadow-govt flex flex-col justify-between space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {t('currentPosition')}
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900">
            #{yourQueuePosition}
          </div>
          <div className="text-[11px] text-slate-600 font-medium">
            In Today's Registered Queue
          </div>
        </div>

        {/* KPI 3: Tokens Ahead */}
        <div className="bg-white p-5 rounded-lg border-2 border-amber-300 shadow-govt flex flex-col justify-between space-y-2 bg-amber-50/30">
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">
            {t('tokensAhead')}
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-700">
            {tokensAhead}
          </div>
          <div className="text-[11px] text-amber-900 font-medium">
            {tokensAhead === 0 ? '🎉 YOUR TURN NOW!' : 'Vehicles ahead of you'}
          </div>
        </div>

        {/* KPI 4: Estimated Wait Time */}
        <div className="bg-white p-5 rounded-lg border-2 border-green-300 shadow-govt flex flex-col justify-between space-y-2 bg-green-50/30">
          <div className="text-xs font-bold text-green-800 uppercase tracking-wider">
            {t('estWaitTime')}
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-green-800">
            ~{estimatedWaitMinutes}m
          </div>
          <div className="text-[11px] text-green-900 font-medium">
            Avg. 3.2 mins per vehicle
          </div>
        </div>

      </div>

      {/* Now Serving Live Spotlight Bar */}
      <div className="bg-amber-50 border-2 border-amber-400 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center flex-shrink-0 animate-pulse">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
              {t('nowServing')}
            </span>
            <span className="text-lg font-extrabold font-mono text-slate-950">
              TOKEN {currentServingToken}
            </span>
            <span className="text-xs text-amber-900 ml-2 font-medium">
              (Gross Weighment in Progress)
            </span>
          </div>
        </div>

        <div className="text-xs text-amber-950 bg-amber-100/80 px-3 py-1.5 rounded border border-amber-300">
          {tokensAhead <= 3 ? (
            <span className="font-bold text-red-700 animate-bounce block">
              ⚠️ Attention: Your vehicle should now be queued at Gate 2 approach line!
            </span>
          ) : (
            <span>You may wait comfortably in the Farmer Rest Area or nearby yard.</span>
          )}
        </div>
      </div>

      {/* Visual Inspection Pipeline Stepper */}
      <div className="bg-white p-6 rounded-lg border-2 border-govt-border shadow-govt space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h3 className="text-sm font-bold text-govt-navy uppercase tracking-wider flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-govt-saffron" />
            <span>{t('queuePipelineTitle')}</span>
          </h3>
          <span className="text-xs text-slate-500">6-Stage Single-Window Processing</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {pipelineStages.map((st, idx) => {
            const isFinished = idx < 3; // Example progress state
            const isCurrent = idx === 3;
            return (
              <div
                key={st.id}
                className={`p-3 rounded border text-center space-y-1.5 relative ${
                  isCurrent
                    ? 'bg-amber-50 border-amber-500 shadow-xs'
                    : isFinished
                    ? 'bg-green-50 border-green-300'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="text-xl">{st.icon}</div>
                <div className="text-[11px] font-bold text-slate-900 leading-tight">
                  {st.label}
                </div>
                <div className="text-[10px]">
                  {isCurrent && <span className="font-bold text-amber-800 bg-amber-200 px-1.5 py-0.5 rounded">Active</span>}
                  {isFinished && <span className="font-semibold text-green-700">✓ Done</span>}
                  {!isCurrent && !isFinished && <span className="text-slate-400">Waiting</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Queue Table */}
      <div className="bg-white p-6 rounded-lg border-2 border-govt-border shadow-govt space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-sm font-bold text-govt-navy uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-govt-navy" />
              <span>{t('tokenTableTitle')}</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Total 24 tokens issued for current 10:00 – 11:00 AM window
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              placeholder="Search token or farmer..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                <th className="py-2.5 px-3">Token No.</th>
                <th className="py-2.5 px-3">Farmer Name</th>
                <th className="py-2.5 px-3">Produce & Qtl</th>
                <th className="py-2.5 px-3">Time Slot</th>
                <th className="py-2.5 px-3">Allotted Bay</th>
                <th className="py-2.5 px-3">Queue Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredQueue.map((item, idx) => {
                const isYourToken = item.tokenNumber === 'A-127' || item.farmerName.includes('(You)');
                const isServing = item.tokenNumber === currentServingToken || item.status === 'Now Serving';
                return (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isYourToken
                        ? 'bg-amber-100/90 font-bold border-y-2 border-govt-saffron'
                        : isServing
                        ? 'bg-blue-50 font-semibold'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-mono">
                      <span className={`inline-block px-2 py-0.5 rounded font-bold ${isYourToken ? 'bg-govt-saffron text-slate-950 font-extrabold text-sm' : isServing ? 'bg-blue-600 text-white' : 'text-slate-900 bg-slate-200'}`}>
                        {item.tokenNumber}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={isYourToken ? 'text-slate-950 font-extrabold' : 'text-slate-900'}>
                        {item.farmerName}
                      </span>
                      {isYourToken && (
                        <span className="ml-2 bg-govt-navy text-white text-[10px] px-1.5 py-0.2 rounded font-bold uppercase">
                          YOUR TOKEN
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 font-medium">
                      {item.cropName} ({item.quantityQuintals} Qtl)
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">
                      {item.timeSlot}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-700">
                      {item.bayNumber}
                    </td>
                    <td className="py-2.5 px-3">
                      <StatusBadge status={item.status} size="sm" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Quick Link to Detailed Procurement Status */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-600">
            Want to see detailed moisture readings and weighbridge weights?
          </span>
          <button
            onClick={() => setCurrentView('procurement-status')}
            className="px-3 py-1.5 bg-govt-navy text-white text-xs font-bold rounded hover:bg-govt-navy-dark flex items-center gap-1"
          >
            <span>{t('cardProcStatusTitle')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
