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

// Hapus awalan "/api" dan ganti dengan path yang lebih spesifik
router.use("/users", userRouter);
router.use("/categories", categoryRoute);
router.use("/suppliers", supplierRouter);
router.use("/products", productRoute);
router.use("/carts", cartRoute);
router.use("/orders", orderRouter);
router.use("/order-returns", orderReturnRouter);
router.use("/purchases", purchaseRouter);

// Menambahkan rute dasar untuk /api agar tidak 404
router.get("/", (req, res) => {
  res.status(200).json({ message: "Selamat datang di Binals API" });
});

// Handler 404 untuk endpoint API yang tidak ditemukan
router.use("*", (req, res) => {
  res.status(404).json({
    message: "API endpoint tidak ditemukan",
  });
});

export default router;
