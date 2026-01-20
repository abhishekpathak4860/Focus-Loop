"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  Plus,
  Calendar,
  Activity,
} from "lucide-react";
import api from "@/src/utils/api";

interface Task {
  id: number;
  title: string;
  status: "PENDING" | "COMPLETED";
  createdAt: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Stats State
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
  });

  // Recent Tasks State
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);

  useEffect(() => {
    // 1. Get User Info
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));

    // 2. Fetch Tasks & Calculate Stats
    const fetchData = async () => {
      try {
        // Fetching with a high limit to calculate stats client-side as requested
        // In a real large-scale app, you'd want a specific /stats endpoint
        const { data } = await api.get("/tasks?limit=100");

        const allTasks: Task[] = data.tasks;

        // Calculate Stats
        const total = allTasks.length;
        const pending = allTasks.filter((t) => t.status === "PENDING").length;
        const completed = allTasks.filter(
          (t) => t.status === "COMPLETED",
        ).length;

        setStats({ total, pending, completed });

        // Get the top 4 most recent tasks for the list
        setRecentTasks(allTasks.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper for Date Display
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, <span className="text-blue-600">{user?.name}</span>!
          </h1>
          <p className="text-gray-500 mt-1 flex items-center">
            <Calendar className="w-4 h-4 mr-2" /> {today}
          </p>
        </div>
        <Link
          href="/dashboard/create-task"
          className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-4 h-4 mr-2" /> Create New Task
        </Link>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Tasks</p>
              {loading ? (
                <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
              ) : (
                <h3 className="text-3xl font-bold text-gray-800 mt-1">
                  {stats.pending}
                </h3>
              )}
            </div>
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 text-xs text-blue-600 font-medium bg-blue-50 inline-block px-2 py-1 rounded">
            Tasks in progress
          </div>
        </div>

        {/* Completed Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Completed</p>
              {loading ? (
                <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
              ) : (
                <h3 className="text-3xl font-bold text-gray-800 mt-1">
                  {stats.completed}
                </h3>
              )}
            </div>
            <div className="p-3 bg-green-50 rounded-xl text-green-600">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 text-xs text-green-600 font-medium bg-green-50 inline-block px-2 py-1 rounded">
            Successfully finished
          </div>
        </div>

        {/* Total Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Tasks</p>
              {loading ? (
                <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
              ) : (
                <h3 className="text-3xl font-bold text-gray-800 mt-1">
                  {stats.total}
                </h3>
              )}
            </div>
            <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
              <Activity className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 text-xs text-purple-600 font-medium bg-purple-50 inline-block px-2 py-1 rounded">
            Lifetime created
          </div>
        </div>
      </div>

      {/* 3. Main Content Area (Split View) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Tasks List (Takes up 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800 text-lg">
                Recent Activity
              </h3>
              <Link
                href="/dashboard/my-tasks"
                className="text-sm text-blue-600 hover:underline flex items-center"
              >
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="p-2">
              {loading ? (
                <div className="space-y-3 p-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-12 bg-gray-100 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : recentTasks.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No tasks found. Create one to get started!
                </div>
              ) : (
                <div className="space-y-1">
                  {recentTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2 rounded-full ${task.status === "COMPLETED" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}
                        >
                          {task.status === "COMPLETED" ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Clock className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <h4
                            className={`font-medium text-gray-800 ${task.status === "COMPLETED" ? "line-through text-gray-400" : ""}`}
                          >
                            {task.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {new Date(task.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          task.status === "COMPLETED"
                            ? "bg-green-50 text-green-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Quick Actions / Static Info (Takes up 1 col) */}
        <div className="space-y-6">
          {/* Quick Stats / Productivity Tip */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="font-bold text-lg mb-2">Productivity Tip</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-4">
              "Start by doing what's necessary; then do what's possible; and
              suddenly you are doing the impossible."
            </p>
            <div className="h-1 bg-white/20 rounded-full w-full mb-2">
              <div className="h-1 bg-white rounded-full w-2/3"></div>
            </div>
            <p className="text-xs text-blue-200">Daily Goal Progress</p>
          </div>

          {/* Quick Links Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() =>
                  (window.location.href = "/dashboard/create-task")
                }
                className="w-full flex items-center p-3 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4 mr-3" /> Add New Task
              </button>
              <button className="w-full flex items-center p-3 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                <Link
                  href="/dashboard/my-tasks"
                  className="text-sm  text-gray-600 bg-gray-50 hover:bg-blue-50 hover:text-blue-600  flex items-center"
                >
                  <AlertCircle className="w-4 h-4 mr-3" /> View Pending Tasks
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
