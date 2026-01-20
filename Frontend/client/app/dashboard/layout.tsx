"use client";
import Header from "@/src/components/Header";
import Sidebar from "@/src/components/Sidebar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Sidebar (Passed open state) */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* 2. Header (Passed toggle function) */}
      <Header onMenuClick={toggleSidebar} />

      {/* 3. Main Content Area */}
      {/* - Mobile: pl-0 (Full width), pt-16 (Header height)
          - Desktop (md): pl-64 (Sidebar width) 
      */}
      <main className="pl-0 md:pl-64 pt-16 min-h-screen transition-all duration-300">
        <div className="p-4 md:p-8">{children}</div>
      </main>

      {/* Mobile Overlay (Backdrop) - Only visible when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
        />
      )}
    </div>
  );
}
