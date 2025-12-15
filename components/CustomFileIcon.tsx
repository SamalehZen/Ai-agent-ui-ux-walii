import React from 'react';

export const CustomFileIcon: React.FC = () => {
  return (
    // Dimensions increased significantly (w-48 h-64) to fix "small dimension" issue.
    // Added specific hover perspective transforms.
    <div className="relative w-48 h-64 drop-shadow-2xl transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2 hover:rotate-1 hover:drop-shadow-[0_30px_50px_rgba(59,130,246,0.5)] group">
      <svg viewBox="0 0 140 170" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)]">
        <defs>
          {/* 1. Main Body Gradient: Richer, Deeper Tech Blue */}
          <linearGradient id="bodyGradient" x1="70" y1="0" x2="70" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" /> {/* Blue-400 - Lighter Top */}
            <stop offset="40%" stopColor="#3B82F6" /> {/* Blue-500 - Vibrant Middle */}
            <stop offset="100%" stopColor="#172554" /> {/* Blue-950 - Deep Dark Bottom */}
          </linearGradient>

          {/* 2. Grid Pattern: Sharper, technological graph paper */}
          <pattern id="gridPattern" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
             <path d="M 14 0 L 0 0 0 14" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          </pattern>
          
          {/* 3. Plate Metal Gradient: Industrial Dark Blue/Grey */}
          <linearGradient id="plateGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />   {/* Slate-700 */}
            <stop offset="50%" stopColor="#1e293b" />  {/* Slate-800 */}
            <stop offset="100%" stopColor="#0F172A" /> {/* Slate-900 */}
          </linearGradient>

          {/* 4. Plate Bezel (Stroke) Gradient: Metallic shine */}
          <linearGradient id="plateStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* 5. Rivet Gradient (Realistic Silver) */}
          <radialGradient id="rivetGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0.5 0.5) rotate(45) scale(0.5)">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#64748B" />
          </radialGradient>
          
          {/* 6. Advanced Shadows for Depth */}
          <filter id="plateShadow" x="-50%" y="-50%" width="200%" height="200%">
             <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
             <feOffset in="blur" dx="0" dy="8" result="offsetBlur"/>
             <feFlood floodColor="rgba(0,0,0,0.6)" result="colorBlur"/>
             <feComposite in="colorBlur" in2="offsetBlur" operator="in" result="shadow"/>
             <feMerge>
                <feMergeNode in="shadow"/>
                <feMergeNode in="SourceGraphic"/>
             </feMerge>
          </filter>

           <filter id="innerGlow" x="-20%" y="-20%" width="140%" height="140%">
             <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur"/>
             <feComposite in="SourceGraphic" in2="blur" operator="arithmetic" k2="1" k3="1"/>
          </filter>
        </defs>

        {/* --- Main Paper Shape --- */}
        <g>
          {/* Base Shape */}
          <path 
            d="M 10 0 H 95 L 130 35 V 160 C 130 165.5 125.5 170 120 170 H 20 C 14.5 170 10 165.5 10 160 V 0 Z" 
            fill="url(#bodyGradient)" 
          />
          
          {/* Grid Overlay */}
          <path 
             d="M 10 0 H 95 L 130 35 V 160 C 130 165.5 125.5 170 120 170 H 20 C 14.5 170 10 165.5 10 160 V 0 Z" 
             fill="url(#gridPattern)" 
          />

          {/* Glossy Sheen (Top Gradient Reflection) */}
          <path 
             d="M 10 0 H 95 L 130 35 V 90 C 130 90 70 50 10 70 V 0 Z"
             fill="white"
             fillOpacity="0.07"
             style={{ mixBlendMode: 'overlay' }}
          />

          {/* Outline Border */}
           <path 
             d="M 10 0 H 95 L 130 35 V 160 C 130 165.5 125.5 170 120 170 H 20 C 14.5 170 10 165.5 10 160 V 0 Z" 
             fill="none" 
             stroke="rgba(255,255,255,0.2)" 
             strokeWidth="1"
          />
        </g>

        {/* --- The Fold (Top Right) --- */}
        <g>
           <path d="M 95 0 L 130 35 H 105 C 99.5 35 95 30.5 95 25 V 0 Z" fill="rgba(255,255,255,0.25)" />
           {/* Fold Shadow/Depth */}
           <path d="M 95 0 L 130 35" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
           <path d="M 95 25 C 95 30.5 99.5 35 105 35 H 130" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </g>

        {/* --- The "TXT" Plate --- */}
        <g transform="translate(20, 75)" filter="url(#plateShadow)">
          {/* Main Plate Body */}
          <rect 
            x="0" 
            y="0" 
            width="100" 
            height="50" 
            rx="16" 
            fill="url(#plateGradient)" 
            stroke="url(#plateStroke)" 
            strokeWidth="3.5"
          />
          
          {/* Inner Groove (Machined look) */}
          <rect 
            x="6" 
            y="6" 
            width="88" 
            height="38" 
            rx="10" 
            fill="none" 
            stroke="rgba(0,0,0,0.6)" 
            strokeWidth="1.5"
          />
          <rect 
            x="7" 
            y="7" 
            width="86" 
            height="36" 
            rx="9" 
            fill="none" 
            stroke="rgba(255,255,255,0.05)" 
            strokeWidth="1"
          />

          {/* Rivets (Screws) */}
          <g>
             <circle cx="12" cy="12" r="2" fill="url(#rivetGradient)" filter="url(#innerGlow)"/>
             <circle cx="12" cy="38" r="2" fill="url(#rivetGradient)" filter="url(#innerGlow)"/>
             <circle cx="88" cy="12" r="2" fill="url(#rivetGradient)" filter="url(#innerGlow)"/>
             <circle cx="88" cy="38" r="2" fill="url(#rivetGradient)" filter="url(#innerGlow)"/>
          </g>

          {/* TEXT "TXT" - Engraved Look */}
          <text 
            x="50" 
            y="34" 
            fontFamily="'Inter', sans-serif" 
            fontSize="26" 
            fontWeight="800" 
            fill="#1E293B" 
            textAnchor="middle"
            letterSpacing="2"
            style={{ 
               textShadow: '0px 1px 0px rgba(255,255,255,0.1)',
               filter: 'drop-shadow(0px -1px 1px rgba(0,0,0,0.8))'
            }}
          >
            TXT
          </text>
        </g>
      </svg>
    </div>
  );
};