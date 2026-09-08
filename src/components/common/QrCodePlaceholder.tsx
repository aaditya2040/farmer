import React from 'react';

interface QrCodePlaceholderProps {
  value: string;
  size?: number;
}

export const QrCodePlaceholder: React.FC<QrCodePlaceholderProps> = ({ value, size = 110 }) => {
  return (
    <div 
      style={{ width: size, height: size }}
      className="bg-white p-1.5 border-2 border-slate-900 rounded flex flex-col items-center justify-center relative shadow-xs select-none"
    >
      {/* 2D QR Pattern simulation */}
      <div className="w-full h-full grid grid-cols-6 grid-rows-6 gap-0.5 p-0.5 bg-slate-900">
        {/* Corner 1 */}
        <div className="col-span-2 row-span-2 bg-white p-0.5">
          <div className="w-full h-full bg-slate-900 flex items-center justify-center">
            <div className="w-2 h-2 bg-white"></div>
          </div>
        </div>
        <div className="col-span-2 row-span-1 bg-white"></div>
        {/* Corner 2 */}
        <div className="col-span-2 row-span-2 bg-white p-0.5">
          <div className="w-full h-full bg-slate-900 flex items-center justify-center">
            <div className="w-2 h-2 bg-white"></div>
          </div>
        </div>
        
        {/* Middle items */}
        <div className="bg-white"></div>
        <div className="bg-white"></div>
        
        {/* Corner 3 */}
        <div className="col-span-2 row-span-2 bg-white p-0.5">
          <div className="w-full h-full bg-slate-900 flex items-center justify-center">
            <div className="w-2 h-2 bg-white"></div>
          </div>
        </div>
        <div className="bg-white"></div>
        <div className="bg-slate-900"></div>
        <div className="bg-white"></div>
        <div className="bg-slate-900"></div>

        {/* Bottom row patterns */}
        <div className="col-span-4 row-span-2 bg-white p-1 grid grid-cols-4 gap-0.5">
          <div className="bg-slate-900"></div>
          <div className="bg-white"></div>
          <div className="bg-slate-900"></div>
          <div className="bg-slate-900"></div>
          <div className="bg-slate-900"></div>
          <div className="bg-slate-900"></div>
          <div className="bg-white"></div>
          <div className="bg-slate-900"></div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 text-[8px] bg-slate-900 text-white text-center font-mono py-0.5 uppercase tracking-tighter">
        SECURE QR
      </div>
    </div>
  );
};
