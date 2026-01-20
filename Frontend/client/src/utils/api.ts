import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // IMPORTANT: Allows sending cookies
});

// 1. Request Interceptor: Attach Access Token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 2. Response Interceptor: Handle 403/401 Errors (Expired Token)
api.interceptors.response.use(
  (response) => response, // If success, just return response
  async (error) => {
    const originalRequest = error.config;

    // If error is 403 (Forbidden) or 401 (Unauthorized) AND we haven't retried yet
    if (
      (error.response?.status === 403 || error.response?.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Mark as retried to avoid infinite loops

      try {
        // CALL THE REFRESH ENDPOINT
        // This sends the HttpOnly cookie automatically
        const { data } = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        // Save the new token
        localStorage.setItem("token", data.accessToken);

        // Update the header of the failed request with new token
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails (Cookie expired too), Logout user
        console.error("Session expired", refreshError);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login"; // Force redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
