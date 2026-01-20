// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   CheckSquare,
//   PlusCircle,
//   User,
//   LogOut,
//   X,
// } from "lucide-react";
// import { useRouter } from "next/navigation";

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function Sidebar({ isOpen, onClose }: SidebarProps) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     router.push("/login");
//   };

//   const navItems = [
//     { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
//     { name: "My Tasks", href: "/dashboard/my-tasks", icon: CheckSquare },
//     { name: "Create Task", href: "/dashboard/create-task", icon: PlusCircle },
//     { name: "Profile", href: "/dashboard/profile", icon: User },
//   ];

//   return (
//     <>
//       <aside
//         className={`
//           fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0
//         `}
//       >
//         {/* Logo Area */}
//         <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
//           <div className="flex items-center">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
//               <span className="text-white font-bold text-lg">T</span>
//             </div>
//             <span className="text-xl font-bold text-gray-800">TaskMaster</span>
//           </div>

//           {/* Close Button (Mobile Only) */}
//           <button onClick={onClose} className="md:hidden text-gray-500">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex-1 px-4 py-6 space-y-2">
//           {navItems.map((item) => {
//             const isActive = pathname === item.href;
//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={onClose} // Auto-close on mobile when link clicked
//                 className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
//                   isActive
//                     ? "bg-blue-50 text-blue-600 font-medium"
//                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                 }`}
//               >
//                 <item.icon
//                   className={`w-5 h-5 mr-3 ${isActive ? "text-blue-600" : "text-gray-400"}`}
//                 />
//                 {item.name}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Logout Button */}
//         <div className="p-4 border-t border-gray-200">
//           <button
//             onClick={handleLogout}
//             className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//           >
//             <LogOut className="w-5 h-5 mr-3" />
//             Logout
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  PlusCircle,
  User,
  LogOut,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/src/utils/api"; // Import your Axios instance

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 1. Call Backend to delete the HttpOnly Cookie
      await api.post("/auth/logout");
      console.log("Server session cleared");
    } catch (error) {
      // Even if server fails (e.g., network error), we still want to log the user out locally
      console.error("Logout error:", error);
    } finally {
      // 2. Clear Local Storage (Access Token & User Data)
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // 3. Redirect to Login
      router.push("/login");
    }
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Tasks", href: "/dashboard/my-tasks", icon: CheckSquare },
    { name: "Create Task", href: "/dashboard/create-task", icon: PlusCircle },
  ];

  return (
    <>
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 
        `}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-gray-800">TaskMaster</span>
          </div>

          {/* Close Button (Mobile Only) */}
          <button onClick={onClose} className="md:hidden text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose} // Auto-close on mobile when link clicked
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 mr-3 ${isActive ? "text-blue-600" : "text-gray-400"}`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
