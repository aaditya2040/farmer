import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockCentres } from '../../data/mockData';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Search, 
  Building2, 
  Truck, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { ProcurementCentre } from '../../types';

export const SlotBooking: React.FC = () => {
  const { t, language, farmer, createNewBooking, setCurrentView } = useApp();
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4>(1);

  // Selected state
  const [selectedCentre, setSelectedCentre] = useState<ProcurementCentre>(mockCentres[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-09-08');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:00 AM – 11:00 AM');
  const [cropName, setCropName] = useState('Soyabean (Yellow Standard)');
  const [variety, setVariety] = useState('JS-335 (Certified)');
  const [estimatedQuantity, setEstimatedQuantity] = useState(45);
  const [estimatedBags, setEstimatedBags] = useState(90);
  const [vehicleNumber, setVehicleNumber] = useState('MH-04-EK-9412');

  const availableSlots = [
    { time: '09:00 AM – 10:00 AM', capacity: 15, booked: 15, available: 0, disabled: true },
    { time: '10:00 AM – 11:00 AM', capacity: 15, booked: 11, available: 4, disabled: false },
    { time: '11:00 AM – 12:00 PM', capacity: 15, booked: 8, available: 7, disabled: false },
    { time: '12:00 PM – 01:00 PM', capacity: 15, booked: 14, available: 1, disabled: false },
    { time: '01:00 PM – 02:00 PM', capacity: 0, booked: 0, available: 0, disabled: true, note: 'Lunch / Weighbridge Calibration' },
    { time: '02:00 PM – 03:00 PM', capacity: 15, booked: 6, available: 9, disabled: false },
    { time: '03:00 PM – 04:00 PM', capacity: 15, booked: 5, available: 10, disabled: false },
    { time: '04:00 PM – 05:00 PM', capacity: 15, booked: 12, available: 3, disabled: false },
  ];

  const datesList = [
    { date: '2026-09-08', label: 'Today (08 Sep)', status: 'Fast Filling', slotsLeft: 24 },
    { date: '2026-09-09', label: 'Tomorrow (09 Sep)', status: 'Available', slotsLeft: 58 },
    { date: '2026-09-10', label: 'Thu (10 Sep)', status: 'Available', slotsLeft: 64 },
    { date: '2026-09-11', label: 'Fri (11 Sep)', status: 'Available', slotsLeft: 70 },
    { date: '2026-09-12', label: 'Sat (12 Sep)', status: 'Fast Filling', slotsLeft: 18 },
  ];

  const filteredCentres = mockCentres.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.taluka.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirmBooking = () => {
    createNewBooking({
      centreId: selectedCentre.id,
      centreName: selectedCentre.name,
      centreDistrict: selectedCentre.district,
      bookingDate: selectedDate,
      timeSlot: selectedTimeSlot,
      cropName: cropName,
      variety: variety,
      estimatedQuantityQuintals: estimatedQuantity,
      estimatedBagsCount: estimatedBags,
      vehicleNumber: vehicleNumber,
      allottedBay: 'Bay 03 (Unloading Ramp #2)',
      allottedGate: 'Gate No. 2 (Weighbridge In)',
      reportingTime: selectedTimeSlot.split(' – ')[0],
    });
  };

  return (
    <div className="govt-container py-8 space-y-6">
      
      {/* Top Header */}
      <div className="bg-white p-5 rounded-lg border-2 border-govt-border shadow-govt flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-govt-navy font-govt flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-govt-saffron" />
            <span>{t('cardBookSlotTitle')} (स्लॉट बुकिंग)</span>
          </h2>
          <p className="text-xs text-slate-600">
            Book your dedicated 1-hour time slot to avoid queuing delays at the procurement centre.
          </p>
        </div>
        
        <div className="text-xs bg-slate-100 px-3 py-1.5 rounded border border-slate-300">
          Farmer: <strong>{farmer.fullName}</strong> ({farmer.farmerId})
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="bg-slate-100 border border-govt-border rounded-lg p-3">
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className={`flex flex-col items-center gap-1 ${bookingStep >= 1 ? 'text-govt-navy font-bold' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${bookingStep >= 1 ? 'bg-govt-navy text-white' : 'bg-slate-300'}`}>1</span>
            <span className="hidden sm:inline">{t('bookingStep1Title')}</span>
          </div>
          <div className={`flex flex-col items-center gap-1 ${bookingStep >= 2 ? 'text-govt-navy font-bold' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${bookingStep >= 2 ? 'bg-govt-navy text-white' : 'bg-slate-300'}`}>2</span>
            <span className="hidden sm:inline">{t('bookingStep2Title')}</span>
          </div>
          <div className={`flex flex-col items-center gap-1 ${bookingStep >= 3 ? 'text-govt-navy font-bold' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${bookingStep >= 3 ? 'bg-govt-navy text-white' : 'bg-slate-300'}`}>3</span>
            <span className="hidden sm:inline">{t('bookingStep3Title')}</span>
          </div>
          <div className={`flex flex-col items-center gap-1 ${bookingStep >= 4 ? 'text-govt-navy font-bold' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${bookingStep >= 4 ? 'bg-govt-navy text-white' : 'bg-slate-300'}`}>4</span>
            <span className="hidden sm:inline">Confirm Booking</span>
          </div>
        </div>
      </div>

      {/* Step Contents */}
      <div className="bg-white p-6 rounded-lg border-2 border-govt-border shadow-govt space-y-6">
        
        {/* STEP 1: Select Centre */}
        {bookingStep === 1 && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-govt-navy uppercase tracking-wider">
                {t('bookingStep1Title')}
              </h3>
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter centres..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCentres.map((centre) => {
                const isSelected = selectedCentre.id === centre.id;
                return (
                  <div
                    key={centre.id}
                    onClick={() => setSelectedCentre(centre)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'border-govt-navy bg-blue-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-400 bg-white'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-govt-navy">
                          {language === 'mr' ? centre.nameMr : (language === 'hi' ? centre.nameHi : centre.name)}
                        </h4>
                        {isSelected && (
                          <span className="text-[10px] bg-govt-navy text-white px-2 py-0.5 rounded font-bold">
                            SELECTED
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-2">{centre.address}</p>
                      <div className="text-[11px] text-slate-500">
                        Distance: <strong>{centre.distanceKm} km</strong> • Officer: <strong>{centre.officerInCharge}</strong>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-500 block text-[10px]">{t('availableSlotsBadge')}</span>
                        <span className="font-mono font-bold text-green-700">{centre.availableSlotsToday} Slots</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">{t('todayQueueBadge')}</span>
                        <span className="font-mono font-bold text-amber-800">{centre.currentQueueCount} In Queue</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Select Date */}
        {bookingStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-govt-navy uppercase tracking-wider border-b border-slate-200 pb-2">
              {t('bookingStep2Title')} — {selectedCentre.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {datesList.map((d) => {
                const isSelected = selectedDate === d.date;
                return (
                  <div
                    key={d.date}
                    onClick={() => setSelectedDate(d.date)}
                    className={`p-4 rounded-lg border-2 text-center cursor-pointer transition-all space-y-2 ${
                      isSelected
                        ? 'border-govt-navy bg-blue-50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-400 bg-white'
                    }`}
                  >
                    <CalendarIcon className="w-5 h-5 mx-auto text-govt-navy" />
                    <div className="text-xs font-bold text-slate-900">{d.label}</div>
                    <div className="text-[11px] font-mono font-bold text-green-700">
                      {d.slotsLeft} Slots Left
                    </div>
                    <StatusBadge status={d.status} size="sm" />
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>
                Note: Centre operating hours are <strong>{selectedCentre.operatingHours}</strong>. Weighbridge gates close promptly at 05:00 PM.
              </span>
            </div>
          </div>
        )}

        {/* STEP 3: Select Time Slot */}
        {bookingStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-govt-navy uppercase tracking-wider border-b border-slate-200 pb-2">
              {t('bookingStep3Title')} for {selectedDate}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {availableSlots.map((slot, idx) => {
                const isSelected = selectedTimeSlot === slot.time;
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={slot.disabled}
                    onClick={() => !slot.disabled && setSelectedTimeSlot(slot.time)}
                    className={`p-3.5 rounded-lg border-2 text-left transition-all flex flex-col justify-between space-y-2 ${
                      slot.disabled
                        ? 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'border-govt-navy bg-blue-50/80 shadow-xs'
                        : 'border-slate-200 hover:border-slate-400 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Clock className="w-4 h-4 text-govt-navy" />
                      {isSelected && (
                        <span className="text-[10px] font-bold bg-govt-navy text-white px-1.5 py-0.2 rounded">
                          SELECTED
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-900 font-mono block">
                        {slot.time}
                      </span>
                      {slot.disabled ? (
                        <span className="text-[10px] text-red-600 font-bold block">
                          {slot.note || 'Full / Unavailable'}
                        </span>
                      ) : (
                        <span className="text-[10px] text-green-700 font-semibold block">
                          {slot.available} / {slot.capacity} Available
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Produce Details & Booking Confirmation */}
        {bookingStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-govt-navy uppercase tracking-wider border-b border-slate-200 pb-2">
              {t('bookingStep4Title')} & Final Confirmation
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Crop Name
                </label>
                <input
                  type="text"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Variety (वाण)
                </label>
                <input
                  type="text"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Estimated Quantity (Quintals)
                </label>
                <input
                  type="number"
                  min="1"
                  value={estimatedQuantity}
                  onChange={(e) => setEstimatedQuantity(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-mono font-bold border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('bagsCountLabel')}
                </label>
                <input
                  type="number"
                  min="1"
                  value={estimatedBags}
                  onChange={(e) => setEstimatedBags(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('vehicleNoLabel')}
                </label>
                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  placeholder="e.g. MH-04-EK-9412 (Tractor / Pickup)"
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                />
              </div>
            </div>

            {/* Official Booking Summary Box */}
            <div className="p-5 bg-slate-50 border-2 border-govt-navy/30 rounded-lg space-y-3 text-xs">
              <h4 className="font-bold text-govt-navy uppercase tracking-wide border-b border-slate-300 pb-1.5 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-govt-navy" />
                <span>{t('bookingSummaryTitle')}</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-slate-700">
                <div>Farmer: <strong className="text-slate-900 block">{farmer.fullName}</strong></div>
                <div>Farmer ID: <strong className="font-mono text-slate-900 block">{farmer.farmerId}</strong></div>
                <div>Centre: <strong className="text-slate-900 block">{selectedCentre.name}</strong></div>
                <div>Booking Date: <strong className="text-slate-900 block">{selectedDate}</strong></div>
                <div>Time Slot: <strong className="text-slate-900 block font-mono">{selectedTimeSlot}</strong></div>
                <div>Crop & Quantity: <strong className="text-slate-900 block">{cropName} ({estimatedQuantity} Qtl)</strong></div>
                <div>Allotted Bay: <strong className="text-govt-navy font-bold block">Bay 03 (Unloading #2)</strong></div>
                <div>Gate Entry: <strong className="text-govt-navy font-bold block">Gate No. 2 (Weighbridge In)</strong></div>
                <div>Reporting Time: <strong className="text-red-700 font-bold block font-mono">09:45 AM</strong></div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Step Navigation */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          {bookingStep > 1 ? (
            <button
              type="button"
              onClick={() => setBookingStep((bookingStep - 1) as any)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded text-xs transition-colors flex items-center gap-1.5 border border-slate-300"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t('prevBtn')}</span>
            </button>
          ) : (
            <div></div>
          )}

          {bookingStep < 4 ? (
            <button
              type="button"
              onClick={() => setBookingStep((bookingStep + 1) as any)}
              className="px-6 py-2.5 bg-govt-navy hover:bg-govt-navy-dark text-white font-bold rounded text-xs shadow-xs transition-colors flex items-center gap-2"
            >
              <span>{t('nextBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleConfirmBooking}
              className="px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white font-bold rounded text-xs shadow-xs transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{t('confirmBookingBtn')}</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
