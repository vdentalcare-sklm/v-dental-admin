import React from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileDropzoneProps {
  onDrop?: (files: FileList | null) => void;
  accept?: string;
  className?: string;
}

export function FileDropzone({ onDrop, accept, className }: FileDropzoneProps) {
  const [isDragActive, setIsDragActive] = React.useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onDrop?.(e.dataTransfer.files);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-colors cursor-pointer",
        isDragActive 
          ? "border-primary bg-primary/5" 
          : "border-slate-300 bg-slate-50 hover:bg-slate-100",
        className
      )}
    >
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
        <UploadCloud className={cn("w-8 h-8", isDragActive ? "text-primary" : "text-slate-400")} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">
        {isDragActive ? "Drop files now" : "Drag & Drop files here"}
      </h3>
      <p className="text-sm text-slate-500 mb-4">or click to browse files from your computer</p>
      {accept && (
        <span className="text-xs font-medium text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200">
          Supported formats: {accept}
        </span>
      )}
      <input type="file" accept={accept} className="hidden" />
    </div>
  );
}
