import { Router } from "express";
import userRouter from "./user.route.js";
import categoryRoute from "./category.route.js";
import supplierRouter from "./supplier.router.js";
import productRoute from "./product.route.js";
import cartRoute from "./cart.route.js";
import orderRouter from "./order.route.js";
import orderReturnRouter from "./orderReturn.route.js";
import purchaseRouter from "./purchase.route.js";

const router = Router();

// --- Definisi Rute-Rute API ---
// Perhatikan, tidak ada awalan "/api" di sini.
router.use("/users", userRouter);
router.use("/categories", categoryRoute);
router.use("/suppliers", supplierRouter);
router.use("/products", productRoute);
router.use("/carts", cartRoute);
router.use("/orders", orderRouter);
router.use("/order-returns", orderReturnRouter);
router.use("/purchases", purchaseRouter);

// --- Rute Dasar untuk /api ---
// Untuk mengecek apakah router API berjalan saat diakses di /api
router.get("/", (req, res) => {
  res.status(200).json({ message: "Selamat datang di Binals API" });
});

// --- Handler 404 untuk API ---
// Menangkap semua permintaan ke /api/... yang tidak cocok dengan rute di atas.
router.use("*", (req, res) => {
  res.status(404).json({
    message: "Endpoint API tidak ditemukan",
  });
});

export default router;
