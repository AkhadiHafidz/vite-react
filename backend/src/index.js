import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import "dotenv/config";

// Impor semua file rute Anda secara langsung di sini
import userRouter from "./routes/user.route.js";
import categoryRoute from "./routes/category.route.js";
import supplierRouter from "./routes/supplier.router.js";
import productRoute from "./routes/product.route.js";
import cartRoute from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
import orderReturnRouter from "./routes/orderReturn.route.js";
import purchaseRouter from "./routes/purchase.route.js";

// Inisialisasi aplikasi Express
const app = express();

// --- Middleware Global ---
// Semua middleware penting diletakkan di sini.
app.use(cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
app.options("*", cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));

// --- Definisi Rute-Rute API ---
// Di sinilah kita memberitahu Express rute mana yang harus digunakan.
// Semua rute akan diawali dengan /api
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRoute);
app.use("/api/suppliers", supplierRouter);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRouter);
app.use("/api/order-returns", orderReturnRouter);
app.use("/api/purchases", purchaseRouter);

// --- Rute Pengecekan Server ---
// Rute ini untuk memastikan server berjalan saat diakses di alamat utama.
app.get("/", (req, res) => {
    res.status(200).send("Server Backend Binals Coffee Berjalan dengan Baik. Silakan akses endpoint /api.");
});

// Rute dasar untuk /api
app.get("/api", (req, res) => {
    res.status(200).json({ message: "Selamat datang di Binals API. Rute tersedia di /api/users, /api/products, dll." });
});

// --- Handler 404 ---
// Menangkap semua permintaan yang tidak cocok dengan rute di atas.
app.use("*", (req, res) => {
    res.status(404).json({
        message: "Endpoint tidak ditemukan. Pastikan alamat URL Anda benar.",
    });
});

// --- Ekspor untuk Vercel ---
// Bagian terpenting agar Vercel bisa menjalankan aplikasi Anda.
export default app;
