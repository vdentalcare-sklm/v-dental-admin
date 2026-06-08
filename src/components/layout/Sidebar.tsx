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
    <aside className="w-64 bg-white border-r border-slate-200 text-slate-600 min-h-screen flex flex-col hidden md:flex shadow-sm">
      <div className="h-16 flex items-center px-6 bg-white border-b border-slate-200">
        <img src="/logo.png" alt="V Dental CRM" className="h-8 w-auto object-contain" />
      </div>
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">
          Operations
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary font-semibold shadow-[inset_4px_0_0_var(--color-primary)] shadow-primary/5"
                  : "hover:bg-slate-50 hover:text-primary hover:shadow-[inset_4px_0_0_var(--color-slate-200)]"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-primary" : "text-slate-400 group-hover:text-primary")} />
              {item.name}
            </Link>
          );
        })}
      </div>
      <div className="p-4 border-t border-slate-200 text-sm bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
            A
          </div>
          <div>
            <p className="text-slate-900 font-semibold text-sm">Admin User</p>
            <p className="text-slate-500 text-xs">admin@vdental.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
