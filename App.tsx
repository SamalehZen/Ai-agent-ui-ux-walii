import React, { useState } from 'react';
import { UploadCard } from './components/UploadCard';
import { ScannerCardStream } from './components/ui/ScannerCardStream';
import { ServiceCarousel } from './components/ServiceCarousel';

type AppStep = 'upload' | 'selection' | 'processing';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('upload');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleUploadComplete = (previewUrl: string) => {
    setUploadedImageUrl(previewUrl);
    // Slight delay to show the "Completed" checkmark
    setTimeout(() => {
      setStep('selection');
    }, 1200);
  };

  const handleServiceSelect = () => {
    setStep('processing');
  };
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center font-sans bg-black text-white transition-colors duration-1000">
      
      {/* --- Ambient Background Effects (Permanent Dark Mode) --- */}
      <div className="fixed inset-0 pointer-events-none">
        {/* 1. Deep Space Gradient Top */}
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#0B1026] to-transparent opacity-60"></div>

        {/* 2. THE BLUE HORIZON */}
        <div className="absolute top-[58%] left-1/2 -translate-x-1/2">
          <div className="w-[140vw] h-[140vw] rounded-full bg-black relative shadow-[0_-40px_180px_-20px_rgba(30,64,175,0.6)]">
            <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-blue-600/20 blur-[80px] rounded-full mix-blend-screen"></div>
            <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 w-[60%] h-[120px] bg-cyan-500/10 blur-[60px] rounded-full mix-blend-screen"></div>
          </div>
        </div>

        {/* 3. Side Ambient Spotlights */}
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-blue-900/10 blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-indigo-900/10 blur-[120px]"></div>
      </div>


      {/* --- UI Layer --- */}
      <div className="relative z-10 w-full max-w-7xl h-screen flex flex-col justify-between p-8 md:p-12">
        
        {/* Header */}
        <header className="flex justify-between items-start w-full relative z-20 transition-opacity duration-500">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-lg transition-transform hover:scale-105 cursor-default group hover:border-white/20">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60 group-hover:text-blue-400 transition-colors">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span className="text-sm font-medium text-white/80 tracking-wide group-hover:text-white transition-colors">Daily Design Challenge</span>
          </div>
          <div className="px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-lg">
            <span className="text-sm font-medium text-white/80 tracking-wide">Day 17 / 23</span>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col items-center justify-center relative w-full">
          
          {/* Top Down Spotlight (Unified) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80%] w-[600px] h-[400px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none -z-10"></div>
          
          {step === 'upload' && (
             <div className="animate-in fade-in zoom-in-95 duration-700">
               <UploadCard onComplete={handleUploadComplete} />
             </div>
          )}

          {step === 'selection' && (
            <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 w-full h-full flex items-center justify-center">
              <ServiceCarousel onSelect={handleServiceSelect} />
            </div>
          )}

          {step === 'processing' && uploadedImageUrl && (
             <div className="absolute inset-0 w-full h-full animate-in fade-in zoom-in-95 duration-1000">
                <ScannerCardStream 
                  cardImages={[uploadedImageUrl]}
                  initialSpeed={100}
                  repeat={4}
                />
                
                {/* Overlay Text for Processing State */}
                <div className="absolute bottom-20 left-0 w-full text-center z-50 pointer-events-none">
                  <p className="text-white/50 text-sm tracking-[0.3em] font-light uppercase animate-pulse">Processing Document</p>
                </div>
             </div>
          )}
        </main>

        {/* Footer */}
        <footer className="w-full flex justify-center pb-8 relative z-20">
          <div className="flex items-center gap-3 group cursor-pointer transition-all hover:scale-105">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-600 to-gray-800 p-[1.5px] shadow-lg overflow-hidden relative group-hover:from-blue-500 group-hover:to-cyan-400 transition-colors duration-500">
               <div className="w-full h-full rounded-full overflow-hidden bg-black">
                <img 
                  src="https://picsum.photos/100/100" 
                  alt="User" 
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                />
               </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm font-semibold tracking-wide group-hover:text-blue-300 transition-colors">@mhmoradi</span>
              <span className="text-white/40 text-xs font-medium group-hover:text-white/60 transition-colors">Product Designer</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;