import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { adminAnalytics, mockCentres } from '../../data/mockData';
import { StatusBadge } from '../common/StatusBadge';
import { 
  ShieldAlert, 
  TrendingUp, 
  Users, 
  Building2, 
  CreditCard, 
  BarChart3, 
  PieChart, 
  Bell, 
  Download, 
  Settings, 
  CheckCircle2, 
  AlertTriangle,
  Send,
  Search
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { t, language } = useApp();
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastMessage('');
    }, 2500);
  };

  return (
    <div className="govt-container py-8 space-y-6">
      
      {/* Top Admin Header */}
      <div className="bg-white p-5 rounded-lg border-2 border-govt-border shadow-govt flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-green-900 bg-green-100 px-2.5 py-0.5 rounded border border-green-300">
              STATE NODAL OFFICER DASHBOARD
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Mantralaya Agro Monitoring Node
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-govt-navy font-govt mt-1 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-green-700" />
            <span>{t('adminTitle')}</span>
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            {t('adminSub')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-govt-navy hover:bg-govt-navy-dark text-white font-bold rounded text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export State Report</span>
          </button>
        </div>
      </div>

      {/* 6 State KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 bg-white rounded-lg border border-govt-border shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Registered Farmers</span>
          <span className="text-xl font-bold font-mono text-govt-navy">{adminAnalytics.totalRegisteredFarmers.toLocaleString()}</span>
        </div>

        <div className="p-4 bg-white rounded-lg border border-govt-border shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Active APMC Hubs</span>
          <span className="text-xl font-bold font-mono text-slate-900">{adminAnalytics.activeCentres} Centres</span>
        </div>

        <div className="p-4 bg-white rounded-lg border border-govt-border shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Today's Bookings</span>
          <span className="text-xl font-bold font-mono text-blue-700">{adminAnalytics.todayBookingsCount.toLocaleString()}</span>
        </div>

        <div className="p-4 bg-white rounded-lg border border-amber-300 bg-amber-50/40 shadow-xs">
          <span className="text-[10px] text-amber-900 uppercase font-bold block">Live Queue Load</span>
          <span className="text-xl font-bold font-mono text-amber-700">{adminAnalytics.currentlyInQueueStatewide} Vehicles</span>
        </div>

        <div className="p-4 bg-white rounded-lg border border-emerald-300 bg-emerald-50/40 shadow-xs">
          <span className="text-[10px] text-emerald-900 uppercase font-bold block">Procured (MT)</span>
          <span className="text-xl font-bold font-mono text-emerald-800">{adminAnalytics.totalTonnesProcuredMonth.toLocaleString()} MT</span>
        </div>

        <div className="p-4 bg-white rounded-lg border border-purple-300 bg-purple-50/40 shadow-xs">
          <span className="text-[10px] text-purple-900 uppercase font-bold block">Total DBT Paid</span>
          <span className="text-xl font-bold font-mono text-purple-900">₹{adminAnalytics.totalDbtDisbursedCrores} Cr</span>
        </div>
      </div>

      {/* 2-Column Analytics & Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Daily Turnout vs Bookings */}
        <div className="lg:col-span-7 bg-white p-6 rounded-lg border-2 border-govt-border shadow-govt space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="text-xs font-bold text-govt-navy uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-govt-navy" />
              <span>{t('chartBookingsVsTurnout')} (Last 7 Days)</span>
            </h3>
            <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
              96.4% Turnout Rate
            </span>
          </div>

          {/* Clean Vector Bar Chart */}
          <div className="space-y-3 pt-2">
            {adminAnalytics.dailyTurnoutTrends.map((day, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 font-bold">{day.date}</span>
                  <span className="font-mono text-slate-500">
                    Booked: <strong className="text-slate-900">{day.booked}</strong> | Completed: <strong className="text-green-700">{day.completed}</strong>
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                  <div 
                    style={{ width: `${(day.completed / day.booked) * 100}%` }}
                    className="h-full bg-green-600 rounded-full transition-all"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Commodity Procurement Breakdown */}
        <div className="lg:col-span-5 bg-white p-6 rounded-lg border-2 border-govt-border shadow-govt space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="text-xs font-bold text-govt-navy uppercase tracking-wider flex items-center gap-1.5">
              <PieChart className="w-4 h-4 text-govt-saffron" />
              <span>{t('chartCommodityShare')}</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">1,84,500 Qtl Total</span>
          </div>

          <div className="space-y-3 pt-2">
            {adminAnalytics.commodityBreakdown.map((comm, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-900">{comm.crop}</span>
                  <span className="font-mono text-govt-navy">{comm.percentage}% ({comm.quintals.toLocaleString()} Qtl)</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${comm.percentage}%` }}
                    className={`h-full ${
                      idx === 0 ? 'bg-amber-500' : idx === 1 ? 'bg-blue-600' : idx === 2 ? 'bg-green-600' : 'bg-purple-600'
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-900 space-y-0.5">
            <strong>Kharif Peak Procurement Note:</strong>
            <p className="text-[11px] text-blue-800">
              Soyabean intake currently represents 48% of total state mandi capacity. Additional weighing scales allocated to Latur & Amravati.
            </p>
          </div>
        </div>

      </div>

      {/* Centre Capacity Management Table */}
      <div className="bg-white p-6 rounded-lg border-2 border-govt-border shadow-govt space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-sm font-bold text-govt-navy uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-govt-navy" />
              <span>{t('centerManagementTitle')}</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Real-time monitoring of queue load, slot allocations, and operational status across districts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="text-xs px-3 py-1.5 border border-slate-300 rounded"
            >
              <option value="All">All Districts</option>
              <option value="Thane">Thane</option>
              <option value="Nashik">Nashik</option>
              <option value="Pune">Pune</option>
              <option value="Latur">Latur</option>
              <option value="Amravati">Amravati</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                <th className="py-2.5 px-3">Centre Name</th>
                <th className="py-2.5 px-3">District</th>
                <th className="py-2.5 px-3">Daily Capacity</th>
                <th className="py-2.5 px-3">Available Slots</th>
                <th className="py-2.5 px-3">Current Queue</th>
                <th className="py-2.5 px-3">Congestion Load</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockCentres.map((centre) => {
                const loadPct = Math.round((centre.currentQueueCount / centre.totalDailyCapacity) * 100);
                return (
                  <tr key={centre.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">
                      {centre.name}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">
                      {centre.district}
                    </td>
                    <td className="py-2.5 px-3 font-mono">
                      {centre.totalDailyCapacity} Slots/Day
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-green-700">
                      {centre.availableSlotsToday}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-amber-800">
                      {centre.currentQueueCount}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            style={{ width: `${Math.min(100, loadPct)}%` }}
                            className={`h-full ${loadPct > 55 ? 'bg-amber-500' : 'bg-green-600'}`}
                          ></div>
                        </div>
                        <span className="font-mono text-[11px] font-bold">{loadPct}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <StatusBadge status={centre.activeStatus} size="sm" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Broadcast State Advisory Tool */}
      <div className="bg-white p-6 rounded-lg border-2 border-govt-border shadow-govt space-y-4">
        <h3 className="text-sm font-bold text-govt-navy uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-1.5">
          <Bell className="w-4 h-4 text-govt-saffron" />
          <span>{t('broadcastAdvisoryBtn')}</span>
        </h3>

        {broadcastSent ? (
          <div className="p-4 bg-green-50 border border-green-300 rounded text-center text-xs text-green-900 font-bold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-700" />
            <span>Advisory successfully broadcasted to 12,480 registered farmer devices via SMS Gateway!</span>
          </div>
        ) : (
          <form onSubmit={handleBroadcast} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Advisory Message (Will be dispatched in English, Marathi, Hindi)
              </label>
              <textarea
                rows={2}
                required
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="e.g. Heavy rain alert in Marathwada region. APMC Latur and Nanded will provide covered holding sheds for produce."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-5 py-2 bg-green-700 hover:bg-green-800 text-white font-bold rounded text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Statewide Alert (SMS & App)</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
