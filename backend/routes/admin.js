import express from "express";
import { adminOrders, adminVerifyOrder } from "../controllers/admin.js";

const router = express.Router();

router.get("/orders", adminOrders);
router.put("/verify-order/:orderId", adminVerifyOrder);

export default router;
