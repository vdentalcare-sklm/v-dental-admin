"use client";

import { Users, Calendar, Activity, MessageSquare, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { DataTable, Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const stats = [
  { name: "Today's Appointments", value: "24", change: "+4", trend: "up", icon: Calendar, color: "text-blue-600", bg: "bg-blue-100" },
  { name: "Pending Appointments", value: "12", change: "-2", trend: "down", icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
  { name: "Completed Appointments", value: "156", change: "+12%", trend: "up", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100" },
  { name: "Total Patients", value: "3,205", change: "+85", trend: "up", icon: Users, color: "text-indigo-600", bg: "bg-indigo-100" },
  { name: "Active Campaigns", value: "3", change: "0", trend: "neutral", icon: Activity, color: "text-purple-600", bg: "bg-purple-100" },
  { name: "Messages Delivered", value: "12.5k", change: "+2.1k", trend: "up", icon: MessageSquare, color: "text-success", bg: "bg-success/20" },
];

const upcomingAppointments = [
  { id: "A-101", patient: "Rahul Sharma", time: "10:00 AM", treatment: "Root Canal", status: "Confirmed" },
  { id: "A-102", patient: "Priya Singh", time: "10:30 AM", treatment: "Consultation", status: "Pending" },
  { id: "A-103", patient: "Amit Kumar", time: "11:15 AM", treatment: "Teeth Whitening", status: "Confirmed" },
  { id: "A-104", patient: "Sneha Reddy", time: "12:00 PM", treatment: "Dental Implants", status: "Confirmed" },
];

const recentPatients = [
  { name: "Vikram Das", phone: "+91 9876543210", lastVisit: "2026-06-08", totalVisits: 5 },
  { name: "Anjali Gupta", phone: "+91 9876543211", lastVisit: "2026-06-07", totalVisits: 2 },
  { name: "Rohan Verma", phone: "+91 9876543212", lastVisit: "2026-06-05", totalVisits: 12 },
  { name: "Neha Patel", phone: "+91 9876543213", lastVisit: "2026-06-01", totalVisits: 1 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clinic Dashboard</h1>
          <p className="text-sm text-slate-500">Overview of operations, CRM, and outreach.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center shrink-0`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-500">{stat.name}</p>
              <div className="flex items-end gap-2 mt-1">
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                {stat.trend !== "neutral" && (
                  <span className={`flex items-center text-xs font-medium mb-1 ${
                    stat.trend === "up" ? "text-emerald-600" : "text-amber-600"
                  }`}>
                    {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <h2 className="font-bold text-slate-900">Upcoming Appointments</h2>
            <button className="text-sm text-primary font-medium hover:underline">View All</button>
          </div>
          <div className="p-0 flex-1">
            <DataTable 
              data={upcomingAppointments}
              columns={[
                { header: "Time", accessorKey: "time", className: "font-medium text-slate-900" },
                { header: "Patient", accessorKey: "patient" },
                { header: "Treatment", accessorKey: "treatment" },
                { header: "Status", cell: (row) => <StatusBadge status={row.status} /> }
              ]}
              className="border-0 shadow-none rounded-none"
            />
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <h2 className="font-bold text-slate-900">Recently Active Patients</h2>
            <button className="text-sm text-primary font-medium hover:underline">View All</button>
          </div>
          <div className="p-0 flex-1">
            <DataTable 
              data={recentPatients}
              columns={[
                { header: "Name", accessorKey: "name", className: "font-medium text-slate-900" },
                { header: "Phone", accessorKey: "phone" },
                { header: "Last Visit", accessorKey: "lastVisit" },
                { header: "Visits", accessorKey: "totalVisits" }
              ]}
              className="border-0 shadow-none rounded-none"
            />
          </div>
        </div>
      </div>

      {/* Campaign Performance Summary */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="font-bold text-slate-900 mb-6">WhatsApp Campaign Performance</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3 space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">Delivery Rate</span>
                <span className="font-bold text-emerald-600">92%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">Open Rate (Est.)</span>
                <span className="font-bold text-blue-600">68%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "68%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">Failure Rate</span>
                <span className="font-bold text-red-600">8%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: "8%" }}></div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border border-slate-200 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Total Sent</p>
              <p className="text-xl font-bold text-slate-900">14,250</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 text-center bg-emerald-50">
              <p className="text-xs text-emerald-700 font-medium uppercase tracking-wider mb-1">Delivered</p>
              <p className="text-xl font-bold text-emerald-700">13,110</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 text-center bg-red-50">
              <p className="text-xs text-red-700 font-medium uppercase tracking-wider mb-1">Failed</p>
              <p className="text-xl font-bold text-red-700">1,140</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 text-center bg-amber-50">
              <p className="text-xs text-amber-700 font-medium uppercase tracking-wider mb-1">Pending</p>
              <p className="text-xl font-bold text-amber-700">0</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
