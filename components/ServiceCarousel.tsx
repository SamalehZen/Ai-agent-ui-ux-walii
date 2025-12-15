import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Utility for class names (simple version since we might not have clsx/tailwind-merge set up)
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

interface ServiceProfile {
  id: number;
  name: string;
  role: string;
  image: string;
  tempId?: string; // Added for the stagger logic unique keys
}

// Base services
const baseServices: ServiceProfile[] = [
  {
    id: 1,
    name: "Visual Analysis",
    role: "OCR Engine Alpha",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Natalie Ramirez",
    role: "Data Extraction Specialist",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Secure Vault",
    role: "Encryption Agent",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop"
  }
];

// Initialize with just the 3 base services
const generateInitialItems = () => {
  return baseServices.map(s => ({ ...s, tempId: Math.random().toString(36).substr(2, 9) }));
};

interface ServiceCardProps {
  position: number;
  service: ServiceProfile;
  handleMove: (steps: number) => void;
  onSelect: (id: number) => void;
  cardWidth: number;
  cardHeight: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  position, 
  service, 
  handleMove, 
  onSelect,
  cardWidth,
  cardHeight
}) => {
  const isCenter = position === 0;
  
  // Logic for handling clicks
  const handleClick = () => {
    if (isCenter) {
      onSelect(service.id);
    } else {
      handleMove(position);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer transition-all duration-700 cubic-bezier(0.25, 0.8, 0.25, 1)",
        "rounded-[40px] overflow-hidden border border-white/10 shadow-2xl",
        isCenter ? "z-30 scale-100" : "z-0 scale-85 opacity-40 hover:opacity-60"
      )}
      style={{
        width: cardWidth,
        height: cardHeight,
        transform: `
          translate(-50%, -50%) 
          translateX(${ (cardWidth / 1.2) * position }px) 
          translateZ(${ -Math.abs(position) * 50 }px)
          rotateY(${ position * -5 }deg)
        `,
        // Center card is solid, others are darker/faded
        filter: isCenter ? 'none' : 'brightness(0.5) blur(1px)',
        zIndex: 50 - Math.abs(position)
      }}
    >
      {/* --- Card Content --- */}
      <div className="relative w-full h-full bg-gray-900">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-700"
          draggable={false}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

        {/* --- PREMIUM SHIMMER EFFECT (Only on Center) --- */}
        {isCenter && (
          <>
            <style>{`
              @keyframes shimmer-luxury {
                0% { background-position: 250% 0; }
                100% { background-position: -150% 0; }
              }
            `}</style>
            <div className="absolute inset-0 pointer-events-none z-20 rounded-[40px] overflow-hidden">
                <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.7)] rounded-[40px]" />
                <div className="absolute inset-0 bg-cyan-500/[0.03] mix-blend-screen rounded-[40px]" />
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{
                    background: `linear-gradient(
                      115deg, 
                      transparent 30%, 
                      rgba(6, 182, 212, 0.08) 45%, 
                      rgba(255, 255, 255, 0.3) 50%, 
                      rgba(6, 182, 212, 0.08) 55%, 
                      transparent 70%
                    )`,
                    backgroundSize: '200% 100%',
                    animation: 'shimmer-luxury 4s infinite linear',
                    filter: 'blur(2px)',
                  }}
                />
                <div className="absolute inset-0 rounded-[40px] border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" />
            </div>
          </>
        )}

        {/* Text Content */}
        <div className="absolute bottom-8 left-0 w-full text-center z-20 px-4 pointer-events-none">
          <h3 className={cn(
            "text-3xl font-bold tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-colors duration-300",
            isCenter ? "text-white" : "text-white/60"
          )}>
            {service.name}
          </h3>
          <p className={cn(
            "text-lg font-light mt-1 tracking-wide drop-shadow-sm transition-colors duration-300",
            isCenter ? "text-blue-200/80" : "text-white/40"
          )}>
            {service.role}
          </p>
        </div>
      </div>
    </div>
  );
};

interface ServiceCarouselProps {
  onSelect: (id: number) => void;
}

export const ServiceCarousel: React.FC<ServiceCarouselProps> = ({ onSelect }) => {
  const [items, setItems] = useState<ServiceProfile[]>(generateInitialItems());
  const [cardWidth, setCardWidth] = useState(320);
  const cardHeight = 400;

  // Stagger Logic: Move items in the array
  const handleMove = useCallback((steps: number) => {
    setItems((prevItems) => {
      const newList = [...prevItems];
      if (steps > 0) {
        // Move forward (shift from start to end)
        for (let i = 0; i < steps; i++) {
          const item = newList.shift();
          if (item) newList.push({ ...item, tempId: Math.random().toString(36).substr(2, 9) });
        }
      } else {
        // Move backward (pop from end to start)
        for (let i = 0; i < Math.abs(steps); i++) {
          const item = newList.pop();
          if (item) newList.unshift({ ...item, tempId: Math.random().toString(36).substr(2, 9) });
        }
      }
      return newList;
    });
  }, []);

  // Responsive sizing
  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardWidth(matches ? 320 : 280);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="relative w-full h-[600px] flex flex-col items-center justify-center select-none overflow-hidden">
      
      {/* Header Text */}
      <div className="mb-16 text-center animate-in fade-in slide-in-from-top-4 duration-700 delay-300 relative z-40">
        <h2 className="text-white text-3xl font-semibold tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">Select Agent</h2>
        <p className="text-blue-100/60 text-sm font-medium mt-2 tracking-wide">Choose a specialized service for your file</p>
      </div>

      {/* Cards Container */}
      <div className="relative w-full max-w-5xl h-[450px] perspective-1000">
        {items.map((item, index) => {
          // Calculate position relative to center
          // With 3 items, length is 3. Math.floor(3/2) = 1.
          // index 0 -> pos -1 (Left)
          // index 1 -> pos 0 (Center)
          // index 2 -> pos 1 (Right)
          const centerIndex = Math.floor(items.length / 2);
          const position = index - centerIndex;
          
          return (
            <ServiceCard
              key={item.tempId}
              position={position}
              service={item}
              handleMove={handleMove}
              onSelect={onSelect}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
            />
          );
        })}
      </div>

      {/* Navigation Controls (Floating Buttons) */}
      <div className="absolute bottom-8 flex gap-6 z-50">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-300 group"
          aria-label="Previous"
        >
          <ChevronLeft className="text-white/60 group-hover:text-white transition-colors" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-300 group"
          aria-label="Next"
        >
          <ChevronRight className="text-white/60 group-hover:text-white transition-colors" />
        </button>
      </div>

    </div>
  );
};