import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo */}
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="font-bold text-xl text-gray-900">
                TaskMaster
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 font-medium px-3 py-2"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center relative overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-[30%] -right-[10%] w-[50%] h-[80%] rounded-full bg-blue-100 blur-3xl opacity-60"></div>
          <div className="absolute top-[60%] -left-[10%] w-[40%] h-[60%] rounded-full bg-indigo-100 blur-3xl opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Master Your Tasks, <br />
            <span className="text-blue-600"> reclaim your time.</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            The simple, powerful way to manage your personal projects and daily
            to-dos. Stay organized and focused with TaskMaster.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-xl shadow-lg hover:shadow-xl transition-all"
            >
              Get Started for Free
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 border border-gray-300 text-lg font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 md:py-4 md:text-xl"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
