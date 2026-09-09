import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { KeyRound, ShieldCheck, ArrowRight, Smartphone, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { smsService } from '../../services/smsService';

export const FarmerLogin: React.FC = () => {
  const { t, setCurrentView, setIsLoggedIn, setFarmer } = useApp();
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);

  // Resend OTP countdown timer
  useEffect(() => {
    let timer: any;
    if (otpSent && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, countdown]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorMessage('');
    setInfoMessage('');
    setIsLoading(true);

    try {
      const res = await smsService.requestOtp(mobileNumber);
      if (res.success) {
        setOtpSent(true);
        setCountdown(30);
        setInfoMessage(res.message || 'OTP dispatched to your mobile number.');
      } else {
        setErrorMessage(res.message || 'Failed to dispatch OTP. Please retry.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error communicating with SMS service.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.length !== 4) {
      setErrorMessage('Please enter the 4-digit OTP sent to your mobile.');
      return;
    }
    setErrorMessage('');
    setInfoMessage('');
    setIsLoading(true);

    try {
      const res = await smsService.verifyOtp(mobileNumber || '9876543210', otpValue);
      if (res.success) {
        if (mobileNumber) {
          setFarmer(prev => ({ ...prev, mobileNumber }));
        }
        setIsLoggedIn(true);
        setCurrentView('dashboard');
      } else {
        setErrorMessage(res.message || 'Incorrect OTP entered. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Verification failed. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0 || isLoading) return;
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await smsService.resendOtp(mobileNumber || '9876543210');
      if (res.success) {
        setCountdown(30);
        setInfoMessage(res.message || 'OTP re-sent successfully.');
      } else {
        setErrorMessage(res.message || 'Failed to resend OTP.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to resend OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setMobileNumber('9876543210');
    setOtpSent(true);
    setOtpValue('9842');
    setErrorMessage('');
    setInfoMessage('Demo credentials filled (OTP: 9842)');
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

          {infoMessage && (
            <div className="p-3 rounded bg-green-50 border border-green-200 text-xs text-green-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>{infoMessage}</span>
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
                  An OTP will be dispatched via MSG91 to your mobile number.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-govt-navy hover:bg-govt-navy-dark disabled:opacity-60 text-white font-bold rounded text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending OTP via MSG91...</span>
                  </>
                ) : (
                  <>
                    <span>{t('getOtpBtn')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
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
                  {countdown > 0 ? (
                    <span className="text-slate-500 font-mono">
                      {t('resendOtp')} (00:{countdown < 10 ? `0${countdown}` : countdown})
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isLoading}
                      className="text-govt-navy font-bold hover:underline"
                    >
                      Resend OTP Now
                    </button>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white font-bold rounded text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying OTP...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>{t('verifyOtpBtn')}</span>
                  </>
                )}
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
            <span>256-bit SSL Encrypted & MSG91 Integrated Gateway</span>
          </div>

        </div>

      </div>
    </div>
  );
};
