import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, KeyRound, ShieldCheck, ArrowRight, Smartphone, RefreshCw, AlertCircle } from 'lucide-react';

export const FarmerLogin: React.FC = () => {
  const { t, setCurrentView, setIsLoggedIn, setFarmer } = useApp();
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [countdown, setCountdown] = useState(30);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorMessage('');
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.length !== 4) {
      setErrorMessage('Please enter the 4-digit OTP sent to your mobile.');
      return;
    }
    // Authenticate
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleFillDemo = () => {
    setMobileNumber('9876543210');
    setOtpSent(true);
    setOtpValue('9842');
    setErrorMessage('');
  };

  return (
    <div className="govt-container py-12 flex justify-center">
      <div className="w-full max-w-md bg-white border-2 border-govt-border rounded-lg shadow-govt overflow-hidden">
        
        {/* Top Card Header */}
        <div className="bg-govt-navy p-6 text-white text-center space-y-1">
          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-2">
            <Smartphone className="w-6 h-6 text-govt-saffron" />
          </div>
          <h2 className="text-xl font-bold font-govt">{t('loginTitle')}</h2>
          <p className="text-xs text-slate-200">{t('loginSubtitle')}</p>
        </div>

        {/* Demo Fast Helper Ribbon */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between text-xs text-amber-900">
          <span className="font-semibold flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
            Quick Demo Helper:
          </span>
          <button
            type="button"
            onClick={handleFillDemo}
            className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded text-[11px] shadow-2xs"
          >
            Fill Demo Mobile & OTP
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {errorMessage && (
            <div className="p-3 rounded bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-govt-navy mb-1.5">
                  {t('mobileLabel')} <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 font-mono">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder={t('mobilePlaceholder')}
                    className="w-full pl-12 pr-3 py-2.5 text-sm font-mono border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  An OTP will be dispatched to your Aadhaar-registered mobile number.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-govt-navy hover:bg-govt-navy-dark text-white font-bold rounded text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>{t('getOtpBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="p-2.5 rounded bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
                <span>OTP sent to: <strong>+91 {mobileNumber || '9876543210'}</strong></span>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-govt-navy font-bold hover:underline text-[11px]"
                >
                  Change
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-govt-navy mb-1.5">
                  {t('otpLabel')} <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    maxLength={4}
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                    placeholder={t('otpPlaceholder')}
                    className="w-full pl-10 pr-3 py-2.5 text-center text-lg font-mono tracking-widest font-bold border border-slate-300 rounded focus:ring-2 focus:ring-govt-navy focus:outline-hidden"
                    required
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                  <span>Demo OTP code: <strong className="font-mono text-slate-800">9842</strong></span>
                  <button type="button" className="text-govt-navy font-medium hover:underline">
                    {t('resendOtp')} (00:24)
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-green-700 hover:bg-green-800 text-white font-bold rounded text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{t('verifyOtpBtn')}</span>
              </button>
            </form>
          )}

          {/* New Farmer Registration Link */}
          <div className="pt-4 border-t border-slate-200 text-center space-y-2">
            <p className="text-xs text-slate-600">{t('newFarmerPrompt')}</p>
            <button
              onClick={() => setCurrentView('register')}
              className="w-full py-2 bg-white text-govt-navy border border-govt-navy font-bold rounded text-xs hover:bg-slate-50 transition-colors"
            >
              {t('registerNowBtn')}
            </button>
          </div>

          <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
            <span>256-bit SSL Encrypted & Mahabhulekh Integrated</span>
          </div>

        </div>

      </div>
    </div>
  );
};
