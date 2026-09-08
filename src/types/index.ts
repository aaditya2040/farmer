export type Language = 'en' | 'mr' | 'hi';

export type ViewType = 
  | 'home'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'book-slot'
  | 'token-receipt'
  | 'track-queue'
  | 'procurement-status'
  | 'payment-status'
  | 'notifications'
  | 'help'
  | 'staff-dashboard'
  | 'admin-dashboard';

export type UserRole = 'farmer' | 'staff' | 'admin';

export type FontSize = 'normal' | 'large' | 'xlarge';

export interface FarmerProfile {
  farmerId: string;
  fullName: string;
  fullNameMr?: string;
  fullNameHi?: string;
  mobileNumber: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  aadhaarMasked: string;
  isAadhaarVerified: boolean;
  rationCardNumber: string;
  bankDetails: {
    bankName: string;
    accountNumberMasked: string;
    ifscCode: string;
    branchName: string;
    aadhaarSeeded: boolean;
  };
  landDetails: {
    district: string;
    taluka: string;
    village: string;
    khataNumber: string;
    surveyNumber: string;
    areaAcres: number;
    areaGuntha: number;
    landType: string;
    preferredCenterId: string;
  };
  cropDetails: {
    cropName: string;
    variety: string;
    estimatedYieldQuintals: number;
    sowingDate: string;
    expectedHarvestDate: string;
  };
}

export interface ProcurementCentre {
  id: string;
  name: string;
  nameMr: string;
  nameHi: string;
  district: string;
  taluka: string;
  address: string;
  distanceKm: number;
  totalDailyCapacity: number;
  availableSlotsToday: number;
  currentQueueCount: number;
  operatingHours: string;
  officerInCharge: string;
  contactNumber: string;
  cropsAccepted: string[];
  activeStatus: 'Active' | 'Congested' | 'Maintenance' | 'Closed';
}

export interface TimeSlot {
  id: string;
  timeRange: string;
  totalCapacity: number;
  bookedCount: number;
  availableCount: number;
  isAvailable: boolean;
}

export interface BookingDetails {
  bookingId: string;
  tokenNumber: string;
  farmerId: string;
  farmerName: string;
  centreId: string;
  centreName: string;
  centreDistrict: string;
  bookingDate: string;
  timeSlot: string;
  cropName: string;
  variety: string;
  estimatedQuantityQuintals: number;
  estimatedBagsCount: number;
  vehicleNumber?: string;
  status: 'Confirmed' | 'Arrived' | 'Under Inspection' | 'Weighed' | 'Procured' | 'Cancelled';
  allottedBay: string;
  allottedGate: string;
  reportingTime: string;
  createdAt: string;
}

export type QueueStage = 
  | 'WAITING_ARRIVAL'
  | 'GATE_ENTRY'
  | 'DOC_VERIFICATION'
  | 'QUALITY_ASSESSMENT'
  | 'WEIGHBRIDGE_GROSS'
  | 'UNLOADING'
  | 'WEIGHBRIDGE_TARE'
  | 'COMPLETED';

export interface QueueItem {
  tokenNumber: string;
  farmerName: string;
  cropName: string;
  quantityQuintals: number;
  timeSlot: string;
  status: 'In Queue' | 'Now Serving' | 'Under QC' | 'At Weighbridge' | 'Completed' | 'Pending';
  stage: QueueStage;
  queuePosition: number;
  bayNumber: string;
  tokenColor?: string;
}

export interface ProcurementStageLog {
  id: string;
  title: string;
  titleMr: string;
  titleHi: string;
  description: string;
  descriptionMr: string;
  descriptionHi: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
  officerName?: string;
  officerDesignation?: string;
  metaData?: Record<string, string | number>;
}

export interface PaymentDetails {
  procurementId: string;
  tokenNumber: string;
  farmerId: string;
  farmerName: string;
  cropName: string;
  variety: string;
  netQuantityQuintals: number;
  mspRatePerQuintal: number;
  totalGrossAmount: number;
  stateIncentiveBonus: number;
  mandiWeighmentCess: number;
  netDisbursedAmount: number;
  paymentStatus: 'Initiated' | 'PFMS Validated' | 'Disbursed' | 'Credit Confirmed';
  paymentDate: string;
  pfmsReferenceNumber: string;
  utrNumber: string;
  bankName: string;
  maskedAccountNumber: string;
  ifscCode: string;
  dbtStatusDescription: string;
  jFormNumber: string;
}

export interface OfficialNotification {
  id: string;
  category: 'SLOT' | 'QUEUE' | 'PROCUREMENT' | 'PAYMENT' | 'GOVT_ADVISORY';
  title: string;
  titleMr: string;
  titleHi: string;
  message: string;
  messageMr: string;
  messageHi: string;
  timestamp: string;
  isRead: boolean;
  priority: 'High' | 'Medium' | 'Normal';
  actionView?: ViewType;
}

export interface MspRate {
  cropName: string;
  cropNameMr: string;
  cropNameHi: string;
  category: string;
  msp2025_26: number;
  msp2026_27: number;
  unit: string;
  stateBonus: number;
}
