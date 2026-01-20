import Link from "next/link";

export default function Home() {
  return (
    // Changed bg-gray-50 to a very slight off-white/teal tint for softness
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 fixed w-full z-20 top-0 left-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              {/* UPDATED LOGO: Using an SVG icon instead of a simple HTML block for a more professional look */}
              <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center border border-teal-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-teal-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-bold text-xl text-slate-800 tracking-tight">
                TaskMaster
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-slate-600 hover:text-slate-900 font-medium px-3 py-2 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                // Changed blue to teal
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-medium transition-all shadow-sm hover:shadow-md"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {/* Added pt-16 to account for fixed navbar */}
      <main className="flex-grow flex items-center justify-center relative overflow-hidden pt-16">
        {/* Background decorative blob - UPDATED COLORS */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          {/* Changed blue-100 to teal-100/40 */}
          <div className="absolute -top-[30%] -right-[10%] w-[50%] h-[80%] rounded-full bg-teal-100/60 blur-3xl opacity-70 mix-blend-multiply"></div>
          {/* Changed indigo-100 to emerald-100/40 for a soothing mix */}
          <div className="absolute top-[60%] -left-[10%] w-[40%] h-[60%] rounded-full bg-emerald-100/60 blur-3xl opacity-70 mix-blend-multiply"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Master Your Tasks, <br />
            {/* Changed text-blue-600 to text-teal-600 */}
            <span className="text-teal-600"> reclaim your time.</span>
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            The simple, powerful way to manage your personal projects and daily
            to-dos. Stay organized and focused with TaskMaster.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              // Changed blue button to teal with a softer shadow
              className="px-8 py-3 border border-transparent text-lg font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 md:py-4 md:text-xl shadow-lg shadow-teal-200/50 hover:shadow-xl hover:shadow-teal-200/40 transition-all duration-300"
            >
              Get Started for Free
            </Link>
            <Link
              href="/login"
              // Changed blue text and border to teal variants
              className="px-8 py-3 border-2 border-slate-200 text-lg font-medium rounded-lg text-teal-700 bg-white hover:bg-slate-50 hover:border-teal-200 md:py-4 md:text-xl transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
