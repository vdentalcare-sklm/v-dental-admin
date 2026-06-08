"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";
import { DataTable, Column } from "@/components/ui/DataTable";
import { SearchBar } from "@/components/ui/SearchBar";
import { StatusBadge } from "@/components/ui/StatusBadge";

type DeliveryRecord = {
  id: string;
  patientName: string;
  phone: string;
  disease: string;
  status: string;
  timestamp: string;
};

const mockRecords: DeliveryRecord[] = [
  { id: "1", patientName: "Rahul Sharma", phone: "+91 9876543210", disease: "Root Canal", status: "Delivered", timestamp: "2026-06-08 10:15 AM" },
  { id: "2", patientName: "Priya Singh", phone: "+91 9876543211", disease: "Teeth Whitening", status: "Sent", timestamp: "2026-06-08 10:15 AM" },
  { id: "3", patientName: "Amit Kumar", phone: "+91 9876543212", disease: "Consultation", status: "Failed", timestamp: "2026-06-08 10:15 AM" },
  { id: "4", patientName: "Sneha Reddy", phone: "+91 9876543213", disease: "Implants", status: "Pending", timestamp: "2026-06-08 10:16 AM" },
  { id: "5", patientName: "Karan Johar", phone: "+91 9876543214", disease: "Regular Checkup", status: "Delivered", timestamp: "2026-06-08 10:12 AM" },
];

export default function DeliveryStatusPage() {
  const [searchTerm, setSearchTerm] = useState("");
  // In a real app we would use searchParams to fetch specific campaign data
  
  const filteredRecords = mockRecords.filter(r => 
    r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.phone.includes(searchTerm)
  );

  const columns: Column<DeliveryRecord>[] = [
    { header: "Patient Name", accessorKey: "patientName", className: "font-medium text-slate-900" },
    { header: "Phone Number", accessorKey: "phone" },
    { header: "Disease / Treatment", accessorKey: "disease" },
    { header: "Sent Timestamp", accessorKey: "timestamp", className: "text-slate-500" },
    { header: "Delivery Status", cell: (row) => <StatusBadge status={row.status} /> }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Delivery Status Monitoring</h1>
          <p className="text-sm text-slate-500">Detailed WhatsApp message delivery tracking per patient.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <SearchBar 
          placeholder="Search by name or phone number..." 
          onChange={setSearchTerm} 
          className="max-w-md"
        />
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select className="w-full appearance-none bg-white border border-slate-200 rounded-lg pl-9 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer">
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="sent">Sent</option>
              <option value="delivered">Delivered</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <input 
            type="date" 
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          />
        </div>
      </div>

      <DataTable 
        data={filteredRecords} 
        columns={columns} 
        pagination={{
          currentPage: 1,
          totalPages: 1,
          onPageChange: () => {}
        }}
      />
    </div>
  );
}
