"use client";

import { useState } from "react";
import { Plus, Filter } from "lucide-react";
import { DataTable, Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SearchBar } from "@/components/ui/SearchBar";
import { SlideOver } from "@/components/ui/SlideOver";

type Booking = {
  id: string;
  patientName: string;
  phone: string;
  date: string;
  time: string;
  reason: string;
  status: string;
  notes?: string;
};

const mockBookings: Booking[] = [
  { id: "BKG-1001", patientName: "Rahul Sharma", phone: "+91 9876543210", date: "2026-06-09", time: "10:00 AM", reason: "Root Canal", status: "Confirmed", notes: "Patient requested early morning slot." },
  { id: "BKG-1002", patientName: "Priya Singh", phone: "+91 9876543211", date: "2026-06-09", time: "10:30 AM", reason: "Consultation", status: "Pending" },
  { id: "BKG-1003", patientName: "Amit Kumar", phone: "+91 9876543212", date: "2026-06-09", time: "11:15 AM", reason: "Teeth Whitening", status: "Confirmed" },
  { id: "BKG-1004", patientName: "Sneha Reddy", phone: "+91 9876543213", date: "2026-06-09", time: "12:00 PM", reason: "Dental Implants", status: "Completed", notes: "First stage completed." },
  { id: "BKG-1005", patientName: "Karan Johar", phone: "+91 9876543214", date: "2026-06-10", time: "09:30 AM", reason: "Regular Checkup", status: "Cancelled", notes: "Patient travelling." },
  { id: "BKG-1006", patientName: "Neha Patel", phone: "+91 9876543215", date: "2026-06-10", time: "14:00 PM", reason: "Braces Adjustment", status: "Pending" },
];

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filteredBookings = mockBookings.filter(b => 
    b.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.phone.includes(searchTerm) ||
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: Column<Booking>[] = [
    { header: "Booking ID", accessorKey: "id", className: "font-medium text-slate-900" },
    { header: "Patient Name", accessorKey: "patientName", className: "font-medium" },
    { header: "Phone", accessorKey: "phone" },
    { header: "Date", accessorKey: "date" },
    { header: "Time", accessorKey: "time" },
    { header: "Reason", accessorKey: "reason" },
    { header: "Status", cell: (row) => <StatusBadge status={row.status} /> }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bookings</h1>
          <p className="text-sm text-slate-500">Manage daily appointments and clinic schedule.</p>
        </div>
        <button className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Booking
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <SearchBar 
          placeholder="Search by name, phone or ID..." 
          onChange={setSearchTerm} 
          className="max-w-md"
        />
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select className="w-full appearance-none bg-white border border-slate-200 rounded-lg pl-9 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer">
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <input 
            type="date" 
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          />
        </div>
      </div>

      <DataTable 
        data={filteredBookings} 
        columns={columns} 
        onRowClick={setSelectedBooking}
        pagination={{
          currentPage: 1,
          totalPages: 1,
          onPageChange: () => {}
        }}
      />

      <SlideOver 
        isOpen={!!selectedBooking} 
        onClose={() => setSelectedBooking(null)} 
        title="Booking Details"
      >
        {selectedBooking && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedBooking.patientName}</h3>
                <p className="text-sm text-slate-500">{selectedBooking.id}</p>
              </div>
              <StatusBadge status={selectedBooking.status} className="text-sm px-3 py-1" />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Date</p>
                  <p className="text-sm font-semibold text-slate-900">{selectedBooking.date}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Time</p>
                  <p className="text-sm font-semibold text-slate-900">{selectedBooking.time}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Contact Number</p>
                <p className="text-sm font-semibold text-slate-900">{selectedBooking.phone}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Treatment Reason</p>
                <p className="text-sm font-semibold text-slate-900">{selectedBooking.reason}</p>
              </div>

              <div className="space-y-1 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">Notes</p>
                <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg text-sm text-amber-800">
                  {selectedBooking.notes || "No special notes for this booking."}
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-3">
              <h4 className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">Quick Actions</h4>
              
              {selectedBooking.status === "Pending" && (
                <button className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Confirm Appointment
                </button>
              )}
              
              {selectedBooking.status === "Confirmed" && (
                <button className="w-full bg-success text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Mark as Completed
                </button>
              )}
              
              {!["Cancelled", "Completed"].includes(selectedBooking.status) && (
                <button className="w-full bg-white border border-red-200 text-red-600 py-2.5 rounded-lg font-medium hover:bg-red-50 transition-colors">
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        )}
      </SlideOver>
    </div>
  );
}
