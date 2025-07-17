import secureLocalStorage from "react-secure-storage";
import axios from "axios";

// Instance Axios dibuat dengan konfigurasi yang spesifik dan aman.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menambahkan token otorisasi ke setiap request.
api.interceptors.request.use((request) => {
  const token = secureLocalStorage.getItem("acessToken");
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
});

// Logika untuk me-refresh token jika token akses sudah kedaluwarsa.
const refreshAuthLogic = async (failedRequest) => {
  try {
    const refreshToken = secureLocalStorage.getItem("refreshToken");
    const response = await axios.get(`/api/users/refresh`, {
        // Menggunakan baseURL dari pengaturan global sementara untuk request ini
        baseURL: import.meta.env.VITE_API_URL, 
        headers: {
            Authorization: `Bearer ${refreshToken}`,
            "Content-Type": "application/json",
        }
    });

    const { acessToken, refreshToken: newRefreshToken, result } = response.data;

    secureLocalStorage.setItem("acessToken", acessToken);
    secureLocalStorage.setItem("refreshToken", newRefreshToken);
    secureLocalStorage.setItem("user", result);
    
    console.log("Simpan token baru berhasil ...");
    
    failedRequest.config.headers["Authorization"] = `Bearer ${acessToken}`;
    return Promise.resolve();
  } catch (error) {
    // Jika refresh token juga gagal/kedaluwarsa, hapus semua data dan kembali ke halaman login.
    secureLocalStorage.clear();
    console.log(error.message);
    window.location.href = "/";
    return Promise.reject(error);
  }
};

// Interceptor untuk menangani respons error (misalnya, status 401 Unauthorized).
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshAuthLogic(originalRequest);
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const axiosInstance = api;
