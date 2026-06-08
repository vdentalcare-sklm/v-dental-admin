import React from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-12 bg-slate-50 rounded-xl border border-dashed border-slate-200", className)}>
      {icon && (
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
