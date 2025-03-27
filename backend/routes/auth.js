import express from "express";
import { googleAuth, login, signup } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/googleAuth", googleAuth);

export default router;
