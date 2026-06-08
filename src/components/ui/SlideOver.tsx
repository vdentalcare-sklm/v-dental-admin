import React from "react";
import { X } from "lucide-react";

interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function SlideOver({ isOpen, onClose, title, children }: SlideOverProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 max-w-md w-full flex">
        <div className="w-full bg-white shadow-2xl flex flex-col transform transition-transform">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
