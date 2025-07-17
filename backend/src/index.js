import express from "express";
import "dotenv/config";
import appMiddleware from "./middleware/index.js";

// Inisialisasi aplikasi Express
const app = express();

// Terapkan semua middleware Anda (seperti cors, express.json, dan rute-rute Anda)
app.use(appMiddleware);

// Rute sederhana untuk mengecek apakah server berjalan
// Ini opsional tapi sangat membantu untuk testing
app.get("/", (req, res) => {
  res.status(200).send("API Server untuk Binals Coffee berjalan dengan baik.");
});

// Ekspor aplikasi Express agar bisa digunakan oleh Vercel.
// Baris ini adalah bagian terpenting.
export default app;
