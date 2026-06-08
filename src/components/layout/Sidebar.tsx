"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  CalendarRange,
  UploadCloud,
  History,
  CheckCircle2,
  Settings,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Bookings", href: "/bookings", icon: CalendarDays },
  { name: "Patients", href: "/patients", icon: Users },
  { name: "Slot Manager", href: "/slot-manager", icon: CalendarRange },
  { name: "Upload Campaign", href: "/upload-campaign", icon: UploadCloud },
  { name: "Campaign History", href: "/campaign-history", icon: History },
  { name: "Delivery Status", href: "/delivery-status", icon: CheckCircle2 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col hidden md:flex">
      <div className="h-16 flex items-center px-6 bg-slate-950 font-bold text-white text-xl border-b border-slate-800">
        <span className="text-primary mr-2">V</span> Dental CRM
      </div>
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
          Operations
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                isActive
                  ? "bg-primary/20 text-white font-medium border-l-4 border-primary"
                  : "hover:bg-slate-800 hover:text-white border-l-4 border-transparent"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-slate-400")} />
              {item.name}
            </Link>
          );
        })}
      </div>
      <div className="p-4 border-t border-slate-800 text-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
            A
          </div>
          <div>
            <p className="text-white font-medium text-sm">Admin User</p>
            <p className="text-slate-500 text-xs">admin@vdental.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
