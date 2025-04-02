import express from "express";
import { createOrder, verifyUserId } from "../controllers/order.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.put("/verify-user/:userId", verifyUserId);

export default router;
