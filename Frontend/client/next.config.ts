import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Backend URL environment variable se uthayenge
    // Local mein: http://localhost:5000
    // Prod mein: https://focus-loop.onrender.com
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    return [
      {
        source: "/api/:path*", // Agar frontend par /api/auth/login call hua...
        destination: `${apiUrl}/:path*`, // ...toh backend par /auth/login par bhej do
      },
    ];
  },
};

export default nextConfig;
