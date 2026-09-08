import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockCentres } from '../../data/mockData';
import { 
  User, 
  ShieldCheck, 
  MapPin, 
  Sprout, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  FileCheck,
  Check
} from 'lucide-react';

export const FarmerRegistration: React.FC = () => {
  const { t, completeFarmerRegistration, setCurrentView } = useApp();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Ramesh Dinkar Patil',
    mobileNumber: '9876543210',
    dob: '1982-06-14',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    address: 'At Post Padgha, Near Gram Panchayat',
    district: 'Thane',
    taluka: 'Bhiwandi',
    village: 'Padgha',
    pincode: '421101',
    aadhaarInput: '482190844821',
    aadhaarMasked: 'XXXX XXXX 4821',
    isAadhaarVerified: true,
    rationCardNumber: 'MH-RC-27-049182',
    khataNumber: '284/1A',
    surveyNumber: '142/B',
    areaAcres: 4,
    areaGuntha: 20,
    landType: 'Irrigated Bagayat (बागायत)',
    preferredCenterId: 'apmc-thane',
    cropName: 'Soyabean (सोयाबीन)',
    variety: 'JS-335 (Certified Standard)',
    estimatedYieldQuintals: 45,
    expectedHarvestDate: '2026-09-02',
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep((step + 1) as 1 | 2 | 3 | 4);
    } else {
      // Final Submit
      completeFarmerRegistration({
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        dob: formData.dob,
        gender: formData.gender,
        aadhaarMasked: formData.aadhaarMasked,
        isAadhaarVerified: true,
        rationCardNumber: formData.rationCardNumber,
        landDetails: {
          district: formData.district,
          taluka: formData.taluka,
          village: formData.village,
          khataNumber: formData.khataNumber,
          surveyNumber: formData.surveyNumber,
          areaAcres: Number(formData.areaAcres),
          areaGuntha: Number(formData.areaGuntha),
          landType: formData.landType,
          preferredCenterId: formData.preferredCenterId,
        },
        cropDetails: {
          cropName: formData.cropName,
          variety: formData.variety,
          estimatedYieldQuintals: Number(formData.estimatedYieldQuintals),
          sowingDate: '2026-06-18',
          expectedHarvestDate: formData.expectedHarvestDate,
        },
      });
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((step - 1) as 1 | 2 | 3 | 4);
    }
  };

  return (
    <div className="govt-container py-10">
      <div className="max-w-3xl mx-auto bg-white border-2 border-govt-border rounded-lg shadow-govt overflow-hidden">
        
        {/* Header */}
        <div className="bg-govt-navy p-6 text-white space-y-1">
          <h2 className="text-xl font-bold font-govt flex items-center gap-2">
            <User className="w-5 h-5 text-govt-saffron" />
            <span>{t('regTitle')}</span>
          </h2>
          <p className="text-xs text-slate-200">
            Maharashtra State Farmer & Land Registry Integration (Mahabhulekh & PM-KISAN Linked)
          </p>
        </div>

        {/* Step Progress Bar Indicator */}
        <div className="bg-slate-100 border-b border-govt-border p-4">
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className={`flex flex-col items-center gap-1 ${step >= 1 ? 'text-govt-navy font-bold' : 'text-slate-400'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-govt-navy text-white' : 'bg-slate-300 text-slate-600'}`}>
                {step > 1 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <span className="hidden sm:inline">Basic Details</span>
            </div>

            <div className={`flex flex-col items-center gap-1 ${step >= 2 ? 'text-govt-navy font-bold' : 'text-slate-400'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-govt-navy text-white' : 'bg-slate-300 text-slate-600'}`}>
                {step > 2 ? <Check className="w-4 h-4" /> : '2'}
              </div>
              <span className="hidden sm:inline">Verification</span>
            </div>

            <div className={`flex flex-col items-center gap-1 ${step >= 3 ? 'text-govt-navy font-bold' : 'text-slate-400'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-govt-navy text-white' : 'bg-slate-300 text-slate-600'}`}>
                {step > 3 ? <Check className="w-4 h-4" /> : '3'}
              </div>
              <span className="hidden sm:inline">7/12 Land Details</span>
            </div>

            <div className={`flex flex-col items-center gap-1 ${step >= 4 ? 'text-govt-navy font-bold' : 'text-slate-400'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step >= 4 ? 'bg-govt-navy text-white' : 'bg-slate-300 text-slate-600'}`}>
                {step === 4 ? '4' : '4'}
              </div>
              <span className="hidden sm:inline">Crop Details</span>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleNext} className="p-6 sm:p-8 space-y-6">
          
          {/* STEP 1: Basic Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-govt-navy uppercase tracking-wider border-b border-slate-200 pb-2">
                Step 1: Farmer Personal & Contact Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('fullNameLabel')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('mobileLabel')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('dobLabel')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('genderLabel')} <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                  >
                    <option value="Male">Male (पुरुष)</option>
                    <option value="Female">Female (स्त्री)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('addressLabel')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('districtLabel')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('talukaLabel')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.taluka}
                    onChange={(e) => setFormData({ ...formData, taluka: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('villageLabel')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('pincodeLabel')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Identity Verification */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-govt-navy uppercase tracking-wider border-b border-slate-200 pb-2">
                Step 2: UIDAI Aadhaar Verification (Masked Identity)
              </h3>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-900 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-green-700" />
                  <span>Privacy Compliant Aadhaar Masking Protocol</span>
                </div>
                <p className="text-[11px] text-blue-800">
                  {t('aadhaarNotice')}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('aadhaarLabel')} <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      disabled
                      value={formData.aadhaarMasked}
                      className="w-full px-3 py-2.5 text-sm font-mono font-bold bg-slate-100 border border-slate-300 rounded cursor-not-allowed"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded border border-green-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ration Card Number / Family ID
                  </label>
                  <input
                    type="text"
                    value={formData.rationCardNumber}
                    onChange={(e) => setFormData({ ...formData, rationCardNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                  />
                </div>

                <div className="p-3 bg-green-50 border border-green-200 rounded text-xs text-green-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>
                    Aadhaar linked with PM-KISAN database. Bank Account <strong>Bank of Maharashtra (XXXXXX7712)</strong> verified for direct DBT payout.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Land & 7/12 Details */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-govt-navy uppercase tracking-wider border-b border-slate-200 pb-2">
                Step 3: 7/12 Land Record Details & APMC Centre Preference
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('khataLabel')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.khataNumber}
                    onChange={(e) => setFormData({ ...formData, khataNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('surveyLabel')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.surveyNumber}
                    onChange={(e) => setFormData({ ...formData, surveyNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('landAreaAcres')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    value={formData.areaAcres}
                    onChange={(e) => setFormData({ ...formData, areaAcres: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('landAreaGuntha')}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={formData.areaGuntha}
                    onChange={(e) => setFormData({ ...formData, areaGuntha: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('prefCenterLabel')} <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.preferredCenterId}
                    onChange={(e) => setFormData({ ...formData, preferredCenterId: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                  >
                    {mockCentres.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} — {c.district} ({c.distanceKm} km away)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Produce & Crop Details */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-govt-navy uppercase tracking-wider border-b border-slate-200 pb-2">
                Step 4: Crop Declaration & Estimated Procurement Quantity
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('cropNameLabel')} <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.cropName}
                    onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                  >
                    <option value="Soyabean (सोयाबीन)">Soyabean (सोयाबीन) — MSP ₹4,892/Qtl</option>
                    <option value="Cotton (कापूस)">Cotton (कापूस) — MSP ₹7,121/Qtl</option>
                    <option value="Paddy / Dhan (भात/धान)">Paddy / Dhan (भात/धान) — MSP ₹2,300/Qtl</option>
                    <option value="Tur Dal (तूर डाळ)">Tur Dal (तूर डाळ) — MSP ₹7,550/Qtl</option>
                    <option value="Chana / Gram (हरभरा)">Chana / Gram (हरभरा) — MSP ₹5,440/Qtl</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('cropVarietyLabel')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.variety}
                    onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('estYieldLabel')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.estimatedYieldQuintals}
                    onChange={(e) => setFormData({ ...formData, estimatedYieldQuintals: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs font-mono font-bold border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('harvestDateLabel')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.expectedHarvestDate}
                    onChange={(e) => setFormData({ ...formData, expectedHarvestDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Registration Summary Box */}
              <div className="p-4 bg-slate-50 border border-slate-300 rounded space-y-2 text-xs">
                <div className="font-bold text-govt-navy uppercase tracking-wide">
                  Summary for Self-Declaration
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div>Farmer: <strong>{formData.fullName}</strong></div>
                  <div>Aadhaar: <strong className="font-mono">{formData.aadhaarMasked}</strong></div>
                  <div>Village: <strong>{formData.village}, {formData.district}</strong></div>
                  <div>7/12 Khata: <strong className="font-mono">{formData.khataNumber}</strong></div>
                  <div>Produce: <strong>{formData.cropName}</strong></div>
                  <div>Estimated Quantity: <strong>{formData.estimatedYieldQuintals} Quintals</strong></div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded text-xs transition-colors flex items-center gap-1.5 border border-slate-300"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t('prevBtn')}</span>
              </button>
            ) : (
              <div></div>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 bg-govt-navy hover:bg-govt-navy-dark text-white font-bold rounded text-xs shadow-xs transition-colors flex items-center gap-2"
            >
              <span>{step === 4 ? t('submitRegBtn') : t('nextBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
