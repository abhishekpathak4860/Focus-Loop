// "use client";

// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Save, XCircle, FileText } from "lucide-react";
// import api from "@/src/utils/api";

// // Define the form data shape (Removed status since it defaults to PENDING)
// interface TaskFormData {
//   title: string;
//   description: string;
// }

// export default function CreateTaskPage() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<TaskFormData>();

//   const onSubmit = async (data: TaskFormData) => {
//     setIsLoading(true);
//     try {
//       // API Call: POST /tasks
//       // Note: We don't send status. Backend defaults it to 'PENDING'
//       await api.post("/tasks", data);

//       // Success! Redirect to My Tasks list
//       router.push("/dashboard/my-tasks");
//     } catch (error) {
//       console.error("Failed to create task", error);
//       alert("Failed to create task. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto">
//       {/* Page Header */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-800">Create New Task</h1>
//         <p className="text-gray-500 mt-1">
//           Add a new item to your personal task list.
//         </p>
//       </div>

//       {/* Form Card */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         {/* Form Header Decoration */}
//         <div className="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-gray-100">
//           <div className="flex items-center text-blue-600">
//             <FileText className="w-5 h-5 mr-2" />
//             <span className="font-semibold text-sm uppercase tracking-wide">
//               Task Details
//             </span>
//           </div>
//         </div>

//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="p-6 md:p-8 space-y-6"
//         >
//           {/* Title Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Task Title <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               placeholder="e.g., Complete Project Report"
//               {...register("title", { required: "Title is required" })}
//               className={`text-black w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-100 transition-all outline-none ${
//                 errors.title
//                   ? "border-red-300 focus:border-red-500 bg-red-50"
//                   : "border-gray-200 focus:border-blue-500 bg-gray-50 focus:bg-white"
//               }`}
//             />
//             {errors.title && (
//               <p className="mt-1 text-sm text-red-500 flex items-center">
//                 <XCircle className="w-4 h-4 mr-1" /> {errors.title.message}
//               </p>
//             )}
//           </div>

//           {/* Description Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description{" "}
//               {/* <span className="text-gray-400 font-normal">(Optional)</span> */}
//             </label>
//             <textarea
//               rows={4}
//               placeholder="Add specific details about this task..."
//               {...register("description")}
//               className="text-black w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none"
//             ></textarea>
//           </div>

//           {/* Action Buttons */}
//           <div className="pt-4 flex items-center justify-end space-x-4 border-t border-gray-100 mt-4">
//             <button
//               type="button"
//               onClick={() => router.back()}
//               className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="flex items-center px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
//             >
//               {isLoading ? (
//                 <span>Saving...</span>
//               ) : (
//                 <>
//                   <Save className="w-4 h-4 mr-2" /> Create Task
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Save, XCircle, FileText } from "lucide-react";
import toast from "react-hot-toast"; // <--- Import Toast
import api from "@/src/utils/api";

// Define the form data shape (Removed status since it defaults to PENDING)
interface TaskFormData {
  title: string;
  description: string;
}

export default function CreateTaskPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>();

  const onSubmit = async (data: TaskFormData) => {
    setIsLoading(true);

    // Show loading toast
    const toastId = toast.loading("Creating task...");

    try {
      // API Call: POST /tasks
      // Note: We don't send status. Backend defaults it to 'PENDING'
      await api.post("/tasks", data);

      // --- SUCCESS TOAST ---
      toast.success("Task created successfully!", {
        id: toastId,
      });

      // Success! Redirect to My Tasks list
      router.push("/dashboard/my-tasks");
    } catch (error) {
      console.error("Failed to create task", error);

      // --- ERROR TOAST ---
      toast.error("Failed to create task. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Create New Task</h1>
        <p className="text-gray-500 mt-1">
          Add a new item to your personal task list.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Form Header Decoration */}
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-gray-100">
          <div className="flex items-center text-blue-600">
            <FileText className="w-5 h-5 mr-2" />
            <span className="font-semibold text-sm uppercase tracking-wide">
              Task Details
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-8 space-y-6"
        >
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Complete Project Report"
              {...register("title", { required: "Title is required" })}
              className={`text-black w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-100 transition-all outline-none ${
                errors.title
                  ? "border-red-300 focus:border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-blue-500 bg-gray-50 focus:bg-white"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <XCircle className="w-4 h-4 mr-1" /> {errors.title.message}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description{" "}
              {/* <span className="text-gray-400 font-normal">(Optional)</span> */}
            </label>
            <textarea
              rows={4}
              placeholder="Add specific details about this task..."
              {...register("description")}
              className="text-black w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end space-x-4 border-t border-gray-100 mt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" /> Create Task
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
