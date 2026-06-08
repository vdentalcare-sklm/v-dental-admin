"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable, Column } from "@/components/ui/DataTable";
import { SearchBar } from "@/components/ui/SearchBar";
import { StatusBadge } from "@/components/ui/StatusBadge";

type Campaign = {
  id: string;
  name: string;
  fileName: string;
  uploadDate: string;
  totalCount: number;
  sentCount: number;
  deliveredCount: number;
  failedCount: number;
  status: string;
};

const mockCampaigns: Campaign[] = [
  { id: "CMP-001", name: "June Root Canal Offers", fileName: "root_canal_june.xlsx", uploadDate: "2026-06-08", totalCount: 500, sentCount: 500, deliveredCount: 480, failedCount: 20, status: "Completed" },
  { id: "CMP-002", name: "Whitening Promo List", fileName: "whitening_promo.csv", uploadDate: "2026-06-07", totalCount: 1200, sentCount: 1200, deliveredCount: 1100, failedCount: 100, status: "Completed" },
  { id: "CMP-003", name: "General Checkup Reminder", fileName: "checkup_reminders.xlsx", uploadDate: "2026-06-09", totalCount: 850, sentCount: 400, deliveredCount: 380, failedCount: 20, status: "Running" },
  { id: "CMP-004", name: "Implant Followups", fileName: "implants_fup.csv", uploadDate: "2026-05-28", totalCount: 150, sentCount: 150, deliveredCount: 0, failedCount: 150, status: "Failed" },
];

export default function CampaignHistoryPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCampaigns = mockCampaigns.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: Column<Campaign>[] = [
    { header: "Campaign Name", accessorKey: "name", className: "font-bold text-slate-900" },
    { header: "File Name", accessorKey: "fileName", className: "text-slate-500" },
    { header: "Upload Date", accessorKey: "uploadDate" },
    { header: "Total", accessorKey: "totalCount", className: "font-medium" },
    { header: "Sent", accessorKey: "sentCount", className: "text-blue-600 font-medium" },
    { header: "Delivered", accessorKey: "deliveredCount", className: "text-success font-medium" },
    { header: "Failed", accessorKey: "failedCount", className: "text-red-600 font-medium" },
    { header: "Status", cell: (row) => <StatusBadge status={row.status} /> }
  ];

  const handleRowClick = (campaign: Campaign) => {
    // Navigate to delivery status page for this campaign
    router.push(`/delivery-status?campaign=${campaign.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Campaign History</h1>
          <p className="text-sm text-slate-500">View performance and delivery stats of past WhatsApp campaigns.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <SearchBar 
          placeholder="Search by campaign name or file..." 
          onChange={setSearchTerm} 
          className="max-w-md"
        />
        <div className="flex gap-2 w-full sm:w-auto">
          <input 
            type="date" 
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          />
        </div>
      </div>

      <DataTable 
        data={filteredCampaigns} 
        columns={columns} 
        onRowClick={handleRowClick}
        pagination={{
          currentPage: 1,
          totalPages: 1,
          onPageChange: () => {}
        }}
      />
    </div>
  );
}
