import React from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, Sun, Moon, Globe, Type } from 'lucide-react';
import { Language, FontSize } from '../../types';

export const GovtTopStrip: React.FC = () => {
  const { language, setLanguage, fontSize, setFontSize, highContrast, setHighContrast, t } = useApp();

  const handleFontChange = (size: FontSize) => {
    setFontSize(size);
  };

  return (
    <div className="bg-govt-navy-dark text-slate-100 text-xs border-b border-govt-navy-light no-print">
      <div className="govt-container flex flex-wrap justify-between items-center py-1.5 gap-2">
        {/* Left Side: Govt Identity & Skip to Content */}
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-200 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-govt-saffron"></span>
            {t('govtOfMaha')}
          </span>
          <a
            href="#main-content"
            className="hidden sm:inline-block text-slate-300 hover:text-white underline underline-offset-2 text-[11px] focus:ring-2 focus:ring-govt-saffron focus:outline-hidden"
          >
            {t('skipToMain')}
          </a>
        </div>

        {/* Right Side: Accessibility & Language Switcher */}
        <div className="flex items-center gap-3">
          {/* Font Size Adjusters */}
          <div className="flex items-center bg-govt-navy rounded px-1.5 py-0.5 border border-slate-600 gap-1" title={t('fontSize')}>
            <span className="text-[10px] text-slate-400 mr-1 hidden md:inline"><Type className="w-3 h-3 inline" /> {t('fontSize')}:</span>
            <button
              onClick={() => handleFontChange('normal')}
              className={`px-1.5 py-0.5 text-[11px] font-bold rounded ${fontSize === 'normal' ? 'bg-govt-saffron text-slate-900' : 'hover:bg-slate-700 text-slate-200'}`}
              aria-label="Normal Font Size"
            >
              A-
            </button>
            <button
              onClick={() => handleFontChange('large')}
              className={`px-1.5 py-0.5 text-[11px] font-bold rounded ${fontSize === 'large' ? 'bg-govt-saffron text-slate-900' : 'hover:bg-slate-700 text-slate-200'}`}
              aria-label="Large Font Size"
            >
              A
            </button>
            <button
              onClick={() => handleFontChange('xlarge')}
              className={`px-1.5 py-0.5 text-[11px] font-bold rounded ${fontSize === 'xlarge' ? 'bg-govt-saffron text-slate-900' : 'hover:bg-slate-700 text-slate-200'}`}
              aria-label="Extra Large Font Size"
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] border ${highContrast ? 'bg-yellow-400 text-slate-950 font-bold border-yellow-300' : 'bg-govt-navy hover:bg-slate-700 text-slate-200 border-slate-600'}`}
            title="High Contrast Mode"
            aria-pressed={highContrast}
          >
            {highContrast ? <Sun className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            <span className="hidden sm:inline">{highContrast ? t('normalContrast') : t('highContrast')}</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-govt-navy rounded border border-slate-600 overflow-hidden divide-x divide-slate-600">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 text-[11px] transition-colors ${language === 'en' ? 'bg-govt-saffron text-slate-950 font-bold' : 'text-slate-200 hover:bg-slate-700'}`}
              aria-label="Switch to English"
            >
              English
            </button>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-2 py-0.5 text-[11px] font-medium transition-colors ${language === 'mr' ? 'bg-govt-saffron text-slate-950 font-bold' : 'text-slate-200 hover:bg-slate-700'}`}
              aria-label="मराठी मध्ये बदला"
            >
              मराठी
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 text-[11px] font-medium transition-colors ${language === 'hi' ? 'bg-govt-saffron text-slate-950 font-bold' : 'text-slate-200 hover:bg-slate-700'}`}
              aria-label="हिन्दी में बदलें"
            >
              हिन्दी
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
