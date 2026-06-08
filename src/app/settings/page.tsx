"use client";

import { useState } from "react";
import { Save, MapPin, Phone, Mail, Globe, MessageCircle, Camera, Video, Image as ImageIcon, Bell, Moon } from "lucide-react";

const TABS = [
  "Clinic Information",
  "Branches",
  "Social Links",
  "Website Settings",
  "Admin Preferences"
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Clinic Information");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Platform Settings</h1>
          <p className="text-sm text-slate-500">Manage clinic operations, branding, and preferences.</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2 shadow-sm">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-left text-sm font-medium transition-all duration-200 border-l-4 ${
                  activeTab === tab
                    ? "border-primary bg-gradient-to-r from-primary/10 to-transparent text-primary shadow-[inset_4px_0_0_var(--color-primary)] shadow-primary/5"
                    : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          {activeTab === "Clinic Information" && (
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Clinic Information</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Clinic Name</label>
                  <input type="text" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" defaultValue="V Dental Care" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Primary Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="tel" className="w-full border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" defaultValue="+91 9876543210" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="email" className="w-full border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" defaultValue="contact@vdentalcare.com" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Headquarters Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <textarea rows={3} className="w-full border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" defaultValue="12-34, Main Road, Visakhapatnam, Andhra Pradesh 530001"></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Branches" && (
            <div className="space-y-8">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Branch Locations</h2>
              
              {['Srikakulam', 'Vizianagaram', 'Visakhapatnam'].map((branch) => (
                <div key={branch} className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-4">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {branch}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Address</label>
                      <input type="text" className="w-full border border-slate-200 bg-white rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder={`${branch} address...`} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Contact Number</label>
                      <input type="tel" className="w-full border border-slate-200 bg-white rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Branch phone..." />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Social Links" && (
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Social Media Links</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Instagram</label>
                  <div className="relative">
                    <Camera className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E4405F]" />
                    <input type="url" className="w-full border border-slate-200 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary outline-none" placeholder="https://instagram.com/vdentalcare" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Facebook</label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1877F2]" />
                    <input type="url" className="w-full border border-slate-200 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary outline-none" placeholder="https://facebook.com/vdentalcare" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">YouTube</label>
                  <div className="relative">
                    <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF0000]" />
                    <input type="url" className="w-full border border-slate-200 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary outline-none" placeholder="https://youtube.com/c/vdentalcare" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Website Settings" && (
            <div className="space-y-8 max-w-3xl">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Website Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Logo Upload</label>
                    <p className="text-xs text-slate-500">Primary logo used across the platform.</p>
                  </div>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 cursor-pointer bg-slate-50/50 aspect-video">
                    <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-sm font-medium text-slate-700">Upload Logo</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Favicon Upload</label>
                    <p className="text-xs text-slate-500">Small icon for browser tabs.</p>
                  </div>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 cursor-pointer bg-slate-50/50 aspect-square w-32 mx-auto">
                    <Globe className="w-6 h-6 text-slate-400 mb-2" />
                    <span className="text-xs font-medium text-slate-700">Upload Icon</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Admin Preferences" && (
            <div className="space-y-8 max-w-2xl">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Admin Preferences</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <Moon className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Dark Theme</h4>
                      <p className="text-sm text-slate-500">Enable dark mode for the dashboard.</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <Bell className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Email Notifications</h4>
                      <p className="text-sm text-slate-500">Receive daily summary reports via email.</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
