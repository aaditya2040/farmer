import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Language, 
  ViewType, 
  UserRole, 
  FontSize, 
  FarmerProfile, 
  BookingDetails, 
  QueueItem, 
  ProcurementStageLog, 
  PaymentDetails, 
  OfficialNotification,
  QueueStage 
} from '../types';
import { 
  initialFarmerProfile, 
  initialBooking, 
  initialQueueItems, 
  initialProcurementTimeline, 
  initialPaymentDetails, 
  mockNotifications 
} from '../data/mockData';
import { translations } from '../data/translations';
import { smsService } from '../services/smsService';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  farmer: FarmerProfile;
  setFarmer: React.Dispatch<React.SetStateAction<FarmerProfile>>;
  booking: BookingDetails;
  setBooking: React.Dispatch<React.SetStateAction<BookingDetails>>;
  queueItems: QueueItem[];
  currentServingToken: string;
  tokensAhead: number;
  yourQueuePosition: number;
  estimatedWaitMinutes: number;
  lastUpdatedTimestamp: string;
  advanceQueue: () => void;
  resetQueue: () => void;
  autoRefresh: boolean;
  setAutoRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  procurementTimeline: ProcurementStageLog[];
  paymentDetails: PaymentDetails;
  notifications: OfficialNotification[];
  markNotificationAsRead: (id: string) => void;
  createNewBooking: (newBookingData: Partial<BookingDetails>) => void;
  completeFarmerRegistration: (profile: Partial<FarmerProfile>) => void;
  staffCallNext: () => void;
  staffUpdateTokenStage: (token: string, newStage: QueueStage, newStatus: QueueItem['status']) => void;
  liveSmsToast: string | null;
  dismissLiveSms: () => void;
  showDemoController: boolean;
  setShowDemoController: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDemoController: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [currentRole, setCurrentRole] = useState<UserRole>('farmer');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Pre-logged in for seamless demo

  const [farmer, setFarmer] = useState<FarmerProfile>(initialFarmerProfile);
  const [booking, setBooking] = useState<BookingDetails>(initialBooking);
  const [queueItems, setQueueItems] = useState<QueueItem[]>(initialQueueItems);
  const [currentServingToken, setCurrentServingToken] = useState<string>('A-109');
  const [procurementTimeline, setProcurementTimeline] = useState<ProcurementStageLog[]>(initialProcurementTimeline);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>(initialPaymentDetails);
  const [notifications, setNotifications] = useState<OfficialNotification[]>(mockNotifications);
  
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<string>('10:42 AM');
  const [liveSmsToast, setLiveSmsToast] = useState<string | null>(null);
  const [showDemoController, setShowDemoController] = useState<boolean>(false);

  const toggleDemoController = () => setShowDemoController(prev => !prev);

  // Sync font size to html document element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-normal', 'font-large', 'font-xlarge');
    root.classList.add(`font-${fontSize}`);
  }, [fontSize]);

  // Sync high contrast mode
  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Translation helper
  const t = (key: keyof typeof translations.en): string => {
    const langDict = translations[language] || translations.en;
    return (langDict as Record<string, string>)[key] || translations.en[key] || String(key);
  };

  // Find your token index and position
  const yourTokenObj = queueItems.find(item => item.tokenNumber === 'A-127' || item.tokenNumber.includes(booking.tokenNumber.replace('TOKEN ', '')));
  const yourIndex = yourTokenObj ? queueItems.indexOf(yourTokenObj) : 18;
  
  // Count how many tokens are strictly ahead in line (In Queue / Now Serving)
  const activeAheadItems = queueItems.slice(0, yourIndex).filter(item => item.status === 'In Queue' || item.status === 'Now Serving' || item.status === 'Under QC' || item.status === 'At Weighbridge');
  const tokensAhead = activeAheadItems.length;
  const yourQueuePosition = tokensAhead + 1;
  const estimatedWaitMinutes = Math.max(3, tokensAhead * 3);

  // Advance Queue Simulation
  const advanceQueue = () => {
    setQueueItems(prev => {
      const activeIdx = prev.findIndex(item => item.status === 'Now Serving' || item.status === 'Under QC' || item.status === 'At Weighbridge');
      if (activeIdx === -1) return prev;

      const updated = [...prev];
      // Mark current serving as completed
      updated[activeIdx] = {
        ...updated[activeIdx],
        status: 'Completed',
        stage: 'COMPLETED',
      };

      // Find next pending or in queue
      const nextIdx = updated.findIndex((item, idx) => idx > activeIdx && (item.status === 'In Queue' || item.status === 'Pending'));
      if (nextIdx !== -1) {
        updated[nextIdx] = {
          ...updated[nextIdx],
          status: 'Now Serving',
          stage: 'WEIGHBRIDGE_GROSS',
        };
        setCurrentServingToken(updated[nextIdx].tokenNumber);

        // If next is farmer's own token!
        if (updated[nextIdx].tokenNumber === 'A-127') {
          const alertMsg = `🔔 [KisanSetu SMS] ALERT: Your Token A-127 is NOW SERVING at Gate No. 2! Please drive your tractor onto Weighbridge #02.`;
          setLiveSmsToast(alertMsg);
          smsService.sendQueueAlert({
            mobile: farmer.mobileNumber,
            farmerName: farmer.fullName,
            tokenNumber: 'A-127',
            tokensAhead: 0,
            centreName: 'APMC Lasalgaon Sub-Centre',
            gateName: 'Gate No. 2 (Weighbridge In)',
          }).catch(err => console.warn('Queue alert SMS error:', err));
        } else {
          const remaining = nextIdx - activeIdx;
          if (remaining <= 5) {
            const queueMsg = `📱 [KisanSetu SMS] Token A-127 Alert: Only ${remaining} tokens remaining before your turn! Please stand by.`;
            setLiveSmsToast(queueMsg);
            smsService.sendQueueAlert({
              mobile: farmer.mobileNumber,
              farmerName: farmer.fullName,
              tokenNumber: 'A-127',
              tokensAhead: remaining,
              centreName: 'APMC Lasalgaon Sub-Centre',
            }).catch(err => console.warn('Queue alert SMS error:', err));
          }
        }
      }

      return updated;
    });

    const now = new Date();
    setLastUpdatedTimestamp(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  };

  // Reset queue simulation
  const resetQueue = () => {
    setQueueItems(initialQueueItems);
    setCurrentServingToken('A-109');
    setLiveSmsToast(null);
    setLastUpdatedTimestamp('10:42 AM');
  };

  // Auto-refresh interval simulator
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      advanceQueue();
    }, 8000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const dismissLiveSms = () => setLiveSmsToast(null);

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const createNewBooking = (newBookingData: Partial<BookingDetails>) => {
    const randomTokenNum = Math.floor(Math.random() * 80) + 140;
    const generatedToken = `TOKEN A-${randomTokenNum}`;
    const newBooking: BookingDetails = {
      ...initialBooking,
      bookingId: `BK-2026-0908-${Math.floor(1000 + Math.random() * 9000)}`,
      tokenNumber: generatedToken,
      farmerId: farmer.farmerId,
      farmerName: farmer.fullName,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      ...newBookingData,
    };
    setBooking(newBooking);
    
    // Add to queue
    const newQueueEntry: QueueItem = {
      tokenNumber: `A-${randomTokenNum}`,
      farmerName: `${farmer.fullName} (You)`,
      cropName: newBooking.cropName,
      quantityQuintals: newBooking.estimatedQuantityQuintals,
      timeSlot: newBooking.timeSlot,
      status: 'In Queue',
      stage: 'WAITING_ARRIVAL',
      queuePosition: queueItems.length + 1,
      bayNumber: newBooking.allottedBay,
      tokenColor: 'saffron',
    };
    setQueueItems(prev => [...prev, newQueueEntry]);

    // Add notification
    const newNotif: OfficialNotification = {
      id: `notif-${Date.now()}`,
      category: 'SLOT',
      title: `Slot Confirmed: ${generatedToken}`,
      titleMr: `स्लॉट निश्चित झाला: ${generatedToken}`,
      titleHi: `स्लॉट पुष्ट हुआ: ${generatedToken}`,
      message: `Your booking at ${newBooking.centreName} is confirmed for ${newBooking.bookingDate} (${newBooking.timeSlot}).`,
      messageMr: `${newBooking.centreName} येथे ${newBooking.bookingDate} (${newBooking.timeSlot}) साठी आपले बुकिंग निश्चित झाले.`,
      messageHi: `${newBooking.centreName} पर ${newBooking.bookingDate} (${newBooking.timeSlot}) हेतु आपकी बुकिंग पुष्ट हो गई है।`,
      timestamp: 'Just now',
      isRead: false,
      priority: 'High',
      actionView: 'token-receipt',
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Dispatch real MSG91 SMS / Live Simulation Toast
    smsService.sendSlotConfirmation({
      mobile: farmer.mobileNumber,
      farmerName: farmer.fullName,
      tokenNumber: generatedToken,
      centreName: newBooking.centreName,
      bookingDate: newBooking.bookingDate,
      timeSlot: newBooking.timeSlot,
      cropName: newBooking.cropName,
    }).then(res => {
      if (res && res.smsText) {
        setLiveSmsToast(`📲 [KisanSetu SMS] ${res.smsText}`);
      } else if (res && res.success) {
        setLiveSmsToast(`📲 [KisanSetu SMS] Confirmation SMS dispatched to ${farmer.mobileNumber} via MSG91.`);
      }
    }).catch(err => console.warn('Slot confirmation SMS dispatch error:', err));

    setCurrentView('token-receipt');
  };

  const completeFarmerRegistration = (newProfile: Partial<FarmerProfile>) => {
    const randomId = `MH-THN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const updated: FarmerProfile = {
      ...farmer,
      ...newProfile,
      farmerId: randomId,
      isAadhaarVerified: true,
    };
    setFarmer(updated);
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const staffCallNext = () => {
    advanceQueue();
  };

  const staffUpdateTokenStage = (token: string, newStage: QueueStage, newStatus: QueueItem['status']) => {
    setQueueItems(prev => prev.map(item => {
      if (item.tokenNumber === token || item.tokenNumber === `A-${token}`) {
        return { ...item, stage: newStage, status: newStatus };
      }
      return item;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        currentView,
        setCurrentView,
        currentRole,
        setCurrentRole,
        isLoggedIn,
        setIsLoggedIn,
        farmer,
        setFarmer,
        booking,
        setBooking,
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
        procurementTimeline,
        paymentDetails,
        notifications,
        markNotificationAsRead,
        createNewBooking,
        completeFarmerRegistration,
        staffCallNext,
        staffUpdateTokenStage,
        liveSmsToast,
        dismissLiveSms,
        showDemoController,
        setShowDemoController,
        toggleDemoController,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
