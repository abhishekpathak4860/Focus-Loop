import axios from "axios";

// AB HUM DIRECT BACKEND URL USE NAHI KARENGE
// Hum relative path "/api" use karenge taaki request Next.js server ke paas jaye
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// 1. Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 2. Response Interceptor (Refresh Logic)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 403 || error.response?.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Proxy ke through refresh call
        const { data } = await axios.post(
          "/api/auth/refresh",
          {},
          { withCredentials: true },
        );

        localStorage.setItem("token", data.accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Session expired", refreshError);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
