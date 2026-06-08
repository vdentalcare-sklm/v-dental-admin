import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalized = status.toLowerCase();
  
  let styles = "bg-slate-100 text-slate-600 border-slate-200"; // default gray
  
  if (["confirmed", "completed", "delivered", "success"].includes(normalized)) {
    styles = "bg-success/10 text-success border-success/20";
  } else if (["pending", "running"].includes(normalized)) {
    styles = "bg-amber-100 text-amber-700 border-amber-200";
  } else if (["cancelled", "failed", "blocked", "invalid"].includes(normalized)) {
    styles = "bg-red-100 text-red-700 border-red-200";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        styles,
        className
      )}
    >
      {status}
    </span>
  );
}
