"use client";

import { useState } from "react";
import { User, Phone, MapPin, Calendar, Clock, Activity } from "lucide-react";
import { DataTable, Column } from "@/components/ui/DataTable";
import { SearchBar } from "@/components/ui/SearchBar";
import { SlideOver } from "@/components/ui/SlideOver";
import { StatusBadge } from "@/components/ui/StatusBadge";

type Patient = {
  id: string;
  name: string;
  phone: string;
  age: number;
  gender: string;
  totalVisits: number;
  lastVisit: string;
  address?: string;
  medicalHistory?: string[];
};

const mockPatients: Patient[] = [
  { id: "PT-001", name: "Vikram Das", phone: "+91 9876543210", age: 34, gender: "Male", totalVisits: 5, lastVisit: "2026-06-08", address: "123, Main St, Visakhapatnam", medicalHistory: ["Diabetes Type 2"] },
  { id: "PT-002", name: "Anjali Gupta", phone: "+91 9876543211", age: 28, gender: "Female", totalVisits: 2, lastVisit: "2026-06-07" },
  { id: "PT-003", name: "Rohan Verma", phone: "+91 9876543212", age: 45, gender: "Male", totalVisits: 12, lastVisit: "2026-06-05", address: "45/A, Park Road, Srikakulam", medicalHistory: ["Hypertension"] },
  { id: "PT-004", name: "Neha Patel", phone: "+91 9876543213", age: 22, gender: "Female", totalVisits: 1, lastVisit: "2026-06-01" },
  { id: "PT-005", name: "Amit Kumar", phone: "+91 9876543214", age: 52, gender: "Male", totalVisits: 8, lastVisit: "2026-05-15", medicalHistory: ["Asthma"] },
];

const mockTimeline = [
  { date: "2026-06-08", time: "10:00 AM", type: "Root Canal - Session 2", status: "Completed", doctor: "Dr. Sharma" },
  { date: "2026-05-20", time: "11:30 AM", type: "Root Canal - Session 1", status: "Completed", doctor: "Dr. Sharma" },
  { date: "2026-05-02", time: "09:00 AM", type: "Initial Consultation", status: "Completed", doctor: "Dr. Verma" },
];

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filteredPatients = mockPatients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm)
  );

  const columns: Column<Patient>[] = [
    { header: "Patient Name", accessorKey: "name", className: "font-medium text-slate-900 flex items-center gap-2", cell: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
          {row.name.charAt(0)}
        </div>
        <span>{row.name}</span>
      </div>
    )},
    { header: "Phone", accessorKey: "phone" },
    { header: "Age", accessorKey: "age" },
    { header: "Gender", accessorKey: "gender" },
    { header: "Total Visits", accessorKey: "totalVisits" },
    { header: "Last Visit", accessorKey: "lastVisit" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient CRM</h1>
          <p className="text-sm text-slate-500">Manage patient profiles and medical history.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <SearchBar 
          placeholder="Search patients by name or phone..." 
          onChange={setSearchTerm} 
          className="max-w-xl"
        />
      </div>

      <DataTable 
        data={filteredPatients} 
        columns={columns} 
        onRowClick={setSelectedPatient}
        pagination={{
          currentPage: 1,
          totalPages: 1,
          onPageChange: () => {}
        }}
      />

      <SlideOver 
        isOpen={!!selectedPatient} 
        onClose={() => setSelectedPatient(null)} 
        title="Patient Profile"
      >
        {selectedPatient && (
          <div className="space-y-8">
            {/* Header / Basic Details */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold shadow-md">
                {selectedPatient.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedPatient.name}</h3>
                <p className="text-sm text-slate-500">{selectedPatient.id}</p>
                <div className="flex gap-4 mt-2">
                  <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{selectedPatient.age} years</span>
                  <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{selectedPatient.gender}</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-700">{selectedPatient.phone}</span>
              </div>
              {selectedPatient.address && (
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">{selectedPatient.address}</span>
                </div>
              )}
              {selectedPatient.medicalHistory && (
                <div className="flex items-center gap-3 text-sm">
                  <Activity className="w-4 h-4 text-amber-500" />
                  <span className="text-amber-700 font-medium">Alert: {selectedPatient.medicalHistory.join(", ")}</span>
                </div>
              )}
            </div>

            {/* Upcoming Appointment */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Upcoming Appointment</h4>
              <div className="border border-primary/20 bg-primary/5 rounded-xl p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">June 15, 2026</p>
                    <p className="text-xs font-medium text-slate-500">10:30 AM - Review</p>
                  </div>
                </div>
                <StatusBadge status="Confirmed" />
              </div>
            </div>

            {/* Timeline View */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Appointment History</h4>
              <div className="relative pl-4 space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                {mockTimeline.map((item, index) => (
                  <div key={index} className="relative flex items-start gap-4">
                    <div className="absolute left-0 w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shadow-[0_0_0_4px_white]"></div>
                    <div className="ml-6 bg-white border border-slate-200 rounded-lg p-4 w-full shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-bold text-slate-900">{item.type}</p>
                        <span className="text-xs font-medium text-slate-500">{item.date}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.time}</span>
                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {item.doctor}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </SlideOver>
    </div>
  );
}
