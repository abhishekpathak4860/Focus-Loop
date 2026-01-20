// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import Link from "next/link";
// import { useState } from "react";
// import axios from "axios"; // Import Axios
// import { useRouter } from "next/navigation"; // Import Router
// import api from "@/src/utils/api";

// // 1. Define Schema
// const registerSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Please enter a valid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// type RegisterFormData = z.infer<typeof registerSchema>;

// export default function RegisterPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [serverError, setServerError] = useState<string | null>(null); // State for API errors
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterFormData>({
//     resolver: zodResolver(registerSchema),
//   });

//   // 2. REAL API SUBMISSION
//   const onSubmit = async (data: RegisterFormData) => {
//     setIsLoading(true);
//     setServerError(null); // Reset errors

//     try {
//       // API CALL TO YOUR BACKEND
//       const response = await api.post("/auth/register", data);

//       console.log("Registration Success:", response.data);
//       alert("Registration Successful! Redirecting to Login...");

//       // Redirect to Login Page
//       router.push("/login");
//     } catch (error: any) {
//       console.error("Registration Error:", error);
//       // Show the error message from the backend (e.g., "User already exists")
//       setServerError(
//         error.response?.data?.message ||
//           "Something went wrong. Please try again.",
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
//           <span className="text-white font-bold text-xl">T</span>
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Create your account
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Or{" "}
//           <Link
//             href="/login"
//             className="font-medium text-blue-600 hover:text-blue-500"
//           >
//             sign in to your existing account
//           </Link>
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {/* Show Server Error if it exists */}
//           {serverError && (
//             <div
//               className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative"
//               role="alert"
//             >
//               <span className="block sm:inline">{serverError}</span>
//             </div>
//           )}

//           <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
//             {/* Name */}
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Full Name
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="name"
//                   type="text"
//                   {...register("name")}
//                   className={`text-black appearance-none block w-full px-3 py-2 border ${errors.name ? "border-red-300" : "border-gray-300"} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                 />
//                 {errors.name && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.name.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   type="email"
//                   {...register("email")}
//                   className={`text-black appearance-none block w-full px-3 py-2 border ${errors.email ? "border-red-300" : "border-gray-300"} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   type="password"
//                   {...register("password")}
//                   className={`text-black appearance-none block w-full px-3 py-2 border ${errors.password ? "border-red-300" : "border-gray-300"} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                 />
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Submit */}
//             <div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
//               >
//                 {isLoading ? "Creating account..." : "Register"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; // <--- Import Toast

import api from "@/src/utils/api";

// 1. Define Schema
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // 2. REAL API SUBMISSION
  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    // Show loading toast
    const toastId = toast.loading("Creating account...");

    try {
      // API CALL TO YOUR BACKEND
      const response = await api.post("/auth/register", data);

      console.log("Registration Success:", response.data);

      // --- SUCCESS TOAST ---
      toast.success("Registration Successful! Redirecting...", {
        id: toastId,
      });

      // Redirect to Login Page
      router.push("/login");
    } catch (error: any) {
      console.error("Registration Error:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      // --- ERROR TOAST ---
      toast.error(errorMessage, {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
          <span className="text-white font-bold text-xl">T</span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className={`text-black appearance-none block w-full px-3 py-2 border ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`text-black appearance-none block w-full px-3 py-2 border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={`text-black appearance-none block w-full px-3 py-2 border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
              >
                {isLoading ? "Creating account..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
