import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Play, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  User, 
  UserCog, 
  ShieldAlert,
  Clock,
  Calendar,
  CreditCard,
  ClipboardList
} from 'lucide-react';
import { ViewType } from '../../types';

export const DemoQuickSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { 
    currentView, 
    setCurrentView, 
    advanceQueue, 
    resetQueue, 
    autoRefresh, 
    setAutoRefresh, 
    currentServingToken, 
    tokensAhead, 
    language, 
    setLanguage 
  } = useApp();

  const flowSteps: { id: ViewType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: '1. Landing Page', icon: <Sparkles className="w-3 h-3" /> },
    { id: 'login', label: '2. Citizen Login', icon: <User className="w-3 h-3" /> },
    { id: 'register', label: '3. Registration (4-Step)', icon: <ClipboardList className="w-3 h-3" /> },
    { id: 'dashboard', label: '4. Farmer Dashboard', icon: <User className="w-3 h-3" /> },
    { id: 'book-slot', label: '5. Book Slot Flow', icon: <Calendar className="w-3 h-3" /> },
    { id: 'token-receipt', label: '6. Token Pass A-127', icon: <Clock className="w-3 h-3" /> },
    { id: 'track-queue', label: '7. Live Queue Tracker', icon: <Clock className="w-3 h-3" /> },
    { id: 'procurement-status', label: '8. Procurement Stages', icon: <ClipboardList className="w-3 h-3" /> },
    { id: 'payment-status', label: '9. Payment Status (DBT)', icon: <CreditCard className="w-3 h-3" /> },
    { id: 'staff-dashboard', label: '10. Staff Officer View', icon: <UserCog className="w-3 h-3 text-amber-300" /> },
    { id: 'admin-dashboard', label: '11. State Admin Analytics', icon: <ShieldAlert className="w-3 h-3 text-green-300" /> },
  ];

  return (
    <aside aria-label="Demo Evaluation Controller" className="bg-slate-900 text-slate-200 border-b-2 border-govt-saffron text-xs no-print shadow-md">
      <div className="govt-container py-1">
        
        {/* Switcher Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 font-bold text-govt-saffron uppercase tracking-wider text-[11px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-govt-saffron animate-pulse" />
              Demo Evaluation Controller
            </span>
            <span className="text-[11px] text-slate-300 hidden md:inline">
              Serving: <strong className="text-amber-400 font-mono">{currentServingToken}</strong> | Ahead of You: <strong className="text-govt-saffron font-mono">{tokensAhead}</strong>
            </span>
          </div>

          {/* Quick Simulation Action Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={advanceQueue}
              className="flex items-center gap-1 px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-[11px] transition-colors shadow-xs"
              title="Simulate next farmer in queue being called"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Simulate Next (+1)</span>
            </button>

            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold border transition-colors ${
                autoRefresh 
                  ? 'bg-green-600 text-white border-green-500 animate-pulse' 
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="Toggle automatic queue progress simulation every 8s"
            >
              <span>Auto-Tick: {autoRefresh ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={resetQueue}
              className="p-1 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded border border-slate-700"
              title="Reset queue state to start"
            >
              <RotateCcw className="w-3 h-3" />
            </button>

            {/* Language Quick Switch */}
            <div className="flex bg-slate-800 rounded border border-slate-700 divide-x divide-slate-700 ml-1">
              <button onClick={() => setLanguage('en')} className={`px-1.5 py-0.5 text-[10px] ${language === 'en' ? 'bg-govt-saffron text-slate-950 font-bold' : 'text-slate-300'}`}>EN</button>
              <button onClick={() => setLanguage('mr')} className={`px-1.5 py-0.5 text-[10px] ${language === 'mr' ? 'bg-govt-saffron text-slate-950 font-bold' : 'text-slate-300'}`}>MR</button>
              <button onClick={() => setLanguage('hi')} className={`px-1.5 py-0.5 text-[10px] ${language === 'hi' ? 'bg-govt-saffron text-slate-950 font-bold' : 'text-slate-300'}`}>HI</button>
            </div>

            {/* Toggle Accordion */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-slate-400 hover:text-white ml-1"
              aria-label="Toggle demo bar details"
            >
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Extended Step Navigator (Open by default) */}
        {isOpen && (
          <div className="pt-2 pb-1 border-t border-slate-800 mt-1">
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
              <span className="text-[10px] text-slate-400 uppercase font-bold mr-1 flex-shrink-0">
                Jump Step:
              </span>
              {flowSteps.map((step) => {
                const isActive = currentView === step.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentView(step.id)}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] whitespace-nowrap transition-colors flex-shrink-0 ${
                      isActive
                        ? 'bg-govt-saffron text-slate-950 font-bold shadow-xs'
                        : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                    }`}
                  >
                    {step.icon}
                    <span>{step.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </aside>
  );
};
