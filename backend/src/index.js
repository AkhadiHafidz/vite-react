import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import "dotenv/config";
import apiRouter from "./routes/index.js"; // Import router utama API Anda

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

// --- Router Utama API ---
// Di sinilah kita memberitahu Express bahwa semua rute API kita akan diawali dengan /api
app.use("/api", apiRouter);

// --- Rute Pengecekan Server ---
// Ini untuk menangani permintaan ke alamat dasar (https://URL_ANDA.vercel.app/)
app.get("/", (req, res) => {
    res.status(200).send("Server Backend Binals Coffee Berjalan.");
});

// --- Ekspor untuk Vercel ---
// Bagian terpenting agar Vercel bisa menjalankan aplikasi Anda.
export default app;
