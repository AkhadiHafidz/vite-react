import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import "dotenv/config";

// Impor semua file rute Anda
import userRouter from "./routes/user.route.js";
import categoryRoute from "./routes/category.route.js";
import supplierRouter from "./routes/supplier.router.js";
import productRoute from "./routes/product.route.js";
import cartRoute from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
import orderReturnRouter from "./routes/orderReturn.route.js";
import purchaseRouter from "./routes/purchase.route.js";

const app = express();

// --- Konfigurasi CORS (BAGIAN YANG DIPERBARUI) ---
// Kita akan mengambil URL frontend dari Environment Variable
const allowedOrigins = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: (origin, callback) => {
    // Izinkan jika origin ada di dalam daftar, atau jika tidak ada origin (seperti dari Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Tidak diizinkan oleh CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Menangani preflight request

// --- Middleware Global ---
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));

// --- Definisi Rute-Rute API ---
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRoute);
app.use("/api/suppliers", supplierRouter);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRouter);
app.use("/api/order-returns", orderReturnRouter);
app.use("/api/purchases", purchaseRouter);

// --- Rute Pengecekan Server ---
app.get("/", (req, res) => {
    res.status(200).send("Server Backend Binals Coffee Berjalan dengan Baik.");
});

// Rute dasar untuk /api
app.get("/api", (req, res) => {
    res.status(200).json({ message: "Selamat datang di Binals API." });
});

// --- Handler 404 ---
app.use("*", (req, res) => {
    res.status(404).json({
        message: "Endpoint tidak ditemukan.",
    });
});

// --- Ekspor untuk Vercel ---
export default app;
