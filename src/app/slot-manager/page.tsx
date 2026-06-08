"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Plus, Trash2, CalendarOff } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";

type Slot = {
  id: string;
  time: string;
  status: "Available" | "Booked" | "Blocked";
};

const mockSlots: Slot[] = [
  { id: "1", time: "09:00 AM", status: "Available" },
  { id: "2", time: "09:30 AM", status: "Booked" },
  { id: "3", time: "10:00 AM", status: "Booked" },
  { id: "4", time: "10:30 AM", status: "Available" },
  { id: "5", time: "11:00 AM", status: "Blocked" },
  { id: "6", time: "11:30 AM", status: "Available" },
  { id: "7", time: "12:00 PM", status: "Available" },
  { id: "8", time: "14:00 PM", status: "Booked" },
  { id: "9", time: "14:30 PM", status: "Available" },
];

export default function SlotManagerPage() {
  const [selectedDate, setSelectedDate] = useState("2026-06-09");
  const [slots, setSlots] = useState<Slot[]>(mockSlots);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Slot Manager</h1>
          <p className="text-sm text-slate-500">Control clinic availability and generate appointment slots.</p>
        </div>
        <button className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <CalendarOff className="w-4 h-4" />
          Mark Day Off
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Generate Slots Form */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-fit">
          <h2 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            Generate Slots
          </h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Date</label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Start Time</label>
                <input 
                  type="time" 
                  defaultValue="09:00"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">End Time</label>
                <input 
                  type="time" 
                  defaultValue="17:00"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Slot Duration</label>
              <select className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white">
                <option value="15">15 Minutes</option>
                <option value="30" selected>30 Minutes</option>
                <option value="45">45 Minutes</option>
                <option value="60">60 Minutes</option>
              </select>
            </div>

            <button className="w-full bg-primary hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors mt-2">
              Generate Slots
            </button>
          </div>
        </div>

        {/* Display Slots */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-slate-900">Slots for {selectedDate}</h2>
            <button className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              <Plus className="w-4 h-4" /> Add Single Slot
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {slots.map((slot) => (
              <div 
                key={slot.id} 
                className={`relative group border rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all ${
                  slot.status === "Booked" ? "bg-slate-50 border-slate-200 opacity-60" :
                  slot.status === "Blocked" ? "bg-red-50/50 border-red-200" :
                  "bg-white border-slate-200 hover:border-primary hover:shadow-md cursor-pointer"
                }`}
              >
                {slot.status !== "Booked" && (
                  <button className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                
                <Clock className={`w-5 h-5 mb-2 ${
                  slot.status === "Booked" ? "text-slate-400" :
                  slot.status === "Blocked" ? "text-red-400" :
                  "text-primary"
                }`} />
                <span className={`text-sm font-bold ${slot.status === "Booked" ? "text-slate-500" : "text-slate-900"}`}>
                  {slot.time}
                </span>
                <span className={`text-[10px] uppercase tracking-wider font-bold mt-1 ${
                  slot.status === "Available" ? "text-emerald-600" :
                  slot.status === "Booked" ? "text-slate-500" :
                  "text-red-600"
                }`}>
                  {slot.status}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
