import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="relative w-full">
      {/* Track - very dark to blend with container */}
      <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
        
        {/* Fill - Bright White with Gradient */}
        <div 
          className="h-full bg-gradient-to-r from-white/80 via-white to-white transition-all duration-300 ease-out rounded-full relative shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          style={{ width: `${progress}%` }}
        >
          {/* Leading Edge Glow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 bg-white blur-[10px] opacity-40 rounded-full pointer-events-none" />
        </div>
      </div>
    </div>
  );
};