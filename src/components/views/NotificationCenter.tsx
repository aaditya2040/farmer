import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  Clock, 
  Calendar, 
  CreditCard, 
  ClipboardCheck, 
  Info, 
  Check, 
  ChevronRight, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { OfficialNotification } from '../../types';

export const NotificationCenter: React.FC = () => {
  const { t, language, notifications, markNotificationAsRead, setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState<'ALL' | 'SLOT' | 'QUEUE' | 'PROCUREMENT' | 'PAYMENT' | 'GOVT_ADVISORY'>('ALL');

  const filteredNotifs = notifications.filter(n => {
    if (activeTab === 'ALL') return true;
    return n.category === activeTab;
  });

  const getCategoryIcon = (cat: OfficialNotification['category']) => {
    switch (cat) {
      case 'QUEUE':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'PAYMENT':
        return <CreditCard className="w-4 h-4 text-green-600" />;
      case 'SLOT':
        return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'PROCUREMENT':
        return <ClipboardCheck className="w-4 h-4 text-purple-600" />;
      case 'GOVT_ADVISORY':
      default:
        return <Info className="w-4 h-4 text-red-600" />;
    }
  };

  const handleAction = (notif: OfficialNotification) => {
    markNotificationAsRead(notif.id);
    if (notif.actionView) {
      setCurrentView(notif.actionView);
    }
  };

  return (
    <div className="govt-container py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border-2 border-govt-border shadow-govt flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-govt-navy font-govt flex items-center gap-2">
            <Bell className="w-6 h-6 text-govt-saffron" />
            <span>{t('notifTitle')}</span>
          </h2>
          <p className="text-xs text-slate-600">
            Real-time SMS alerts, gate pass updates, and official agricultural notifications.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded border border-slate-300">
          SMS Dispatch Gateway: <strong className="font-mono text-slate-800">VM-GOVMHD</strong>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`px-3.5 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors border ${
            activeTab === 'ALL'
              ? 'bg-govt-navy text-white border-govt-navy'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
          }`}
        >
          {t('allTab')} ({notifications.length})
        </button>

        <button
          onClick={() => setActiveTab('QUEUE')}
          className={`px-3.5 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors border ${
            activeTab === 'QUEUE'
              ? 'bg-amber-600 text-white border-amber-600'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
          }`}
        >
          {t('queueTab')}
        </button>

        <button
          onClick={() => setActiveTab('PAYMENT')}
          className={`px-3.5 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors border ${
            activeTab === 'PAYMENT'
              ? 'bg-green-700 text-white border-green-700'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
          }`}
        >
          {t('payTab')}
        </button>

        <button
          onClick={() => setActiveTab('SLOT')}
          className={`px-3.5 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors border ${
            activeTab === 'SLOT'
              ? 'bg-blue-700 text-white border-blue-700'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
          }`}
        >
          {t('slotTab')}
        </button>

        <button
          onClick={() => setActiveTab('GOVT_ADVISORY')}
          className={`px-3.5 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors border ${
            activeTab === 'GOVT_ADVISORY'
              ? 'bg-slate-800 text-white border-slate-800'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
          }`}
        >
          {t('advisoryTab')}
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.map((notif) => {
          const titleText = language === 'mr' && notif.titleMr ? notif.titleMr : (language === 'hi' && notif.titleHi ? notif.titleHi : notif.title);
          const msgText = language === 'mr' && notif.messageMr ? notif.messageMr : (language === 'hi' && notif.messageHi ? notif.messageHi : notif.message);

          return (
            <div
              key={notif.id}
              className={`p-4 rounded-lg border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                !notif.isRead
                  ? 'bg-white border-govt-navy shadow-govt'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {getCategoryIcon(notif.category)}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-xs font-bold text-govt-navy">
                      {titleText}
                    </h4>
                    {notif.priority === 'High' && (
                      <span className="text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.2 rounded border border-red-200">
                        HIGH PRIORITY
                      </span>
                    )}
                    {!notif.isRead && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl font-mono text-[11px]">
                    {msgText}
                  </p>

                  <div className="text-[10px] text-slate-400">
                    Received: {notif.timestamp}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                {notif.actionView && (
                  <button
                    onClick={() => handleAction(notif)}
                    className="px-3 py-1.5 bg-govt-navy text-white text-xs font-bold rounded hover:bg-govt-navy-dark flex items-center gap-1 transition-colors"
                  >
                    <span>View Screen</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
