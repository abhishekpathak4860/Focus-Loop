"use client";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react"; // Import Menu Icon

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-0 md:left-64 z-10 flex items-center justify-between px-4 md:px-8 transition-all duration-300">
      <div className="flex items-center gap-3">
        {/* HAMBURGER MENU (Mobile Only) */}
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-md md:hidden"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        {/* Page Title */}
        <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
      </div>

      {/* User Profile Section */}
      <div className="flex items-center">
        <div className="text-right mr-4 hidden sm:block">
          <p className="text-sm font-medium text-gray-900">
            {user?.name || "Guest User"}
          </p>
          <p className="text-xs text-gray-500">{user?.email || "No email"}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 text-blue-600 font-bold">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
      </div>
    </header>
  );
}
