

// // frontend\src\lib\api.ts
// import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
// import Cookies from 'js-cookie';

// // Define a custom interface for our request config
// interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
//   _retry?: boolean;
// }

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: { 'Content-Type': 'application/json' },
// });

// // Request interceptor to add the auth token to headers
// api.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get('access_token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor to handle token refresh
// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     // Use our custom type for the original request config
//     const originalRequest = error.config as CustomAxiosRequestConfig;

//     // If the error is 401 and it's not a retry request
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = Cookies.get('refresh_token');
//         if (!refreshToken) {
//           // If no refresh token, logout
//           window.location.href = '/login';
//           return Promise.reject(error);
//         }

//         const { data } = await axios.post(`${API_URL}/auth/refresh`, {
//           refresh_token: refreshToken,
//         });

//         const { access_token } = data.tokens;

//         // Set the new access token in cookies
//         Cookies.set('access_token', access_token);

//         // Update the authorization header for the original request
//         if (originalRequest.headers) {
//           originalRequest.headers.Authorization = `Bearer ${access_token}`;
//         }

//         // Retry the original request
//         return api(originalRequest);
//       } catch (refreshError) {
//         // If refresh fails, clear cookies and redirect to login
//         Cookies.remove('access_token');
//         Cookies.remove('refresh_token');
//         Cookies.remove('user');
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;










import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

/* -------------------------------------------------------------------------- */
/*                       Request – attach access token                        */
/* -------------------------------------------------------------------------- */
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* -------------------------------------------------------------------------- */
/*                      Response – automatic token refresh                    */
/* -------------------------------------------------------------------------- */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refresh_token");
        if (!refreshToken) throw new Error("Missing refresh token");

        const { data } = await axios.post(`${API_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const { access_token, refresh_token } = data.tokens;

        Cookies.set("access_token", access_token, { expires: 7 });
        Cookies.set("refresh_token", refresh_token, { expires: 7 });

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        /* ---------------- If refresh fails, wipe auth cookies & redirect ---------------- */
        ["access_token", "refresh_token", "user"].forEach((key) =>
          Cookies.remove(key)
        ); // <- FIX: use arrow function to satisfy TS

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

