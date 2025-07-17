import secureLocalStorage from "react-secure-storage";
import axios from "axios";

// Instance Axios dibuat dengan konfigurasi yang spesifik dan aman.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT
    ? parseInt(import.meta.env.VITE_API_TIMEOUT)
    : 10000, // Default timeout 10 detik
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menambahkan token otorisasi ke setiap request.
api.interceptors.request.use(
  (config) => {
    const token = secureLocalStorage.getItem("acessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Logika untuk me-refresh token jika token akses sudah kedaluwarsa.
const refreshAuthLogic = async () => {
  try {
    const refreshToken = secureLocalStorage.getItem("refreshToken");
    // Menggunakan instance 'api' untuk konsistensi, meskipun endpoint-nya absolut
    const response = await api.get(`/api/users/refresh`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const { acessToken, refreshToken: newRefreshToken, result } = response.data;

    secureLocalStorage.setItem("acessToken", acessToken);
    secureLocalStorage.setItem("refreshToken", newRefreshToken);
    secureLocalStorage.setItem("user", result);

    console.log("Token baru berhasil disimpan.");
    return acessToken; // Kembalikan token baru
  } catch (error) {
    // Jika refresh token juga gagal/kedaluwarsa, hapus semua data dan kembali ke halaman login.
    secureLocalStorage.clear();
    console.error("Gagal refresh token:", error);
    window.location.href = "/";
    return Promise.reject(error);
  }
};

// Interceptor untuk menangani respons error (misalnya, status 401 Unauthorized).
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Cek jika error adalah 401 dan request ini belum pernah dicoba ulang
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAuthLogic();
        // Perbarui header di request asli dengan token baru
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // Coba lagi request asli dengan token baru
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    // Untuk error lain, langsung tolak promise-nya
    return Promise.reject(error);
  }
);

export const axiosInstance = api;
