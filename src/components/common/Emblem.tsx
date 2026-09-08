import React from 'react';

interface EmblemProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Emblem: React.FC<EmblemProps> = ({ size = 'md', showText = false }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
  };

  return (
    <div className="flex items-center gap-3">
      {/* Official Government Seal / Emblem Graphic */}
      <div className={`relative ${sizeMap[size]} flex items-center justify-center bg-white rounded-full border-2 border-govt-navy shadow-sm overflow-hidden p-1 flex-shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-govt-navy" fill="currentColor">
          {/* Outer Ring */}
          <circle cx="50" cy="50" r="46" fill="none" stroke="#0B3559" strokeWidth="3" />
          <circle cx="50" cy="50" r="41" fill="none" stroke="#E65100" strokeWidth="1.5" strokeDasharray="3,2" />
          
          {/* Center Ashoka Chakra / Agriculture Sheaf Silhouette */}
          <circle cx="50" cy="50" r="14" fill="#0B3559" />
          <circle cx="50" cy="50" r="8" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="3" fill="#0B3559" />
          
          {/* 24 Chakra Spokes */}
          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="42"
              x2="50"
              y2="58"
              stroke="#0B3559"
              strokeWidth="1"
              transform={`rotate(${i * 15} 50 50)`}
            />
          ))}

          {/* Wheat Ears / Agricultural Sheaves around seal */}
          <path d="M22 68 Q28 45 42 32 Q32 48 30 68 Z" fill="#FF9933" opacity="0.9" />
          <path d="M78 68 Q72 45 58 32 Q68 48 70 68 Z" fill="#138808" opacity="0.9" />
          
          {/* Base ribbon */}
          <path d="M25 76 Q50 84 75 76 L70 86 Q50 92 30 86 Z" fill="#0B3559" />
          <text x="50" y="83" fontSize="5" fill="#FFFFFF" textAnchor="middle" fontWeight="bold" fontFamily="sans-serif">
            सत्यमेव जयते
          </text>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-govt-navy-dark tracking-wide uppercase">
            Government of Maharashtra
          </span>
          <span className="text-[10px] text-govt-text-muted">
            Department of Agriculture & Cooperation
          </span>
        </div>
      )}
    </div>
  );
};
