import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, Loader2, CheckCircle2 } from 'lucide-react';
import { FileData, UploadStatus } from '../types';
import { CustomFileIcon } from './CustomFileIcon';
import { ProgressBar } from './ProgressBar';

interface UploadCardProps {
  onComplete?: (previewUrl: string) => void;
}

export const UploadCard: React.FC<UploadCardProps> = ({ onComplete }) => {
  const [file, setFile] = useState<FileData | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<UploadStatus>(UploadStatus.IDLE);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-simulate upload on mount to show the UI state immediately
  useEffect(() => {
    if (!file) {
      setFile({
        name: "Project Brief.txt",
        size: 99563,
        type: "text/plain"
      });
      // Generate the TXT preview for the default state
      setPreviewUrl(generateFileVisual("Project Brief.txt", "text/plain"));
      setStatus(UploadStatus.UPLOADING);
    }
  }, []);

  useEffect(() => {
    if (status === UploadStatus.UPLOADING) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus(UploadStatus.COMPLETED);
            if (onComplete) {
              onComplete(previewUrl);
            }
            return 100;
          }
          const increment = Math.random() * 1.5 + 0.5;
          return Math.min(prev + increment, 100);
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [status, onComplete, previewUrl]);

  // --- 3D CARD GENERATOR ENGINE ---
  const generateFileVisual = (fileName: string, fileType: string): string => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    
    let colors = { top: "#64748b", bot: "#334155", accent: "#94a3b8", label: "FILE" }; // Default Gray

    if (fileType.includes("pdf") || ext === "pdf") {
      colors = { top: "#ef4444", bot: "#7f1d1d", accent: "#fca5a5", label: "PDF" }; // Red
    } else if (fileType.includes("sheet") || fileType.includes("excel") || ext === "xlsx" || ext === "xls") {
      colors = { top: "#10b981", bot: "#064e3b", accent: "#6ee7b7", label: "XLS" }; // Green
    } else if (fileType.includes("word") || fileType.includes("document") || ext === "docx" || ext === "doc") {
      colors = { top: "#3b82f6", bot: "#1e3a8a", accent: "#93c5fd", label: "DOC" }; // Blue
    } else if (fileType.includes("text") || ext === "txt") {
      colors = { top: "#94a3b8", bot: "#475569", accent: "#cbd5e1", label: "TXT" }; // Slate
    } else if (fileType.includes("image")) {
       return ""; 
    }

    // High-fidelity SVG Card Design
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250">
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colors.top};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colors.bot};stop-opacity:1" />
          </linearGradient>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
          </pattern>
        </defs>
        
        <rect width="400" height="250" fill="url(#bgGrad)" />
        <rect width="400" height="250" fill="url(#grid)" />
        <path d="M 0 0 L 400 0 L 400 250 Z" fill="rgba(255,255,255,0.05)" />
        
        <g transform="translate(160, 65)">
           <path d="M 10 0 H 50 L 70 20 V 100 C 70 105 65 110 60 110 H 10 C 5 110 0 105 0 100 V 10 C 0 5 5 0 10 0 Z" fill="rgba(255,255,255,0.9)" />
           <path d="M 50 0 V 20 H 70" fill="rgba(0,0,0,0.2)" />
           <rect x="15" y="40" width="40" height="4" rx="2" fill="${colors.top}" opacity="0.5" />
           <rect x="15" y="55" width="40" height="4" rx="2" fill="${colors.bot}" opacity="0.3" />
           <rect x="15" y="70" width="25" height="4" rx="2" fill="${colors.bot}" opacity="0.3" />
        </g>

        <g transform="translate(20, 20)">
           <rect width="60" height="24" rx="4" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.2)" />
           <text x="30" y="17" font-family="Arial, sans-serif" font-weight="bold" font-size="12" fill="white" text-anchor="middle" letter-spacing="1">${colors.label}</text>
        </g>
        
        <text x="200" y="220" font-family="Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.8)" text-anchor="middle">${fileName}</text>
      </svg>
    `;

    return `data:image/svg+xml;base64,${btoa(svgString)}`;
  };

  const processFile = (selectedFile: File) => {
    setFile({
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type
    });

    if (selectedFile.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    } else {
      const svgUrl = generateFileVisual(selectedFile.name, selectedFile.type);
      setPreviewUrl(svgUrl);
    }

    setProgress(0);
    setStatus(UploadStatus.UPLOADING);
  };

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setProgress(0);
    setStatus(UploadStatus.IDLE);
    setPreviewUrl("");
  };

  // --- IDLE STATE (Drag & Drop Zone) ---
  if (!file && status === UploadStatus.IDLE) {
    return (
      <div 
        onClick={triggerFileInput}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="glass-panel w-[440px] h-[340px] rounded-[32px] flex flex-col items-center justify-center cursor-pointer transition-all duration-500 hover:bg-white/[0.03] hover:border-white/20 hover:scale-[1.02] group relative overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] border border-white/[0.05]"
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileSelect} 
        />
        
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-400/0 group-hover:via-blue-500/5 group-hover:to-blue-400/10 transition-all duration-700"></div>

        <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/[0.08] group-hover:border-white/20 transition-all duration-300 relative z-10 shadow-2xl backdrop-blur-md">
          <span className="text-4xl text-white/40 group-hover:text-white transition-colors duration-300 font-light translate-y-[-2px]">+</span>
        </div>
        
        <div className="text-center relative z-10">
          <p className="text-white font-medium text-lg mb-2 tracking-tight">Upload File</p>
          <p className="text-white/40 text-sm font-light tracking-wide">Drag & drop or click to browse</p>
        </div>
      </div>
    );
  }

  // --- UPLOADING / COMPLETED STATE ---
  return (
    <div 
      className="glass-panel w-[520px] p-10 rounded-[48px] relative flex flex-col items-center select-none shadow-[0_30px_60px_-12px_rgba(0,0,0,0.8)] overflow-hidden border border-white/[0.08] backdrop-blur-[50px] bg-gradient-to-b from-white/[0.05] to-transparent"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
       <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.4\'/%3E%3C/svg%3E')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0"></div>
       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none z-0"></div>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileSelect} 
      />

      <button 
        onClick={handleClose}
        className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/[0.03] hover:bg-white/[0.1] border border-white/5 hover:border-white/20 flex items-center justify-center transition-all duration-200 text-white/30 hover:text-white z-20 cursor-pointer group"
      >
        <X size={16} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      <div className="w-full flex flex-col items-center mt-2 relative z-10">
        
        {/* Icon Container with Backlight */}
        <div className="relative mb-8">
           {/* Glow behind icon - Scaled up for the larger icon */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-64 bg-blue-500/20 blur-[70px] rounded-full pointer-events-none" />
           {/* Removed scale-110 since the component is natively larger now */}
           <div className="relative z-10">
            <CustomFileIcon />
           </div>
        </div>

        {/* File Text */}
        <div className="text-center mb-10 w-full px-4">
          <h2 className="text-white text-[26px] font-medium tracking-tight mb-2 truncate drop-shadow-lg font-sans">
            {file?.name}
          </h2>
          <p className="text-blue-200/50 text-xs font-semibold uppercase tracking-[0.2em]">
            {file ? formatSize(file.size) : ''}
          </p>
        </div>

        <div className="w-full bg-[#030406]/60 border border-white/[0.08] rounded-[24px] p-6 shadow-[inset_0_2px_20px_rgba(0,0,0,0.4)] backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-70"></div>

          <div className="flex justify-between items-end mb-5 px-1 relative z-10">
            <div className="flex items-center gap-3">
              {status === UploadStatus.COMPLETED ? (
                  <div className="flex items-center gap-2 animate-in fade-in duration-500">
                     <CheckCircle2 size={18} className="text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                     <span className="text-green-100/90 text-[15px] font-medium tracking-wide">Complete</span>
                  </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <Loader2 size={18} className="animate-spin text-blue-400" />
                  </div>
                  <span className="text-white/60 text-[15px] font-medium tracking-wide">Uploading ...</span>
                </div>
              )}
            </div>
            
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-light text-white tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                {Math.round(progress)}
              </span>
              <span className="text-lg text-white/40 font-light translate-y-[-2px]">%</span>
            </div>
          </div>
          
          <ProgressBar progress={progress} />
        </div>
      </div>
    </div>
  );
};