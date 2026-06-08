"use client";

import { useState } from "react";
import { FileDropzone } from "@/components/ui/FileDropzone";
import { DataTable, Column } from "@/components/ui/DataTable";
import { CheckCircle2, AlertTriangle, FileSpreadsheet, Send } from "lucide-react";

type PreviewRow = {
  id: number;
  name: string;
  phone: string;
  disease: string;
  isValid: boolean;
  error?: string;
};

const mockPreview: PreviewRow[] = [
  { id: 1, name: "Rahul Sharma", phone: "+91 9876543210", disease: "Root Canal", isValid: true },
  { id: 2, name: "Priya Singh", phone: "9876543211", disease: "Teeth Whitening", isValid: true },
  { id: 3, name: "Amit Kumar", phone: "", disease: "Consultation", isValid: false, error: "Missing Phone" },
  { id: 4, name: "Sneha Reddy", phone: "+91 9876543213", disease: "Implants", isValid: true },
  { id: 5, name: "Invalid User", phone: "123", disease: "Checkup", isValid: false, error: "Invalid Phone" },
];

export default function UploadCampaignPage() {
  const [hasFile, setHasFile] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrop = (files: FileList | null) => {
    if (files && files.length > 0) {
      setIsUploading(true);
      // Simulate file parsing delay
      setTimeout(() => {
        setIsUploading(false);
        setHasFile(true);
      }, 1500);
    }
  };

  const columns: Column<PreviewRow>[] = [
    { header: "Patient Name", accessorKey: "name", className: "font-medium text-slate-900" },
    { header: "Phone Number", accessorKey: "phone", cell: (row) => (
      <span className={row.isValid ? "" : "text-red-600 font-medium"}>
        {row.phone || "—"}
      </span>
    )},
    { header: "Disease / Treatment", accessorKey: "disease" },
    { header: "Validation", cell: (row) => (
      row.isValid ? (
        <span className="flex items-center gap-1.5 text-xs font-bold text-success bg-success/10 px-2 py-1 rounded w-fit">
          <CheckCircle2 className="w-3 h-3" /> Valid
        </span>
      ) : (
        <span className="flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded w-fit">
          <AlertTriangle className="w-3 h-3" /> {row.error}
        </span>
      )
    )}
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Upload Campaign</h1>
          <p className="text-sm text-slate-500">Upload Excel/CSV files to start a new WhatsApp outreach campaign.</p>
        </div>
      </div>

      {!hasFile ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          <FileDropzone 
            accept=".xlsx,.csv" 
            onDrop={handleDrop} 
            className="py-16"
          />
          {isUploading && (
            <div className="text-center mt-6 flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin mb-3"></div>
              <p className="text-sm font-medium text-slate-600">Parsing file data...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Records</p>
                <h3 className="text-2xl font-bold text-slate-900">5</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Valid Records</p>
                <h3 className="text-2xl font-bold text-slate-900">3</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Invalid Records</p>
                <h3 className="text-2xl font-bold text-red-600">2</h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h2 className="font-bold text-slate-900">Data Preview</h2>
              <button 
                onClick={() => setHasFile(false)}
                className="text-sm text-red-600 font-medium hover:underline"
              >
                Cancel & Remove File
              </button>
            </div>
            <div className="p-0 flex-1">
              <DataTable 
                data={mockPreview}
                columns={columns}
                className="border-0 shadow-none rounded-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg transition-colors flex items-center gap-2 shadow-sm">
              <Send className="w-5 h-5" />
              Confirm & Queue Campaign
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
